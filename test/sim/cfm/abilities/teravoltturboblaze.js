'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Teravolt/Turboblaze', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Teravolt provides an immunity to Electric attacks', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Slowking', ability: 'baddreams', moves: ['thunderpunch']},
			 {species: 'Slowking', ability: 'moldbreaker', moves: ['thunderpunch']}],
			[{species: 'Zekrom', ability: 'teravolt', moves: ['dragondance']}],
		]);
		battle.makeChoices('move thunderpunch', 'move dragondance');
		assert.fullHP(battle.p2.active[0]);	// Teravolt blocks Electric attacks

		battle.makeChoices('switch 2', 'move dragondance');
		battle.makeChoices('move thunderpunch', 'move dragondance');
		assert.fullHP(battle.p2.active[0]);	// Teravolt cannot be negated by Mold Breaker
	});

	it('Turboblaze provides an immunity to Fire attacks', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Slowking', ability: 'baddreams', moves: ['firepunch']},
			 {species: 'Slowking', ability: 'moldbreaker', moves: ['firepunch']}],
			[{species: 'Reshiram', ability: 'turboblaze', moves: ['dragondance']}],
		]);
		battle.makeChoices('move firepunch', 'move dragondance');
		assert.fullHP(battle.p2.active[0]);	// Turboblaze blocks Fire attacks

		battle.makeChoices('switch 2', 'move dragondance');
		battle.makeChoices('move firepunch', 'move dragondance');
		assert.fullHP(battle.p2.active[0]);	// Turboblaze cannot be negated by Mold Breaker
	});
});
