'use strict';

const assert = require('../../assert').strict;
const TeamValidator = require('../../../dist/sim/team-validator').TeamValidator;
const factorySets = require('../../../data/mods/cfm/cfm-factory-sets');

describe('CFM - Factory Validator', function () {
	this.timeout(30000);
	it('CFM should be a valid format', function () {
		try {
			Dex.formats.getRuleTable(Dex.formats.get('gen8cfmou'));
		} catch (e) {
			e.message = `gen8cfmou: ${e.message}`;
			throw e;
		}
	});
	it('Validate all factory sets', function () {
		let illegalSets = `\nCFM FACTORY ILLEGAL SETS\n\n`, illegalSetsFound = false;
		const tiers = {'Uber': 'ubers', 'OU': 'ou', 'UU': 'uu', 'RU': 'ru', 'NU': 'nu', 'PU': 'pu', 'ZU': 'zu'};
		for (const tier in factorySets) {
			illegalSets += `\\\\ ${tier} \\\\\n\n`;
			for (const mon in factorySets[tier]) {
				for (const subSet in factorySets[tier][mon]["sets"]) {
					const rawSet			= factorySets[tier][mon]["sets"][subSet];
					const setsToValidate	= [];

					if (Array.isArray(rawSet['nature']))
						rawSet['nature'] = rawSet['nature'][0];

					for (const field of ['item', 'ability']) {
						if (!Array.isArray(rawSet[field]))
							rawSet[field] = [rawSet[field]];
					}

					// Check moves for duplicates
					const allMoves = rawSet.moves.flat(), duplicateMoves = [];
					allMoves.forEach(move => {
						if (!duplicateMoves.includes(move) && allMoves.filter(m => m === move).length > 1) {
							duplicateMoves.push(move);
							illegalSetsFound = true;
							illegalSets += `${tier} - ${mon} : ${mon} has multiple copies of ${move}.\n`;
						}
					});

					// Create set for each item/ability/move assortment
					let i = 4;
					for (const item of rawSet['item']) {
						for (const ability of rawSet['ability']) {
							setsToValidate.push({...rawSet, item, ability, moves: allMoves.slice(0, 4)});
							while (i < allMoves.length) {
								setsToValidate.push({...rawSet, item, ability,
									moves: allMoves.slice(i, i + 4),
								});
								i += 4;
							}
						}
					}

					let illegalMsgs = null;
					for (const setToValidate of setsToValidate) {
						illegalMsgs = TeamValidator.get(`gen8cfm${tiers[tier]}`).validateSet(setToValidate);

						for (const illegalMsg of (illegalMsgs || [])) {
							if (!(illegalMsg.includes("multiple copies") ||
								illegalMsg.includes("incompatible with Hidden Power") ||
								illegalMsg.includes("hiddenpowerfairy"))) {
								illegalSetsFound = true;
								illegalSets += `${tier} - ${mon} : ${illegalMsg}\n`;
							}
						}
					}
				}
			}
		}
		assert(!illegalSetsFound, illegalSets);
	});
});
