'use strict';

const assert = require('../../assert').strict;
const TeamValidator = require('../../../.sim-dist/team-validator').TeamValidator;

describe('CFM - Team Validator', function () {
	it('CFM should be a valid format', function () {
		try {
			Dex.getRuleTable(Dex.getFormat('gen8cfmou'));
		} catch (e) {
			e.message = `gen8cfmou: ${e.message}`;
			throw e;
		}
	});
	it('should allow for CFM learnsets', function () {
		const team = [
			{species: 'pikachu', ability: "static", moves: ['catastropika'], evs: {hp: 1}},
		];
		const illegal = TeamValidator.get('gen8cfmou').validateTeam(team);
		assert(!illegal);
	});

	it('should account for moves that can only be learned by prevolutions', function () {
		const team = [
			{species: 'raichu', ability: "static", moves: ['catastropika'], evs: {hp: 1}},
		];
		const illegal = TeamValidator.get('gen8cfmou').validateTeam(team);
		assert(illegal);
	});
});
