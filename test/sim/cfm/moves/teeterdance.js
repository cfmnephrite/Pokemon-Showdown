'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Teeter Dance', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Teeter Dance boosts speed - whether the move succeeds or not', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Grumpig', ability: 'gluttony', moves: ['teeterdance']}],
			[{species: 'Grumpig', ability: 'gluttony', moves: ['splash']}],
		]);
		battle.makeChoices('move teeterdance', 'move splash');
		assert.equal(battle.p1.active[0].boosts.spe, 1);
		assert(battle.p2.active[0].volatiles['confusion']);
		battle.makeChoices('move teeterdance', 'move splash');
		assert.equal(battle.p1.active[0].boosts.spe, 2);
	});
});
