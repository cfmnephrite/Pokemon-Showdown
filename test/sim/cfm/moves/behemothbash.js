'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Behemoth Bash', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Behemoth Bash can deal damage from Defence', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Zamazenta-Crowned', ability: 'noguard', evs: {def: 100}, moves: ['behemothbash']}],
			[{species: 'Heatran', ability: 'icescales', evs: {spd: 252}, moves: ['splash']}],
		]);
		battle.makeChoices('move behemothbash', 'move splash');
		assert.fainted(battle.p2.active[0]);
	});

	it('Behemoth Bash can deal damage from Sp. Def', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Zamazenta-Crowned', ability: 'noguard', evs: {spd: 184}, moves: ['behemothbash']}],
			[{species: 'Heatran', ability: 'furcoat', evs: {def: 252}, moves: ['splash']}],
		]);
		battle.makeChoices('move behemothbash', 'move splash');
		assert.fainted(battle.p2.active[0]);
	});
});
