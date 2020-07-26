'use strict';

const assert = require('./../../../assert');
const common = require('./../../../common');

let battle;

describe('CFM - Forecast', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Clear day - Castform sets the weather and transforms', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Castform', ability: 'forecast', moves: ['raindance', 'tackle', 'hail', 'protect']},
			 {species: 'Ninetales', ability: 'flashfire', moves: ['sunnyday', 'ember', 'protect']},
			],
			[{species: 'Ninetales', ability: 'flashfire', moves: ['sunnyday', 'ember', 'sandstorm', 'protect']}],
		]);

		assert.ok(battle.field.isWeather('raindance'));
		assert.species(battle.p1.active[0], 'Castform-Rainy');

		battle.makeChoices('move tackle', 'move sunnyday');
		assert.ok(battle.field.isWeather('sunnyday'));
		assert.species(battle.p1.active[0], 'Castform-Sunny');

		battle.makeChoices('move hail', 'move ember');
		assert.ok(battle.field.isWeather('hail'));
		assert.species(battle.p1.active[0], 'Castform-Snowy');
		// Check that weather persists when Castform switches
		battle.makeChoices('switch 2', 'move protect');
		assert.ok(battle.field.isWeather('hail'));

		battle.makeChoices('switch 2', 'move sandstorm');
		assert.ok(battle.field.isWeather('sandstorm'));
		assert.species(battle.p1.active[0], 'Castform');
	});

	it('Castform weather is permanent', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Castform', ability: 'forecast', moves: ['sunnyday', 'tackle', 'raindance', 'protect']},
			 {species: 'Ninetales', ability: 'flashfire', moves: ['sunnyday', 'ember', 'protect']},
			],
			[{species: 'Ninetales', ability: 'flashfire', moves: ['sunnyday', 'ember', 'protect']}],
		]);

		assert.ok(battle.field.isWeather('sunnyday'));
		assert.ok(battle.field.weatherData.duration === 0);
	});

	it('Weather fades when Castform switches', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Castform', ability: 'forecast', moves: ['hail', 'tackle', 'raindance', 'protect']},
			 {species: 'Ninetales', ability: 'flashfire', moves: ['sunnyday', 'ember', 'protect']},
			],
			[{species: 'Ninetales', ability: 'flashfire', moves: ['sunnyday', 'ember', 'protect']}],
		]);

		assert.ok(battle.field.isWeather('hail'));
		battle.makeChoices('switch 2', 'move protect');
		assert.ok(!battle.field.isWeather('hail'));
	});
});
