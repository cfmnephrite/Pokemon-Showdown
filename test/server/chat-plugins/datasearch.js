/**
 * Tests for the Data Search chat plugin
 */

'use strict';

const assert = require('../../assert').strict;

const datasearch = require('../../../server/chat-plugins/datasearch');

describe("Datasearch Plugin", () => {
	it('should return pokemon with pivot moves', async () => {
		const cmd = 'ds';
		const target = 'pivot|batonpass';
		const dexSearch = datasearch.testables.runDexsearch(target, cmd, true, `/${cmd} ${target}`, true);
		assert(dexSearch.results.includes('Absol'));
	}).timeout(10000);

	it('should return pokemon with pivot moves, but not baton pass', async () => {
		const cmd = 'ds';
		const target = 'pivot';
		const dexSearch = datasearch.testables.runDexsearch(target, cmd, true, `/${cmd} ${target}`, true);
		assert.false(dexSearch.results.includes('Absol'));
		assert(dexSearch.results.includes('Abra'));
	}).timeout(10000);

	it('should return pivot moves', async () => {
		const cmd = 'ms';
		const target = 'pivot';
		const moveSearch = datasearch.testables.runMovesearch(target, cmd, true, `/${cmd} ${target}`, true);
		assert(moveSearch.results.includes('U-turn'));
	}).timeout(10000);

	it('should not return pivot moves', async () => {
		const cmd = 'ms';
		const target = '!pivot';
		const moveSearch = datasearch.testables.runMovesearch(target, cmd, true, `/${cmd} ${target}`, true);
		assert.false(moveSearch.results.includes('U-turn'));
	}).timeout(10000);

	it('should error', async () => {
		const cmd = 'ms';
		const target = 'pivot|!pivot';
		const moveSearch = datasearch.testables.runMovesearch(target, cmd, true, `/${cmd} ${target}`, true);
		assert(moveSearch.error);
	}).timeout(10000);

	it('should return recoil moves', async () => {
		const cmd = 'ms';
		const target = 'recoil';
		const moveSearch = datasearch.testables.runMovesearch(target, cmd, true, `/${cmd} ${target}`, true);
		assert(moveSearch.results.includes('Brave Bird'));
	}).timeout(10000);

	it('should not return recoil moves', async () => {
		const cmd = 'ms';
		const target = '!recoil';
		const moveSearch = datasearch.testables.runMovesearch(target, cmd, true, `/${cmd} ${target}`, true);
		assert.false(moveSearch.results.includes('Brave Bird'));
	}).timeout(10000);

	it('should return recovery moves', async () => {
		const cmd = 'ms';
		const target = 'recovery';
		const moveSearch = datasearch.testables.runMovesearch(target, cmd, true, `/${cmd} ${target}`, true);
		assert(moveSearch.results.includes('Absorb'));
	}).timeout(10000);

	it('should not return recovery moves', async () => {
		const cmd = 'ms';
		const target = '!recovery';
		const moveSearch = datasearch.testables.runMovesearch(target, cmd, true, `/${cmd} ${target}`, true);
		assert.false(moveSearch.results.includes('Absorb'));
	}).timeout(10000);

	it('should return zrecovery moves', async () => {
		const cmd = 'ms';
		const target = 'zrecovery';
		const moveSearch = datasearch.testables.runMovesearch(target, cmd, true, `/${cmd} ${target}`, true);
		assert(moveSearch.results.includes('Belly Drum'));
	}).timeout(10000);

	it('should not return zrecovery moves', async () => {
		const cmd = 'ms';
		const target = '!zrecovery';
		const moveSearch = datasearch.testables.runMovesearch(target, cmd, true, `/${cmd} ${target}`, true);
		assert.false(moveSearch.results.includes('Belly Drum'));
	}).timeout(10000);
});
