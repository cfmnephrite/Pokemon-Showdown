'use strict';

const assert = require('./../../../assert');
const common = require('./../../../common');

let battle;

describe('CFM Z-Moves', function () {
	afterEach(function () {
		battle.destroy();
	});

	it("Zeraora can use Plasma Fists with any Electric move", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Zeraora', ability: 'toughclaws', item: 'electriumz', moves: ['thunderbolt', 'protect']}],
			[{species: 'Zeraora', ability: 'toughclaws', item: 'electriumz', moves: ['slash', 'protect']}],
		]);

		// First try special Zeraora
		battle.makeChoices('move thunderbolt zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'plasmafists');
		assert(battle.field.isTerrain('electricterrain'));

		// Then physical Zeraora
		battle.makeChoices('move protect', 'move slash zmove');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'plasmafists');
	});

	it("Mew can use Genesis Supernova with any Psychic move", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Mew', ability: 'synchronize', item: 'mewniumz', moves: ['psybeam', 'protect']}],
			[{species: 'Mew', ability: 'synchronize', item: 'mewniumz', moves: ['headbutt', 'protect']}],
		]);

		// First try special Mew
		battle.makeChoices('move psybeam zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'genesissupernova');
		assert(battle.field.isTerrain('psychicterrain'));

		// Then physical Zeraora
		battle.makeChoices('move protect', 'move headbutt zmove');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'genesissupernova');
	});

	it("Aolan Raichu can use SS off of any Special Electric move", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Raichu-Alola', ability: 'surgesurfer', item: 'aloraichiumz', moves: ['discharge', 'protect']}],
			[{species: 'Raichu-Alola', ability: 'surgesurfer', item: 'aloraichiumz', moves: ['nuzzle', 'protect']}],
		]);

		// First try Special Raichu - do we get Surfer?
		battle.makeChoices('move discharge zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'stokedsparksurfer');

		// Then physical Raichu - this should not work
		try {
			battle.makeChoices('move protect', 'move nuzzle zmove');
			assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'stokedsparksurfer');
		} catch (e) {
			assert(e.message.includes("can't use Nuzzle as a Z-move"));
		}
	});

	it("Snorlax can use Pulverising Pancake off of any Physical Normal move", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Snorlax', ability: 'thickfat', item: 'snorliumz', moves: ['tackle', 'protect']}],
			[{species: 'Snorlax', ability: 'thickfat', item: 'snorliumz', moves: ['round', 'protect']}],
		]);

		// First try Physical Snorlax - do we get Pancake?
		battle.makeChoices('move tackle zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'pulverizingpancake');

		// Then special Snorlax - this should not work
		try {
			battle.makeChoices('move protect', 'move round zmove');
			assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'pulverizingpancake');
		} catch (e) {
			assert(e.message.includes("can't use Round as a Z-move"));
		}
	});

	it("Zekrom can use Bolt Strike", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Zekrom', ability: 'thickfat', item: 'electriumz', moves: ['fusionbolt', 'protect']}],
			[{species: 'Zekrom', ability: 'thickfat', item: 'electriumz', moves: ['thunderbolt', 'protect']}],
		]);

		// First try Fusion Bolt - do we get Bolt Strike?
		battle.makeChoices('move fusionbolt zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'boltstrike');

		// Then other Electric move - should get Gigavolt
		battle.makeChoices('move protect', 'move thunderbolt zmove');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'gigavolthavoc');
	});

	it("Reshiram can use Blue Flare", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Reshiram', ability: 'thickfat', item: 'firiumz', moves: ['fusionflare', 'protect']}],
			[{species: 'Reshiram', ability: 'thickfat', item: 'firiumz', moves: ['ember', 'protect']}],
		]);

		// First try Fusion Flare - do we get Blue Flare?
		battle.makeChoices('move fusionflare zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'blueflare');

		// Then other Fire move - should get Inferno
		battle.makeChoices('move protect', 'move ember zmove');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'infernooverdrive');
	});

	it("Victini can use V-Create", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Victini', ability: 'thickfat', item: 'firiumz', moves: ['searingshot', 'protect']}],
			[{species: 'Victini', ability: 'thickfat', item: 'firiumz', moves: ['ember', 'protect']}],
		]);

		// First try Searing Shot - do we get V-Create?
		battle.makeChoices('move searingshot zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'vcreate');

		// Then other Fire move - should get Inferno
		battle.makeChoices('move protect', 'move ember zmove');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'infernooverdrive');
	});

	it("Zygarde can use Land's Wrath", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Zygarde-10%', ability: 'thickfat', item: 'groundiumz', moves: ['thousandarrows', 'protect']}],
			[{species: 'Zygarde-Complete', ability: 'thickfat', item: 'groundiumz', moves: ['mudslap', 'protect']}],
		]);

		// First try Thousand Arrows - do we get Land's Wrath?
		battle.makeChoices('move thousandarrows zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'landswrath');

		// Then other Ground move - should get Tectonic Rage
		battle.makeChoices('move protect', 'move mudslap zmove');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'tectonicrage');
	});

	it("Zygarde can use Land's Wrath - and it traps its target", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Zygarde-Complete', ability: 'thickfat', item: 'groundiumz', moves: ['thousandwaves', 'protect', 'bulldoze']}],
			[{species: 'Togekiss', ability: 'thickfat', moves: ['extremespeed', 'protect']}],
		]);

		// First try Thousand Waves - do we get Land's Wrath?
		battle.makeChoices('move thousandwaves zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'landswrath');

		// The Togekiss is now grounded, so Bulldoze hits it
		battle.makeChoices('move bulldoze', 'move extremespeed');
		assert(!battle.log[battle.lastMoveLine + 1].startsWith('|-immune|'));
	});

	it("Necrozma (and only regular Necrozma) can use Prismatic Laser", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Necrozma', ability: 'icescales', item: 'ultranecroziumz', moves: ['photongeyser', 'protect']}],
			[{species: 'Necrozma-Ultra', ability: 'icescales', item: 'ultranecroziumz', moves: ['photongeyser', 'protect']}],
		]);

		// First try base Necrozma - do we get Prismatic Laser?
		battle.makeChoices('move photongeyser zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'prismaticlaser');

		// Then try Ultra Necrozma - should get Light That Burns The Sky
		battle.makeChoices('move protect', 'move photongeyser zmove');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'lightthatburnsthesky');
	});

	it("Omnitype moves", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Muk', ability: 'thickfat', item: 'poisoniumz', moves: ['slash', 'protect']}],
			[{species: 'Nincada', ability: 'thickfat', item: 'buginiumz', moves: ['slash', 'protect']}],
		]);

		// Does Muk use Acid Downpour?
		battle.makeChoices('move slash zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'aciddownpour');

		// Does Nincada use Savage Spinout?
		battle.makeChoices('move protect', 'move slash zmove');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'savagespinout');
	});

	it("Power of Alchemy moves", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Muk-Alola', ability: 'powerofalchemy', item: 'poisoniumz', moves: ['shadowsneak', 'protect']}],
			[{species: 'Nincada', ability: 'powerofalchemy', item: 'buginiumz', moves: ['ironhead', 'protect']}],
		]);

		// Does Muk use Acid Downpour?
		battle.makeChoices('move shadowsneak zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'aciddownpour');

		// Does Nincada use Savage Spinout?
		battle.makeChoices('move protect', 'move ironhead zmove');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'savagespinout');
	});

	it("-ate moves", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Emolga', ability: 'aerilate', item: 'flyiniumz', moves: ['tackle', 'protect']}],
			[{species: 'Xerneas', ability: 'fairyaura', item: 'fairiumz', moves: ['tackle', 'protect']}],
		]);

		// Does Emolga use Skystrike?
		battle.makeChoices('move tackle zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'supersonicskystrike');

		// Does Xerneas use Twinkle?
		battle.makeChoices('move protect', 'move tackle zmove');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'twinkletackle');
	});

	it("Aura break and Aura abilities - prevents using a Z Move", function () {
		battle = common.mod('cfm').createBattle([
			[{species: 'Zygarde', ability: 'aurabreak', item: 'groundiumz', moves: ['thousandarrows', 'protect']}],
			[{species: 'Yveltal', ability: 'darkaura', item: 'darkiumz', moves: ['tackle', 'protect']}],
		]);

		// Does Zygarde use Land's Wrath?
		battle.makeChoices('move thousandarrows zmove', 'move protect');
		assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'landswrath');

		// Dark Z Move Yveltal - this should not work
		try {
			battle.makeChoices('move protect', 'move tackle zmove');
			assert.equal(toID(battle.log[battle.lastMoveLine].split('|')[3]), 'blackholeeclipse');
		} catch (e) {
			assert(e.message.includes("can't use Tackle as a Z-move"));
		}
	});
});
