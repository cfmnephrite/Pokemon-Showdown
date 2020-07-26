'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Flower Gift', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Clear day - Cherrim sets the weather and transforms', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Cherrim', ability: 'flowergift', moves: ['sunnyday', 'tackle', 'hail', 'protect']},
			 {species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']},
			],
			[{species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']}],
		]);

		assert.ok(battle.field.isWeather('sunnyday'));
		assert.species(battle.p1.active[0], 'Cherrim-Sunshine');

		battle.makeChoices('move protect', 'move raindance');
		assert.ok(battle.field.isWeather('raindance'));
		assert.species(battle.p1.active[0], 'Cherrim');

		battle.makeChoices('move hail', 'move mudshot');
		assert.ok(battle.field.isWeather('hail'));
		assert.species(battle.p1.active[0], 'Cherrim');

		// Check that other weather persists when Cherrim switches
		battle.makeChoices('switch 2', 'move protect');
		assert.ok(battle.field.isWeather('hail'));
	});

	it('Cherrim weather is permanent', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Cherrim', ability: 'flowergift', moves: ['sunnyday', 'tackle', 'hail', 'protect']},
			 {species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']},
			],
			[{species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']}],
		]);

		assert.ok(battle.field.isWeather('sunnyday'));
		assert.ok(battle.field.weatherData.duration === 0);
	});

	it('Weather fades when Cherrim switches', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Cherrim', ability: 'flowergift', moves: ['sunnyday', 'tackle', 'hail', 'protect']},
			 {species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']},
			],
			[{species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']}],
		]);

		assert.ok(battle.field.isWeather('sunnyday'));
		battle.makeChoices('switch 2', 'move protect');
		assert.ok(!battle.field.isWeather('sunnyday'));
	});
});
