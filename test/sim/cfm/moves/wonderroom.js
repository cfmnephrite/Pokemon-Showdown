'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Wonder Room', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Wonder Room inverts type effectiveness', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Shuckle', ability: 'filter', evs: {spe: 252}, moves: ['wonderroom', 'sludgebomb', 'rockclimb', 'synchronoise']},
				{species: 'Wigglytuff', ability: 'icescales', moves: ['hex', 'quickattack', 'wonderroom']}],
			[{species: 'Shuckle', ability: 'filter', moves: ['surf', 'sludgebomb', 'rockclimb', 'synchronoise']},
				{species: 'Wigglytuff', ability: 'icescales', moves: ['twister', 'quickattack', 'protect']}],
		]);
		battle.makeChoices('move wonderroom', 'move surf');
		// Wonder Room active, type effectiveness inverted
		assert(battle.field.getPseudoWeather('wonderroom'));
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-resisted|'));
		battle.makeChoices('move sludgebomb', 'move sludgebomb');
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-supereffective|'));

		// But not for moves with special typemods...
		battle.makeChoices('move rockclimb', 'move rockclimb');
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-supereffective|'));

		// ...and Synchronoise (+3 is for that move's fancy animations)
		battle.makeChoices('move synchronoise', 'move synchronoise');
		assert(battle.log[battle.lastMoveLine + 3].startsWith('|-supereffective|'));

		// Check that it negates immunities too
		battle.makeChoices('switch 2', 'switch 2');
		battle.makeChoices('move wonderroom', 'move protect'); // Reset Wonder Room
		battle.makeChoices('move hex', 'move quickattack');
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-supereffective|'));
		battle.makeChoices('move quickattack', 'move twister');
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-supereffective|'));
	});
});
