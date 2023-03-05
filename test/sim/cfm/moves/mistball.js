'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Mist Ball', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Mist Ball can hit Fairy-types super-effectively', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Druddigon', ability: 'magicguard', moves: ['mistball']}],
			[{species: 'Tapu Fini', ability: 'mistysurge', moves: ['surf']}],
		]);
		battle.makeChoices('move mistball', 'move surf');
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-supereffective|'));
	});
});
