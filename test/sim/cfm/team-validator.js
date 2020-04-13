'use strict';

const assert = require('../../assert').strict;
const TeamValidator = require('../../../.sim-dist/team-validator').TeamValidator;

describe('CFM - Team Validator', function () {
	it('CFM should be a valid format', function () {
		try {
			Dex.getRuleTable(Dex.getFormat('gen8cfmou'));
		} catch (e) {
			e.message = `${format}: ${e.message}`;
			throw e;
		}
	});
	it('should allow for CFM learnsets', function () {
		let team = [
			{species: 'pikachu', ability: "static", moves: ['catastropika'], evs: {hp: 1}},
		];
		let illegal = TeamValidator.get('gen8cfmou').validateTeam(team);
		assert(!illegal);
	});

	it('should account for moves that can only be learned by prevolutions', function () {
		let team = [
			{species: 'raichu', ability: "static", moves: ['catastropika'], evs: {hp: 1}},
		];
		let illegal = TeamValidator.get('gen8cfmou').validateTeam(team);
		assert(illegal);
	});
});
