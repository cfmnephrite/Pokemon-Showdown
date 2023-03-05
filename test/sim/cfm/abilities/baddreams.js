'use strict';

const assert = require('./../../../assert');
const common = require('./../../../common');

let battle;

describe('CFM - Bad Dreams', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('The power of Nightmare is boosted by 50%', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Slowking', ability: 'baddreams', moves: ['nightmare']}],
			[{species: 'Slowking', ability: 'regenerator', moves: ['nightmare']}],
		]);
		battle.makeChoices('move nightmare', 'move nightmare');
		assert(battle.p1.active[0].hp > battle.p1.active[0].maxhp / 2); // W/o Bad Dreams, does less than 50%
		assert(battle.p2.active[0].hp < battle.p2.active[0].maxhp / 2); // With, does more
	}).timeout(10000);

	it('The power of Never-Ending Nightmare is boosted by 50%', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Slowking', evs: {hp: 252, spd: 252}, item: 'ghostiumz', ability: 'baddreams', moves: ['nightmare']}],
			[{species: 'Slowking', evs: {hp: 252, spd: 252}, item: 'ghostiumz', ability: 'regenerator', moves: ['nightmare']}],
		]);
		battle.makeChoices('move nightmare zmove', 'move nightmare zmove');
		assert(battle.p1.active[0].hp > 0.4 * battle.p1.active[0].maxhp); // W/o Bad Dreams, does less than 60%
		assert(battle.p2.active[0].hp < 0.3 * battle.p2.active[0].maxhp); // With, does more than 70%
	}).timeout(10000);
});
