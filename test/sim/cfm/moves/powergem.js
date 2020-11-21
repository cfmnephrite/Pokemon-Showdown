'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Power Gem', function () {
	afterEach(function () {
		battle.destroy();
	});

	it("Power Gem boosts Grumpig's Sp.Atk", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Grumpig', ability: 'gluttony', evs: {hp: 4, spa: 132}, moves: ['powergem', 'shadowball']}],
			[{species: 'Grumpig', ability: 'gluttony', evs: {hp: 4, spa: 132}, moves: ['shadowball']}],
		]);
		battle.makeChoices('move shadowball', 'move shadowball');
		assert(battle.p1.active[0].hp > 0.5 * battle.p1.active[0].maxhp); // Grumpig deals less than 50% without Power Gem
		assert(battle.p2.active[0].hp < 0.5 * battle.p1.active[0].maxhp); // Grumpig deals MORE than 50% WITH Power Gem
	});
});
