'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Snap Trap', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Snap Trap traps the target; heals the user; prevents switching', function () {
		battle = common.mod('cfm').createBattle();
		battle.setPlayer('p1', {team: [
			{species: 'Milotic', ability: 'furcoat', evs: {hp: 20}, moves: ['snaptrap', 'superfang', 'splash']},
			{species: 'Pikachu', ability: 'static', moves: ['thunder']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Carnivine', ability: 'flashfire', evs: {hp: 20}, moves: ['sleeptalk', 'roar', 'snaptrap', 'splash']},
			{species: 'Pikachu', ability: 'static', moves: ['thunder', 'protect']},
		]});
		battle.makeChoices('move superfang', 'move snaptrap');
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-supereffective|'));

		assert(battle.p1.active[0].volatiles['snaptrap']);
		assert.equal(battle.p2.active[0].hp, battle.p2.active[0].maxhp * (5 / 8)); // Heals
		assert.trapped(() => battle.makeChoices('switch pikachu', 'move sleeptalk')); // Snap Trap prevents switching

		battle.makeChoices('move superfang', 'switch pikachu');
		assert(!battle.p1.active[0].volatiles['snaptrap']); // Snap Trap ends upon the "snap trapper" switching
	});

	it('Snap Trap Carnivine resists Bug and Flying', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Carnivine', ability: 'shadowtag', evs: {hp: 20}, moves: ['snaptrap', 'quickattack', 'gust']}],
			[{species: 'Slaking', ability: 'furcoat', evs: {hp: 20}, moves: ['superfang', 'peck', 'strugglebug', 'snaptrap']}],
		]);
		// Carnivine resists Bug and Flying moves
		battle.makeChoices('move quickattack', 'move peck');
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-resisted|'));
		battle.makeChoices('move quickattack', 'move strugglebug');
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-resisted|'));

		// ONLY Carnivine
		battle.makeChoices('move gust', 'move snaptrap');
		assert.false(battle.log[battle.lastMoveLine + 1].startsWith('|-resisted|'));
	});
});
