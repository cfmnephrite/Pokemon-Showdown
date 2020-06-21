'use strict';

const assert = require('./../../../assert');
const common = require('./../../../common');

let battle;

describe('CFM - Aeroblast', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Aeroblast is stronger for Lugia', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Lugia', ability: 'deltastream', moves: ['aeroblast']}],
			[{species: 'Ho-oh', ability: 'regenerator', moves: ['roost']}],
		]);
		const move = Dex.getMove('aeroblast');
		// Lugia attacks, move boosted to BP of 100
		let basePower = battle.runEvent('BasePower', battle.p1.active[0], battle.p2.active[0], move, move.basePower, true);
		assert.equal(basePower, 100);
		// Ho-oh attacks, move at default BP of 90
		basePower = battle.runEvent('BasePower', battle.p2.active[0], battle.p1.active[0], move, move.basePower, true);
		assert.equal(basePower, move.basePower);
	});
});
