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
			[{species: 'Shuckle', ability: 'filter', evs: {spe: 252}, moves: ['wonderroom', 'sludgebomb', 'rockclimb', 'synchronoise']}],
			[{species: 'Shuckle', ability: 'filter', moves: ['surf', 'sludgebomb', 'rockclimb', 'synchronoise']}],
		]);
		battle.makeChoices('move wonderroom', 'move surf');
		// Wonder Room active, type effectiveness inverted
		assert.ok(battle.field.getPseudoWeather('wonderroom'));
		assert.ok(battle.log[battle.lastMoveLine + 1].startsWith('|-resisted|'));
		battle.makeChoices('move sludgebomb', 'move sludgebomb');
		assert.ok(battle.log[battle.lastMoveLine + 1].startsWith('|-supereffective|'));

		// But not for moves with special typemods...
		battle.makeChoices('move rockclimb', 'move rockclimb');
		assert.ok(battle.log[battle.lastMoveLine + 1].startsWith('|-supereffective|'));

		// ...and Synchronoise (+3 is for that move's fancy animations)
		battle.makeChoices('move synchronoise', 'move synchronoise');
		assert.ok(battle.log[battle.lastMoveLine + 3].startsWith('|-supereffective|'));
	});
});
