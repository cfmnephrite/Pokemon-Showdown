const fs = require('fs');
const dex = require('./.data-dist/mods/cfm/pokedex.js').Pokedex;
const oldDex = require('./.data-dist/pokedex.js').Pokedex;
const moves = require('./.data-dist/mods/cfm/moves.js').Moves;
const abilities = require('./.data-dist/mods/cfm/abilities.js').Abilities;
const items = require('././.data-dist/mods/cfm/items.js').Items;
// const complexBans = require('./../../CFM/.data-dist/mods/cfm/rulesets.js').Formats.cfmcomplexbans;
const formatsData = require('./.data-dist/mods/cfm/formats-data.js').FormatsData;
const cfmLearnsets = require('./.data-dist/mods/cfm/learnsets.js').Learnsets;
const vanillaLearnsets = require('./.data-dist/learnsets.js').Learnsets;

const tiers = {CAG: 'AG', CUb: 'Uber', COU: 'OU', CUU: 'UU', CRU: 'RU', CNU: 'NU', CPU: 'PU', CZU: 'ZU', CLC: 'LC'};

// Find differences in learnsets
function getMovesFromAThatAreNotInB(learnsetA, learnsetB) {
	let newMoves = []
	learnsetA.forEach(move => {
		if (!learnsetB.includes(move))
			newMoves.push(move);
	});
	return newMoves;
}

// "Sprite key" from mon id
function getSpriteSrc(id) {
	let output = 'abra';
	if (id === 'pichuspikyeared')
		output = 'https://cdn.bulbagarden.net/upload/b/bb/Spiky-eared_Pichu_DP_1.png';
	else if (dex[id].forme)
		output = xyAniUrl(dex[id].name.toLowerCase());
	else
		output = xyAniUrl(id);

	return output.replace(/'|’/g, "");
}

// Sums stats
function sumStats(statsObj) {
	return Object.values(statsObj).reduce((a, b) => a + b, 0);
}

// Retrieves Smogon gifs from Showdown
function xyAniUrl(key) {
	return `https://play.pokemonshowdown.com/sprites/xyani/${key}.gif`
}
// MONS
let learnsetEntry, learnset, oldLearnset, mon, outputMons = {dex: []};
for (mon of Object.keys(dex).filter(key => dex[key].cfmMoves.length)) {
	learnsetEntry = (cfmLearnsets[mon] ? cfmLearnsets[mon].learnset : null) || cfmLearnsets[dex[mon].baseSpecies.toLowerCase()].learnset,
	vanillaLearnsetEntry = (vanillaLearnsets[mon] ? vanillaLearnsets[mon].learnset : null) || vanillaLearnsets[dex[mon].baseSpecies.toLowerCase()].learnset,
	learnset = Object.keys(learnsetEntry).filter(move => learnsetEntry[move][0] !== "X"),
	oldLearnset = Object.keys(vanillaLearnsetEntry);

	// Abilities have to be overwritten
	let monAbilities = {};
	for (const [key, name] of Object.entries(dex[mon].abilities)) {
		let dexMonAb = Object.values(dex[mon].abilities),
		abilityData = Object.values(abilities).find(ability => ability.name === name),
		abilityId = name.replace(/[^0-9a-z]/gi, "").toLowerCase();

		monAbilities[key] = {
			...abilityData,
			desc:			(dex[mon].cfmAbilitySpecialDesc || {})[abilityId] || abilityData.cfmDesc || abilityData.desc || abilityData.shortDesc || '',
			new:			!Object.values(oldDex[mon].abilities).includes(name),
			specialForMon:	!!(dex[mon].cfmAbilitySpecialDesc || {})[abilityId],
			id:				abilityId,
			last:			dexMonAb.indexOf(name) === (dexMonAb.length - 1),
			key
		};
	}

	// Calculate moves
	let monMoves = [],
	newMoves = getMovesFromAThatAreNotInB(learnset, oldLearnset),
	lostMoves = getMovesFromAThatAreNotInB(oldLearnset, learnset);
	for (const move of (dex[mon].cfmMoves).sort()) {
		let dexMove = moves[move];
		if (!dexMove)
			console.log(`No move ${move} for ${mon}.`);
		else {
			monMoves.push({
				...dexMove,
				id: move,
				new: newMoves.includes(move),
				lost: lostMoves.includes(move),
				specialForMon: !!(dex[mon].cfmMoveSpecialDesc || {})[move],
				desc: (dex[mon].cfmMoveSpecialDesc || {})[move] || dexMove.cfmDesc || dexMove.shortDesc || dexMove.desc || ''
			});
		}
	}

	if (monMoves.length != (mon === 'pikachu' ? 11 : 12))
		console.log(`${mon} has ${monMoves.length} moves`);

	// Custom Z Move, if applicable
	let specialZMove = null;
	if (dex[mon].cfmMoveSpecialZDesc) {
		let dexMove = moves[dex[mon].cfmMoveSpecialZDesc];

		specialZMove = {
			...dexMove,
			cfm: true,
			name: `Z-Move: ${dexMove.name}`,
			specialZMove: true,
			desc: dexMove.cfmDesc || ''
		}
	}

	let gen = 1;
	if (dex[mon].num > 151)
		gen++;
	if (dex[mon].num > 251)
		gen++;
	if (dex[mon].num > 386)
		gen++;
	if (dex[mon].num > 493)
		gen++;
	if (dex[mon].num > 649)
		gen++;
	if (dex[mon].num > 721)
		gen++;
	if (dex[mon].num > 809)
		gen++;

	let num = dex[mon].num;
	if (num < 100)
		num = `0${num}`;
	if (num < 10)
		num = `0${num}`;

	outputMons.dex.push({
		...dex[mon],
		id: mon,
		gen,
		num,
		abilities: monAbilities,
		bst: sumStats(dex[mon].baseStats),
		oldBst: sumStats(oldDex[mon].baseStats),
		statsChanged: (JSON.stringify(dex[mon].baseStats) !== JSON.stringify(oldDex[mon].baseStats)),
		oldStats: oldDex[mon].baseStats,
		tier: tiers[formatsData[mon].tier] || formatsData[mon].tier,
		spriteSrc: getSpriteSrc(mon),
		monMoves,
		specialZMove,
		active: false
	});
}

fs.writeFile('../new_cfm_site/src/assets/dex.json', JSON.stringify(outputMons), function(err){
	if (err) throw err;
	console.log("Dex done!");
});

// MOVES
let outputMoves = {moves: {}};
for (let move of Object.keys(moves)) {
	outputMoves.moves[move] = { ...moves[move], id: move}
}

fs.writeFile('../new_cfm_site/src/assets/moves.json', JSON.stringify(outputMoves), function(err){
	if (err) throw err;
	console.log("Moves done!");
});

// ABILITIES
let outputAbilities = {abilities: {}};
for (let ability of Object.keys(abilities)) {
	outputAbilities.abilities[ability] = { ...abilities[ability], id: ability}
}

fs.writeFile('../new_cfm_site/src/assets/abilities.json', JSON.stringify(outputAbilities), function(err){
	if (err) throw err;
	console.log("Abilities done!");
});
