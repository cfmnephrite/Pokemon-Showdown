'use strict';

const assert = require('./../../../assert');
const common = require('./../../../common');

let battle;

describe('CFM - Nightmare', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Nightmare effect is applied automatically', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Hoppip', ability: 'noguard', moves: ['hypnosis', 'nightmare', 'wakeupslap', 'splash']}],
			[{species: 'Magikarp', ability: 'earlybird', item: 'laggingtail', moves: ['hypnosis', 'splash']}],
		]);
		battle.makeChoices('move hypnosis', 'move hypnosis');
		assert.equal(battle.p2.active[0].status, 'slp');
		assert.false.fullHP(battle.p2.active[0]); // Nightmare effect has already caused damage
		const nightmareHp = battle.p2.active[0].hp; // Make sure the effect stops after Magikarp wakes up

		// Magikarp won't automatically set the Nightmare status on Hoppip
		battle.makeChoices('move splash', 'move hypnosis');
		assert.equal(battle.p1.active[0].status, 'slp');
		assert.fullHP(battle.p1.active[0]); // No Nightmare effect
		assert.equal(battle.p2.active[0].hp, nightmareHp); // Magikarp has woken up and no longer has Nightmare
	}).timeout(10000);
});
