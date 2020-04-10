var fs = require('fs');

var newDex = require('./../data/formats-data.js').BattleFormatsData;
var oldDex = require('./../formats-data_cfm.js').BattleFormatsData;

for (const i of Object.keys(oldDex)){
    newDex[i].tier = oldDex[i].tier;
    newDex[i].eventPokemon = oldDex[i].eventPokemon;
    if (newDex[i].isUnreleased && !oldDex[i].isUnreleased) delete newDex[i].isUnreleased;
}

let newKeys = Object.keys(newDex);
let deleteMore = false;

for (const i of newKeys){
	if (deleteMore) delete newDex[i];
	else {
		newDex[i].inherit = true;
		delete newDex[i].doublesTier;
		if (!!newDex[i].unreleasedHidden) newDex[i].unreleasedHidden = "false";
		if (!!newDex[i].isNonstandard && newDex[i].isNonstandard === 'Past') newDex[i].isNonstandard = "false";
	}
	if (i === 'missingno') deleteMore = true;
}

var outputStr = JSON.stringify(newDex);
for (const i of newKeys){
	let strToReplace = '"' + i + '":{';
	let strToReplaceReg = new RegExp(strToReplace, "g");
    outputStr = outputStr.replace(strToReplaceReg, '\n\t' + i + ': {');
}

for (const i of ["battleOnly", "comboMoves", "doublesTier", "encounters", "essentialMove", "eventOnly", "eventPokemon", "exclusiveMoves", "gen", "isGigantamax", "isNonstandard", "isUnreleased", "maleOnlyHidden", "randomBattleMoves", "randomDoubleBattleMoves", "requiredAbility", "requiredItem", "requiredItems", "requiredMove", "tier", "unreleasedHidden"]) {
	let strToReplace = '"' + i + '":';
	let strToReplaceReg = new RegExp(strToReplace, "g");
    outputStr = outputStr.replace(strToReplaceReg, '\n\t\t' + i + ': ');
}
outputStr = outputStr.replace(/"inherit":(\w+)},/g, '\n\t\tinherit: $1,\n\t},');
outputStr = outputStr.replace(/"false"/g, 'false');
outputStr = outputStr.replace('{\n\t', "'use strict';\n\n/**@type {{[k: string]: TemplateFormatsData}} */\nlet BattleFormatsData = {\n\t");
outputStr = outputStr.replace('"inherit":true}}', '\n\t\tinherit: true,\n\t},\n};\n\nexports.BattleFormatsData = BattleFormatsData;\n');

fs.writeFile('formats-data.js', outputStr, function(err){
    if (err) throw err;
    console.log("Done!");
});