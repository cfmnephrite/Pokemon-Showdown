/*

Ratings and how they work:

-1: Detrimental
	  An ability that severely harms the user.
	ex. Defeatist, Slow Start

 0: Useless
	  An ability with no overall benefit in a singles battle.
	ex. Color Change, Plus

 1: Ineffective
	  An ability that has minimal effect or is only useful in niche situations.
	ex. Light Metal, Suction Cups

 2: Useful
	  An ability that can be generally useful.
	ex. Flame Body, Overcoat

 3: Effective
	  An ability with a strong effect on the user or foe.
	ex. Chlorophyll, Sturdy

 4: Very useful
	  One of the more popular abilities. It requires minimal support to be effective.
	ex. Adaptability, Magic Bounce

 5: Essential
	  The sort of ability that defines metagames.
	ex. Imposter, Shadow Tag

*/

export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	noability: {
		isNonstandard: "Past",
		name: "No Ability",
		rating: 0.1,
		num: 0,
	},
	adaptability: {
		onModifyMove(move) {
			if (!this.field.auraBreak()) move.stab = 2;
		},
		name: "Adaptability",
		rating: 4,
		num: 91,
	},
	aerilate: {
		shortDesc: "Normal-type moves become Flying; all Flying-type moves boosted by 20%.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.category === 'Status' || this.field.auraBreak()) return;
			const noBoost = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if ((move.type === 'Normal' || move.type === 'Flying') && !noBoost.includes(move.id) && !move.isZ) {
				move.type = 'Flying';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		name: "Aerilate",
		ate: "Flying",
		rating: 4,
		num: 184,
		cfm: true,
	},
	aftermath: {
		name: "Aftermath",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp && this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 4, source, target);
			}
		},
		rating: 2.5,
		num: 106,
	},
	airlock: {
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === pokemon && pokemon.species.id === 'rayquaza') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			// Air Lock does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			if (!this.effectState.switchingIn) return;
			this.add('-ability', pokemon, 'Air Lock');
			this.effectState.switchingIn = false;
		},
		suppressWeather: true,
		name: "Air Lock",
		rating: 2,
		num: 76,
	},
	analytic: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Analytic boost');
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Analytic",
		rating: 2.5,
		num: 148,
	},
	angerpoint: {
		shortDesc: "50% chance to boost higher of Attack/Sp. Atk if hit by a damaging move.",
		onDamagingHit(damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.id !== 'confused') {
				if (this.randomChance(1, 2)) this.boost({[target.storedStats.spa > target.storedStats.atk ? 'spa' : 'atk']:1}, target);
			}
		},
		name: "Anger Point",
		rating: 1.5,
		num: 83,
		cfm: true,
	},
	angershell: {
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedAngerShell = false;
			} else {
				this.effectState.checkedAngerShell = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedAngerShell;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedAngerShell = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1, spa: 1, spe: 1, def: -1, spd: -1}, target, target);
			}
		},
		name: "Anger Shell",
		rating: 4,
		num: 271,
	},
	anticipation: {
		shortDesc: "On switch-in: +1 Speed if any foe has a super-effective move.",
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						this.boost({'spe': 1}, pokemon);
						return;
					}
				}
			}
		},
		name: "Anticipation",
		rating: 0.5,
		num: 107,
		cfm: true,
	},
	arenatrap: {
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.isAdjacent(this.effectState.target)) return;
			if (pokemon.isGrounded()) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (pokemon.isGrounded(!pokemon.knownType)) { // Negate immunity if the type is unknown
				pokemon.maybeTrapped = true;
			}
		},
		name: "Arena Trap",
		rating: 5,
		num: 71,
	},
	armortail: {
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const armorTailHolder = this.effectState.target;
			if ((source.isAlly(armorTailHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', armorTailHolder, 'ability: Armor Tail', move, '[of] ' + target);
				return false;
			}
		},
		isBreakable: true,
		name: "Armor Tail",
		rating: 2.5,
		num: 296,
	},
	aromaveil: {
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['attract', 'disable', 'encore', 'healblock', 'taunt', 'torment'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Aroma Veil', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Aroma Veil",
		rating: 2,
		num: 165,
	},
	asoneglastrier: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Unnerve');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source, source, this.dex.abilities.get('chillingneigh'));
			}
		},
		isPermanent: true,
		name: "As One (Glastrier)",
		rating: 3.5,
		num: 266,
	},
	asonespectrier: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Unnerve');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: length}, source, source, this.dex.abilities.get('grimneigh'));
			}
		},
		isPermanent: true,
		name: "As One (Spectrier)",
		rating: 3.5,
		num: 267,
	},
	aurabreak: {
		desc: "While this Pokémon is active on the field, all abilities that boost the power of moves are nullified. These are: Adaptability, Aerilate, Blaze, Dark Aura, Fairy Aura, Flare Boost, Galvanise, Guts, Huge Power, Iron Fist, Mega Launcher, Overgrow, Pixilate, Poison Touch, Power of Alchemy, Pure Power, Reckless, Refrigerate, Sand Force, Sheer Force, Solar Power, Solid Rock, Steelworker, Strong Jaw, Swarm, Technician, Torrent, Tough Claws, Toxic Boost, Water Bubble. Further, for Pokémon with Dark Aura & Fairy Aura: Dark/Fairy-type moves (respectively) become typeless",
		shortDesc: "All abilities on the field that boost the power of moves are nullified.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Aura Break');
		},
		name: "Aura Break",
		rating: 1,
		num: 188,
		cfm: true,
	},
	baddreams: {
		desc: "Causes adjacent opposing Pokemon to lose 1/8 of their maximum HP, rounded down, at the end of each turn if they are asleep. This ability boosts the power of the moves Nightmare and Never-Ending Nightmare by 50%.",
		shortDesc: "Nightmare & Never-Ending Nightmare +50%; damages sleeping foes by 1/8 HP per turn.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp' || target.hasAbility('comatose')) {
					this.damage(target.baseMaxhp / 8, target, pokemon);
				}
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (["Nightmare", "Never-Ending Nightmare"].includes(move.name)) return this.chainModify(1.5);
		},
		name: "Bad Dreams",
		rating: 1.5,
		num: 123,
		cfm: true,
	},
	ballfetch: {
		name: "Ball Fetch",
		rating: 0,
		num: 237,
	},
	battery: {
		shortDesc: "Ally Sp. Atk +30%; boosts higher of SpD/Def when hit by an Electric move.",
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target && move.category === 'Special') {
				this.debug('Battery boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({[target.storedStats.def > target.storedStats.spd ? 'def' : 'spd']: 1})) {
					this.add('-immune', target, '[from] ability: Battery');
				}
				return null;
			}
		},
		name: "Battery",
		rating: 0,
		num: 217,
		cfm: true,
	},
	battlearmor: {
		shortDesc: "Takes 33% less damage from Physical attacks; changes to Weak Armour if crit.",
		onSourceBasePowerPriority: 7,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.category === 'Physical' && !defender.getMoveHitData(move).crit) {
				return this.chainModify(0.67);
			}
		},
		onHit(target, source, move) {
			if (!target.hp) return;
			if (move && move.effectType === 'Move' && move.category === 'Physical' && target.getMoveHitData(move).crit) {
				this.add('-ability', target, 'Battle Armour');
				this.add('-ability', target, 'Weak Armour', '[from] ability: Battle Armor', '[of] ' + target);
				target.setAbility('weakarmor');
				// @ts-ignore
				target.baseAbility = 'weakarmor';
				this.boost({def:-1, spe:2}, target, source, null, true);
			}
		},
		isBreakable: true,
		name: "Battle Armor",
		rating: 1,
		num: 4,
		cfm: true,
	},
	battlebond: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') {
				return;
			}
			if (source.species.id === 'greninja' && source.hp && !source.transformed && source.side.foePokemonLeft()) {
				this.add('-activate', source, 'ability: Battle Bond');
				source.formeChange('Greninja-Ash', this.effect, true);
			}
		},
		onModifyMovePriority: -1,
		onModifyMove(move, attacker) {
			if (move.id === 'watershuriken' && attacker.species.name === 'Greninja-Ash' &&
				!attacker.transformed) {
				move.multihit = 3;
			}
		},
		isPermanent: true,
		name: "Battle Bond",
		rating: 4,
		num: 210,
	},
	beadsofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Beads of Ruin');
		},
		onAnyModifySpD(spd, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (target.hasAbility('Beads of Ruin')) return;
			if (!move.ruinedSpD?.hasAbility('Beads of Ruin')) move.ruinedSpD = abilityHolder;
			if (move.ruinedSpD !== abilityHolder) return;
			this.debug('Beads of Ruin SpD drop');
			return this.chainModify(0.75);
		},
		name: "Beads of Ruin",
		rating: 4.5,
		num: 284,
	},
	beastboost: {
		shortDesc: "Raises highest stat upon knocking out a target that had over 25% max HP.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.totalDamage) {
				if (effect.totalDamage <= 0.25 * target.maxhp) return;
				let statName = 'atk';
				let bestStat = 0;
				let s: StatIDExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: length}, source);
			}
		},
		name: "Beast Boost",
		rating: 3.5,
		num: 224,
		cfm: true,
	},
	berserk: {
		shortDesc: "The higher of Atk/Sp. Atk is raised by 2 upon reaching 1/2 or less of max HP.",
		onAfterMoveSecondary(target, source, move) {
			target.abilityState.checkedBerserk = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({[target.storedStats.atk > target.storedStats.spa ? 'atk' : 'spa']: 2});
			}
		},
		name: "Berserk",
		rating: 2,
		num: 201,
		cfm: true,
	},
	bigpecks: {
		shortDesc: "Prevents Defence drops; boosts the power of Flying-type moves by 50%.",
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.def && boost.def < 0) {
				delete boost.def;
				if (!(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
					this.add("-fail", target, "unboost", "Defense", "[from] ability: Big Pecks", "[of] " + target);
				}
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Flying') {
				return this.chainModify(1.5);
			}
		},
		isBreakable: true,
		name: "Big Pecks",
		rating: 0.5,
		num: 145,
		cfm: true,
	},
	blaze: {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's attacking stat is 1.5x with Fire attacks.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3 && !this.field.auraBreak()) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		name: "Blaze",
		rating: 2,
		num: 66,
	},
	bulletproof: {
		onTryHit(pokemon, target, move) {
			if (move.flags['bullet']) {
				this.add('-immune', pokemon, '[from] ability: Bulletproof');
				return null;
			}
		},
		isBreakable: true,
		name: "Bulletproof",
		rating: 3,
		num: 171,
	},
	cheekpouch: {
		onEatItem(item, pokemon) {
			this.heal(pokemon.baseMaxhp / 3);
		},
		name: "Cheek Pouch",
		rating: 2,
		num: 167,
	},
	chillingneigh: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		name: "Chilling Neigh",
		rating: 3,
		num: 264,
	},
	chlorophyll: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		name: "Chlorophyll",
		rating: 3,
		num: 34,
	},
	clearbody: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
			}
		},
		isBreakable: true,
		name: "Clear Body",
		rating: 2,
		num: 29,
	},
	cloudnine: {
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			// Cloud Nine does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			if (!this.effectState.switchingIn) return;
			this.add('-ability', pokemon, 'Cloud Nine');
			this.effectState.switchingIn = false;
		},
		suppressWeather: true,
		name: "Cloud Nine",
		rating: 2,
		num: 13,
	},
	colorchange: {
		shortDesc: "Kecleon: type changes to match the first two moves in its movepool.",
		name: "Color Change",
		// Actually implemented in statuses.js
		rating: 0,
		num: 16,
		cfm: true,
	},
	comatose: {
		desc: "This Pokemon cannot be statused, and is considered to be asleep. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "This Pokmon is considered asleep and cannot be statuses. Rest restores 50% HP.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Comatose');
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Comatose');
			}
			return false;
		},
		// Permanent sleep "status" implemented in the relevant sleep-checking effects
		isPermanent: true,
		name: "Comatose",
		rating: 4,
		num: 213,
		cfm: true,
	},
	commander: {
		onUpdate(pokemon) {
			const ally = pokemon.allies()[0];
			if (!ally || pokemon.baseSpecies.baseSpecies !== 'Tatsugiri' || ally.baseSpecies.baseSpecies !== 'Dondozo') {
				// Handle any edge cases
				if (pokemon.getVolatile('commanding')) pokemon.removeVolatile('commanding');
				return;
			}

			if (!pokemon.getVolatile('commanding')) {
				// If Dondozo already was commanded this fails
				if (ally.getVolatile('commanded')) return;
				// Cancel all actions this turn for pokemon if applicable
				this.queue.cancelAction(pokemon);
				// Add volatiles to both pokemon
				pokemon.addVolatile('commanding');
				ally.addVolatile('commanded', pokemon);
				// Continued in conditions.ts in the volatiles
			} else {
				if (!ally.fainted) return;
				pokemon.removeVolatile('commanding');
			}
		},
		isPermanent: true,
		name: "Commander",
		rating: 0,
		num: 279,
	},
	competitive: {
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Competitive only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let statsLowered = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.add('-ability', target, 'Competitive');
				this.boost({spa: 2}, target, target, null, true);
			}
		},
		name: "Competitive",
		rating: 2.5,
		num: 172,
	},
	compoundeyes: {
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('compoundeyes - enhancing accuracy');
			return this.chainModify([5325, 4096]);
		},
		name: "Compound Eyes",
		rating: 3,
		num: 14,
	},
	contrary: {
		onTryBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= -1;
			}
		},
		isBreakable: true,
		name: "Contrary",
		rating: 4.5,
		num: 126,
	},
	corrosion: {
		// Implemented in sim/pokemon.js:Pokemon#setStatus
		name: "Corrosion",
		rating: 2.5,
		num: 212,
	},
	costar: {
		onStart(pokemon) {
			const ally = pokemon.allies()[0];
			if (!ally) return;

			let i: BoostID;
			for (i in ally.boosts) {
				pokemon.boosts[i] = ally.boosts[i];
			}
			const volatilesToCopy = ['focusenergy', 'gmaxchistrike', 'laserfocus'];
			for (const volatile of volatilesToCopy) {
				if (ally.volatiles[volatile]) {
					pokemon.addVolatile(volatile);
					if (volatile === 'gmaxchistrike') pokemon.volatiles[volatile].layers = ally.volatiles[volatile].layers;
				} else {
					pokemon.removeVolatile(volatile);
				}
			}
			this.add('-copyboost', pokemon, ally, '[from] ability: Costar');
		},
		name: "Costar",
		rating: 0,
		num: 294,
	},
	cottondown: {
		onDamagingHit(damage, target, source, move) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (pokemon === target || pokemon.fainted) continue;
				if (!activated) {
					this.add('-ability', target, 'Cotton Down');
					activated = true;
				}
				this.boost({spe: -1}, pokemon, target, null, true);
			}
		},
		name: "Cotton Down",
		rating: 2,
		num: 238,
	},
	cudchew: {
		onEatItem(item, pokemon) {
			if (item.isBerry && pokemon.addVolatile('cudchew')) {
				pokemon.volatiles['cudchew'].berry = item;
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['cudchew'];
		},
		condition: {
			noCopy: true,
			duration: 2,
			onRestart() {
				this.effectState.duration = 2;
			},
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onEnd(pokemon) {
				if (pokemon.hp) {
					const item = this.effectState.berry;
					this.add('-activate', pokemon, 'ability: Cud Chew');
					this.add('-enditem', pokemon, item.name, '[eat]');
					if (this.singleEvent('Eat', item, null, pokemon, null, null)) {
						this.runEvent('EatItem', pokemon, null, null, item);
					}
					if (item.onEat) pokemon.ateBerry = true;
				}
			},
		},
		name: "Cud Chew",
		rating: 2,
		num: 291,
	},
	curiousmedicine: {
		shortDesc: "Clears all stat changes on switch-in.",
		onStart(source) {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
		name: "Curious Medicine",
		rating: 0,
		num: 261,
		cfm: true,
	},
	cursedbody: {
		desc: "If this Pokemon is hit by an attack, there is a 30% chance that move gets disabled unless one of the attacker's moves is already disabled. This doubles to a 60% chance if that move knocks out this Pokémon.",
		shortDesc: "If hit by an attack, 30% chance to Disable it (60% if it KOs).",
		onDamagingHit(damage, target, source, move) {
			if (!source || source.volatiles['disable']) return;
			if (!move.isFutureMove) {
				const r = this.random(10);
				if (r < 3 || (r < 6 && target.hp === 0)) {
					source.addVolatile('disable', this.effectState.target);
				}
			}
		},
		name: "Cursed Body",
		rating: 2,
		num: 130,
		cfm: true,
	},
	cutecharm: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.addVolatile('attract', this.effectState.target);
				}
			}
		},
		name: "Cute Charm",
		rating: 0.5,
		num: 56,
	},
	damp: {
		shortDesc: "Immune to burn, Explosion-like moves, Aftermath; resists Fire-type moves.",
		onAnyTryMove(target, source, effect) {
			if (['explosion', 'mindblown', 'mistyexplosion', 'selfdestruct'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: Damp', effect, '[of] ' + target);
				return false;
			}
		},
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.id === 'aftermath') {
				return false;
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Fire' && typeMod > 0)
				return -1;
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status)
				this.add('-immune', target, '[from] ability: Damp');
			return false;
		},
		isBreakable: true,
		name: "Damp",
		rating: 1,
		num: 6,
		cfm: true,
	},
	dancer: {
		name: "Dancer",
		// implemented in runMove in scripts.js
		rating: 1.5,
		num: 216,
	},
	darkaura: {
		desc: "While this Pokemon is active, the power of Dark-type moves used by any active Pokemon is multiplied by 1.33. This Pokémon's Normal-type moves become Dark-type. If Aura Break is active, then the effect of this ability is nullified and this Pokémon's Dark-type moves become typeless.",
		shortDesc: "This Pokemon's Normal moves become Dark; all Dark moves on the field +33%.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Dark Aura');
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noBoost = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (this.field.auraBreak() && move.type === 'Dark')
				move.type = '???';
			else if (move.type === 'Normal' && !noBoost.includes(move.id) && !move.isZ)
				move.type = 'Dark';
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Dark' || this.field.auraBreak()) return;
			if (!move.auraBooster) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify(1.33);
		},
		isBreakable: true,
		name: "Dark Aura",
		ate: "Dark",
		rating: 3.5,
		num: 186,
		cfm: true,
	},
	dauntlessshield: {
		shortDesc: "On switch-in, this Pokemon's higher defensive stat is raised by 1 stage.",
		onStart(pokemon) {
			this.boost({[pokemon.storedStats.spd > pokemon.storedStats.def ? 'spd' : 'def']: 1}, pokemon);
		},
		name: "Dauntless Shield",
		rating: 3.5,
		num: 235,
		cfm: true,
	},
	dazzling: {
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Dazzling', move, '[of] ' + target);
				return false;
			}
		},
		isBreakable: true,
		name: "Dazzling",
		rating: 2.5,
		num: 219,
	},
	defeatist: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(0.5);
			}
		},
		name: "Defeatist",
		rating: -1,
		num: 129,
	},
	defiant: {
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Defiant only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let statsLowered = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.add('-ability', target, 'Defiant');
				this.boost({atk: 2}, target, target, null, true);
			}
		},
		name: "Defiant",
		rating: 2.5,
		num: 128,
	},
	deltastream: {
		desc: "On switch-in, the weather becomes strong winds that remove the Ice, Electric and Rock-type weaknesses of all Flying-type Pokemon on the field. This weather remains in effect until this Ability is no longer active for any Pokemon. While active, the weather cannot be changed.",
		shortDesc: "Sets strong winds; cannot be negated. Flying loses its weaknesses.",
		onStart(source) {
			this.field.setWeather('deltastream');
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'deltastream' && !strongWeathers.includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherState.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('deltastream')) {
					this.field.weatherState.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		name: "Delta Stream",
		rating: 4,
		num: 191,
		cfm: true,
	},
	desolateland: {
		desc: "On switch-in, the weather becomes extremely harsh sunlight that prevents damaging Water-type moves from executing (except for Origin Pulse) and boosts the power of Fire-type attacks by 50%. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Delta Stream or Primordial Sea. If neither this nor Delta Stream is active, there is a 50% chance for the weather to reset at the end of the turn. If this Pokémon is no longer active, the weather turns into regular sunlight.",
		shortDesc: "Harsh sunlight; 50% chance to reset at turn end; turns to sunlight on end.",
		onStart(source) {
			this.field.setWeather('desolateland');
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'desolateland' && !strongWeathers.includes(weather.id)) return false;
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if ((this.field.getWeather().id === 'primordialsea' && this.randomChance(1, 2)) ||
			!['desolateland', 'deltastream'].includes(this.field.getWeather().id)) {
				this.field.setWeather('desolateland');
			}
		},
		onEnd(pokemon) {
			if (this.field.weatherState.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('desolateland')) {
					this.field.weatherState.source = target;
					return;
				}
			}
			this.field.clearWeather();
			this.field.setWeather('sunnyday');
		},
		name: "Desolate Land",
		rating: 4.5,
		num: 190,
		cfm: true,
	},
	disguise: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				['mimikyu', 'mimikyutotem'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Disguise');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) || target.transformed) {
				return;
			}

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['mimikyu', 'mimikyutotem'].includes(pokemon.species.id) && this.effectState.busted) {
				const speciesid = pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(speciesid));
			}
		},
		isBreakable: true,
		isPermanent: true,
		name: "Disguise",
		rating: 3.5,
		num: 209,
	},
	download: {
		onStart(pokemon) {
			let totaldef = 0;
			let totalspd = 0;
			for (const target of pokemon.foes()) {
				totaldef += target.getStat('def', false, true);
				totalspd += target.getStat('spd', false, true);
			}
			if (totaldef && totaldef >= totalspd) {
				this.boost({spa: 1});
			} else if (totalspd) {
				this.boost({atk: 1});
			}
		},
		name: "Download",
		rating: 3.5,
		num: 88,
	},
	dragonsmaw: {
		desc: "While this Pokémon is active, the power of Dragon-type moves used by any active Pokémon is multiplied by 1.33. This Pokémon's Normal-type moves become Dragon-type.",
		shortDesc: "This Pokémon's Normal moves become Dragon; all Dragon moves on the field +33%.",
		onStart(pokemon) {
			this.add('-ability', pokemon, "Dragon's Maw");
			this.add('-message', `${pokemon.name}'s Dragon's Maw boosts the power of Dragon moves!`);
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noBoost = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!this.field.auraBreak() && move.type === 'Normal' && !noBoost.includes(move.id) && !move.isZ)
				move.type = 'Dragon';
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Dragon' || this.field.auraBreak()) return;
			if (!move.auraBooster) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify(1.33);
		},
		name: "Dragon's Maw",
		rating: 3.5,
		num: 263,
		cfm: true,
	},
	drizzle: {
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'kyogre') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('raindance');
		},
		name: "Drizzle",
		rating: 4,
		num: 2,
	},
	drought: {
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'groudon') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('sunnyday');
		},
		name: "Drought",
		rating: 4,
		num: 70,
	},
	dryskin: {
		desc: "This Pokemon is immune to Water-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Water-type move. If this Pokemon is not a Fire-type: the power of Fire-type moves is multiplied by 1.25 when used on this Pokemon; at the end of each turn, this Pokemon restores 1/8 of its maximum HP, rounded down, if the weather is Rain Dance, and loses 1/8 of its maximum HP, rounded down, if the weather is Sunny Day.",
		shortDesc: "Healed 1/4 by Water, hurt 1.25x by Fire; non-Fire: healed 1/8 by Rain, hurt 1/8 by Sun.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Dry Skin');
				}
				return null;
			}
		},
		onFoeBasePowerPriority: 17,
		onFoeBasePower(basePower, attacker, defender, move) {
			if (this.effectState.target !== defender) return;
			if (move.type === 'Fire') {
				return this.chainModify(1.25);
			}
		},
		onWeather(target, source, effect) {
			if (!target.hasType('Fire')){
				if (target.hasItem('utilityumbrella')) return;
				if (effect.id === 'raindance' || effect.id === 'primordialsea') {
					this.heal(target.maxhp / 8);
				} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
					this.damage(target.maxhp / 8, target, target);
				}
			}
		},
		isBreakable: true,
		name: "Dry Skin",
		rating: 3,
		num: 87,
		cfm: true,
	},
	earlybird: {
		shortDesc: "This Pokémon will always wake up on the next turn.",
		name: "Early Bird",
		// Implemented in statuses.js
		rating: 1.5,
		num: 48,
		cfm: true,
	},
	eartheater: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Earth Eater');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Earth Eater",
		rating: 3.5,
		num: 297,
	},
	effectspore: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && !source.status && source.runStatusImmunity('powder')) {
				const r = this.random(100);
				if (r < 11) {
					source.setStatus('slp', target);
				} else if (r < 21) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('psn', target);
				}
			}
		},
		name: "Effect Spore",
		rating: 2,
		num: 27,
	},
	electricsurge: {
		desc: "On switch-in, this Pokemon summons Electric Terrain. While Electric Terrain is active: all Electric-type moves boosted by 25%; Pokemon may be put to sleep, but no Pokemon may use Rest; Ground-types becomes susceptible to Electric-type attacks, but they are resisted.",
		shortDesc: "On switch-in, this Pokemon summons Electric Terrain.",
		cfmDesc: "On switch-in, summons Electric Terrain for 5 turns: all Electric moves boosted by 30%; Ground-types can be hit by Electric attacks for resisted damage; Pokémon can be put to sleep, but cannot use Rest.",
		onStart(source) {
			this.field.setTerrain('electricterrain');
		},
		name: "Electric Surge",
		rating: 4,
		num: 226,
		cfm: true,
	},
	electromorphosis: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			target.addVolatile('charge');
		},
		name: "Electromorphosis",
		rating: 2.5,
		num: 280,
	},
	emergencyexit: {
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Emergency Exit');
		},
		name: "Emergency Exit",
		rating: 1,
		num: 194,
	},
	fairyaura: {
		desc: "While this Pokemon is active, the power of Fairy-type moves used by any active Pokemon is multiplied by 1.33. This Pokémon's Normal-type moves become Fairy-type. If Aura Break is active, then the effect of this ability is nullified and this Pokémon's Fairy-type moves become typeless.",
		shortDesc: "This Pokemon's Normal moves become Fairy; all Fairy moves on the field +33%.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Fairy Aura');
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noBoost = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (this.field.auraBreak() && move.type === 'Fairy')
				move.type = '???';
			else if (move.type === 'Normal' && !noBoost.includes(move.id) && !move.isZ)
				move.type = 'Fairy';
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Fairy' || this.field.auraBreak()) return;
			if (!move.auraBooster) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify(1.33);
		},
		isBreakable: true,
		name: "Fairy Aura",
		ate: "Fairy",
		rating: 3.5,
		num: 187,
		cfm: true,
	},
	filter: {
		shortDesc: "This Pokémon receives 3/4 damage from supereffective attacks, 1/2 damage if 4x super-effective.",
		onSourceModifyDamage(damage, source, target, move) {
			const typeMod = target.getMoveHitData(move).typeMod;
			if (typeMod > 0) {
				this.debug('Filter neutralize');
				return this.chainModify(typeMod === 2 ? 0.5 : 0.75);
			}
		},
		isBreakable: true,
		name: "Filter",
		rating: 3,
		num: 111,
		cfm: true,
	},
	flamebody: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		name: "Flame Body",
		rating: 2,
		num: 49,
	},
	flareboost: {
		desc: "While this Pokemon is burned, the power of its special attacks is multiplied by 1.5.",
		shortDesc: "If this Pokémon is burned: Sp. Attack boosted by 50%; burn damage 1/16th.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.status === 'brn' && move.category === 'Special' && !this.field.auraBreak()) {
				return this.chainModify(1.5);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'brn') {
				return target.maxhp / 16;
			}
		},
		name: "Flare Boost",
		rating: 2,
		num: 138,
		cfm: true,
	},
	flashfire: {
		desc: "This Pokemon is immune to Fire-type moves, and the higher of its Sp. Attack or Attack is raised by 1 when hit by a Fire-type move.",
		shortDesc: "If hit by a Fire-type attack: grants immunity, boosts higher of SpA/Atk.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({[target.storedStats.atk > target.storedStats.spa ? 'atk' : 'spa']: 1})) {
					this.add('-immune', target, '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Flash Fire",
		rating: 3.5,
		num: 18,
		cfm: true,
	},
	flowergift: {
		desc: "Cherrim transforms into Cherrim-Sunshine in the Sun. If Sunny Day is in Cherrim's first slot, Sun will automatically be summoned on switch-in. Sun summoned in this way, or by Cherrim manually using Sunny Day, will last until Cherrim faints, switches out, or another Pokemon changes the weather. This ability cannot be removed, copied or transferred.",
		shortDesc: "Cherrim: auto-summons Sunny Day if in slot 1; transforms into Cherrim-Sunshine.",
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Cherrim') return;
			const move = this.dex.moves.get(pokemon.moveSlots[0].move);
			if (this.field.isWeather(['desolateland', 'primordialsea', 'deltastream', 'sunnyday'])) return;
			if (move.id === 'sunnyday') this.field.setWeather('sunnyday');
		},
		onUpdate(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (!pokemon.hp) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
			}
		},
		onEnd(pokemon) {
			if (this.field.weatherState.source !== pokemon ||
				!this.field.isWeather(this.dex.moves.get(pokemon.moveSlots[0].move).id)) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				const move = this.dex.moves.get(target.moveSlots[0].move);
				if (target?.hp && move.id === 'sunnyday' &&
					((target.hasAbility('flowergift') && target.species.baseSpecies === 'Cherrim') ||
					(target.hasAbility('forecast') && target.species.baseSpecies === 'Castform'))) {
					this.field.weatherState.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		isPermanent: true,
		name: "Flower Gift",
		rating: 1,
		num: 122,
		cfm: true,
	},
	flowerveil: {
		shortDesc: "Grass-type allies are immune to status and stat drops under Grassy Terrain.",
		onAllyTryBoost(boost, target, source, effect) {
			if ((source && target === source) || !target.hasType('Grass') || !this.field.isTerrain('grassyterrain')) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Flower Veil', '[of] ' + effectHolder);
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (target.hasType('Grass') && source && target !== source && effect && effect.id !== 'yawn' &&
			this.field.isTerrain('grassyterrain')) {
				this.debug('interrupting setStatus with Flower Veil');
				if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Flower Veil', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (target.hasType('Grass') && status.id === 'yawn' && this.field.isTerrain('grassyterrain')) {
				this.debug('Flower Veil blocking yawn');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Flower Veil', '[of] ' + effectHolder);
				return null;
			}
		},
		isBreakable: true,
		name: "Flower Veil",
		rating: 0,
		num: 166,
		cfm: true,
	},
	fluffy: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Fire') mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		isBreakable: true,
		name: "Fluffy",
		rating: 3.5,
		num: 218,
	},
	forecast: {
		desc: "Castform transforms depending on the weather. If Rain Dance, Sunny Day or Hail is in Castform's first slot, that corresponding weather will automatically be summoned on switch-in. Any weather summoned in this way, or by Castform manually using Rain Dance, Sunny Dail or Hail, will last until Castform faints, switches out, or another Pokemon changes the weather. This ability cannot be removed, copied or transferred.",
		shortDesc: "Castform changes the weather with move in slot 1 and transforms.",
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Castform') return;
			const move = this.dex.moves.get(pokemon.moveSlots[0].move);
			if (this.field.isWeather(['desolateland', 'primordialsea', 'deltastream', move.id])) return;
			if (['hail', 'snowscape', 'raindance', 'sunnyday'].includes(move.id)) this.field.setWeather(move.weather!);
		},
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Castform' || pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'castformsunny') forme = 'Castform-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'castformrainy') forme = 'Castform-Rainy';
				break;
			case 'hail':
			case 'snow':
				if (pokemon.species.id !== 'castformsnowy') forme = 'Castform-Snowy';
				break;
			default:
				if (pokemon.species.id !== 'castform') forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
			}
		},
		onEnd(pokemon) {
			if (this.field.weatherState.source !== pokemon ||
				!this.field.isWeather(this.dex.moves.get(pokemon.moveSlots[0].move).id)) return;
			for (const side of this.sides) {
				for (const target of side.active) {
					if (target === pokemon) continue;
					const moveSource = this.dex.moves.get(pokemon.moveSlots[0].move);
					const moveTarget = this.dex.moves.get(target.moveSlots[0].move);
					if (target?.hp && moveSource.id === moveTarget.id &&
						((target.hasAbility('flowergift') && target.species.baseSpecies === 'Cherrim') ||
						(target.hasAbility('forecast') && target.species.baseSpecies === 'Castform'))) {
						this.field.weatherState.source = target;
						return;
					}
				}
			}
			this.field.clearWeather();
		},
		isPermanent: true,
		name: "Forecast",
		rating: 2,
		num: 59,
		cfm: true,
	},
	forewarn: {
		onStart(pokemon) {
			let warnMoves: (Move | Pokemon)[][] = [];
			let warnBp = 1;
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					let bp = move.basePower;
					if (move.ohko) bp = 150;
					if (move.id === 'counter' || move.id === 'metalburst' || move.id === 'mirrorcoat') bp = 120;
					if (bp === 1) bp = 80;
					if (!bp && move.category !== 'Status') bp = 80;
					if (bp > warnBp) {
						warnMoves = [[move, target]];
						warnBp = bp;
					} else if (bp === warnBp) {
						warnMoves.push([move, target]);
					}
				}
			}
			if (!warnMoves.length) return;
			const [warnMoveName, warnTarget] = this.sample(warnMoves);
			this.add('-activate', pokemon, 'ability: Forewarn', warnMoveName, '[of] ' + warnTarget);
		},
		name: "Forewarn",
		rating: 0.5,
		num: 108,
	},
	friendguard: {
		name: "Friend Guard",
		onAnyModifyDamage(damage, source, target, move) {
			if (target !== this.effectState.target && target.isAlly(this.effectState.target)) {
				this.debug('Friend Guard weaken');
				return this.chainModify(0.75);
			}
		},
		isBreakable: true,
		rating: 0,
		num: 132,
	},
	frisk: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Frisk', '[of] ' + pokemon, '[identify]');
				}
			}
		},
		name: "Frisk",
		rating: 1.5,
		num: 119,
	},
	fullmetalbody: {
		shortDesc: "Solgaleo: gains Steel-typing, immune to all stat drops.",
		onTryBoost(boost, target, source, effect) {
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Full Metal Body", "[of] " + target);
			}
		},
		isPermanent: true,
		name: "Full Metal Body",
		rating: 2,
		num: 230,
		cfm: true,
	},
	furcoat: {
		onModifyDefPriority: 6,
		onModifyDef(def) {
			return this.chainModify(2);
		},
		isBreakable: true,
		name: "Fur Coat",
		rating: 4,
		num: 169,
	},
	galewings: {
		shortDesc: "If this Pokémon is at over 50% HP, its Flying-type moves have their priority increased by 1.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Flying' && pokemon.hp > pokemon.maxhp / 2) return priority + 1;
		},
		name: "Gale Wings",
		rating: 3,
		num: 177,
		cfm: true,
	},
	galvanize: {
		shortDesc: "Normal-type moves become Electric; all Electric-type moves boosted by 20%.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.category === 'Status' || this.field.auraBreak()) return;
			const noBoost = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if ((move.type === 'Normal' || move.type === 'Electric') && !noBoost.includes(move.id) && !move.isZ) {
				move.type = 'Electric';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		name: "Galvanize",
		ate: "Electric",
		rating: 4,
		num: 206,
		cfm: true,
	},
	gluttony: {
		name: "Gluttony",
		rating: 1.5,
		num: 82,
	},
	goodasgold: {
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Good as Gold');
				return null;
			}
		},
		isBreakable: true,
		name: "Good as Gold",
		rating: 5,
		num: 283,
	},
	gooey: {
		shortDesc: "Contact moves: 50% chance to reduce the target's Speed by one stage.",
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 50,
				volatileStatus: 'gooey',
			});
		},
		name: "Gooey",
		rating: 2,
		num: 183,
		cfm: true,
	},
	gorillatactics: {
		onStart(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityState.choiceLock && pokemon.abilityState.choiceLock !== move.id) {
				// Fails unless ability is being ignored (these events will not run), no PP lost.
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Gorilla Tactics");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityState.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityState.choiceLock = move.id;
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			// PLACEHOLDER
			this.debug('Gorilla Tactics Atk Boost');
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityState.choiceLock) return;
			if (pokemon.volatiles['dynamax']) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityState.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
		onEnd(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		name: "Gorilla Tactics",
		rating: 4.5,
		num: 255,
	},
	grasspelt: {
		shortDesc: "In Grassy Terrain, this Pokémon's Atk and Def are multiplied by 1.5.",
		onModifyAtkPriority: 1,
		onModifyAtk(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(1.5);
		},
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(1.5);
		},
		isBreakable: true,
		name: "Grass Pelt",
		rating: 0.5,
		num: 179,
		cfm: true,
	},
	grassysurge: {
		desc: "On switch-in, this Pokemon summons Grassy Terrain. While Grassy Terrain is active: all Grass-type moves boosted by 25%; all grounded Pokemon recover 1/16th HP per turn; grounded Grass-types, or Pokemon with Grassy Surge, recover 1/8th HP per turn; Grass-types cannot be poisoned (does not cure any existing status).",
		shortDesc: "On switch-in, this Pokemon summons Grassy Terrain.",
		cfmDesc: "On switch-in, summons Grassy Terrain for 5 turns: all Grass moves boosted by 30%; all grounded Pokémon recover 1/16 HP per turn; grounded Grass-types and Pokémon with Grassy Surge recover an additional 1/16 and cannot be poisoned.",
		onStart(source) {
			this.field.setTerrain('grassyterrain');
		},
		name: "Grassy Surge",
		rating: 4,
		num: 229,
		cfm: true,
	},
	grimneigh: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: length}, source);
			}
		},
		name: "Grim Neigh",
		rating: 3,
		num: 265,
	},
	guarddog: {
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Guard Dog');
			return null;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.boost({atk: 1}, target, target, null, false, true);
			}
		},
		name: "Guard Dog",
		rating: 2,
		num: 275,
	},
	gulpmissile: {
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			if (['cramorantgulping', 'cramorantgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'cramorantgulping') {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				target.formeChange('cramorant', move);
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
			if (
				effect && effect.id === 'surf' && source.hasAbility('gulpmissile') &&
				source.species.name === 'Cramorant' && !source.transformed
			) {
				const forme = source.hp <= source.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				source.formeChange(forme, effect);
			}
		},
		isPermanent: true,
		name: "Gulp Missile",
		rating: 2.5,
		num: 241,
	},
	guts: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status && !this.field.auraBreak()) {
				return this.chainModify(1.5);
			}
		},
		name: "Guts",
		rating: 3,
		num: 62,
	},
	hadronengine: {
		onStart(pokemon) {
			if (!this.field.setTerrain('electricterrain') && this.field.isTerrain('electricterrain')) {
				this.add('-activate', pokemon, 'ability: Hadron Engine');
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (this.field.isTerrain('electricterrain')) {
				this.debug('Hadron Engine boost');
				return this.chainModify([5461, 4096]);
			}
		},
		name: "Hadron Engine",
		rating: 4.5,
		num: 289,
	},
	harvest: {
		name: "Harvest",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.items.get(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Harvest');
				}
			}
		},
		rating: 2.5,
		num: 139,
	},
	healer: {
		name: "Healer",
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				if (allyActive.status && this.randomChance(3, 10)) {
					this.add('-activate', pokemon, 'ability: Healer');
					allyActive.cureStatus();
				}
			}
		},
		rating: 0,
		num: 131,
	},
	heatproof: {
		shortDesc: "The power of Fire-type attacks against this Pokémon is halved; prevents burns.",
		onSourceBasePowerPriority: 7,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Heatproof');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status)
				this.add('-immune', target, '[from] ability: Heatproof');
			return false;
		},
		isBreakable: true,
		name: "Heatproof",
		rating: 2,
		num: 85,
		cfm: true,
	},
	heavymetal: {
		onModifyWeightPriority: 1,
		onModifyWeight(weighthg) {
			return weighthg * 2;
		},
		isBreakable: true,
		name: "Heavy Metal",
		rating: 0,
		num: 134,
	},
	honeygather: {
		shortDesc: "At the end of each turn, restore 1/16th of this Pokémon's health.",
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			this.heal(pokemon.maxhp / 16);
		},
		name: "Honey Gather",
		rating: 0,
		num: 118,
		cfm: true,
	},
	hugepower: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			if (!this.field.auraBreak()) return this.chainModify(2);
		},
		name: "Huge Power",
		rating: 5,
		num: 37,
	},
	hungerswitch: {
		onResidual(pokemon) {
			if (pokemon.species.baseSpecies !== 'Morpeko' || pokemon.transformed) return;
			const targetForme = pokemon.species.name === 'Morpeko' ? 'Morpeko-Hangry' : 'Morpeko';
			pokemon.formeChange(targetForme);
		},
		name: "Hunger Switch",
		rating: 1,
		num: 258,
	},
	hustle: {
		// This should be applied directly to the stat as opposed to chaining with the others
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.modify(atk, 1.5);
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Physical' && typeof accuracy === 'number') {
				return this.chainModify([3277, 4096]);
			}
		},
		name: "Hustle",
		rating: 3.5,
		num: 55,
	},
	hydration: {
		shortDesc: "Cures status in Rain or when hit by a Water-type attack.",
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.status && ['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Hydration');
				pokemon.cureStatus();
			}
		},
		onDamagingHit(damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.type === 'Water') {
				this.debug('hydration');
				this.add('-activate', target, 'ability: Hydration');
				target.cureStatus();
			}
		},
		name: "Hydration",
		rating: 1.5,
		num: 93,
		cfm: true,
	},
	hypercutter: {
		desc: "This Pokemon's Attack cannot be lowered by either itself, an opponent, or an ally. This Pokemon's contact moves gain a 20% chance to raise the user's Attack by one stage.",
		shortDesc: "No Attack drops; contact moves: 20% chance to boost Attack.",
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Hyper Cutter", "[of] " + target);
				}
			}
		},
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 20,
				self: {
					volatileStatus: 'hypercutter',
				},
			});
		},
		isBreakable: true,
		name: "Hyper Cutter",
		rating: 1.5,
		num: 52,
		cfm: true,
	},
	icebody: {
		desc: "If Hail is active, this Pokemon restores 1/6 of its maximum HP, rounded down, at the end of each turn. This Pokemon takes no damage from Hail. There is a 10% chance that any Pokemon attacking this Pokemon with a contact move will be frozen.",
		shortDesc: "Restores 1/6 HP per turn in Hail; 10% chance to freeze contact attackers.",
		onWeather(target, source, effect) {
			if (effect.id === 'hail' || effect.id === 'snow') {
				this.heal(target.baseMaxhp / 6);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onDamagingHit(damage, target, source, move) {
			if (move?.flags['contact'] && this.randomChance(1, 10)) {
				source.trySetStatus('frz', target);
			}
		},
		name: "Ice Body",
		rating: 1,
		num: 115,
		cfm: true,
	},
	iceface: {
		onStart(pokemon) {
			if (this.field.isWeather(['hail', 'snow']) && pokemon.species.id === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectState.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' && effect.category === 'Physical' &&
				target.species.id === 'eiscue' && !target.transformed
			) {
				this.add('-activate', target, 'ability: Ice Face');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'eiscue' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['bypasssub'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'eiscue' || target.transformed) return;

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'eiscue' && this.effectState.busted) {
				pokemon.formeChange('Eiscue-Noice', this.effect, true);
			}
		},
		onWeatherChange(pokemon, source, sourceEffect) {
			// snow/hail resuming because Cloud Nine/Air Lock ended does not trigger Ice Face
			if ((sourceEffect as Ability)?.suppressWeather) return;
			if (!pokemon.hp) return;
			if (this.field.isWeather(['hail', 'snow']) &&
				pokemon.species.id === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectState.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		isBreakable: true,
		isPermanent: true,
		name: "Ice Face",
		rating: 3,
		num: 248,
	},
	icescales: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special') {
				return this.chainModify(0.5);
			}
		},
		isBreakable: true,
		name: "Ice Scales",
		rating: 4,
		num: 246,
	},
	illuminate: {
		shortDesc: "Reduces the accuracy of incoming super-effective attacks by 33%.",
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category !== 'Status' && this.dex.getEffectiveness(move.type, target) > 0 &&
				typeof accuracy === 'number') {
				this.debug('Illuminate - decreasing accuracy');
				return accuracy * 0.67;
			}
		},
		name: "Illuminate",
		rating: 0,
		num: 35,
		cfm: true,
	},
	illusion: {
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			// yes, you can Illusion an active pokemon but only if it's to your right
			for (let i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				const possibleTarget = pokemon.side.pokemon[i];
				if (!possibleTarget.fainted) {
					pokemon.illusion = possibleTarget;
					break;
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.illusion) {
				this.singleEvent('End', this.dex.abilities.get('Illusion'), target.abilityState, target, source, move);
			}
		},
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				pokemon.illusion = null;
				const details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Illusion');
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
		},
		name: "Illusion",
		rating: 4.5,
		num: 149,
	},
	immunity: {
		shortDesc: "Cannot be poisoned; any attempt to poison this Pokémon raises Atk/SpA.",
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				this.add('-activate', pokemon, 'ability: Immunity');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!effect || status.id !== 'psn' && status.id !== 'tox') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Immunity');
			}
			this.boost({[target.storedStats.spa > target.storedStats.atk ? 'spa' : 'atk']:1}, target);
			return false;
		},
		isBreakable: true,
		name: "Immunity",
		rating: 2,
		num: 17,
	},
	imposter: {
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			// Imposter does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			if (!this.effectState.switchingIn) return;
			// copies across in multibattle and diagonally in free-for-all
			// fortunately, side.foe already takes care of all that
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				pokemon.transformInto(target, this.dex.abilities.get('imposter'));
			}
			this.effectState.switchingIn = false;
		},
		name: "Imposter",
		rating: 5,
		num: 150,
	},
	infiltrator: {
		onModifyMove(move) {
			move.infiltrates = true;
		},
		name: "Infiltrator",
		rating: 2.5,
		num: 151,
	},
	innardsout: {
		name: "Innards Out",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.damage(target.getUndynamaxedHP(damage), source, target);
			}
		},
		rating: 4,
		num: 215,
	},
	innerfocus: {
		shortDesc: "Boosts the power of Psychic moves by 50%; prevents flinching and Intimidate.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Psychic') {
				this.debug('Inner Focus boost');
				return this.chainModify(1.5);
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Focus', '[of] ' + target);
			}
		},
		isBreakable: true,
		name: "Inner Focus",
		rating: 1.5,
		num: 39,
		cfm: true,
	},
	insomnia: {
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Insomnia');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Insomnia');
			}
			return false;
		},
		isBreakable: true,
		name: "Insomnia",
		rating: 2,
		num: 15,
	},
	intimidate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Intimidate",
		rating: 3.5,
		num: 22,
	},
	intrepidsword: {
		shortDesc: "On switch-in, this Pokemon's higher offensive stat is raised by 1 stage.",
		onStart(pokemon) {
			this.boost({[pokemon.storedStats.spa > pokemon.storedStats.atk ? 'spa' : 'atk']: 1}, pokemon);
		},
		name: "Intrepid Sword",
		rating: 4,
		num: 234,
		cfm: true,
	},
	ironbarbs: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Iron Barbs",
		rating: 2.5,
		num: 160,
	},
	ironfist: {
		desc: `This Pokemon's punch-based attacks have their power boosted by 30%. "Punch-based" attacks include Poison Jab, but not Sucker Punch.`,
		shortDesc: "Boosts the power of punch moves by 30%; does not include Sucker Punch.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch'] && !this.field.auraBreak()) {
				this.debug('Iron Fist boost');
				return this.chainModify(1.3);
			}
		},
		name: "Iron Fist",
		rating: 3,
		num: 89,
		cfm: true,
	},
	justified: {
		desc: "This Pokemon takes 50% less damage from Dark-type moves, and the higher of its Attack or Sp. Attack is raised by 1 when hit by a Dark-type move.",
		shortDesc: "If hit by a Dark move; reduces damage taken by 50%, boosts higher offensive stat.",
		onSourceBasePowerPriority: 7,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Dark') {
				return this.chainModify(0.5);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark') {
				this.boost({[target.storedStats.spa > target.storedStats.atk ? 'spa' : 'atk']: 1});
			}
		},
		name: "Justified",
		rating: 2.5,
		num: 154,
		cfm: true,
	},
	keeneye: {
		shortDesc: "This Pokémon's Accuracy is boosted by 20%. Accuracy cannot be lowered.",
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('Keen Eye - enhancing accuracy');
			return accuracy * 1.2;
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Keen Eye", "[of] " + target);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		isBreakable: true,
		name: "Keen Eye",
		rating: 0.5,
		num: 51,
		cfm: true,
	},
	klutz: {
		// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
		name: "Klutz",
		rating: -1,
		num: 103,
	},
	leafguard: {
		shortDesc: "In Sun: cures status at the end of the turn; reduces damage from Fire-type attacks by 75%.",
		onSourceBasePowerPriority: 7,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fire' && this.field.isWeather(['sunnyday', 'desolateland'])) {
				this.add('-ability', defender, '[from] ability: Leaf Guard');
				this.add('-message', defender.name + "'s Leaf Guard weakened the attack!");
				return this.chainModify(0.25);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.status && this.field.isWeather(['sunnyday', 'desolateland'])) {
				this.debug('leafguard');
				this.add('-activate', pokemon, 'ability: Leaf Guard');
				pokemon.cureStatus();
			}
		},
		isBreakable: true,
		name: "Leaf Guard",
		rating: 0.5,
		num: 102,
		cfm: true,
	},
	levitate: {
		// airborneness implemented in sim/pokemon.js:Pokemon#isGrounded
		name: "Levitate",
		rating: 3.5,
		num: 26,
	},
	libero: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Libero');
			}
		},
		name: "Libero",
		rating: 4.5,
		num: 236,
	},
	lightmetal: {
		onModifyWeight(weighthg) {
			return this.trunc(weighthg / 2);
		},
		isBreakable: true,
		name: "Light Metal",
		rating: 1,
		num: 135,
	},
	lightningrod: {
		desc: "This Pokemon is immune to Electric-type moves, and the higher of its Sp. Attack or Attack is raised by 1 when hit by a Electric-type move.",
		shortDesc: "Draws in Electric moves; grants immunity, boosts higher of SpA/Atk when hit.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({[target.storedStats.atk > target.storedStats.spa ? 'atk' : 'spa']: 1})) {
					this.add('-immune', target, '[from] ability: Lightning Rod');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Electric' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Lightning Rod');
				}
				return this.effectState.target;
			}
		},
		isBreakable: true,
		name: "Lightning Rod",
		rating: 3,
		num: 31,
		cfm: true,
	},
	limber: {
		shortDesc: "This Pokémon's speed cannot be reduced and it cannot be paralysed'.",
		onTryBoost(boost, target, source, effect) {
			if (boost.spe && boost.spe < 0) {
				delete boost.spe;
				if (source && target === source) return;
				if (!(effect as Move)?.secondaries) {
					this.add("-fail", target, "unboost", "Speed", "[from] ability: Limber", "[of] " + target);
				}
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'par') {
				this.add('-activate', pokemon, 'ability: Limber');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'par') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Limber');
			}
			return false;
		},
		isBreakable: true,
		name: "Limber",
		rating: 2,
		num: 7,
		cfm: true,
	},
	lingeringaroma: {
		onDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.isPermanent || sourceAbility.id === 'lingeringaroma') {
				return;
			}
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				const oldAbility = source.setAbility('lingeringaroma', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Lingering Aroma', this.dex.abilities.get(oldAbility).name, '[of] ' + source);
				}
			}
		},
		name: "Lingering Aroma",
		rating: 2,
		num: 268,
	},
	liquidooze: {
		onSourceTryHeal(damage, target, source, effect) {
			this.debug("Heal is occurring: " + target + " <- " + source + " :: " + effect.id);
			const canOoze = ['drain', 'leechseed', 'strengthsap', 'snaptrap'];
			if (canOoze.includes(effect.id)) {
				this.damage(damage);
				return 0;
			}
		},
		name: "Liquid Ooze",
		rating: 1.5,
		num: 64,
	},
	liquidvoice: {
		shortDesc: "Sound moves become Water-type; all sound-based moves boosted by 20%",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound']) {
				move.type = 'Water';
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				return this.chainModify(1.2);
			}
		},
		name: "Liquid Voice",
		rating: 1.5,
		num: 204,
		cfm: true,
	},
	longreach: {
		onModifyMove(move) {
			delete move.flags['contact'];
		},
		name: "Long Reach",
		rating: 1,
		num: 203,
	},
	magicbounce: {
		name: "Magic Bounce",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.isAlly(source) || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, this.effectState.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		isBreakable: true,
		rating: 4,
		num: 156,
	},
	magicguard: {
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		name: "Magic Guard",
		rating: 4,
		num: 98,
	},
	magician: {
		desc: "If this Pokemon has no item, it is immune to Knock Off, Trick, Switcheroo, Thief, Covet, Bestow. If this Pokemon has no item, it will attempt to steal its target's item with every attack.",
		shortDesc: "If itemless: steals the target's item; else: avoids Knock Off, Trick etc.",
		onTryHit(target, source, move) {
			if (move.target !== 'self' && move.flags['magician']) {
				this.add('-immune', target, '[from] ability: Magician');
				return null;
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status') {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-item', source, yourItem, '[from] ability: Magician', '[of] ' + target);
			}
		},
		name: "Magician",
		rating: 1.5,
		num: 170,
		cfm: true,
	},
	magmaarmor: {
		shortDesc: "This Pokemon takes 1/2 damage from contact moves, 2x damage from Water moves.",
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Water') mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		isBreakable: true,
		name: "Magma Armor",
		rating: 1,
		num: 40,
		cfm: true,
	},
	magnetpull: {
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Steel') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType || pokemon.hasType('Steel')) {
				pokemon.maybeTrapped = true;
			}
		},
		name: "Magnet Pull",
		rating: 4,
		num: 42,
	},
	marvelscale: {
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		isBreakable: true,
		name: "Marvel Scale",
		rating: 2.5,
		num: 63,
	},
	megalauncher: {
		desc: "This Pokemon's special pulse (inc. Aura Sphere) and cannon moves have their power multiplied by 1.5. Heal Pulse restores 3/4 of a target's maximum HP, rounded half down.",
		shortDesc: "Boosts special pulse (inc. Aura Sphere) and cannon moves by 50%. Heal Pulse heals by 75%.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['pulse'] && !this.field.auraBreak()) {
				return this.chainModify(1.5);
			}
		},
		name: "Mega Launcher",
		rating: 3,
		num: 178,
		cfm: true,
	},
	merciless: {
		shortDesc: "This Pokémon's attacks are critical hits if the target has any status condition.",
		onModifyCritRatio(critRatio, source, target) {
			if (target?.status)
				return 5;
		},
		name: "Merciless",
		rating: 1.5,
		num: 196,
		cfm: true,
	},
	mimicry: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			let types;
			switch (this.field.terrain) {
			case 'electricterrain':
				types = ['Electric'];
				break;
			case 'grassyterrain':
				types = ['Grass'];
				break;
			case 'mistyterrain':
				types = ['Fairy'];
				break;
			case 'psychicterrain':
				types = ['Psychic'];
				break;
			default:
				types = pokemon.baseSpecies.types;
			}
			const oldTypes = pokemon.getTypes();
			if (oldTypes.join() === types.join() || !pokemon.setType(types)) return;
			if (this.field.terrain || pokemon.transformed) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				if (!this.field.terrain) this.hint("Transform Mimicry changes you to your original un-transformed types.");
			} else {
				this.add('-activate', pokemon, 'ability: Mimicry');
				this.add('-end', pokemon, 'typechange', '[silent]');
			}
		},
		name: "Mimicry",
		rating: 0,
		num: 250,
	},
	minus: {
		desc: "Every time this Pokemon uses an Electric-type move, it has a 33% chance to raise the higher of its Sp. Attack and Attack by one stage; this becomes a 66% chance if it has an ally with Plus.",
		shortDesc: "Electric moves: 33% chance to boost Sp. Atk/Atk; 66% if partner has Plus.",
		onSourceHit(target, source, move) {
			if (!move || !target || move.type !== 'Electric') return;
			let chance = 1;
			if (source.side.active.length > 1){
				for (const allyActive of source.side.active) {
					if (allyActive && allyActive.position !== source.position && !allyActive.fainted && allyActive.hasAbility(['plus'])) {
						chance = 2;
					}
				}
			}
			if (this.randomChance(chance, 3))
				this.boost({[source.storedStats.atk > source.storedStats.spa ? 'atk' : 'spa']:1}, source);
		},
		name: "Minus",
		rating: 0,
		num: 58,
		cfm: true,
	},
	mirrorarmor: {
		onTryBoost(boost, target, source, effect) {
			// Don't bounce self stat changes, or boosts that have already bounced
			if (target === source || !boost || effect.id === 'mirrorarmor') return;
			let b: BoostID;
			for (b in boost) {
				if (boost[b]! < 0) {
					if (target.boosts[b] === -6) continue;
					const negativeBoost: SparseBoostsTable = {};
					negativeBoost[b] = boost[b];
					delete boost[b];
					this.add('-ability', target, 'Mirror Armor');
					this.boost(negativeBoost, source, target, null, true);
				}
			}
		},
		isBreakable: true,
		name: "Mirror Armor",
		rating: 2,
		num: 240,
	},
	mistysurge: {
		desc: "On switch-in, this Pokemon summons Misty Terrain. While Misty Terrain is active: all Fairy-type moves boosted by 25%; grounded Pokemon, or Pokemon with Misty Surge, are protected from status conditions (does not cure existing conditions).",
		shortDesc: "On switch-in, this Pokemon summons Misty Terrain.",
		cfmDesc: "On switch-in, summons Misty Terrain for 5 turns: all Fairy moves boosted by 30%; all grounded Pokémon or Pokémon with Misty Surge are protected from status effects.",
		onStart(source) {
			this.field.setTerrain('mistyterrain');
		},
		name: "Misty Surge",
		rating: 3.5,
		num: 228,
		cfm: true,
	},
	moldbreaker: {
		shortDesc: "This Pokémon's moves ignore hindering weather, terrain and target Abilities.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
			move.ignoreWeather = true;
		},
		name: "Mold Breaker",
		rating: 3.5,
		num: 104,
	},
	moody: {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			let stats: BoostID[] = [];
			const boost: SparseBoostsTable = {};
			let statPlus: BoostID;
			for (statPlus in pokemon.boosts) {
				if (statPlus === 'accuracy' || statPlus === 'evasion') continue;
				if (pokemon.boosts[statPlus] < 6) {
					stats.push(statPlus);
				}
			}
			let randomStat: BoostID | undefined = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = 2;

			stats = [];
			let statMinus: BoostID;
			for (statMinus in pokemon.boosts) {
				if (statMinus === 'accuracy' || statMinus === 'evasion') continue;
				if (pokemon.boosts[statMinus] > -6 && statMinus !== randomStat) {
					stats.push(statMinus);
				}
			}
			randomStat = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = -1;

			this.boost(boost);
		},
		name: "Moody",
		rating: 5,
		num: 141,
	},
	motordrive: {
		shortDesc: "If hit by an Electric move; grants immunity, raises Speed, sets Charge modifier.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Motor Drive');
				}
				target.addVolatile('charge');
				this.add('-activate', target, 'move: Charge');
				return null;
			}
		},
		isBreakable: true,
		name: "Motor Drive",
		rating: 3,
		num: 78,
		cfm: true,
	},
	moxie: {
		desc: "If this Pokemon attacks and knocks out a target that had 25% max HP or more remaining, raises the higher of Attack and Sp. Attack by one stage, else gives no boosts at all.",
		shortDesc: "Raise Atk/SpA upon attacking and knocking out a target that had over 25% max HP.",
		onSourceFaint(target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.totalDamage) {
				if (effect.totalDamage <= 0.25 * target.maxhp) return;
				this.boost({[source.storedStats.spa > source.storedStats.atk ? 'spa' : 'atk']: 1}, source);
			}
		},
		name: "Moxie",
		rating: 3,
		num: 153,
		cfm: true,
	},
	multiscale: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hp >= target.maxhp) {
				this.debug('Multiscale weaken');
				return this.chainModify(0.5);
			}
		},
		isBreakable: true,
		name: "Multiscale",
		rating: 3.5,
		num: 136,
	},
	multitype: {
		desc: "Arceus changes to the forme corresponding to its held Plate or Z-Crystal. Its ability changes from Multitype to an ability depending on its type: Bug - Tinted Lens; Dark - Intimidate; Dragon - Multiscale; Electric - Lightning Rod; Fairy - Wonder Skin; Fighting - Scrappy; Fire - Mold Breaker; Flying - Keen Eye; Ghost - Cursed Body; Grass - Regenerator; Ground - Sand Stream; Ice - Snow Warning; Poison - Poison Point; Psychic - Inner Focus; Rock:	Solid Rock; Steel - Bulletproof; Water - Water Absorb",
		shortDesc: "Arceus: type changes to match Plate or Z-Crystal; changes Ability.",
		cfmDesc: `Arceus's type changes to match its Plate or Z-Crystal. Ability also changes to:
Bug: Tinted Lens
Dark: Intimidate
Dragon: Multiscale
Electric: Lightning Rod
Fairy: Wonder Skin
Fire: Mold Breaker
Fighting: Scrappy
Flying: Keen Eye
Ghost: Cursed Body
Grass: Regenerator
Ground: Sand Stream
Ice: Snow Warning
Poison: Posion Point
Psychic: Inner Focus
Rock: Solid Rock
Steel: Bulletproof
Water: Water Absorb`,
		// Multitype's type-changing itself is implemented in statuses.js
		onUpdate(pokemon) {
			const type = pokemon.getItem().onPlate;
			if (!type || pokemon.baseSpecies.baseSpecies !== 'Arceus') return;
			const multiTypes: {[k: string]: string} = {'Bug': 'tintedlens', 'Dark': 'intimidate', 'Dragon': 'multiscale',
				'Electric': 'lightningrod', 'Fairy': 'wonderskin', 'Fire': 'moldbreaker', 'Fighting': 'scrappy',
				'Flying': 'keeneye', 'Ghost': 'cursedbody', 'Grass': 'regenerator', 'Ground': 'sandstream',
				'Ice': 'snowwarning', 'Poison': 'poisonpoint', 'Psychic': 'innerfocus', 'Rock': 'solidrock',
				'Steel': 'bulletproof', 'Water': 'waterabsorb'};

			const multiAbility = multiTypes[type];
			this.add('-activate', pokemon, 'ability: Multitype');
			pokemon.ability = pokemon.baseAbility = this.toID(multiAbility);
			this.add('-message', pokemon.name + "'s Ability changed to " + pokemon.getAbility().name + " to suit its type!");
			return;
		},
		isPermanent: true,
		name: "Multitype",
		rating: 4,
		num: 121,
		cfm: true,
	},
	mummy: {
		name: "Mummy",
		onDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.isPermanent || sourceAbility.id === 'mummy') {
				return;
			}
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				const oldAbility = source.setAbility('mummy', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Mummy', this.dex.abilities.get(oldAbility).name, '[of] ' + source);
				}
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) return this.chainModify(0.25);
		},
		rating: 2,
		num: 152,
	},
	myceliummight: {
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category === 'Status') {
				return -0.1;
			}
		},
		onModifyMove(move) {
			if (move.category === 'Status') {
				move.ignoreAbility = true;
			}
		},
		name: "Mycelium Might",
		rating: 2,
		num: 298,
	},
	naturalcure: {
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				// pokemon not statused
				if (!curPoke?.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Natural Cure
				if (!Object.values(species.abilities).includes('Natural Cure')) {
					// this.add('-message', "" + curPoke + " skipped: no Natural Cure");
					continue;
				}
				// pokemon's ability is known to be Natural Cure
				if (!species.abilities['1'] && !species.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility('naturalcure')) {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (const pkmn of cureList) {
					pkmn.showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Natural Cure.)");

				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Natural Cure');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		name: "Natural Cure",
		rating: 2.5,
		num: 30,
	},
	neuroforce: {
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([5120, 4096]);
			}
		},
		name: "Neuroforce",
		rating: 2.5,
		num: 233,
	},
	neutralizinggas: {
		// Ability suppression implemented in sim/pokemon.ts:Pokemon#ignoringAbility
		onPreStart(pokemon) {
			if (pokemon.transformed) return;
			this.add('-ability', pokemon, 'Neutralizing Gas');
			pokemon.abilityState.ending = false;
			for (const target of this.getAllActive()) {
				if (target.illusion) {
					this.singleEvent('End', this.dex.abilities.get('Illusion'), target.abilityState, target, pokemon, 'neutralizinggas');
				}
				if (target.volatiles['slowstart']) {
					delete target.volatiles['slowstart'];
					this.add('-end', target, 'Slow Start', '[silent]');
				}
			}
		},
		onEnd(source) {
			if (source.transformed) return;
			for (const pokemon of this.getAllActive()) {
				if (pokemon !== source && pokemon.hasAbility('Neutralizing Gas')) {
					return;
				}
			}
			this.add('-end', source, 'ability: Neutralizing Gas');

			// FIXME this happens before the pokemon switches out, should be the opposite order.
			// Not an easy fix since we cant use a supported event. Would need some kind of special event that
			// gathers events to run after the switch and then runs them when the ability is no longer accessible.
			// (If you're tackling this, do note extreme weathers have the same issue)

			// Mark this pokemon's ability as ending so Pokemon#ignoringAbility skips it
			if (source.abilityState.ending) return;
			source.abilityState.ending = true;
			const sortedActive = this.getAllActive();
			this.speedSort(sortedActive);
			for (const pokemon of sortedActive) {
				if (pokemon !== source) {
					if (pokemon.getAbility().isPermanent) continue; // does not interact with e.g Ice Face, Zen Mode

					// Will be suppressed by Pokemon#ignoringAbility if needed
					this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityState, pokemon);
				}
			}
		},
		name: "Neutralizing Gas",
		rating: 4,
		num: 256,
	},
	noguard: {
		onAnyInvulnerabilityPriority: 1,
		onAnyInvulnerability(target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) return 0;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
		},
		name: "No Guard",
		rating: 4,
		num: 99,
	},
	normalize: {
		shortDesc: "This Pokemon's moves are changed to be Normal type and have 1.5x power.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'weatherball',
			];
			if (!(move.isZ && move.category !== 'Status') && !noModifyType.includes(move.id)) {
				move.type = 'Normal';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.5);
		},
		name: "Normalize",
		rating: 0,
		num: 96,
		cfm: true,
	},
	oblivious: {
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Oblivious');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Oblivious');
				return null;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Oblivious', '[of] ' + target);
			}
		},
		isBreakable: true,
		name: "Oblivious",
		rating: 1.5,
		num: 12,
	},
	opportunist: {
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Opportunist' || effect?.name === 'Mirror Herb') return;
			const pokemon = this.effectState.target;
			const positiveBoosts: Partial<BoostsTable> = {};
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					positiveBoosts[i] = boost[i];
				}
			}
			if (Object.keys(positiveBoosts).length < 1) return;
			this.boost(positiveBoosts, pokemon);
		},
		name: "Opportunist",
		rating: 3,
		num: 290,
	},
	orichalcumpulse: {
		onStart(pokemon) {
			if (this.field.setWeather('sunnyday')) {
				this.add('-activate', pokemon, 'Orichalcum Pulse', '[source]');
			} else if (this.field.isWeather('sunnyday')) {
				this.add('-activate', pokemon, 'ability: Orichalcum Pulse');
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.debug('Orichalcum boost');
				return this.chainModify([5461, 4096]);
			}
		},
		name: "Orichalcum Pulse",
		rating: 4.5,
		num: 288,
	},
	overcoat: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'powder') return false;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Overcoat');
				return null;
			}
		},
		isBreakable: true,
		name: "Overcoat",
		rating: 2,
		num: 142,
	},
	overgrow: {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Grass-type attack.",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's attacking stat is 1.5x with Grass attacks.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3 && !this.field.auraBreak()) {
				this.debug('OVergrow boost');
				return this.chainModify(1.5);
			}
		},
		name: "Overgrow",
		rating: 2,
		num: 65,
	},
	owntempo: {
		shortDesc: "Boosts the power of sound-based moves by 30%; prevents confusion, Intimidate.",
		onUpdate(pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Own Tempo');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit(target, source, move) {
			if (move?.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Own Tempo');
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				return this.chainModify(1.3);
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Own Tempo', '[of] ' + target);
			}
		},
		isBreakable: true,
		name: "Own Tempo",
		rating: 1.5,
		num: 20,
		cfm: true,
	},
	parentalbond: {
		shortDesc: "Damaging moves hit twice (or four times, if double hit); second hit at 50% power.",
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || (move.multihit && move.multihit !== 2)) return;
			if (['endeavor', 'fling', 'iceball', 'rollout'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.selfdestruct && !move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = (move.multihit === 2 ? 4 : 2);
				move.multihitType = 'parentalbond';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit % 2 === 0) return this.chainModify(0.5);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		name: "Parental Bond",
		rating: 4.5,
		num: 185,
		cfm: true,
	},
	pastelveil: {
		onStart(pokemon) {
			for (const ally of pokemon.alliesAndSelf()) {
				if (['psn', 'tox'].includes(ally.status)) {
					this.add('-activate', pokemon, 'ability: Pastel Veil');
					ally.cureStatus();
				}
			}
		},
		onUpdate(pokemon) {
			if (['psn', 'tox'].includes(pokemon.status)) {
				this.add('-activate', pokemon, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onAllySwitchIn(pokemon) {
			if (['psn', 'tox'].includes(pokemon.status)) {
				this.add('-activate', this.effectState.target, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Pastel Veil');
			}
			return false;
		},
		onAllySetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Pastel Veil', '[of] ' + effectHolder);
			}
			return false;
		},
		isBreakable: true,
		name: "Pastel Veil",
		rating: 2,
		num: 257,
	},
	perishbody: {
		onDamagingHit(damage, target, source, move) {
			if (!this.checkMoveMakesContact(move, source, target)) return;

			let announced = false;
			for (const pokemon of [target, source]) {
				if (pokemon.volatiles['perishsong']) continue;
				if (!announced) {
					this.add('-ability', target, 'Perish Body');
					announced = true;
				}
				pokemon.addVolatile('perishsong');
			}
		},
		name: "Perish Body",
		rating: 1,
		num: 253,
	},
	pickpocket: {
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && move?.flags['contact']) {
				if (target.item || target.switchFlag || target.forceSwitchFlag || source.switchFlag === true) {
					return;
				}
				const yourItem = source.takeItem(target);
				if (!yourItem) {
					return;
				}
				if (!target.setItem(yourItem)) {
					source.item = yourItem.id;
					return;
				}
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Pickpocket', '[of] ' + source);
				this.add('-item', target, yourItem, '[from] ability: Pickpocket', '[of] ' + source);
			}
		},
		name: "Pickpocket",
		rating: 1,
		num: 124,
	},
	pickup: {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.item) return;
			const pickupTargets = this.getAllActive().filter(target => (
				target.lastItem && target.usedItemThisTurn && pokemon.isAdjacent(target)
			));
			if (!pickupTargets.length) return;
			const randomTarget = this.sample(pickupTargets);
			const item = randomTarget.lastItem;
			randomTarget.lastItem = '';
			this.add('-item', pokemon, this.dex.items.get(item), '[from] ability: Pickup');
			pokemon.setItem(item);
		},
		name: "Pickup",
		rating: 0.5,
		num: 53,
	},
	pixilate: {
		shortDesc: "Normal-type moves become Fairy; all Fairy-type moves boosted by 20%.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.category === 'Status' || this.field.auraBreak()) return;
			const noBoost = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if ((move.type === 'Normal' || move.type === 'Fairy') && !noBoost.includes(move.id) && !move.isZ) {
				move.type = 'Fairy';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		name: "Pixilate",
		ate: "Fairy",
		rating: 4,
		num: 182,
		cfm: true,
	},
	plus: {
		desc: "Every time this Pokemon uses an Electric-type move, it has a 33% chance to raise the higher of its Sp. Attack and Attack by one stage; this becomes a 66% chance if it has an ally with Minus.",
		shortDesc: "Electric moves: 33% chance to boost Sp. Atk/Atk; 66% if partner has Minus.",
		onSourceHit(target, source, move) {
			if (!move || !target || move.type !== 'Electric') return;
			let chance = 1;
			if (source.side.active.length > 1){
				for (const allyActive of source.side.active) {
					if (allyActive && allyActive.position !== source.position && !allyActive.fainted && allyActive.hasAbility(['minus'])) {
						chance = 2;
					}
				}
			}
			if (this.randomChance(chance, 3))
				this.boost({[source.storedStats.atk > source.storedStats.spa ? 'atk' : 'spa']:1}, source);
		},
		name: "Plus",
		rating: 0,
		num: 57,
		cfm: true,
	},
	poisonheal: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.baseMaxhp / 8);
				return false;
			}
		},
		name: "Poison Heal",
		rating: 4,
		num: 90,
	},
	poisonpoint: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('psn', target);
				}
			}
		},
		name: "Poison Point",
		rating: 1.5,
		num: 38,
	},
	poisontouch: {
		desc: "If this Pokemon is NOT a Poison-type, the power of its Poison-type attacks is boosted by 50%. This Pokemon's contact moves have a 30% chance to poison their target.",
		shortDesc: "Contact moves: 30% poison chance; prevents poisoning; non-Poison-types: Poison power +50%.",
		// upokecenter says this is implemented as an added secondary effect
		onModifyMove(move) {
			if (!move?.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'psn',
				ability: this.dex.abilities.get('poisontouch'),
			});
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Poison' && !attacker.hasType('Poison') && !this.field.auraBreak()) {
				this.debug('Poison Touch boost');
				return this.chainModify(1.5);
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Poison Touch');
			}
			return false;
		},
		name: "Poison Touch",
		rating: 2,
		num: 143,
		cfm: true,
	},
	powerconstruct: {
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Zygarde' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'zygardecomplete' || pokemon.hp > pokemon.maxhp / 2) return;
			this.add('-activate', pokemon, 'ability: Power Construct');
			pokemon.formeChange('Zygarde-Complete', this.effect, true);
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
			const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
			pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newMaxHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		isPermanent: true,
		name: "Power Construct",
		rating: 5,
		num: 211,
	},
	powerofalchemy: {
		shortDesc: "Move in slot 1 changes to user's primary type; boosted by 20%.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.category === 'Status' || this.field.auraBreak()) return;
			const noBoost = ['hiddenpower', 'judgment', 'naturalgift', 'technoblast', 'weatherball'];
			if (move.id === this.dex.moves.get(pokemon.moveSlots[0].move).id && !noBoost.includes(move.id) && !move.isZ) {
				move.type = pokemon.getTypes()[0];
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Power of Alchemy",
		rating: 0,
		num: 223,
		cfm: true,
	},
	powerspot: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target) {
				this.debug('Power Spot boost');
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Power Spot",
		rating: 1,
		num: 249,
	},
	prankster: {
		shortDesc: "Status move priority +1; Dark types immune, unless it becomes an attacking move.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		name: "Prankster",
		rating: 4,
		num: 158,
		cfm: true,
	},
	pressure: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Pressure');
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 1;
		},
		name: "Pressure",
		rating: 2.5,
		num: 46,
	},
	primordialsea: {
		desc: "On switch-in, the weather becomes extremely heavy rain that prevents damaging Fire-type moves from executing (except for Sacred Fire) and boosts the power of Water-type attacks by 50%. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Delta Stream or Primordial Sea. If neither this nor Delta Stream is active, there is a 50% chance for the weather to reset at the end of the turn. If this Pokémon is no longer active, the weather turns into regular rain.",
		shortDesc: "On switch-in, heavy rain begins. Changes to regular rain if this Ability is no longer active in battle.",
		onStart(source) {
			this.field.setWeather('primordialsea');
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'primordialsea' && !strongWeathers.includes(weather.id)) return false;
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if ((this.field.getWeather().id === 'desolateland' && this.randomChance(1, 2)) ||
			!['primordialsea', 'deltastream'].includes(this.field.getWeather().id)) {
				this.field.setWeather('primordialsea');
			}
		},
		onEnd(pokemon) {
			if (this.field.weatherState.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('primordialsea')) {
					this.field.weatherState.source = target;
					return;
				}
			}
			this.field.clearWeather();
			this.field.setWeather('raindance');
		},
		name: "Primordial Sea",
		rating: 4.5,
		num: 189,
		cfm: true,
	},
	prismarmor: {
		desc: "This Pokemon receives 3/4 damage from supereffective attacks and is unaffected by the secondary effect of another Pokemon's attack. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "3/4 damage on super effective hits; immune to secondary effects.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Prism Armor neutralize');
				return this.chainModify(0.75);
			}
			if (move.secondaries) {
				delete move.secondaries;
			}
		},
		name: "Prism Armor",
		rating: 3,
		num: 232,
		cfm: true,
	},
	propellertail: {
		onModifyMove(move) {
			// this doesn't actually do anything because ModifyMove happens after the tracksTarget check
			// the actual implementation is in Battle#getTarget
			move.tracksTarget = true;
		},
		name: "Propeller Tail",
		rating: 0,
		num: 239,
	},
	protean: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		name: "Protean",
		rating: 4.5,
		num: 168,
	},
	psychicsurge: {
		desc: "On switch-in, this Pokemon summons Psychic Terrain. While Psychic Terrain is active: all Psychic-type moves boosted by 25%; grounded Pokemon, or Pokemon with Psychic Surge, are protected from priority moves.",
		shortDesc: "On switch-in, this Pokemon summons Psychic Terrain.",
		cfmDesc: "On switch-in, summons Psychic Terrain for 5 turns: all Psychic moves boosted by 30%; all grounded Pokémon or Pokémon with Psychic Surge are protected from priority attacks.",
		onStart(source) {
			this.field.setTerrain('psychicterrain');
		},
		name: "Psychic Surge",
		rating: 4,
		num: 227,
		cfm: true,
	},
	protosynthesis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protosynthesis');
			} else if (!pokemon.volatiles['protosynthesis']?.fromBooster) {
				pokemon.removeVolatile('protosynthesis');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protosynthesis'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosynthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosynthesis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Protosynthesis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Protosynthesis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Protosynthesis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Protosynthesis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Protosynthesis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		isPermanent: true,
		name: "Protosynthesis",
		rating: 3,
		num: 281,
	},
	punkrock: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Punk Rock boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['sound']) {
				this.debug('Punk Rock weaken');
				return this.chainModify(0.5);
			}
		},
		isBreakable: true,
		name: "Punk Rock",
		rating: 3.5,
		num: 244,
	},
	purepower: {
		shortDesc: "The higher of this Pokemon's Attack/Sp. Attack is doubled.",
		onModifyMove(move, pokemon) {
			if (this.field.auraBreak()) return;
			const category = (pokemon.storedStats.spa > pokemon.storedStats.atk ? 'Special' : 'Physical');
			if (move.category === category || move.flags['magic']) {
				move.basePower *= 2;
			}
		},
		name: "Pure Power",
		rating: 5,
		num: 74,
		cfm: true,
	},
	purifyingsalt: {
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Purifying Salt');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Purifying Salt');
				return null;
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Purifying Salt weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(spa, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Purifying Salt weaken');
				return this.chainModify(0.5);
			}
		},
		isBreakable: true,
		name: "Purifying Salt",
		rating: 4,
		num: 272,
	},
	quarkdrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('quarkdrive');
			} else if (!pokemon.volatiles['quarkdrive']?.fromBooster) {
				pokemon.removeVolatile('quarkdrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quarkdrive'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Quark Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Quark Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Quark Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Quark Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Quark Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		isPermanent: true,
		name: "Quark Drive",
		rating: 3,
		num: 282,
	},
	queenlymajesty: {
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Queenly Majesty', move, '[of] ' + target);
				return false;
			}
		},
		isBreakable: true,
		name: "Queenly Majesty",
		rating: 2.5,
		num: 214,
	},
	quickdraw: {
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category !== "Status" && this.randomChance(3, 10)) {
				this.add('-activate', pokemon, 'ability: Quick Draw');
				return 0.1;
			}
		},
		name: "Quick Draw",
		rating: 2.5,
		num: 259,
	},
	quickfeet: {
		desc: "If this Pokemon is afflicted with status, its Speed is boosted by 50%. Any damage from burn or poison is reduced to 1/16 of this Pokemon's maximum HP.",
		shortDesc: "If statused (including paralysis), boosts Speed by 50%; reduces burn/poison damage.",
		onModifySpe(spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType === 'Status') {
				return target.maxhp / 16;
			}
		},
		name: "Quick Feet",
		rating: 2.5,
		num: 95,
		cfm: true,
	},
	raindish: {
		desc: "If Rain Dance is active, this Pokemon restores 1/6 of its maximum HP, rounded down, at the end of each turn.",
		shortDesc: "If Rain Dance is active, this Pokemon heals 1/6 of its max HP each turn.",
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 6);
			}
		},
		name: "Rain Dish",
		rating: 1.5,
		num: 44,
		cfm: true,
	},
	rattled: {
		desc: "This Pokemon's Speed is raised by 2 stages if hit by a Bug-, Dark-, or Ghost-type attack, or Intimidate.",
		shortDesc: "Speed is raised 2 stages if hit by a Bug-, Dark-, or Ghost-type attack, or Intimidated.",
		onDamagingHit(damage, target, source, move) {
			if (['Dark', 'Bug', 'Ghost'].includes(move.type)) {
				this.boost({spe: 2});
			}
		},
		onAfterBoost(boost, target, source, effect) {
			if (effect && effect.id === 'intimidate') {
				this.boost({spe: 2});
			}
		},
		name: "Rattled",
		rating: 1.5,
		num: 155,
		cfm: true,
	},
	receiver: {
		onAllyFaint(target) {
			if (!this.effectState.target.hp) return;
			const ability = target.getAbility();
			const additionalBannedAbilities = [
				'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'wonderguard',
			];
			if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) return;
			this.add('-ability', this.effectState.target, ability, '[from] ability: Receiver', '[of] ' + target);
			this.effectState.target.setAbility(ability);
		},
		name: "Receiver",
		rating: 0,
		num: 222,
	},
	reckless: {
		desc: "This Pokemon's attacks with recoil or crash damage have their power multiplied by 1.3. Does not affect Struggle.",
		shortDesc: "Boosts the power of attacks with recoil/crash damage (except Struggle) by 30%.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if ((move.recoil || move.hasCrashDamage) && !this.field.auraBreak()) {
				this.debug('Reckless boost');
				return this.chainModify(1.3);
			}
		},
		name: "Reckless",
		rating: 3,
		num: 120,
	},
	refrigerate: {
		shortDesc: "Normal-type moves become Ice; all Ice-type moves boosted by 20%.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.category === 'Status' || this.field.auraBreak()) return;
			const noBoost = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if ((move.type === 'Normal' || move.type === 'Ice') && !noBoost.includes(move.id) && !move.isZ) {
				move.type = 'Ice';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		name: "Refrigerate",
		ate: "Ice",
		rating: 4,
		num: 174,
		cfm: true,
	},
	regenerator: {
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		name: "Regenerator",
		rating: 4.5,
		num: 144,
	},
	ripen: {
		onTryHeal(damage, target, source, effect) {
			if (!effect) return;
			if (effect.id === 'berryjuice' || effect.id === 'leftovers') {
				this.add('-activate', target, 'ability: Ripen');
			}
			if ((effect as Item).isBerry) return this.chainModify(2);
		},
		onTryBoost(boost, target, source, effect) {
			if (effect && (effect as Item).isBerry) {
				let b: BoostID;
				for (b in boost) {
					boost[b]! *= 2;
				}
			}
		},
		onSourceModifyDamagePriority: -1,
		onSourceModifyDamage(damage, source, target, move) {
			if (target.abilityState.berryWeaken) {
				return this.chainModify(0.5);
			}
		},
		onTryEatItemPriority: -1,
		onTryEatItem(item, pokemon) {
			this.add('-activate', pokemon, 'ability: Ripen');
		},
		onEatItem(item, pokemon) {
			const weakenBerries = [
				'Babiri Berry', 'Charti Berry', 'Chilan Berry', 'Chople Berry', 'Coba Berry', 'Colbur Berry', 'Haban Berry', 'Kasib Berry', 'Kebia Berry', 'Occa Berry', 'Passho Berry', 'Payapa Berry', 'Rindo Berry', 'Roseli Berry', 'Shuca Berry', 'Tanga Berry', 'Wacan Berry', 'Yache Berry',
			];
			// Record if the pokemon ate a berry to resist the attack
			pokemon.abilityState.berryWeaken = weakenBerries.includes(item.name);
		},
		name: "Ripen",
		rating: 2,
		num: 247,
	},
	rivalry: {
		shortDesc: "On switch-in, boosts the higher offensive stat if an opponent is of the same type.",
		onStart(pokemon) {
			for (const foeactive of pokemon.side.foe.active) {
				if (!foeactive || foeactive.fainted || !foeactive.hasType(pokemon.types)) continue;
				this.boost({[pokemon.storedStats.spa > pokemon.storedStats.atk ? 'spa' : 'atk']:1});
			}
		},
		name: "Rivalry",
		rating: 0,
		num: 79,
		cfm: true,
	},
	rkssystem: {
		shortDesc: "Boosts Type: Null in exchange for HP; boosts Silvally according to held Memory.",
		cfmDesc: `Type: Null: boosts the higher offensive stat by 50%; loses 1/6 HP for every attack using that stat.
Silvally: stats are boosted on switch-in depending on the Memory:
Bug: +1 Atk / -2 Def / +1 SpA
Dark: +1 Atk / +1 SpA / -2 SpD
Dragon: +1 Atk / -1 Def / +1 SpA / -1 SpD
Electric: -1 Atk / -1 Def / +2 Spe
Fairy: -2 Atk / +2 SpD
Fighting: +2 Atk / -2 SpD
Fire: +1 Atk / -2 Def / +1 SpA
Flying: +1 higher of Atk/Sp. Atk / -2 Def / +1 Spe
Ghost: +1 higher of Atk/Sp. Atk / -2 Def / +1 SpD
Grass: -3 Atk / +1 Def / +1 SpA / +1 SpD
Ground: +1 Atk / +1 Def / -1 SpA / -1 SpD
Ice: +2 higher of Atk/Sp. Atk / -1 Def / -1 SpD
Poison: +1 Def / -1 SpA / +1 SpD / -1 Spe
Psychic: 2 Def / +2 SpA
Rock: +1 Atk / +2 Def / -3 SpA
Steel: +3 Def / -3 Spe
Water: -1 Atk / +1 Def / +1 SpA / -1 Spe`,
		// RKS System's type-changing itself is implemented in statuses.js
		onStart(pokemon) {
			const type = pokemon.getItem().onMemory;
			if (pokemon.baseSpecies.baseSpecies !== 'Silvally') return;
			let maIndex = 4;
			for (let j = 0; j < pokemon.moveSlots.length; j++) {
				if (pokemon.moveSlots[j].id === 'multiattack') {
					maIndex = j;
				}
			}

			// Define the move slot
			let move = this.dex.moves.get('multiattack');

			// For Memories that change effect depending on higher stat
			const oStat = pokemon.storedStats.spa > pokemon.storedStats.atk ? 'spa' : 'atk';

			switch (type) {
			case 'Bug':
				const bugMoves: {[k: string]: string} = {'atk': 'leechlife', 'spa': 'tailglow'};
				this.boost({atk:1, def:-2, spa:1});
				move = this.dex.moves.get(bugMoves[oStat]);
				break;
			case 'Dark':
				this.boost({atk:1, spa:1, spd:-2});
				move = this.dex.moves.get('suckerpunch');
				break;
			case 'Dragon':
				this.boost({atk:1, def:-1, spa:1, spd:-1});
				move = this.dex.moves.get('dragondance');
				break;
			case 'Electric':
				this.boost({atk:-1, def:-1, spe:2});
				move = this.dex.moves.get('voltswitch');
				break;
			case 'Fairy':
				this.boost({atk:-2, spd:2});
				move = this.dex.moves.get('wish');
				break;
			case 'Fighting':
				this.boost({atk:2, spd:-2});
				move = this.dex.moves.get('sacredsword');
				break;
			case 'Fire':
				const fireMoves: {[k: string]: string} = {'atk': 'blazekick', 'spa': 'firespin'};
				this.boost({atk:1, def:-2, spa:1});
				move = this.dex.moves.get(fireMoves[oStat]);
				break;
			case 'Flying':
				const flyingMoves: {[k: string]: string} = {'atk': 'drillpeck', 'spa': 'gust'};
				this.boost({[oStat]:1, def:-2, spe:1});
				move = this.dex.moves.get(flyingMoves[oStat]);
				break;
			case 'Ghost':
				this.boost({[oStat]:1, def:-2, spd:1});
				move = this.dex.moves.get('destinybond');
				break;
			case 'Grass':
				this.boost({atk:-3, def:1, spa:1, spd:1});
				move = this.dex.moves.get('sleeppowder');
				break;
			case 'Ground':
				this.boost({atk:1, def:1, spa:-1, spd:-1});
				move = this.dex.moves.get('drillrun');
				break;
			case 'Ice':
				const iceMoves: {[k: string]: string} = {'atk': 'iciclecrash', 'spa': 'freezedry'};
				this.boost({def:-1, [oStat]:2, spd:-1});
				move = this.dex.moves.get(iceMoves[oStat]);
				break;
			case 'Poison':
				this.boost({def:1, spa:-1, spd:1, spe:-1});
				move = this.dex.moves.get('toxic');
				break;
			case 'Psychic':
				this.boost({def:-2, spa:2});
				move = this.dex.moves.get('synchronoise');
				break;
			case 'Rock':
				this.boost({atk:1, def:2, spa:-3});
				move = this.dex.moves.get('stealthrock');
				break;
			case 'Steel':
				this.boost({def:3, spe:-3});
				move = this.dex.moves.get('metalburst');
				break;
			case 'Water':
				this.boost({atk:-1, def:1, spa:1, spe:-1});
				move = this.dex.moves.get('scald');
				break;
			}
			// Change Multi-Attack to be whatever move we want it to be
			if (maIndex === 4) return;
			if (move.id !== 'multiattack') {
				const multiAttack = {
					move: move.name,
					id: move.id,
					pp: move.pp,
					maxpp: move.pp,
					target: move.target,
					disabled: false,
					used: false,
				};
				pokemon.moveSlots[maIndex] = multiAttack;
				pokemon.baseMoveSlots[maIndex] = multiAttack;
			}
		},
		// Type: Null part
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.species.id !== 'typenull') return;
			const category = (attacker.getStat('spa') > attacker.getStat('atk') ? 'Special' : 'Physical');
			if (move && (move.category === category || move.flags['magic'])) {
				move.rksBoosted = true;
				return this.chainModify(1.5);
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.rksBoosted) {
				this.damage(source.maxhp / 6, source, source);
			}
		},
		isPermanent: true,
		name: "RKS System",
		rating: 4,
		num: 225,
		cfm: true,
	},
	rockhead: {
		desc: "This Pokémon not take any recoil damage, including damage due to Rocky Helmet, Iron Barbs, Rough Skin and Aftermath. Recoil and 'head' moves have a +1 chance for a critical hit.",
		shortDesc: "This Pokémon not take any recoil damage; recoil and 'head' moves: +1 crit chance.",
		onModifyCritRatio(critRatio) {
			if (this.activeMove && (this.activeMove.id.includes("head") || this.activeMove.recoil)) {
				this.activeMove.rockHead = true;
				return critRatio + 1;
			}
		},
		onDamage(damage, target, source, effect) {
			if (!this.activeMove || !this.activeMove.rockHead) return;
			if (['rockyhelmet', 'ironbarbs', 'roughskin', 'aftermath'].includes(effect.id)) return null;
			else if (effect.id === 'recoil') {
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		name: "Rock Head",
		rating: 3,
		num: 69,
		cfm: true,
	},
	rockypayload: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Rock' && !this.field.auraBreak()) {
				this.debug('Rocky Payload boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Rock' && !this.field.auraBreak()) {
				this.debug('Rocky Payload boost');
				return this.chainModify(1.5);
			}
		},
		name: "Rocky Payload",
		rating: 3.5,
		num: 276,
	},
	roughskin: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Rough Skin",
		rating: 2.5,
		num: 24,
	},
	runaway: {
		shortDesc: "This Pokémon cannot be trapped.",
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false;
		},
		name: "Run Away",
		rating: 0,
		num: 50,
	},
	sandforce: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm') && !this.field.auraBreak()) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([5325, 4096]);
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		name: "Sand Force",
		rating: 2,
		num: 159,
	},
	sandrush: {
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(2);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		name: "Sand Rush",
		rating: 3,
		num: 146,
	},
	sandspit: {
		onDamagingHit(damage, target, source, move) {
			if (this.field.getWeather().id !== 'sandstorm') {
				this.field.setWeather('sandstorm');
			}
		},
		name: "Sand Spit",
		rating: 2,
		num: 245,
	},
	sandstream: {
		onStart(source) {
			this.field.setWeather('sandstorm');
		},
		name: "Sand Stream",
		rating: 4,
		num: 45,
	},
	sandveil: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather('sandstorm')) {
				this.debug('Sand Veil - decreasing accuracy');
				return this.chainModify([3277, 4096]);
			}
		},
		isBreakable: true,
		name: "Sand Veil",
		rating: 1.5,
		num: 8,
	},
	sapsipper: {
		shortDesc: "Draws in Grass moves aimed at ally; grants immunity, boosts higher of Atk/SpA.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Grass') {
				if (!this.boost({[target.storedStats.spa > target.storedStats.atk ? 'spa' : 'atk']: 1})) {
					this.add('-immune', target, '[from] ability: Sap Sipper');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source)) return;
			if (move.type === 'Grass') {
				this.boost({[this.effectState.target.storedStats.spa > this.effectState.target.storedStats.atk ?
					'spa' : 'atk']: 1}, this.effectState.target);
			}
		},
		isBreakable: true,
		name: "Sap Sipper",
		rating: 3,
		num: 157,
		cfm: true,
	},
	schooling: {
		shortDesc: "If Wishiwashi-Solo, changes to School Forme if below 50% max HP and recovers HP.",
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' || pokemon.hp > pokemon.maxhp / 2) return;
			if (pokemon.transformed || !pokemon.hp) return;
			this.add('-message', pokemon.name + " called out for assistance!");
			this.add('-activate', pokemon, 'ability: Schooling');
			pokemon.formeChange('Wishiwashi-School', this.effect, true);
			this.add('-message', pokemon.name + " transformed into its School Forme!");
			const newHP = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
			pokemon.hp = newHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		isPermanent: true,
		name: "Schooling",
		rating: 3,
		num: 208,
		cfm: true,
	},
	scrappy: {
		shortDesc: "This Pokémon and its target may be hit by Normal/Fighting/Ghost moves. Immune to Intimidate.",
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
				move.ignoreImmunity['Ghost'] = true;
			}
		},
		onNegateImmunity(pokemon, type) {
			if (type === 'Ghost' || type === 'Normal' || type === 'Fighting')
				return false;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Scrappy', '[of] ' + target);
			}
		},
		name: "Scrappy",
		rating: 3,
		num: 113,
		cfm: true,
	},
	screencleaner: {
		shortDesc: "Clears opponent(s)'s Reflect, Light Screen, and Aurora Veil on switch-in.",
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil']) {
				for (const side of [pokemon.side, ...pokemon.side.foeSidesWithConditions()]) {
					if (side.getSideCondition(sideCondition)) {
						if (!activated) {
							this.add('-activate', pokemon, 'ability: Screen Cleaner');
							activated = true;
						}
						side.removeSideCondition(sideCondition);
					}
				}
			}
		},
		name: "Screen Cleaner",
		rating: 2,
		num: 251,
	},
	seedsower: {
		onDamagingHit(damage, target, source, move) {
			this.field.setTerrain('grassyterrain');
		},
		name: "Seed Sower",
		rating: 2.5,
		num: 269,
	},
	serenegrace: {
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance) move.self.chance *= 2;
		},
		name: "Serene Grace",
		rating: 3.5,
		num: 32,
	},
	shadowshield: {
		shortDesc: "Lunala: gains Ghost-typing, takes 50% less attack damage at full HP.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hp >= target.maxhp) {
				this.debug('Shadow Shield weaken');
				return this.chainModify(0.5);
			}
		},
		isPermanent: true,
		name: "Shadow Shield",
		rating: 3.5,
		num: 231,
		cfm: true,
	},
	shadowtag: {
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility('shadowtag') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.hasAbility('shadowtag')) {
				pokemon.maybeTrapped = true;
			}
		},
		name: "Shadow Tag",
		rating: 5,
		num: 23,
	},
	sharpness: {
		shortDesc: "This Pokemon's slicing moves have their power multiplied by 30%.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Shapness boost');
				return this.chainModify(1.5);
			}
		},
		name: "Sharpness",
		rating: 3.5,
		num: 292,
	},
	shedskin: {
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hp && pokemon.status && this.randomChance(33, 100)) {
				this.debug('shed skin');
				this.add('-activate', pokemon, 'ability: Shed Skin');
				pokemon.cureStatus();
			}
		},
		name: "Shed Skin",
		rating: 3,
		num: 61,
	},
	sheerforce: {
		onModifyMove(move, pokemon) {
			if (move.secondaries && !this.field.auraBreak()) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce) return this.chainModify([5325, 4096]);
		},
		name: "Sheer Force",
		rating: 3.5,
		num: 125,
	},
	shellarmor: {
		onCriticalHit: false,
		isBreakable: true,
		name: "Shell Armor",
		rating: 1,
		num: 75,
	},
	shielddust: {
		onModifySecondaries(secondaries) {
			this.debug('Shield Dust prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		isBreakable: true,
		name: "Shield Dust",
		rating: 2,
		num: 19,
	},
	shieldsdown: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Minior' || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Meteor') {
					pokemon.formeChange('Minior-Meteor');
				}
			} else {
				if (pokemon.species.forme === 'Meteor') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Minior' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Meteor') {
					pokemon.formeChange('Minior-Meteor');
				}
			} else {
				if (pokemon.species.forme === 'Meteor') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if (target.species.id !== 'miniormeteor' || target.transformed) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Shields Down');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (target.species.id !== 'miniormeteor' || target.transformed) return;
			if (status.id !== 'yawn') return;
			this.add('-immune', target, '[from] ability: Shields Down');
			return null;
		},
		isPermanent: true,
		name: "Shields Down",
		rating: 3,
		num: 197,
	},
	simple: {
		onTryBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= 2;
			}
		},
		isBreakable: true,
		name: "Simple",
		rating: 4,
		num: 86,
	},
	skilllink: {
		onModifyMove(move) {
			if (move.multihit && Array.isArray(move.multihit) && move.multihit.length) {
				move.multihit = move.multihit[1];
			}
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
			}
		},
		name: "Skill Link",
		rating: 3,
		num: 92,
	},
	slowstart: {
		shortDesc: "-75% Atk/SpA/Spe for five turns; then heals 50%, cures status, +1 Atk/SpA/Spe.",
		onStart(pokemon) {
			pokemon.addVolatile('slowstart');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['slowstart'];
		},
		condition: {
			duration: 5,
			onStart(target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.25);
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, pokemon) {
				return this.chainModify(0.25);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.25);
			},
			onEnd(target) {
				this.add('-end', target, 'Slow Start');
				this.boost({atk: 1, spa: 1, spe: 1}, target, target);
				this.heal(target.maxhp / 2, target);
				target.cureStatus();
			},
		},
		name: "Slow Start",
		rating: -1,
		num: 112,
		cfm: true,
	},
	slushrush: {
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['hail', 'snow'])) {
				return this.chainModify(2);
			}
		},
		name: "Slush Rush",
		rating: 3,
		num: 202,
	},
	sniper: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Sniper boost');
				return this.chainModify(1.5);
			}
		},
		name: "Sniper",
		rating: 2,
		num: 97,
	},
	snowcloak: {
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather(['hail', 'snow'])) {
				this.debug('Snow Cloak - decreasing accuracy');
				return this.chainModify([3277, 4096]);
			}
		},
		isBreakable: true,
		name: "Snow Cloak",
		rating: 1.5,
		num: 81,
	},
	snowwarning: {
		onStart(source) {
			this.field.setWeather('snow');
		},
		name: "Snow Warning",
		rating: 4,
		num: 117,
	},
	solarpower: {
		shortDesc: "In the Sun: boosts higher of Sp. Atk/Atk by 50%; loses 12% HP on each attack.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.category === 'Status' || this.field.auraBreak()) return;
			const category = (attacker.getStat('atk') > attacker.getStat('spa') ? 'Physical' : 'Special');
			if (this.field.isWeather(['sunnyday', 'desolateland']) && (move.category === category || move.flags['magic'])) {
				this.debug('Solar Power boost');
				move.solarPowerBoosted = true;
				return this.chainModify(1.5);
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.solarPowerBoosted) {
				this.damage(source.maxhp / 8, source, source);
			}
		},
		name: "Solar Power",
		rating: 2,
		num: 94,
		cfm: true,
	},
	solidrock: {
		shortDesc: "Receives 3/4 damage from supereffective attacks; Rock moves boosted by 20%.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Solid Rock neutralize');
				return this.chainModify(0.75);
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Rock' && !this.field.auraBreak()) {
				this.debug('Solid Rock boost');
				return this.chainModify(1.2);
			}
		},
		isBreakable: true,
		name: "Solid Rock",
		rating: 3,
		num: 116,
		cfm: true,
	},
	soulheart: {
		shortDesc: "This Pokémon recovers 25% HP when another Pokémon faints.",
		onAnyFaintPriority: 1,
		onAnyFaint() {
			this.add('-ability', this.effectState.target, 'Soul-Heart');
			this.add('-heal', this.effectState.target, this.effectState.target.maxhp / 4);
		},
		name: "Soul-Heart",
		rating: 3.5,
		num: 220,
		cfm: true,
	},
	soundproof: {
		onTryHit(target, source, move) {
			if (target !== source && move.flags['sound']) {
				this.add('-immune', target, '[from] ability: Soundproof');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (move.flags['sound']) {
				this.add('-immune', this.effectState.target, '[from] ability: Soundproof');
			}
		},
		isBreakable: true,
		name: "Soundproof",
		rating: 1.5,
		num: 43,
	},
	speedboost: {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: 1});
			}
		},
		name: "Speed Boost",
		rating: 4.5,
		num: 3,
	},
	stakeout: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender) {
			if (!defender.activeTurns) {
				this.debug('Stakeout boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender) {
			if (!defender.activeTurns) {
				this.debug('Stakeout boost');
				return this.chainModify(2);
			}
		},
		name: "Stakeout",
		rating: 4.5,
		num: 198,
	},
	stall: {
		shortDesc: "Boosts Atk/Def/SpA/SpD by 20%; always moves last in its priority bracket.",
		onFractionalPriority: -0.1,
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify(1.2);
		},
		onModifyDefPriority: 6,
		onModifyDef(def) {
			return this.chainModify(1.2);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(1.2);
		},
		onModifySpDPriority: 6,
		onModifySpD(spd) {
			return this.chainModify(1.2);
		},
		name: "Stall",
		rating: -1,
		num: 100,
		cfm: true,
	},
	stalwart: {
		shortDesc: "Prevents move redirection; cures the effects of Encore, Attract, Disable, Torment once per switch-in.",
		onModifyMove(move) {
			// this doesn't actually do anything because ModifyMove happens after the tracksTarget check
			// the actual implementation is in Battle#getTarget
			move.tracksTarget = true;
		},
		onStart(pokemon) {
			pokemon.abilityState.stalwartUsed = false;
		},
		onUpdate(pokemon) {
			if (!pokemon.abilityState.stalwartUsed) {
				for (const moveVolatile of ['Encore', 'Attract', 'Disable', 'Torment', 'Taunt']) {
					if (pokemon.volatiles[moveVolatile.toLowerCase()]) {
						this.add('-activate', pokemon, 'ability: Stalwart');
						pokemon.removeVolatile(moveVolatile.toLowerCase());
						// Taunt's volatile already sends the -end message when removed
						if (moveVolatile !== 'Taunt')
							this.add('-end', pokemon, `move: ${moveVolatile}`, '[from] ability: Stalwart');
						pokemon.abilityState.stalwartUsed = true;
					}
				}
			}
		},
		name: "Stalwart",
		rating: 0,
		num: 242,
		cfm: true,
	},
	stamina: {
		shortDesc: "Boosts higher of Defence and Sp. Def when hit by a damaging move.",
		onDamagingHit(damage, target, source, effect) {
			this.boost({def: 1});
		},
		name: "Stamina",
		rating: 3.5,
		num: 192,
		cfm: true,
	},
	stancechange: {
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Aegislash' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			const targetForme = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		isPermanent: true,
		name: "Stance Change",
		rating: 4,
		num: 176,
	},
	static: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
				}
			}
		},
		name: "Static",
		rating: 2,
		num: 9,
	},
	steadfast: {
		shortDesc: "Boosts higher offensive stat by 3 when hit by a super-effective move.",
		onHitPriority: 1,
		onHit(target, source, move) {
			if (target.hp && move.category !== 'Status' && !move.damage &&
					!move.damageCallback && target.getMoveHitData(move).typeMod > 0) {
				this.boost({[target.storedStats.spa > target.storedStats.atk ? 'spa' : 'atk']: 3});
			}
		},
		name: "Steadfast",
		rating: 1,
		num: 80,
		cfm: true,
	},
	steamengine: {
		shortDesc: "One time immunity to Fire or Water that raises speed by 6.",
		onStart(pokemon) {
			pokemon.abilityState.steamEngineUsed = false;
		},
		onTryHit(target, source, move) {
			if (!target.abilityState.steamEngineUsed && target !== source && ['Fire', 'Water'].includes(move.type)) {
				target.abilityState.steamEngineUsed = true;
				if (!this.boost({spe: 6})) {
					this.add('-immune', target, '[from] ability: Steam Engine');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Steam Engine",
		rating: 2,
		num: 243,
		cfm: true,
	},
	steelworker: {
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Steel-type attack.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Steel' && !this.field.auraBreak()) {
				this.debug('Steelworker boost');
				return this.chainModify(1.5);
			}
		},
		name: "Steelworker",
		rating: 3.5,
		num: 200,
	},
	steelyspirit: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Steely Spirit boost');
				return this.chainModify(1.5);
			}
		},
		name: "Steely Spirit",
		rating: 3.5,
		num: 252,
	},
	stench: {
		shortDesc: "Boosts special Poison-type moves by 30%, all attacks gain a 10% flinch chance.",
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				this.debug('Adding Stench flinch');
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: 'flinch',
				});
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Poison' && move.category === 'Special' && !this.field.auraBreak()) {
				return this.chainModify(1.3);
			}
		},
		name: "Stench",
		rating: 0.5,
		num: 1,
		cfm: true,
	},
	stickyhold: {
		onTakeItem(item, pokemon, source) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!pokemon.hp || pokemon.item === 'stickybarb') return;
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Sticky Hold');
				return false;
			}
		},
		isBreakable: true,
		name: "Sticky Hold",
		rating: 2,
		num: 60,
	},
	stormdrain: {
		shortDesc: "Draws in Water moves; grants immunity, boosts higher of SpA/Atk when hit.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({[target.storedStats.atk > target.storedStats.spa ? 'atk' : 'spa']: 1})) {
					this.add('-immune', target, '[from] ability: Storm Drain');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Water' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Storm Drain');
				}
				return this.effectState.target;
			}
		},
		isBreakable: true,
		name: "Storm Drain",
		rating: 3,
		num: 114,
		cfm: true,
	},
	strongjaw: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite'] && !this.field.auraBreak()) {
				return this.chainModify(1.5);
			}
		},
		name: "Strong Jaw",
		rating: 3,
		num: 173,
	},
	sturdy: {
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		isBreakable: true,
		name: "Sturdy",
		rating: 3,
		num: 5,
	},
	suctioncups: {
		shortDesc: "When hit by a contact move: 10% chance to trap attacker; cannot be phazed.",
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Suction Cups');
			return null;
		},
		onDamagingHit(damage, target, source, move) {
			if (move && target !== source && move.category !== 'Status' && move.flags['contact']) {
				if (this.randomChance(10, 10)) {
					this.add('-ability', target, 'Suction Cups');
					source.addVolatile('partiallytrapped', this.effectState.target);
				}
			}
		},
		isBreakable: true,
		name: "Suction Cups",
		rating: 1,
		num: 21,
		cfm: true,
	},
	superluck: {
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		name: "Super Luck",
		rating: 1.5,
		num: 105,
	},
	supremeoverlord: {
		onStart(pokemon) {
			if (pokemon.side.totalFainted) {
				this.add('-activate', pokemon, 'ability: Supreme Overlord');
				const fallen = Math.min(pokemon.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen) {
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Supreme Overlord boost: ${powMod[this.effectState.fallen]}/4096`);
				return this.chainModify([powMod[this.effectState.fallen], 4096]);
			}
		},
		name: "Supreme Overlord",
		rating: 4,
		num: 293,
	},
	surgesurfer: {
		shortDesc: "If any terrain is active, this Pokemon's Speed is doubled.",
		onModifySpe(spe) {
			if (this.field.isTerrain('electricterrain') || this.field.isTerrain('grassyterrain') ||
				this.field.isTerrain('mistyterrain') || this.field.isTerrain('psychicterrain')) {
				return this.chainModify(2);
			}
		},
		name: "Surge Surfer",
		rating: 3,
		num: 207,
		cfm: true,
	},
	swarm: {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Bug-type attack.",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's attacking stat is 1.5x with Bug attacks.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 3 && !this.field.auraBreak()) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		name: "Swarm",
		rating: 2,
		num: 68,
	},
	sweetveil: {
		name: "Sweet Veil",
		onAllySetStatus(status, target, source, effect) {
			if (status.id === 'slp') {
				this.debug('Sweet Veil interrupts sleep');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Sweet Veil', '[of] ' + effectHolder);
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.debug('Sweet Veil blocking yawn');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Sweet Veil', '[of] ' + effectHolder);
				return null;
			}
		},
		isBreakable: true,
		rating: 2,
		num: 175,
	},
	swiftswim: {
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		name: "Swift Swim",
		rating: 3,
		num: 33,
	},
	symbiosis: {
		onAllyAfterUseItem(item, pokemon) {
			if (pokemon.switchFlag) return;
			const source = this.effectState.target;
			const myItem = source.takeItem();
			if (!myItem) return;
			if (
				!this.singleEvent('TakeItem', myItem, source.itemData, pokemon, source, this.effect, myItem) ||
				!pokemon.setItem(myItem)
			) {
				source.item = myItem.id;
				return;
			}
			this.add('-activate', source, 'ability: Symbiosis', myItem, '[of] ' + pokemon);
		},
		name: "Symbiosis",
		rating: 0,
		num: 180,
	},
	synchronize: {
		onAfterSetStatus(status, target, source, effect) {
			if (!source || source === target) return;
			if (effect && effect.id === 'toxicspikes') return;
			if (status.id === 'slp' || status.id === 'frz') return;
			this.add('-activate', target, 'ability: Synchronize');
			// Hack to make status-prevention abilities think Synchronize is a status move
			// and show messages when activating against it.
			source.trySetStatus(status, target, {status: status.id, id: 'synchronize'} as Effect);
		},
		name: "Synchronize",
		rating: 2,
		num: 28,
	},
	swordofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Sword of Ruin');
		},
		onAnyModifyDef(def, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (target.hasAbility('Sword of Ruin')) return;
			if (!move.ruinedDef?.hasAbility('Sword of Ruin')) move.ruinedDef = abilityHolder;
			if (move.ruinedDef !== abilityHolder) return;
			this.debug('Sword of Ruin Def drop');
			return this.chainModify(0.75);
		},
		name: "Sword of Ruin",
		rating: 4.5,
		num: 285,
	},
	tabletsofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Tablets of Ruin');
		},
		onAnyModifyAtk(atk, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Tablets of Ruin')) return;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Tablets of Ruin Atk drop');
			return this.chainModify(0.75);
		},
		name: "Tablets of Ruin",
		rating: 4.5,
		num: 284,
	},
	tangledfeet: {
		shortDesc: "This Pokémon's contact moves have a 30% chance of confusing.",
		// upokecenter says this is implemented as an added secondary effect
		onModifyMove(move, pokemon) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				volatileStatus: 'confusion',
				ability: pokemon.getAbility(),
			});
		},
		isBreakable: true,
		name: "Tangled Feet",
		rating: 1,
		num: 77,
		cfm: true,
	},
	tanglinghair: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Tangling Hair');
				this.boost({spe: -1}, source, target, null, true);
			}
		},
		name: "Tangling Hair",
		rating: 2,
		num: 221,
	},
	technician: {
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			if (basePower <= 60 && !this.field.auraBreak()) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
		name: "Technician",
		rating: 3.5,
		num: 101,
	},
	telepathy: {
		onTryHit(target, source, move) {
			if (target !== source && target.isAlly(source) && move.category !== 'Status') {
				this.add('-activate', target, 'ability: Telepathy');
				return null;
			}
		},
		isBreakable: true,
		name: "Telepathy",
		rating: 0,
		num: 140,
	},
	teravolt: {
		shortDesc: `This Pokémon's moves ignore hindering weather, terrain and target Abilities.\nIf hit by an Electric-type attack; grants immunity, boosts higher of Atk/SpA when hit.`,
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Teravolt');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
			move.ignoreWeather = true;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({[target.storedStats.atk > target.storedStats.spa ? 'atk' : 'spa']: 1})) {
					this.add('-immune', target, '[from] ability: Teravolt');
				}
				return null;
			}
		},
		name: "Teravolt",
		rating: 3.5,
		num: 164,
		cfm: true,
	},
	thermalexchange: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') {
				this.boost({atk: 1});
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Thermal Exchange');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Thermal Exchange');
			}
			return false;
		},
		name: "Thermal Exchange",
		rating: 2.5,
		num: 270,
	},
	thickfat: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		isBreakable: true,
		name: "Thick Fat",
		rating: 3.5,
		num: 47,
	},
	tintedlens: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Tinted Lens boost');
				return this.chainModify(2);
			}
		},
		name: "Tinted Lens",
		rating: 4,
		num: 110,
	},
	torrent: {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Water-type attack.",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's attacking stat is 1.5x with Water attacks.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3 && !this.field.auraBreak()) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		name: "Torrent",
		rating: 2,
		num: 67,
	},
	toughclaws: {
		shortDesc: "This Pokemon's contact moves have their power multiplied by 1.2.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact'] && !this.field.auraBreak()) {
				return this.chainModify(1.2);
			}
		},
		name: "Tough Claws",
		rating: 3.5,
		num: 181,
		cfm: true,
	},
	toxicboost: {
		shortDesc: "Boosts Attack by 50% when poisoned; reduces poison damage to 1/16 HP.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (['psn', 'tox'].includes(attacker.status) && move.category === 'Physical' && !this.field.auraBreak()) {
				return this.chainModify(1.5);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && (effect.id === 'psn' || effect.id === 'tox')) {
				return target.maxhp / 16;
			}
		},
		name: "Toxic Boost",
		rating: 2.5,
		num: 137,
		cfm: true,
	},
	toxicdebris: {
		// onDamagingHit(damage, target, source, move) {
		// 	const side = source.isAlly(target) ? source.side.foe : source.side;
		// 	const toxicSpikes = side.sideConditions['toxicspikes'];
		// 	if (move.category === 'Physical' && (!toxicSpikes || toxicSpikes.layers < 2)) {
		// 		this.add('-activate', target, 'ability: Toxic Debris');
		// 		side.addSideCondition('toxicspikes', target);
		// 	}
		// },
		name: "Toxic Debris",
		rating: 3.5,
		num: 295,
	},
	trace: {
		onStart(pokemon) {
			// n.b. only affects Hackmons
			// interaction with No Ability is complicated: https://www.smogon.com/forums/threads/pokemon-sun-moon-battle-mechanics-research.3586701/page-76#post-7790209
			if (pokemon.adjacentFoes().some(foeActive => foeActive.ability === 'noability')) {
				this.effectState.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp) return;

			const additionalBannedAbilities = [
				// Zen Mode included here for compatability with Gen 5-6
				'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'zenmode',
			];
			const possibleTargets = pokemon.adjacentFoes().filter(target => (
				!target.getAbility().isPermanent && !additionalBannedAbilities.includes(target.ability)
			));
			if (!possibleTargets.length) return;

			const target = this.sample(possibleTargets);
			const ability = target.getAbility();
			this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
			pokemon.setAbility(ability);
		},
		name: "Trace",
		rating: 2.5,
		num: 36,
	},
	transistor: {
		desc: "While this Pokémon is active, the power of Electric-type moves used by any active Pokémon is multiplied by 1.33. This Pokémon's Normal-type moves become Electric-type.",
		shortDesc: "This Pokémon's Normal moves become Electric; all Electric moves on the field +33%.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Transistor');
			this.add('-message', `${pokemon.name}'s Transistor boosts the power of Electric moves!`);
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noBoost = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!this.field.auraBreak() && move.type === 'Normal' && !noBoost.includes(move.id) && !move.isZ)
				move.type = 'Electric';
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Electric' || this.field.auraBreak()) return;
			if (!move.auraBooster) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([0x1547, 0x1000]);
		},
		name: "Transistor",
		rating: 3.5,
		num: 262,
		cfm: true,
	},
	triage: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.flags['heal']) return priority + 3;
		},
		name: "Triage",
		rating: 3.5,
		num: 205,
	},
	truant: {
		onStart(pokemon) {
			pokemon.removeVolatile('truant');
			if (pokemon.activeTurns && (pokemon.moveThisTurnResult !== undefined || !this.queue.willMove(pokemon))) {
				pokemon.addVolatile('truant');
			}
		},
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon) {
			if (pokemon.removeVolatile('truant')) {
				this.add('cant', pokemon, 'ability: Truant');
				return false;
			}
			pokemon.addVolatile('truant');
		},
		condition: {},
		name: "Truant",
		rating: -1,
		num: 54,
	},
	turboblaze: {
		shortDesc: `This Pokémon's moves ignore hindering weather, terrain and target Abilities.\nIf hit by a Fire-type attack: grants immunity, boosts higher of SpA/Atk.`,
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Turboblaze');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
			move.ignoreWeather = true;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({[target.storedStats.atk > target.storedStats.spa ? 'atk' : 'spa']: 1})) {
					this.add('-immune', target, '[from] ability: Turboblaze');
				}
				return null;
			}
		},
		name: "Turboblaze",
		rating: 3.5,
		num: 163,
		cfm: true,
	},
	unaware: {
		name: "Unaware",
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		isBreakable: true,
		rating: 4,
		num: 109,
	},
	unburden: {
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectState.target) return;
			pokemon.addVolatile('unburden');
		},
		onTakeItem(item, pokemon) {
			pokemon.addVolatile('unburden');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('unburden');
		},
		condition: {
			onModifySpe(spe, pokemon) {
				if (!pokemon.item && !pokemon.ignoringAbility()) {
					return this.chainModify(2);
				}
			},
		},
		name: "Unburden",
		rating: 3.5,
		num: 84,
	},
	unnerve: {
		shortDesc: "For one turn, opposing targets cannot use Status moves.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Unnerve');
			this.add('-message', pokemon.name + ' unnerves its foe(s)!');
			for (const foeactive of pokemon.side.foe.active) {
				if (!foeactive || !foeactive.isAdjacent(pokemon)) continue;
				if (foeactive.volatiles['substitute']) {
					this.add('-immune', foeactive, '[msg]');
				} else
					foeactive.addVolatile('unnerve');
			}
		},
		condition: {
			duration: 1,
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.move).category === 'Status') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (move.category === 'Status') {
					this.add('message', attacker.name + " cannot use " + move.name + " due to the foe's Unnerve!");
					return false;
				}
			},
		},
		name: "Unnerve",
		rating: 1.5,
		num: 127,
	},
	unseenfist: {
		shortDesc: "Punch moves: 1.2x damage, ignore protect/substitute/screens",
		onModifyMove(move) {
			if (move.flags['punch']) {
				delete move.flags['protect'];
				move.infiltrates = true;
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch'] && !this.field.auraBreak()) {
				return this.chainModify(1.2);
			}
		},
		name: "Unseen Fist",
		rating: 2,
		num: 260,
		cfm: true,
	},
	vesselofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Vessel of Ruin');
		},
		onAnyModifySpA(spa, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Vessel of Ruin')) return;
			if (!move.ruinedSpA) move.ruinedSpA = abilityHolder;
			if (move.ruinedSpA !== abilityHolder) return;
			this.debug('Vessel of Ruin SpA drop');
			return this.chainModify(0.75);
		},
		name: "Vessel of Ruin",
		rating: 4.5,
		num: 284,
	},
	victorystar: {
		onAnyModifyAccuracyPriority: -1,
		onAnyModifyAccuracy(accuracy, target, source) {
			if (source.isAlly(this.effectState.target) && typeof accuracy === 'number') {
				return this.chainModify([4506, 4096]);
			}
		},
		name: "Victory Star",
		rating: 2,
		num: 162,
	},
	vitalspirit: {
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Vital Spirit');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Vital Spirit');
			}
			return false;
		},
		isBreakable: true,
		name: "Vital Spirit",
		rating: 2,
		num: 72,
	},
	voltabsorb: {
		shortDesc: "Restores 1/4 HP when hit by an Electric move; restores 1/16 HP per turn in Electric Terrain.",
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isTerrain('electricterrain'))
				this.heal(pokemon.maxhp / 16);
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Volt Absorb');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Volt Absorb",
		rating: 3.5,
		num: 10,
		cfm: true,
	},
	wanderingspirit: {
		onDamagingHit(damage, target, source, move) {
			const additionalBannedAbilities = ['hungerswitch', 'illusion', 'neutralizinggas', 'wonderguard'];
			if (source.getAbility().isPermanent || additionalBannedAbilities.includes(source.ability) ||
				target.volatiles['dynamax']
			) {
				return;
			}

			if (this.checkMoveMakesContact(move, source, target)) {
				const sourceAbility = source.setAbility('wanderingspirit', target);
				if (!sourceAbility) return;
				if (target.isAlly(source)) {
					this.add('-activate', target, 'Skill Swap', '', '', '[of] ' + source);
				} else {
					this.add('-activate', target, 'ability: Wandering Spirit', this.dex.abilities.get(sourceAbility).name, 'Wandering Spirit', '[of] ' + source);
				}
				target.setAbility(sourceAbility);
			}
		},
		name: "Wandering Spirit",
		rating: 2.5,
		num: 254,
	},
	waterabsorb: {
		desc: "This Pokemon is immune to Water-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Water-type move.",
		shortDesc: "Restores 1/4 HP when hit by a Water move; restores 1/16 HP per turn in rain.",
		onWeather(target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.maxhp / 16);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Water Absorb');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Water Absorb",
		rating: 3.5,
		num: 11,
		cfm: true,
	},
	waterbubble: {
		desc: "This Pokemon's attacking stat is doubled while using a Water-type attack. If a Pokemon uses a Fire-type attack against this Pokemon, that Pokemon's attacking stat is halved when calculating the damage to this Pokemon. This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
		shortDesc: "This Pokemon's Water power is 2x; it can't be burned; Fire power against it is halved.",
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Fire') mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Water' && !this.field.auraBreak()) {
				return this.chainModify(2);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Water Bubble');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Bubble');
			}
			return false;
		},
		isBreakable: true,
		name: "Water Bubble",
		rating: 4.5,
		num: 199,
	},
	watercompaction: {
		shortDesc: "Boosts higher of Def and Sp. Def when hit by a Water attack; grants immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({[target.storedStats.spd > target.storedStats.def ? 'spd' : 'def']: 1})) {
					this.add('-immune', target, '[from] ability: Water Compaction');
				}
				return null;
			}
		},
		name: "Water Compaction",
		rating: 1.5,
		num: 195,
		cfm: true,
	},
	waterveil: {
		shortDesc: "Cannot be poisoned; any attempt to poison this Pokémon raises higher of SpD/Def.",
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				this.add('-activate', pokemon, 'ability: Water Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!effect || status.id !== 'psn' && status.id !== 'tox') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Veil');
			}
			this.boost({[target.storedStats.def > target.storedStats.spd ? 'def' : 'spd']:1}, target);
			return false;
		},
		isBreakable: true,
		name: "Water Veil",
		rating: 2,
		num: 41,
		cfm: true,
	},
	weakarmor: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.boost({def: -1, spe: 2}, target, target);
			}
		},
		name: "Weak Armor",
		rating: 1,
		num: 133,
	},
	wellbakedbody: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({def: 2})) {
					this.add('-immune', target, '[from] ability: Well-Baked Body');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Well-Baked Body",
		rating: 3.5,
		num: 273,
	},
	whitesmoke: {
		shortDesc: "Prevents any and all stat drops.",
		onTryBoost(boost, target, source, effect) {
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: White Smoke", "[of] " + target);
			}
		},
		isBreakable: true,
		name: "White Smoke",
		rating: 2,
		num: 73,
		cfm: true,
	},
	wimpout: {
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Wimp Out');
		},
		name: "Wimp Out",
		rating: 1,
		num: 193,
	},
	windpower: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['wind']) {
				target.addVolatile('charge');
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				pokemon.addVolatile('charge');
			}
		},
		name: "Wind Power",
		rating: 1,
		num: 277,
	},
	windrider: {
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({atk: 1}, target, target)) {
					this.add('-immune', target, '[from] ability: Wind Rider');
				}
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		name: "Wind Rider",
		rating: 3.5,
		// We do not want Brambleghast to get Infiltrator in Randbats
		num: 274,
	},
	wonderguard: {
		shortDesc: "This Pokemon can only be damaged by supereffective moves and status effects.",
		onDamage(damage, target, source, effect) {
			if (effect && ['stealthrock', 'spikes', 'hail', 'sandstorm', 'lifeorb'].includes(effect.id)) {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			if (move.id === 'skydrop' && !source.volatiles['skydrop']) return;
			this.debug('Wonder Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Wonder Guard');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Wonder Guard",
		rating: 5,
		num: 25,
		cfm: true,
	},
	wonderskin: {
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Status' && typeof accuracy === 'number') {
				this.debug('Wonder Skin - setting accuracy to 50');
				return 50;
			}
		},
		isBreakable: true,
		name: "Wonder Skin",
		rating: 2,
		num: 147,
	},
	zenmode: {
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && !['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && ['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode'); // in case of base Darmanitan-Zen
				pokemon.removeVolatile('zenmode');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['zenmode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];
			if (pokemon.species.baseSpecies === 'Darmanitan' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				if (!pokemon.species.name.includes('Galar')) {
					if (pokemon.species.id !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
				} else {
					if (pokemon.species.id !== 'darmanitangalarzen') pokemon.formeChange('Darmanitan-Galar-Zen');
				}
			},
			onEnd(pokemon) {
				if (['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		isPermanent: true,
		name: "Zen Mode",
		rating: 0,
		num: 161,
	},
	zerotohero: {
		onSwitchOut(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Palafin' || pokemon.transformed) return;
			if (pokemon.species.forme !== 'Hero') {
				pokemon.formeChange('Palafin-Hero', this.effect, true);
			}
		},
		onSwitchIn() {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			if (!this.effectState.switchingIn) return;
			this.effectState.switchingIn = false;
			if (pokemon.baseSpecies.baseSpecies !== 'Palafin' || pokemon.transformed) return;
			if (!this.effectState.heroMessageDisplayed && pokemon.species.forme === 'Hero') {
				this.add('-activate', pokemon, 'ability: Zero to Hero');
				this.effectState.heroMessageDisplayed = true;
			}
		},
		isPermanent: true,
		name: "Zero to Hero",
		rating: 5,
		num: 278,
	},

	// CAP
	mountaineer: {
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Rock' && !target.activeTurns) {
				this.add('-immune', target, '[from] ability: Mountaineer');
				return null;
			}
		},
		isNonstandard: "CAP",
		name: "Mountaineer",
		rating: 3,
		num: -2,
	},
	rebound: {
		isNonstandard: "CAP",
		name: "Rebound",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (this.effectState.target.activeTurns) return;

			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			this.actions.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (this.effectState.target.activeTurns) return;

			if (target.isAlly(source) || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			this.actions.useMove(newMove, this.effectState.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		rating: 3,
		num: -3,
	},
	persistent: {
		isNonstandard: "CAP",
		name: "Persistent",
		// implemented in the corresponding move
		rating: 3,
		num: -4,
	},
};
