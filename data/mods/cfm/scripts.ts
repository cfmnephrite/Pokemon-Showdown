import {toID} from '../../../sim/dex';
interface CFMBattlePokemon extends ModdedBattlePokemon {
	runEffectiveness?: (this: Pokemon, move: ActiveMove) => number;
}

interface CFMBattleScriptsData extends ModdedBattleScriptsData {
	pokemon?: CFMBattlePokemon;
	getCategory?: (this: Battle, move: string | Move, source: Pokemon | null) => string;
}
export const Scripts: CFMBattleScriptsData = {
	gen: 9,

	getCategory(move: string | Move, source: Pokemon | null = null): string {
		const dexMove = this.dex.moves.get(move);
		let output = dexMove.category || 'Physical';
		if (source && dexMove.flags['magic']) {
			if (dexMove.overrideOffensiveStat === 'def' && source.getStat('spd') > source.getStat('def')) output = 'Special';
			else if (dexMove.overrideOffensiveStat === 'spd' && source.getStat('def') > source.getStat('spd')) output = 'Physical';
			else if (output === 'Physical' && source.getStat('spa') > source.getStat('atk')) output = 'Special';
			else if (output === 'Special' && source.getStat('atk') > source.getStat('spa')) output = 'Physical';
		}
		return output;
	},

	natureModify(stats: StatsTable, set: PokemonSet): StatsTable {
		// Natures are calculated with 16-bit truncation.
		// This only affects Eternatus-Eternamax in Pure Hackmons.
		const nature = this.dex.natures.get(set.nature);
		let s: StatIDExceptHP;
		if (nature.plus) {
			s = nature.plus;
			const stat = this.ruleTable.has('overflowstatmod') ? Math.min(stats[s], 595) : stats[s];
			stats[s] = Math.floor(stat * 1.1);
		}
		if (nature.minus) {
			s = nature.minus;
			const stat = this.ruleTable.has('overflowstatmod') ? Math.min(stats[s], 728) : stats[s];
			stats[s] = Math.floor(stat * 0.9);
		}
		return stats;
	},

	/**
	 * runMove is the "outside" move caller. It handles deducting PP,
	 * flinching, full paralysis, etc. All the stuff up to and including
	 * the "POKEMON used MOVE" message.
	 *
	 * For details of the difference between runMove and useMove, see
	 * useMove's info.
	 *
	 * externalMove skips LockMove and PP deduction, mostly for use by
	 * Dancer.
	 */
	actions: {
		/**
		 * 0 is a success dealing 0 damage, such as from False Swipe at 1 HP.
		 *
		 * Normal PS return value rules apply:
		 * undefined = success, null = silent failure, false = loud failure
		 */
		 getDamage(
			source: Pokemon, target: Pokemon, move: string | number | ActiveMove,
			suppressMessages = false
		): number | undefined | null | false {
			if (typeof move === 'string') move = this.dex.getActiveMove(move);

			if (typeof move === 'number') {
				const basePower = move;
				move = new Dex.Move({
					basePower,
					type: '???',
					category: 'Physical',
					willCrit: false,
				}) as ActiveMove;
				move.hit = 0;
			}

			if (!move.ignoreImmunity || (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type])) {
				if (!target.runImmunity(move.type, !suppressMessages)) {
					return false;
				}
			}

			if (move.ohko) return target.maxhp;
			if (move.damageCallback) return move.damageCallback.call(this.battle, source, target);
			if (move.damage === 'level') {
				return source.level;
			} else if (move.damage) {
				return move.damage;
			}

			// @ts-ignore
			const category = this.battle.getCategory(move, source);

			let basePower: number | false | null = move.basePower;
			if (move.basePowerCallback) {
				basePower = move.basePowerCallback.call(this.battle, source, target, move);
			}
			if (!basePower) return basePower === 0 ? undefined : basePower;
			basePower = this.battle.clampIntRange(basePower, 1);

			let critMult;
			let critRatio = this.battle.runEvent('ModifyCritRatio', source, target, move, move.critRatio || 0);
			if (this.battle.gen <= 5) {
				critRatio = this.battle.clampIntRange(critRatio, 0, 5);
				critMult = [0, 16, 8, 4, 3, 2];
			} else {
				critRatio = this.battle.clampIntRange(critRatio, 0, 4);
				if (this.battle.gen === 6) {
					critMult = [0, 16, 8, 2, 1];
				} else {
					critMult = [0, 24, 8, 2, 1];
				}
			}

			const moveHit = target.getMoveHitData(move);
			moveHit.crit = move.willCrit || false;
			if (move.willCrit === undefined) {
				if (critRatio) {
					moveHit.crit = this.battle.randomChance(1, critMult[critRatio]);
				}
			}

			if (moveHit.crit) {
				moveHit.crit = this.battle.runEvent('CriticalHit', target, null, move);
			}

			// happens after crit calculation
			basePower = this.battle.runEvent('BasePower', source, target, move, basePower, true);

			if (!basePower) return 0;
			basePower = this.battle.clampIntRange(basePower, 1);
			// Hacked Max Moves have 0 base power, even if you Dynamax
			if ((!source.volatiles['dynamax'] && move.isMax) || (move.isMax && this.dex.moves.get(move.baseMove).isMax)) {
				basePower = 0;
			}

			const level = source.level;

			const attacker = move.overrideOffensivePokemon === 'target' ? target : source;
			const defender = move.overrideDefensivePokemon === 'source' ? source : target;

			const isPhysical = category === 'Physical';
			let attackStat: StatIDExceptHP = move.overrideOffensiveStat ? (isPhysical ? 'def' : 'spd') : (isPhysical ? 'atk' : 'spa');
			const defenseStat: StatIDExceptHP = move.overrideDefensiveStat || (isPhysical ? 'def' : 'spd');

			const statTable = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};

			let atkBoosts = attacker.boosts[attackStat];
			let defBoosts = defender.boosts[defenseStat];

			let ignoreNegativeOffensive = !!move.ignoreNegativeOffensive;
			let ignorePositiveDefensive = !!move.ignorePositiveDefensive;

			if (moveHit.crit) {
				ignoreNegativeOffensive = true;
				ignorePositiveDefensive = true;
			}
			const ignoreOffensive = !!(move.ignoreOffensive || (ignoreNegativeOffensive && atkBoosts < 0));
			const ignoreDefensive = !!(move.ignoreDefensive || (ignorePositiveDefensive && defBoosts > 0));

			if (ignoreOffensive) {
				this.battle.debug('Negating (sp)atk boost/penalty.');
				atkBoosts = 0;
			}
			if (ignoreDefensive) {
				this.battle.debug('Negating (sp)def boost/penalty.');
				defBoosts = 0;
			}

			let attack = attacker.calculateStat(attackStat, atkBoosts);
			let defense = defender.calculateStat(defenseStat, defBoosts);

			attackStat = (category === 'Physical' ? 'atk' : 'spa');

			// Apply Stat Modifiers
			attack = this.battle.runEvent('Modify' + statTable[attackStat], source, target, move, attack);
			defense = this.battle.runEvent('Modify' + statTable[defenseStat], target, source, move, defense);

			if (this.battle.gen <= 4 && ['explosion', 'selfdestruct'].includes(move.id) && defenseStat === 'def') {
				defense = this.battle.clampIntRange(Math.floor(defense / 2), 1);
			}

			const tr = this.battle.trunc;

			// int(int(int(2 * L / 5 + 2) * A * P / D) / 50);
			const baseDamage = tr(tr(tr(tr(2 * level / 5 + 2) * basePower * attack) / defense) / 50);

			// Calculate damage modifiers separately (order differs between generations)
			return this.modifyDamage(baseDamage, source, target, move, suppressMessages);
		},

		runMove(
			moveOrMoveName: Move | string, pokemon: Pokemon, targetLoc: number, sourceEffect?: Effect | null,
			zMove?: string, externalMove?: boolean, maxMove?: string, originalTarget?: Pokemon
		) {
			pokemon.activeMoveActions++;
			let target = this.battle.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
			let baseMove = this.dex.getActiveMove(moveOrMoveName);
			const pranksterBoosted = baseMove.pranksterBoosted;
			if (baseMove.id !== 'struggle' && !zMove && !maxMove && !externalMove) {
				const changedMove = this.battle.runEvent('OverrideAction', pokemon, target, baseMove);
				if (changedMove && changedMove !== true) {
					baseMove = this.dex.getActiveMove(changedMove);
					if (pranksterBoosted) baseMove.pranksterBoosted = pranksterBoosted;
					target = this.battle.getRandomTarget(pokemon, baseMove);
				}
			}
			let move = baseMove;
			if (zMove) {
				move = this.getActiveZMove(baseMove, pokemon);
			} else if (maxMove) {
				move = this.getActiveMaxMove(baseMove, pokemon);
			}

			move.isExternal = externalMove;

			this.battle.setActiveMove(move, pokemon, target);

			/* if (pokemon.moveThisTurn) {
				// THIS IS PURELY A SANITY CHECK
				// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
				// USE this.queue.cancelMove INSTEAD
				this.battle.debug('' + pokemon.id + ' INCONSISTENT STATE, ALREADY MOVED: ' + pokemon.moveThisTurn);
				this.battle.clearActiveMove(true);
				return;
			} */
			const willTryMove = this.battle.runEvent('BeforeMove', pokemon, target, move);
			if (!willTryMove) {
				this.battle.runEvent('MoveAborted', pokemon, target, move);
				this.battle.clearActiveMove(true);
				// The event 'BeforeMove' could have returned false or null
				// false indicates that this counts as a move failing for the purpose of calculating Stomping Tantrum's base power
				// null indicates the opposite, as the Pokemon didn't have an option to choose anything
				pokemon.moveThisTurnResult = willTryMove;
				this.battle.send('tutorialMove', `${pokemon.side.id}\n${move.id}`);
				return;
			}
			if (move.beforeMoveCallback) {
				if (move.beforeMoveCallback.call(this.battle, pokemon, target, move)) {
					this.battle.clearActiveMove(true);
					pokemon.moveThisTurnResult = false;
					this.battle.send('tutorialMove', `${pokemon.side.id}\n${move.id}`);
					return;
				}
			}
			pokemon.lastDamage = 0;
			let lockedMove;
			if (!externalMove) {
				lockedMove = this.battle.runEvent('LockMove', pokemon);
				if (lockedMove === true) lockedMove = false;
				if (!lockedMove) {
					if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle')) {
						this.battle.add('cant', pokemon, 'nopp', move);
						this.battle.clearActiveMove(true);
						pokemon.moveThisTurnResult = false;
						this.battle.send('tutorialMove', `${pokemon.side.id}\n${move.id}`);
						return;
					}
				} else {
					sourceEffect = this.dex.conditions.get('lockedmove');
				}
				pokemon.moveUsed(move, targetLoc);
			}

			// Dancer Petal Dance hack
			// TODO: implement properly
			const noLock = externalMove && !pokemon.volatiles['lockedmove'];

			if (zMove) {
				if (pokemon.illusion) {
					this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
				}
				this.battle.add('-zpower', pokemon);
				pokemon.side.zMoveUsed = true;
			}
			const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
			this.battle.lastSuccessfulMoveThisTurn = moveDidSomething ? this.battle.activeMove && this.battle.activeMove.id : null;
			if (this.battle.activeMove) move = this.battle.activeMove;
			this.battle.singleEvent('AfterMove', move, null, pokemon, target, move);
			this.battle.runEvent('AfterMove', pokemon, target, move);
			this.battle.send('tutorialMove', `${pokemon.side.id}\n${move.id}`);

			// Dancer's activation order is completely different from any other event, so it's handled separately
			if (move.flags['dance'] && moveDidSomething && !move.isExternal) {
				const dancers = [];
				for (const currentPoke of this.battle.getAllActive()) {
					if (pokemon === currentPoke) continue;
					if (currentPoke.hasAbility('dancer') && !currentPoke.isSemiInvulnerable()) {
						dancers.push(currentPoke);
					}
				}
				// Dancer activates in order of lowest speed stat to highest
				// Note that the speed stat used is after any volatile replacements like Speed Swap,
				// but before any multipliers like Agility or Choice Scarf
				// Ties go to whichever Pokemon has had the ability for the least amount of time
				dancers.sort(
					(a, b) => -(b.storedStats['spe'] - a.storedStats['spe']) || b.abilityOrder - a.abilityOrder
				);
				for (const dancer of dancers) {
					if (this.battle.faintMessages()) break;
					if (dancer.fainted) continue;
					this.battle.add('-activate', dancer, 'ability: Dancer');
					const dancersTarget = !target!.isAlly(dancer) && pokemon.isAlly(dancer) ? target! : pokemon;
					const dancersTargetLoc = dancer.getLocOf(dancersTarget);
					this.runMove(move.id, dancer, dancersTargetLoc, this.dex.abilities.get('dancer'), undefined, true);
				}
			}
			if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];
			this.battle.faintMessages();
			this.battle.checkWin();
		},

		getZMove(move, pokemon, skipChecks) {
			const getEffectiveType = (_move: string | Move, _pokemon: Pokemon | null = null): string => {
					// For calculating Z Moves - calculates what the effective type of a _move should be not taking Aura Break into account
					if (typeof _move === 'string') _move = this.dex.moves.get(_move);
					if (['hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'technoblast',
						'weatherball'].includes(_move.id) || _pokemon === null) return _move.type;
					else if (_pokemon.getAbility().ate && _move.type === 'Normal') return _pokemon.getAbility().ate!;
					else if (_move.flags['omnitype'] || (_pokemon.hasAbility('powerofalchemy') &&
					_move.id === _pokemon.moveSlots[0].id)) return _pokemon.getTypes()[0];
					else return _move.type;
				}, item = pokemon.getItem(), type = getEffectiveType(move, pokemon);
			if (!skipChecks) {
				if (pokemon.side.zMoveUsed) return;
				if (!item.zMove) return;
				const moveData = pokemon.getMoveData(move);
				// Draining the PP of the base move prevents the corresponding Z-move from being used.
				if (!moveData?.pp) return;
			}
			if (item.zMoveSpecialMoves && !!item.zMoveSpecialMoves[pokemon.baseSpecies.baseSpecies] &&
					!item.itemUser?.includes(pokemon.species.name)) {
				const zMove = this.dex.moves.get(item.zMoveSpecialMoves[pokemon.baseSpecies.baseSpecies]);
				if (zMove.zMoveSpecialMoveFrom?.includes(move.name) ||
				zMove.zMoveSpecialType === type) return zMove.name;
			}
			if (typeof item.zMove === 'string') {
				if (item.itemUser && !item.itemUser.includes(pokemon.species.name)) return;
				if (item.zMoveFrom && move.name !== item.zMoveFrom) return;
				if (item.zMoveType && type !== item.zMoveType) return;
				// @ts-ignore
				if (item.zMoveCategory && this.battle.getCategory(move, pokemon) !== item.zMoveCategory) return;
				return item.zMove;
			} else if (item.zMove === true) {
				if (type === item.zMoveType) {
					if (move.category === "Status") {
						return move.name;
					} else if (move.zMove?.basePower) {
						return this.Z_MOVES[getEffectiveType(move, pokemon)];
					}
				}
			}
		},

		getActiveZMove(move, pokemon) {
			if (move.category === 'Status') {
				const zMove = this.dex.getActiveMove(move);
				zMove.isZ = true;
				zMove.isZOrMaxPowered = true;
				return zMove;
			}

			// Get what the Z Move is supposed to be from the held item
			const zMoveName = this.getZMove(move, pokemon, true) || this.Z_MOVES[move.type];
			const zMove = this.dex.getActiveMove(this.dex.getActiveMove(zMoveName));

			// Non-unique Z Moves don't have a fixed BP or category
			zMove.basePower = move.zMove!.basePower!;
			zMove.category = move.category;

			// copy the priority for Quick Guard
			zMove.priority = move.priority;
			zMove.isZOrMaxPowered = true;
			return zMove;
		},

		canZMove(pokemon) {
			// Disabled in Gen 9
			return;
			// if (pokemon.side.zMoveUsed ||
			// 	(pokemon.transformed &&
			// 		(pokemon.species.isMega || pokemon.species.isPrimal || pokemon.species.forme === "Ultra"))
			// ) return;
			// const item = pokemon.getItem();
			// if (!item.zMove) return;
			// let atLeastOne = false;
			// let mustStruggle = true;
			// const zMoves: ZMoveOptions = [];
			// for (const moveSlot of pokemon.moveSlots) {
			// 	if (moveSlot.pp <= 0) {
			// 		zMoves.push(null);
			// 		continue;
			// 	}
			// 	if (!moveSlot.disabled) {
			// 		mustStruggle = false;
			// 	}
			// 	const move = this.dex.moves.get(moveSlot.move);
			// 	let zMoveName = this.getZMove(move, pokemon, true) || '';
			// 	if (zMoveName) {
			// 		const zMove = this.dex.moves.get(zMoveName);
			// 		if (!zMove.isZ && zMove.category === 'Status') zMoveName = "Z-" + zMoveName;
			// 		zMoves.push({move: zMoveName, target: zMove.target});
			// 	} else {
			// 		zMoves.push(null);
			// 	}
			// 	if (zMoveName) atLeastOne = true;
			// }
			// if (atLeastOne && !mustStruggle) return zMoves;
		},

		runZPower(move, pokemon) {
			const zPower = this.dex.conditions.get('zpower');
			if (move.category !== 'Status') {
				this.battle.attrLastMove('[zeffect]');
			} else if (move.zMove?.boost) {
				this.battle.boost(move.zMove.boost, pokemon, pokemon, zPower);
			} else if (move.zMove?.effect) {
				switch (move.zMove.effect) {
				case 'heal':
					this.battle.heal(pokemon.maxhp, pokemon, pokemon, zPower);
					break;
				case 'healreplacement':
					move.self = {slotCondition: 'healreplacement'};
					break;
				case 'clearnegativeboost':
					const boosts: SparseBoostsTable = {};
					let i: BoostID;
					for (i in pokemon.boosts) {
						if (pokemon.boosts[i] < 0) {
							boosts[i] = 0;
						}
					}
					pokemon.setBoost(boosts);
					this.battle.add('-clearnegativeboost', pokemon, '[zeffect]');
					break;
				case 'redirect':
					pokemon.addVolatile('followme', pokemon, zPower);
					break;
				case 'crit2':
					pokemon.addVolatile('focusenergy', pokemon, zPower);
					break;
				case 'curse':
					if (pokemon.hasType('Ghost')) {
						this.battle.heal(pokemon.maxhp, pokemon, pokemon, zPower);
					} else {
						this.battle.boost({atk: 1}, pokemon, pokemon, zPower);
					}
				}
			}
		},
		hitStepBreakProtect(targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) {
			if (move.breaksProtect) {
				for (const target of targets) {
					let broke = false;
					for (const effectid of [
						'banefulbunker', 'kingsshield', 'obstruct', 'protect', 'spikyshield', 'flowershield', 'shelltrap', 'craftyshield',
					]) {
						if (target.removeVolatile(effectid))
							broke = true;
					}
					if (this.battle.gen >= 6 || !target.isAlly(pokemon)) {
						for (const effectid of ['matblock', 'quickguard', 'wideguard']) {
							if (target.side.removeSideCondition(effectid)) broke = true;
						}
					}
					if (broke) {
						if (move.id === 'feint')
							this.battle.add('-activate', target, 'move: Feint');
						else if (this.dex.moves.get(move.id).breaksProtect)
							this.battle.add('-activate', target, 'move: ' + move.name, '[broken]');

						if (this.battle.gen >= 6) delete target.volatiles['stall'];
					}
				}
			}
			return undefined;
		},
	},
	pokemon: {
		calculateStat(statName: StatIDExceptHP, boost: number, modifier?: number) {
			statName = toID(statName) as StatIDExceptHP;
			// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
			if (statName === 'hp') throw new Error("Please read `maxhp` directly");

			// base stat
			let stat = this.storedStats[statName];

			// DOESN'T SWAP DEFENCES IN CFM
			// Wonder Room swaps defenses before calculating anything else
			// if ('wonderroom' in this.battle.field.pseudoWeather) {
			// 	if (statName === 'def') {
			// 		stat = this.storedStats['spd'];
			// 	} else if (statName === 'spd') {
			// 		stat = this.storedStats['def'];
			// 	}
			// }

			// stat boosts
			let boosts: SparseBoostsTable = {};
			const boostName = statName as BoostID;
			boosts[boostName] = boost;
			boosts = this.battle.runEvent('ModifyBoost', this, null, null, boosts);
			boost = boosts[boostName]!;
			const boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];
			if (boost > 6) boost = 6;
			if (boost < -6) boost = -6;
			if (boost >= 0) {
				stat = Math.floor(stat * boostTable[boost]);
			} else {
				stat = Math.floor(stat / boostTable[-boost]);
			}

			// stat modifier
			return this.battle.modify(stat, (modifier || 1));
		},

		getStat(statName: StatIDExceptHP, unboosted?: boolean, unmodified?: boolean) {
			statName = toID(statName) as StatIDExceptHP;
			// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
			if (statName === 'hp') throw new Error("Please read `maxhp` directly");

			// base stat
			let stat = this.storedStats[statName];

			// DOESN'T SWAP DEFENCES IN CFM
			// Download ignores Wonder Room's effect, but this results in
			// stat stages being calculated on the opposite defensive stat
			// if (unmodified && 'wonderroom' in this.battle.field.pseudoWeather) {
			// 	if (statName === 'def') {
			// 		statName = 'spd';
			// 	} else if (statName === 'spd') {
			// 		statName = 'def';
			// 	}
			// }

			// stat boosts
			if (!unboosted) {
				const boosts = this.battle.runEvent('ModifyBoost', this, null, null, {...this.boosts});
				let boost = boosts[statName];
				const boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];
				if (boost > 6) boost = 6;
				if (boost < -6) boost = -6;
				if (boost >= 0) {
					stat = Math.floor(stat * boostTable[boost]);
				} else {
					stat = Math.floor(stat / boostTable[-boost]);
				}
			}

			// stat modifier effects
			if (!unmodified) {
				const statTable: {[s in StatIDExceptHP]: string} = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};
				stat = this.battle.runEvent('Modify' + statTable[statName], this, null, null, stat);
			}

			if (statName === 'spe' && stat > 10000 && !this.battle.format.battle?.trunc) stat = 10000;
			return stat;
		},

		getActionSpeed() {
			let speed = this.getStat('spe', false, false);
			if (this.battle.field.getPseudoWeather('trickroom') || this.battle.field.getPseudoWeather('roaroftime')) {
				speed = 10000 - speed;
			}
			return this.battle.trunc(speed, 13);
		},

		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (this.species.levitates && !('roost' in this.volatiles)) return false;
			if (['frz', 'par', 'slp'].includes(this.getStatus().id) && item !== 'floatstone') return true;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},

		runEffectiveness(move: ActiveMove) {
			let totalTypeMod = 0;
			for (const type of this.getTypes()) {
				let typeMod = this.battle.dex.getEffectiveness(move, type);
				typeMod = this.battle.singleEvent('Effectiveness', move, null, this, type, move, typeMod);
				totalTypeMod += this.battle.runEvent('Effectiveness', this, type, move, typeMod);
			}
			if (move.type === 'Ground' && !this.isGrounded() && totalTypeMod > 0)
				totalTypeMod = 0;

			return totalTypeMod;
		},

		/** false = immune, true = not immune */
		runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			if (!this.battle.dex.types.isName(type)) {
				throw new Error("Use runStatusImmunity for " + type);
			}
			if (this.fainted) return false;

			const negateImmunity = !this.battle.runEvent('NegateImmunity', this, type);
			// CFM - anti-air moves are Ground-type moves that can hit levitating mons for at most neutral damage
			const antiAirMove = this.battle.activeMove ? this.battle.dex.moves.get(this.battle.activeMove.id).flags['antiair'] : true;
			const notImmune = type === 'Ground' ?
				(this.isGrounded(negateImmunity) || antiAirMove) :
				negateImmunity || this.battle.dex.getImmunity(type, this);
			if (notImmune) return true;
			if (!message) return false;
			if (notImmune === null) {
				this.battle.add('-immune', this, '[from] ability: Levitate');
			} else {
				this.battle.add('-immune', this);
			}
			return false;
		},
	},
};
