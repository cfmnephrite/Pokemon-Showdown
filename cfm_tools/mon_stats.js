var fs = require('fs');

var oldDex = require('./../data/mods/cfm/pokedex.js').BattlePokedex;
var newDex = require('./../data/pokedex.js').BattlePokedex;

var allMons = Object.keys(oldDex);

for (const i of allMons){
    newDex[i].types = oldDex[i].types;
    newDex[i].baseStats = oldDex[i].baseStats;
    newDex[i].abilities = oldDex[i].abilities;
    newDex[i].weightkg = oldDex[i].weightkg;
}

var outputStr = JSON.stringify(newDex);
outputStr = outputStr.replace(/"(\w+)":/g, '$1: ');
outputStr = outputStr.replace(/,/g, ',\n\t\t');
for (const i of ['1:', 'H:', 'F:', 'atk:', 'def:', 'spa:', 'spd:', 'spe:']) {
    let strToReplace = '\n\t\t' + i;
    let strToReplaceReg = new RegExp(strToReplace, "g");
    outputStr = outputStr.replace(strToReplaceReg, ' ' + i);
}
outputStr = outputStr.replace(/",\n\t\t"/g, '", "');
for (const i of Object.keys(newDex)){
    let strToReplace = '},\n\t\t' + i + ': {';
    let strToReplaceReg = new RegExp(strToReplace, "g");
    outputStr = outputStr.replace(strToReplaceReg, ',\n\t},\n\t' + i + ': {\n\t\t');
}
outputStr = outputStr.replace('}}', '\n\t}\n};\n\nexports.BattlePokedex = BattlePokedex;');
outputStr = outputStr.replace('{bulbasaur: {', "'use strict';\n\nlet BattlePokedex = {\n\tbulbasaur: {\n\t\t");

fs.writeFile('pokedex.js', outputStr, function(err){
    if (err) throw err;
    console.log("Done!");
});