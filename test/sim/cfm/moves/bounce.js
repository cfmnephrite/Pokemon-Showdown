'use strict';

const assert = require('./../../../assert');
const common = require('./../../../common');

let battle;

describe('CFM - Bounce', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('No charge turn for Flying types', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Hoppip', ability: 'chlorophyll', moves: ['bounce']}],
			[{species: 'Magikarp', ability: 'swiftswim', item: 'laggingtail', moves: ['bounce']}],
		]);
		battle.makeChoices('move bounce', 'move bounce');
		assert.fullHP(battle.p1.active[0]); // Magikarp's attack is charging
		assert.false.fullHP(battle.p2.active[0]); // Hoppip's attack has already gone through

		assert.ok(!battle.p1.active[0].volatiles['twoturnmove']); // Hoppip is not in the charging stage
		assert.ok(battle.p2.active[0].volatiles['twoturnmove']); // Magikarp still is
	});
});
