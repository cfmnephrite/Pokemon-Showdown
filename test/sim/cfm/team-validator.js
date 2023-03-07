'use strict';

const assert = require('../../assert').strict;
const TeamValidator = require('../../../dist/sim/team-validator').TeamValidator;

describe('CFM - Team Validator', function () {
	it('CFM should be a valid format', function () {
		try {
			Dex.formats.getRuleTable(Dex.formats.get('gen8cfmou'));
		} catch (e) {
			e.message = `gen8cfmou: ${e.message}`;
			throw e;
		}
	}).timeout(10000);
	it('should allow for CFM learnsets', function () {
		const team = [
			{species: 'pikachu', ability: "static", moves: ['catastropika'], evs: {hp: 1}},
		];
		const illegal = TeamValidator.get('gen8cfmou').validateTeam(team);
		assert(!illegal);
	}).timeout(10000);

	it('should account for moves that can only be learned by prevolutions', function () {
		const team = [
			{species: 'raichu', ability: "static", moves: ['catastropika'], evs: {hp: 1}},
		];
		const illegal = TeamValidator.get('gen8cfmou').validateTeam(team);
		assert(illegal);
	});

	it('CFM complex bans', function () {
		// abilities - OU
		let team = [
			{species: 'volcarona', ability: "drought", moves: ['fireblast'], evs: {hp: 1}},
		];
		let illegal = TeamValidator.get('gen8cfmou').validateTeam(team);
		assert(illegal);

		// items
		team = [
			{species: 'cloyster', ability: "skilllink", moves: ['iciclespear'], item: "kingsrock", evs: {hp: 1}},
		];
		illegal = TeamValidator.get('gen8cfmou').validateTeam(team);
		assert(illegal);

		// moves
		team = [
			{species: 'porygonz', ability: "download", moves: ['hyperbeam'], evs: {hp: 1}},
		];
		illegal = TeamValidator.get('gen8cfmou').validateTeam(team);
		assert(illegal);
	});
});
