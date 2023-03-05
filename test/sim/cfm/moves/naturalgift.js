'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Natural Gift', function () {
	afterEach(function () {
		battle.destroy();
	});

	it(`Natural Gift does not consume the user's item`, function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Weezing', ability: 'flashfire', moves: ['haze']}],
			[{species: 'Ferrothorn', ability: 'ironbarbs', item: 'occaberry', moves: ['naturalgift']}],
		]);
		battle.makeChoices('move haze', 'move naturalgift');
		assert.statStage(battle.p1.active[0], 'spa', 1);
		assert.holdsItem(battle.p2.active[0], "The attacker still has their berry");
	});
});
