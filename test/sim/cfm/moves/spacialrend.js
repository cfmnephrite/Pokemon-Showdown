'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Spacial Rend', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('(Only) Palkia can create a Wonder Room effect that inverts type effectiveness -and other rooms cannot be made', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Palkia', ability: 'flashfire', moves: ['spacialrend', 'flamethrower', 'healpulse']}],
			[{species: 'Ferrothorn', ability: 'icescales',
				moves: ['spacialrend', 'magicroom', 'quickattack', 'trickroom', 'wonderroom']}],
		]);
		battle.makeChoices('move healpulse', 'move spacialrend');
		// Ferrothorn can't create Spacial Rend
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-resisted|'));
		assert(!battle.field.getPseudoWeather('spacialrend'));

		battle.makeChoices('move spacialrend', 'move quickattack');
		// Palkia CAN create Spacial Rend
		assert(battle.field.getPseudoWeather('spacialrend'));
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-supereffective|'));

		// Turns 2, 3, 4, 5 - check that Ferrothorn can't create other rooms
		battle.makeChoices('move healpulse', 'move magicroom');
		assert(!battle.field.getPseudoWeather('magicroom'));
		battle.makeChoices('move healpulse', 'move trickroom');
		assert(!battle.field.getPseudoWeather('trickroom'));
		battle.makeChoices('move healpulse', 'move wonderroom');
		assert(!battle.field.getPseudoWeather('wonderroom'));
		battle.makeChoices('move flamethrower', 'move quickattack');
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-resisted|')); // Just to be safe

		// Check that the field effect has expired
		assert(!battle.field.getPseudoWeather('spacialrend'));
	});

	it('Spacial Rend is ended by Palkia fainting or switching', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Palkia', ability: 'icescale', evs: {spe: 252}, moves: ['spacialrend', 'protect', 'memento']},
				{species: 'Ferrothorn', ability: 'icescales', moves: ['spacialrend', 'protect', 'quickattack']}],
			[{species: 'Ferrothorn', ability: 'icescales', moves: ['recover', 'protect', 'quickattack']}],
		]);
		battle.makeChoices('move spacialrend', 'move recover');
		// Spacial Rend has been created
		assert(battle.field.getPseudoWeather('spacialrend'));

		battle.makeChoices('switch Ferrothorn', 'move recover');
		// Palkia switched out - expect no Spacial Rend
		assert(!battle.field.getPseudoWeather('spacialrend'));

		// Palkia back, let's try again
		battle.makeChoices('switch Palkia', 'move recover');
		battle.makeChoices('move spacialrend', 'move recover');
		// Spacial Rend has been created
		assert(battle.field.getPseudoWeather('spacialrend'));

		battle.makeChoices('move memento', 'move recover');
		// Palkia gone - expect no Spacial Rend
		assert(!battle.field.getPseudoWeather('spacialrend'));
	});

	it('Spacial Rend does not end on switch/faint if there is another viable Palkia', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Palkia', ability: 'icescale', evs: {spe: 252}, moves: ['spacialrend', 'protect', 'memento']},
				{species: 'Ferrothorn', ability: 'icescales', moves: ['spacialrend', 'protect', 'quickattack']}],
			[{species: 'Palkia', ability: 'icescale', evs: {spe: 252}, moves: ['spacialrend', 'protect', 'memento']},
				{species: 'Ferrothorn', ability: 'icescales', moves: ['spacialrend', 'protect', 'quickattack']}],
		]);
		battle.makeChoices('move spacialrend', 'move protect');
		// Spacial Rend has been created
		assert(battle.field.getPseudoWeather('spacialrend'));

		battle.makeChoices('switch Ferrothorn', 'move protect');
		// Palkia switched out - expect Spacial Rend to stay
		assert(battle.field.getPseudoWeather('spacialrend'));

		// Second Palkia commits sudoku as first Palkia switches back in; Spacial Rend should stay
		battle.makeChoices('switch Palkia', 'move memento');
		assert(battle.field.getPseudoWeather('spacialrend'));
	});
});
