'use strict';

const assert = require('./../../../assert');
const common = require('./../../../common');

let battle;

describe('CFM - Baneful Bunker', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Baneful Bunker cannot protect against Psychic-type attacks', function () {
		battle = common.mod('cfm').createBattle({gameType: 'doubles'});
		battle.setPlayer('p1', {team: [
			{species: 'Toxapex', ability: 'poisonpoint', moves: ['banefulbunker', 'splash']},
			{species: 'Toxapex', ability: 'poisonpoint', moves: ['banefulbunker', 'memento']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Hypno', ability: 'baddreams', evs: {spe: 4}, moves: ['psybeam', 'splash', 'hypervoice']},
			{species: 'Hypno', ability: 'baddreams', moves: ['psybeam', 'splash', 'nuzzle']},
		]});
		battle.makeChoices("move banefulbunker, move banefulbunker", "move hypervoice, move splash");
		assert.equal(battle.p1.active[0].hp, battle.p1.active[0].maxhp); // Protected against a non-Psychic-type attack
		battle.makeChoices("move splash, move memento 1", "move splash, move splash"); // Reset Baneful Bunker turns

		battle.makeChoices("move banefulbunker", "move psybeam 1, move nuzzle 1");
		assert.false.fullHP(battle.p1.active[0]); // Failed to protect against a Psychic-type attack
		assert.equal(battle.p1.active[0].status, 'par'); // Protection was broken, failed to stop Nuzzle
	});
});
