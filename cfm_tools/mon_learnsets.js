var fs = require('fs');

var cfmLearnsets = require('./../data/mods/cfm/learnsets.js').BattleLearnsets;
var newLearnsets = require('./../data/learnsets.js').BattleLearnsets;

var allMons = Object.keys(newLearnsets);

allMons.forEach(function(mon){
    if (cfmLearnsets[mon] !== undefined){
        currMonMoves = Object.keys(newLearnsets[mon].learnset);
        cfmMonMoves = Object.keys(cfmLearnsets[mon].learnset);

        // Go through CFM moves; add learnset additions to the vanilla moveset
        cfmMonMoves.forEach(function(move){
            if(newLearnsets[mon].learnset[move] === undefined){
                newLearnsets[mon].learnset[move] = cfmLearnsets[mon].learnset[move];
                if (cfmLearnsets[mon].learnset[move][0][0] == 7){
                    var lrn8 = '8' + cfmLearnsets[mon].learnset[move][0].substr(1);
                    newLearnsets[mon].learnset[move].unshift(lrn8);
                }
            }
        });

        // Go through the vanilla moves; remove learned moves that aren't in CFM i.e. deleted moves
        currMonMoves.forEach(function(move){
            if(cfmLearnsets[mon].learnset[move] === undefined)
            {
                var newGen8 = false;
                newLearnsets[mon].learnset[move].forEach(function(learn){
                    if(learn[0] == 8) newGen8 = true;
                    else newGen8 = false;
                })

                if (newGen8 == false)
                    delete newLearnsets[mon].learnset[move];
            }

        });

        // Sort the learnset
        var ABCLearnset = {};
        sortMoves = Object.keys(newLearnsets[mon].learnset).sort();
        sortMoves.forEach(function(move){
            ABCLearnset[move] = newLearnsets[mon].learnset[move];
        });
        newLearnsets[mon].learnset = ABCLearnset;
}});

// Convert object into string
var outputStr = JSON.stringify(newLearnsets);
outputStr = outputStr.replace(/}},"/g, ',\n\t}},\n\t');
outputStr = outputStr.replace(/","/g, '", "');
outputStr = outputStr.replace(/":/g, ': ');
outputStr = outputStr.replace(/"learnset: {"/g, 'learnset: {\n\t\t');
outputStr = outputStr.replace(/],"/g, '],\n\t\t');
outputStr = outputStr.replace(/{"missingno/g, "'use strict'\n\nexports.BattleLearnsets = {\n\tmissingno");
outputStr = outputStr.replace(/}}}/g, '\n\t}},\n};\n');

fs.writeFile('learnsets.js', outputStr, function(err){
    if (err) throw err;
    console.log("Done!");
});
