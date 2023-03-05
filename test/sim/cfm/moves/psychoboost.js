'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Psycho Boost', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Deoxys-D can use Psycho Boost', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Deoxys-Defense', ability: 'pressure', moves: ['psychoboost']}],
			[{species: 'Blissey', ability: 'icescales', moves: ['recover', 'splash', 'psychoboost']}],
		]);

		// Deoxys-D: does 100 HP damage
		battle.makeChoices('move psychoboost', 'move splash');
		assert.equal(battle.p2.active[0].hp, battle.p2.active[0].maxhp - 100);

		// Blissey can't use it
		battle.makeChoices('move psychoboost', 'move psychoboost');
		assert.equal(battle.p1.active[0].hp, battle.p1.active[0].maxhp);
	});
});
