// Note: These are the rules that formats use

import {Utils} from "../../../lib";
import {Pokemon} from "../../../sim/pokemon";
import {Teams} from "../../../sim/teams";

// The list of formats is stored in config/formats.js
export const Rulesets: {[k: string]: ModdedFormatData} = {

	// Rulesets
	///////////////////////////////////////////////////////////////////

	standard: {
		effectType: 'ValidatorRule',
		name: 'Standard',
		ruleset: [
			'Obtainable', 'Team Preview', 'Sleep Clause Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Items Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
		],
	},

	// CFM Rules
	cfmcomplexbans: {
		effectType: 'Rule',
		name: 'CFM Complex Bans',
		desc: "Implements CFM's complex bans",
		onValidateSet(set, format) {
			const allTiers: {[k: string]: number} = {PU: 0, NU: 1, RU: 2, UU: 3, OU: 4, Ub: 5};
			const currTier = format.name.substr(format.name.indexOf("CFM "), 6).substr(-2);
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const tv = this;
			const speciesRef = this.toID((function () {
				const currSpecies = tv.dex.species.get(set.species), currItem = tv.dex.items.get(set.item);
				if (currSpecies?.forme === 'Mega')
					return currSpecies;
				else if (currItem?.megaEvolves === currSpecies?.baseSpecies)
					return currItem.megaStone;
				else
					return currSpecies?.baseSpecies;
			})());
			const complexBans: {[mon: string]: {tier: string, [condition: string]: string | string[]}} = {
				// abilities -
				volcarona:		{tier: 'OU', ability: 'drought'},
				mew:			{tier: 'OU', ability: 'illusion'},
				cherrim:		{tier: 'UU', ability: 'flowergift'},
				// items
				cloyster:		{tier: 'OU', items: ['kingsrock', 'razorfang']},
				cincinno:		{tier: 'OU', items: ['kingsrock', 'razorfang']},
				// moves
				arceus:			{tier: 'Ub', move: 'hyperbeam'},
				porygonz:		{tier: 'OU', move: 'hyperbeam'},
				crawdaunt:		{tier: 'OU', move: 'guillotine'},
			};
			if (!!complexBans[speciesRef] && allTiers[currTier] <= allTiers[complexBans[speciesRef].tier]) {
				if (complexBans[speciesRef].ability === this.toID(set.ability)) {
					const ability = set.ability;
					return [`${set.name || speciesRef} is not allowed to run ${ability} in C${complexBans[speciesRef].tier} or below.`];
				}
				if (complexBans[speciesRef].item === this.toID(set.item) ||
					complexBans[speciesRef].items?.includes(this.toID(set.item))) {
					return [`${set.name || speciesRef} is not allowed to hold ${set.item} in C${complexBans[speciesRef].tier} or below.`];
				}
				for (const move of set.moves) {
					if (complexBans[speciesRef].move === this.toID(move) ||
						complexBans[speciesRef].moves?.includes(this.toID(move))) {
						const moveName = this.dex.moves.get(move).name;
						return [`${set.name || speciesRef} is not allowed to use ${moveName} in C${complexBans[speciesRef].tier} or below.`];
					}
				}
			}
		},
	},
};
