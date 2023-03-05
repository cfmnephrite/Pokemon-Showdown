'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe('CFM - Techno Blast', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('Techno Blast changes type depending on the Genesect', function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Genesect', ability: 'protean', moves: ['technoblast']},
			 {species: 'Genesect-Douse', ability: 'protean', moves: ['technoblast']},
			 {species: 'Genesect-Burn', ability: 'protean', moves: ['technoblast']},
			 {species: 'Genesect-Shock', ability: 'protean', moves: ['technoblast']},
			 {species: 'Genesect-Chill', ability: 'protean', moves: ['technoblast']},
			],
			[{species: 'Blissey', ability: 'icescales', moves: ['recover', 'splash']}],
		]);

		// Regular Genesect - Normal-type
		battle.makeChoices('move technoblast', 'move recover');
		assert(battle.p1.active[0].hasType('Normal'));

		// Genesect-Douse - Water-type
		battle.makeChoices('switch 2', 'move splash');
		assert.species(battle.p1.active[0], 'Genesect-Douse');
		battle.makeChoices('move technoblast', 'move recover');
		assert(battle.p1.active[0].hasType('Water'));

		// Genesect-Burn - Fire-type
		battle.makeChoices('switch 3', 'move splash');
		assert.species(battle.p1.active[0], 'Genesect-Burn');
		battle.makeChoices('move technoblast', 'move recover');
		assert(battle.p1.active[0].hasType('Fire'));

		// Genesect-Shock - Electric-type
		battle.makeChoices('switch 4', 'move splash');
		assert.species(battle.p1.active[0], 'Genesect-Shock');
		battle.makeChoices('move technoblast', 'move recover');
		assert(battle.p1.active[0].hasType('Electric'));

		// Genesect-Chill - Ice-type
		battle.makeChoices('switch 5', 'move splash');
		assert.species(battle.p1.active[0], 'Genesect-Chill');
		battle.makeChoices('move technoblast', 'move recover');
		assert(battle.p1.active[0].hasType('Ice'));
	});
});
