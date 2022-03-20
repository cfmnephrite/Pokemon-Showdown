export function getCategoryCFM(move: string | Move, source: Pokemon) {
	const dexMove = Dex.moves.get(move);
	let output = dexMove.category || 'Physical';
	if (source && dexMove.flags['magic']) {
		if (dexMove.overrideOffensiveStat === 'def' && source.getStat('spd') > source.getStat('def')) output = 'Special';
		else if (dexMove.overrideOffensiveStat === 'spd' && source.getStat('def') > source.getStat('spd')) output = 'Physical';
		else if (output === 'Physical' && source.getStat('spa') > source.getStat('atk')) output = 'Special';
		else if (output === 'Special' && source.getStat('atk') > source.getStat('spa')) output = 'Physical';
	}
	return output;
}
