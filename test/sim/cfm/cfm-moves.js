'use strict';

const assert = require('../../assert').strict,
	cfmDex = require('../../../dist/data/mods/cfm/pokedex').Pokedex,
	movesList = require('../../../dist/data/mods/cfm/moves').Moves;

describe('CFM - notable moves list for mons', function () {
	this.timeout(3000);
	it('All notable moves lists should be valid', function () {
		let badMons = "";
		for (const mon of Object.values(cfmDex).filter(filterMon => filterMon.cfmMoves && filterMon.cfmMoves.length)) {
			if (mon.cfmMoves.length !== (mon.name === 'Pikachu' ? 11 : 12)) {
				badMons += `${mon.name} has ${mon.cfmMoves.length} moves\n`;
			}

			for (const move of mon.cfmMoves) {
				if (!movesList[move])
					badMons += `Move ${move} for ${mon.name}\n`;
			}
		}
		assert.true(!badMons.length, badMons);
	});
});
