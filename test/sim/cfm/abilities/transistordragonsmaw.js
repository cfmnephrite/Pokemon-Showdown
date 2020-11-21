'use strict';

const assert = require('../../../assert');
const common = require('../../../common');

let battle;

describe("CFM - Transistor/Dragon's Maw", function () {
	afterEach(function () {
		battle.destroy();
	});

	it("Dragon's Maw boosts all Dragon moves on the field (unless Aura Break) / affects the user's Normal-type attacks", function () {
		battle = common.mod('cfm').createBattle({gameType: 'doubles'});
		battle.setPlayer('p1', {team: [
			{species: 'Regidrago', ability: 'dragonsmaw', evs: {atk: 32}, moves: ['dragonclaw', 'extremespeed']},
			{species: 'Arcanine', evs: {hp: 72}, ability: 'aurabreak', moves: ['splash']},
			{species: 'Arcanine', evs: {hp: 72}, ability: 'noguard', moves: ['splash']},
			{species: 'Arcanine', evs: {hp: 72}, ability: 'noguard', moves: ['splash']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Flygon', ability: 'noguard', evs: {atk: 112}, moves: ['dragonclaw', 'extremespeed']},
			{species: 'Arcanine', evs: {hp: 72}, ability: 'aurabreak', moves: ['splash']},
			{species: 'Arcanine', evs: {hp: 72}, ability: 'noguard', moves: ['splash']},
			{species: 'Arcanine', evs: {hp: 72}, ability: 'noguard', moves: ['splash']},
		]});

		// Dragon's Maw suppressed
		battle.makeChoices('move dragonclaw 2, move splash', 'move dragonclaw 2, move splash');
		assert(battle.p1.active[1].hp > 0.5 * battle.p1.active[1].maxhp); // Flygon doesn't do more than 50% damage
		assert(battle.p2.active[1].hp > 0.5 * battle.p2.active[1].maxhp); // Regidrago doesn't do more than 50% damage

		// Dragon's Maw released
		battle.makeChoices('move dragonclaw 2, switch 3', 'move dragonclaw 2, switch 3');
		assert(battle.p1.active[1].hp < 0.5 * battle.p1.active[1].maxhp); // Flygon DOES do more than 50% damage - gets the boost
		assert(battle.p2.active[1].hp < 0.5 * battle.p2.active[1].maxhp); // Regidrago also does more than 50%

		// Dragon Maw's effect on a Normal move
		battle.makeChoices('move extremespeed 2, switch 4', 'move extremespeed 2, switch 4');
		assert(battle.p1.active[1].hp > 0.7 * battle.p1.active[1].maxhp); // Flygon's Espeed is not Dragon or boosted
		assert(battle.p2.active[1].hp < 0.5 * battle.p2.active[1].maxhp); // Regidrago also does more than 50% with DM Espeed
	});

	it("Transistor boosts all Electric moves on the field (unless Aura Break) / affects the user's Normal-type attacks", function () {
		battle = common.mod('cfm').createBattle({gameType: 'doubles'});
		battle.setPlayer('p1', {team: [
			{species: 'Regieleki', ability: 'transistor', evs: {spa: 32}, moves: ['thunderbolt', 'triattack']},
			{species: 'Arcanine', evs: {hp: 72}, ability: 'aurabreak', moves: ['splash']},
			{species: 'Arcanine', evs: {hp: 72}, ability: 'noguard', moves: ['splash']},
			{species: 'Arcanine', evs: {hp: 72}, ability: 'noguard', moves: ['splash']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Zapdos', ability: 'noguard', evs: {spa: 32}, moves: ['thunderbolt', 'triattack']},
			{species: 'Arcanine', evs: {hp: 72}, ability: 'aurabreak', moves: ['splash']},
			{species: 'Arcanine', evs: {hp: 72}, ability: 'noguard', moves: ['splash']},
			{species: 'Arcanine', evs: {hp: 72}, ability: 'noguard', moves: ['splash']},
		]});

		// Transistor suppressed
		battle.makeChoices('move thunderbolt 2, move splash', 'move thunderbolt 2, move splash');
		assert(battle.p1.active[1].hp > 0.5 * battle.p1.active[1].maxhp); // Zapdos doesn't do more than 50% damage
		assert(battle.p2.active[1].hp > 0.5 * battle.p2.active[1].maxhp); // Regieleki doesn't do more than 50% damage

		// Transistor released
		battle.makeChoices('move thunderbolt 2, switch 3', 'move thunderbolt 2, switch 3');
		assert(battle.p1.active[1].hp < 0.5 * battle.p1.active[1].maxhp); // Zapdos DOES do more than 50% damage - gets the boost
		assert(battle.p2.active[1].hp < 0.5 * battle.p2.active[1].maxhp); // Regieleki also does more than 50%

		// Transistor's effect on a Normal move
		battle.makeChoices('move triattack 2, switch 4', 'move triattack 2, switch 4');
		assert(battle.p1.active[1].hp > 0.7 * battle.p1.active[1].maxhp); // Zapdos's Tri Attack is not Dragon or boosted
		assert(battle.p2.active[1].hp < 0.5 * battle.p2.active[1].maxhp); // Regieleki also does more than 50% with Transistor Tri Attack
	});
});
