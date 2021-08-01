'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Desolate Land/Primordial Sea', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Desolate Land - a mon can use Origin Pulse, but not for SE damage', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Groudon', ability: 'desolateland', moves: ['stealthrock']}],
			[{species: 'Magikarp', ability: 'noguard', moves: ['originpulse']}],
		]);

		battle.makeChoices('move stealthrock', 'move originpulse');
		assert(battle.field.isWeather('desolateland'));
		assert.false.ok(battle.log[battle.lastMoveLine + 1].startsWith('|-supereffective|'));
		assert.false.fullHP(battle.p1.active[0]);
	});

	it('Desolate Land - changes to Sunny Day on the switch', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Groudon', ability: 'desolateland', moves: ['tackle']},
			 {species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']},
			],
			[{species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']}],
		]);

		assert(battle.field.isWeather('desolateland'));
		battle.makeChoices('switch 2', 'move protect');
		assert(battle.field.isWeather('sunnyday'));
	});

	it('Primordial Sea - a mon can use Sacred Fire, but not for SE damage', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Parasect', ability: 'primordialsea', moves: ['leechseed']}],
			[{species: 'Magby', ability: 'noguard', moves: ['sacredfire']}],
		]);

		battle.makeChoices('move leechseed', 'move sacredfire');
		assert(battle.field.isWeather('primordialsea'));
		assert.false.ok(battle.log[battle.lastMoveLine + 1].startsWith('|-supereffective|'));
		assert.false.fullHP(battle.p1.active[0]);
	});

	it('Primordial Sea - changes to Rain Dance on the switch', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Kyogre', ability: 'primordialsea', moves: ['tackle']},
			 {species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']},
			],
			[{species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']}],
		]);

		assert(battle.field.isWeather('primordialsea'));
		battle.makeChoices('switch 2', 'move protect');
		assert(battle.field.isWeather('raindance'));
	});
});
