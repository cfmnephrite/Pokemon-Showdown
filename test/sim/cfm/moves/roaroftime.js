'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Roar of Time', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('(Only) Dialga can create a Trick Room effect -and other rooms cannot be made', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Dialga', ability: 'flashfire', moves: ['roaroftime', 'protect', 'rocksmash', 'healpulse']}],
			[{species: 'Ferrothorn', ability: 'icescales',
				moves: ['roaroftime', 'tackle', 'magicroom', 'trickroom', 'wonderroom']}],
		]);
		battle.makeChoices('move protect', 'move roaroftime');
		// Ferrothorn can't create Roar of Time
		assert(!battle.field.getPseudoWeather('roaroftime'));

		battle.makeChoices('move roaroftime', 'move tackle');
		// Dialga CAN create Roar of Time
		assert(battle.field.getPseudoWeather('roaroftime'));

		// Turns 2, 3, 4, 5 - check that Ferrothorn can't create other rooms
		battle.makeChoices('move healpulse', 'move magicroom');
		assert(!battle.field.getPseudoWeather('magicroom'));
		battle.makeChoices('move healpulse', 'move trickroom');
		assert(!battle.field.getPseudoWeather('trickroom'));
		battle.makeChoices('move healpulse', 'move wonderroom');
		assert(!battle.field.getPseudoWeather('wonderroom'));
		battle.makeChoices('move rocksmash', 'move tackle');
		// Ferrothorn should move before Dialga with a resisted move - ergo, Dialga moves last with an SE one
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-supereffective|'));

		// Check that the field effect has expired
		assert(!battle.field.getPseudoWeather('roaroftime'));
	});

	it('Roar of Time is ended by a monster fainting or switching', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Dialga', ability: 'icescale', evs: {spe: 252}, moves: ['roaroftime', 'protect', 'memento']},
				{species: 'Ferrothorn', ability: 'icescales', moves: ['roaroftime', 'protect', 'quickattack']}],
			[{species: 'Ferrothorn', ability: 'icescales', moves: ['recover', 'protect', 'quickattack']}],
		]);
		battle.makeChoices('move roaroftime', 'move recover');
		// Roar of Time has been created
		assert(battle.field.getPseudoWeather('roaroftime'));

		battle.makeChoices('switch Ferrothorn', 'move recover');
		// Dialga switched out - expect no Roar of Time
		assert(!battle.field.getPseudoWeather('roaroftime'));

		// Dialga back, let's try again
		battle.makeChoices('switch Dialga', 'move recover');
		battle.makeChoices('move roaroftime', 'move recover');
		// Roar of Time has been created
		assert(battle.field.getPseudoWeather('roaroftime'));

		battle.makeChoices('move memento', 'move recover');
		// Dialga gone - expect no Roar of Time
		assert(!battle.field.getPseudoWeather('roaroftime'));
	});

	it('Roar of Time does not end on switch/faint if there is another viable Dialga', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Dialga', ability: 'icescale', evs: {spe: 252}, moves: ['roaroftime', 'protect', 'memento']},
				{species: 'Ferrothorn', ability: 'icescales', moves: ['roaroftime', 'protect', 'quickattack']}],
			[{species: 'Dialga', ability: 'icescale', evs: {spe: 252}, moves: ['roaroftime', 'protect', 'memento']},
				{species: 'Ferrothorn', ability: 'icescales', moves: ['roaroftime', 'protect', 'quickattack']}],
		]);
		battle.makeChoices('move roaroftime', 'move protect');
		// Roar of Time has been created
		assert(battle.field.getPseudoWeather('roaroftime'));

		battle.makeChoices('switch Ferrothorn', 'move protect');
		// Dialga switched out - expect Roar of Time to stay
		assert(battle.field.getPseudoWeather('roaroftime'));

		// Second Dialga commits sudoku as first Dialga switches back in; Roar of Time should stay
		battle.makeChoices('switch Dialga', 'move memento');
		assert(battle.field.getPseudoWeather('roaroftime'));
	});
});
