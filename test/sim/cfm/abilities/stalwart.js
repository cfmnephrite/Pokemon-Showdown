'use strict';

const assert = require('./../../../assert');
const common = require('./../../../common');

let battle;

describe('CFM - Stalwart', function () {
	afterEach(function () {
		battle.destroy();
	});

	for (const move of ['Disable', 'Encore', 'Taunt', 'Torment', 'Attract']) {
		const moveId = move.toLowerCase();

		it(`Stalwart stops ${move}, but only once`, function () {
			battle = common.mod('cfm').createBattle([
				[{species: 'Duraludon', gender: "F", ability: 'stalwart', moves: ['quickattack', 'splash']},
					{species: 'Magikarp', gender: "F", ability: 'stalwart', moves: ['splash']}],
				[{species: 'Sableye', gender: "M", ability: 'stall', moves: [moveId, 'splash']}],
			]);
			battle.makeChoices('move quickattack', `move ${moveId}`);
			assert(!battle.p1.active[0].volatiles[moveId]);
			battle.makeChoices('move quickattack', `move ${moveId}`);
			assert(battle.p1.active[0].volatiles[moveId]);

			// Switch out and back in
			battle.makeChoices('switch Magikarp', 'move splash');
			battle.makeChoices('switch Duraludon', 'move splash');
			battle.makeChoices('move quickattack', `move ${moveId}`);
			assert(!battle.p1.active[0].volatiles[moveId]);
			battle.makeChoices('move quickattack', `move ${moveId}`);
			assert(battle.p1.active[0].volatiles[moveId]);
		});
	}
});
