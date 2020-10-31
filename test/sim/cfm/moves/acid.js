'use strict';

const assert = require('./../../../assert');
const common = require('./../../../common');

let battle;

describe('CFM - Acid', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Acid can hit Steel-types super-effectively', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Weezing', ability: 'flashfire', moves: ['acid']}],
			[{species: 'Ferrothorn', ability: 'ironbarbs', moves: ['stealthrock']}],
		]);
		battle.makeChoices('move acid', 'move stealthrock');
		assert(battle.log[battle.lastMoveLine + 1].startsWith('|-supereffective|'));
	});
});
