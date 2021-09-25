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

		assert(battle.field.isWeather('sunnyday'));
		assert.species(battle.p1.active[0], 'Cherrim-Sunshine');

		battle.makeChoices('move protect', 'move raindance');
		assert(battle.field.isWeather('raindance'));
		assert.species(battle.p1.active[0], 'Cherrim');

		battle.makeChoices('move hail', 'move mudshot');
		assert(battle.field.isWeather('hail'));
		assert.species(battle.p1.active[0], 'Cherrim');

		// Check that other weather persists when Cherrim switches
		battle.makeChoices('switch 2', 'move protect');
		assert(battle.field.isWeather('hail'));
	});

	it('Cherrim weather is permanent', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Cherrim', ability: 'flowergift', moves: ['sunnyday', 'tackle', 'hail', 'protect']},
			 {species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']},
			],
			[{species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']}],
		]);

		assert(battle.field.isWeather('sunnyday'));
		assert.equal(battle.field.weatherState.duration, 0);
	}).timeout(10000);

	it('Weather fades when Cherrim switches', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Cherrim', ability: 'flowergift', moves: ['sunnyday', 'tackle', 'hail', 'protect']},
			 {species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']},
			],
			[{species: 'Swampert', ability: 'dryskin', moves: ['raindance', 'mudshot', 'protect']}],
		]);

		assert(battle.field.isWeather('sunnyday'));
		battle.makeChoices('switch 2', 'move protect');
		assert(!battle.field.isWeather('sunnyday'));
	});
});
