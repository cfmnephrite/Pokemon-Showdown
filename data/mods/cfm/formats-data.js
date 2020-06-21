'use strict';

/**@type {{[k: string]: ModdedSpeciesFormatsData}} */
let BattleFormatsData = {
	bulbasaur: {
		tier: "CLC",
		inherit: true,
	},
	ivysaur: {
		tier: "NFE",
		inherit: true,
	},
	venusaur: {
		randomBattleMoves: ["gigadrain", "leechseed", "sleeppowder", "sludgebomb", "substitute"],
		tier: "CRU",
		inherit: true,
	},
	venusaurmega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	charmander: {
		tier: "CLC",
		inherit: true,
	},
	charmeleon: {
		tier: "NFE",
		inherit: true,
	},
	charizard: {
		randomBattleMoves: ["acrobatics", "dragondance", "earthquake", "flareblitz"],
		tier: "CNU",
		inherit: true,
	},
	charizardmegax: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	charizardmegay: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	charizardgmax: {
		tier: "New",
		inherit: true,
	},
	squirtle: {
		tier: "CLC",
		inherit: true,
	},
	wartortle: {
		tier: "NFE",
		inherit: true,
	},
	blastoise: {
		randomBattleMoves: ["aurasphere", "hydropump", "icebeam", "rapidspin", "scald", "shellsmash"],
		tier: "CNU",
		inherit: true,
	},
	blastoisemega: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	caterpie: {
		tier: "CLC",
		inherit: true,
	},
	metapod: {
		tier: "CPU",
		inherit: true,
	},
	butterfree: {
		randomBattleMoves: ["airslash", "bugbuzz", "energyball", "hurricane", "quiverdance", "sleeppowder"],
		tier: "CNU",
		inherit: true,
	},
	butterfreegmax: {
		tier: "New",
		inherit: true,
	},
	weedle: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	kakuna: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	beedrill: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	beedrillmega: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	pidgey: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	pidgeotto: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	pidgeot: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	pidgeotmega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	rattata: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	rattataalola: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	raticate: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	raticatealola: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	raticatealolatotem: {
		isNonstandard: null,
		inherit: true,
	},
	spearow: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	fearow: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	ekans: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	arbok: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	pichu: {
		tier: "CLC",
		inherit: true,
	},
	pichuspikyeared: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	pikachu: {
		randomBattleMoves: ["grassknot", "surf", "thunderbolt", "voltswitch", "volttackle"],
		tier: "CPU",
		inherit: true,
	},
	raichu: {
		randomBattleMoves: ["encore", "focusblast", "grassknot", "nastyplot", "thunderbolt", "voltswitch"],
		tier: "CPU",
		inherit: true,
	},
	raichualola: {
		randomBattleMoves: ["focusblast", "nastyplot", "psychic", "surf", "thunderbolt", "voltswitch"],
		tier: "CNU",
		inherit: true,
	},
	sandshrew: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	sandshrewalola: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	sandslash: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	sandslashalola: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	nidoranf: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	nidorina: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	nidoqueen: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	nidoranm: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	nidorino: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	nidoking: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	cleffa: {
		tier: "CLC",
		inherit: true,
	},
	clefairy: {
		tier: "CPU",
		inherit: true,
	},
	clefable: {
		randomBattleMoves: ["calmmind", "fireblast", "moonblast", "moonlight", "stealthrock", "thunderwave"],
		tier: "COU",
		inherit: true,
	},
	vulpix: {
		tier: "CLC",
		inherit: true,
	},
	vulpixalola: {
		tier: "CLC",
		inherit: true,
	},
	ninetales: {
		randomBattleMoves: ["fireblast", "nastyplot", "solarbeam", "substitute", "willowisp"],
		tier: "CNU",
		inherit: true,
	},
	ninetalesalola: {
		randomBattleMoves: ["auroraveil", "blizzard", "freezedry", "moonblast", "nastyplot", "substitute"],
		tier: "CNU",
		inherit: true,
	},
	igglybuff: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	jigglypuff: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	wigglytuff: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	zubat: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	golbat: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	crobat: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	oddish: {
		tier: "CLC",
		inherit: true,
	},
	gloom: {
		tier: "NFE",
		inherit: true,
	},
	vileplume: {
		randomBattleMoves: ["aromatherapy", "gigadrain", "leechseed", "sleeppowder", "sludgebomb", "strengthsap"],
		tier: "CRU",
		inherit: true,
	},
	bellossom: {
		randomBattleMoves: ["gigadrain", "moonblast", "quiverdance", "sleeppowder", "strengthsap"],
		tier: "CRU",
		inherit: true,
	},
	paras: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	parasect: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	venonat: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	venomoth: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	diglett: {
		tier: "CLC",
		inherit: true,
	},
	diglettalola: {
		tier: "CLC",
		inherit: true,
	},
	dugtrio: {
		randomBattleMoves: ["earthquake", "memento", "reversal", "stealthrock", "stoneedge", "substitute"],
		tier: "COU",
		inherit: true,
	},
	dugtrioalola: {
		randomBattleMoves: ["earthquake", "ironhead", "stoneedge", "substitute", "suckerpunch"],
		tier: "CNU",
		inherit: true,
	},
	meowth: {
		tier: "CLC",
		inherit: true,
	},
	meowthalola: {
		tier: "CLC",
		inherit: true,
	},
	meowthgalar: {
		tier: "LC",
		inherit: true,
	},
	meowthgmax: {
		tier: "New",
		inherit: true,
	},
	persian: {
		randomBattleMoves: ["hypervoice", "icywind", "nastyplot", "taunt", "thunderbolt"],
		tier: "CPU",
		inherit: true,
	},
	persianalola: {
		randomBattleMoves: ["darkpulse", "hypnosis", "nastyplot", "powergem", "thunderbolt"],
		tier: "CNU",
		inherit: true,
	},
	perrserker: {
		randomBattleMoves: ["closecombat", "crunch", "gunkshot", "ironhead", "playrough", "swordsdance", "uturn"],
		tier: "New",
		inherit: true,
	},
	psyduck: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	golduck: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	mankey: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	primeape: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	growlithe: {
		tier: "CLC",
		inherit: true,
	},
	arcanine: {
		randomBattleMoves: ["closecombat", "crunch", "extremespeed", "flareblitz", "morningsun", "roar", "wildcharge", "willowisp"],
		tier: "CUU",
		inherit: true,
	},
	poliwag: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	poliwhirl: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	poliwrath: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	politoed: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	abra: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	kadabra: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	alakazam: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	alakazammega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	machop: {
		tier: "CLC",
		inherit: true,
	},
	machoke: {
		tier: "CPU",
		inherit: true,
	},
	machamp: {
		randomBattleMoves: ["bulletpunch", "dynamicpunch", "knockoff", "stoneedge", "substitute"],
		tier: "CUU",
		inherit: true,
	},
	machampgmax: {
		tier: "New",
		inherit: true,
	},
	bellsprout: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	weepinbell: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	victreebel: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	tentacool: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	tentacruel: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	geodude: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	geodudealola: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	graveler: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	graveleralola: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	golem: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	golemalola: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	ponyta: {
		tier: "CLC",
		inherit: true,
	},
	ponytagalar: {
		tier: "LC",
		inherit: true,
	},
	rapidash: {
		randomBattleMoves: ["flareblitz", "highhorsepower", "morningsun", "swordsdance", "wildcharge", "willowisp"],
		tier: "CPU",
		inherit: true,
	},
	rapidashgalar: {
		randomBattleMoves: ["highhorsepower", "morningsun", "playrough", "swordsdance", "zenheadbutt"],
		tier: "New",
		inherit: true,
	},
	slowpoke: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	slowbro: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	slowbromega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	slowking: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	magnemite: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	magneton: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	magnezone: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	farfetchd: {
		randomBattleMoves: ["bodyslam", "bravebird", "closecombat", "knockoff", "leafblade", "roost", "swordsdance"],
		tier: "CNU",
		inherit: true,
	},
	farfetchdgalar: {
		tier: "LC",
		inherit: true,
	},
	sirfetchd: {
		randomBattleMoves: ["bravebird", "closecombat", "firstimpression", "knockoff", "swordsdance"],
		tier: "New",
		inherit: true,
	},
	doduo: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	dodrio: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	seel: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	dewgong: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	grimer: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	grimeralola: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	muk: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	mukalola: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	shellder: {
		tier: "CLC",
		inherit: true,
	},
	cloyster: {
		randomBattleMoves: ["hydropump", "iciclespear", "pinmissile", "rockblast", "shellsmash"],
		tier: "CRU",
		inherit: true,
	},
	gastly: {
		tier: "CLC",
		inherit: true,
	},
	haunter: {
		tier: "CPU",
		inherit: true,
	},
	gengar: {
		randomBattleMoves: ["focusblast", "nastyplot", "shadowball", "sludgewave", "substitute", "willowisp"],
		tier: "COU",
		inherit: true,
	},
	gengarmega: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	gengargmax: {
		tier: "New",
		inherit: true,
	},
	onix: {
		tier: "CLC",
		inherit: true,
	},
	steelix: {
		randomBattleMoves: ["curse", "earthquake", "ironhead", "rockslide", "stealthrock"],
		tier: "CNU",
		inherit: true,
	},
	steelixmega: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	drowzee: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	hypno: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	krabby: {
		tier: "CLC",
		inherit: true,
	},
	kingler: {
		randomBattleMoves: ["liquidation", "xscissor", "rockslide", "swordsdance", "agility", "superpower", "knockoff"],
		tier: "CNU",
		inherit: true,
	},
	kinglergmax: {
		tier: "New",
		inherit: true,
	},
	voltorb: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	electrode: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	exeggcute: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	exeggutor: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	exeggutoralola: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	cubone: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	marowak: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	marowakalola: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	marowakalolatotem: {
		isNonstandard: null,
		inherit: true,
	},
	tyrogue: {
		tier: "CLC",
		inherit: true,
	},
	hitmonlee: {
		randomBattleMoves: ["fakeout", "highjumpkick", "machpunch", "poisonjab", "rapidspin", "stoneedge", "throatchop"],
		tier: "CRU",
		inherit: true,
	},
	hitmonchan: {
		randomBattleMoves: ["bulkup", "drainpunch", "firepunch", "icepunch", "machpunch", "rapidspin"],
		tier: "CRU",
		inherit: true,
	},
	hitmontop: {
		randomBattleMoves: ["bulletpunch", "closecombat", "machpunch", "rapidspin", "stoneedge", "suckerpunch"],
		tier: "CRU",
		inherit: true,
	},
	lickitung: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	lickilicky: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	koffing: {
		tier: "CLC",
		inherit: true,
	},
	weezing: {
		randomBattleMoves: ["defog", "fireblast", "painsplit", "sludgebomb", "toxicspikes", "willowisp"],
		tier: "CNU",
		inherit: true,
	},
	weezinggalar: {
		randomBattleMoves: ["defog", "fireblast", "painsplit", "sludgebomb", "strangesteam", "toxicspikes", "willowisp"],
		tier: "New",
		inherit: true,
	},
	rhyhorn: {
		tier: "CLC",
		inherit: true,
	},
	rhydon: {
		tier: "CNU",
		inherit: true,
	},
	rhyperior: {
		randomBattleMoves: ["earthquake", "firepunch", "megahorn", "rockblast", "rockpolish", "stealthrock", "stoneedge"],
		tier: "CRU",
		inherit: true,
	},
	happiny: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	chansey: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	blissey: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	tangela: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	tangrowth: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	kangaskhan: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	kangaskhanmega: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	horsea: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	seadra: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	kingdra: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	goldeen: {
		unreleasedHidden: false,
		tier: "CLC",
		inherit: true,
	},
	seaking: {
		randomBattleMoves: ["drillrun", "megahorn", "swordsdance", "throatchop", "waterfall"],
		unreleasedHidden: false,
		tier: "CPU",
		inherit: true,
	},
	staryu: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	starmie: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	mimejr: {
		tier: "CLC",
		inherit: true,
	},
	mrmime: {
		randomBattleMoves: ["dazzlinggleam", "encore", "focusblast", "healingwish", "nastyplot", "psychic", "shadowball"],
		tier: "CPU",
		inherit: true,
	},
	mrmimegalar: {
		tier: "NFE",
		inherit: true,
	},
	mrrime: {
		randomBattleMoves: ["focusblast", "icebeam", "nastyplot", "psychic", "rapidspin", "shadowball", "slackoff", "thunderbolt"],
		tier: "New",
		inherit: true,
	},
	scyther: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	scizor: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	scizormega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	smoochum: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	jynx: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	elekid: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	electabuzz: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	electivire: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	magby: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	magmar: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	magmortar: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	pinsir: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	pinsirmega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	tauros: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	magikarp: {
		tier: "CLC",
		inherit: true,
	},
	gyarados: {
		randomBattleMoves: ["dragondance", "earthquake", "powerwhip", "stoneedge", "substitute", "waterfall"],
		tier: "COU",
		inherit: true,
	},
	gyaradosmega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	lapras: {
		randomBattleMoves: ["freezedry", "icebeam", "sparklingaria", "substitute", "thunderbolt"],
		tier: "CNU",
		inherit: true,
	},
	laprasgmax: {
		tier: "New",
		inherit: true,
	},
	ditto: {
		randomBattleMoves: ["transform"],
		tier: "CPU",
		inherit: true,
	},
	eevee: {
		tier: "CLC",
		inherit: true,
	},
	eeveestarter: {
		isNonstandard: "LGPE",
		tier: "Illegal",
		inherit: true,
	},
	eeveegmax: {
		tier: "New",
		inherit: true,
	},
	vaporeon: {
		randomBattleMoves: ["haze", "icebeam", "protect", "scald", "wish", "yawn"],
		tier: "CNU",
		inherit: true,
	},
	jolteon: {
		randomBattleMoves: ["raindance", "shadowball", "thunder", "voltswitch", "weatherball"],
		tier: "CRU",
		inherit: true,
	},
	flareon: {
		randomBattleMoves: ["facade", "flareblitz", "quickattack", "superpower"],
		tier: "CPU",
		inherit: true,
	},
	espeon: {
		randomBattleMoves: ["calmmind", "dazzlinggleam", "morningsun", "psychic", "shadowball"],
		tier: "CRU",
		inherit: true,
	},
	umbreon: {
		randomBattleMoves: ["foulplay", "protect", "taunt", "wish"],
		tier: "CRU",
		inherit: true,
	},
	leafeon: {
		randomBattleMoves: ["doubleedge", "leafblade", "swordsdance", "synthesis", "xscissor"],
		tier: "CPU",
		inherit: true,
	},
	glaceon: {
		randomBattleMoves: ["freezedry", "icebeam", "protect", "shadowball", "wish"],
		tier: "CPU",
		inherit: true,
	},
	sylveon: {
		randomBattleMoves: ["hypervoice", "mysticalfire", "protect", "psyshock", "shadowball", "wish"],
		tier: "CUU",
		inherit: true,
	},
	porygon: {
		isNonstandard: null,
		inherit: true,
	},
	porygon2: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	porygonz: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	omanyte: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	omastar: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	kabuto: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	kabutops: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	aerodactyl: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	aerodactylmega: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	munchlax: {
		tier: "CLC",
		inherit: true,
	},
	snorlax: {
		randomBattleMoves: ["bodyslam", "curse", "darkestlariat", "earthquake", "firepunch", "rest", "sleeptalk"],
		tier: "CRU",
		inherit: true,
	},
	articuno: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	zapdos: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	moltres: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	dratini: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	dragonair: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	dragonite: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	mewtwo: {
		randomBattleMoves: ["aurasphere", "icebeam", "nastyplot", "psystrike", "recover"],
		tier: "CUb",
		inherit: true,
	},
	mewtwomegax: {
		isNonstandard: null,
		inherit: true,
	},
	mewtwomegay: {
		isNonstandard: null,
		inherit: true,
	},
	mew: {
		randomBattleMoves: ["closecombat", "megahorn", "powerwhip", "psychicfangs", "swordsdance", "uturn"],
		tier: "COU",
		inherit: true,
	},
	chikorita: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	bayleef: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	meganium: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	cyndaquil: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	quilava: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	typhlosion: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	totodile: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	croconaw: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	feraligatr: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	sentret: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	furret: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	hoothoot: {
		tier: "CLC",
		inherit: true,
	},
	noctowl: {
		randomBattleMoves: ["defog", "heatwave", "hurricane", "nastyplot", "roost", "whirlwind"],
		tier: "CRU",
		inherit: true,
	},
	ledyba: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	ledian: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	spinarak: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	ariados: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	chinchou: {
		tier: "CLC",
		inherit: true,
	},
	lanturn: {
		randomBattleMoves: ["hydropump", "icebeam", "scald", "thunderbolt", "thunderwave", "voltswitch"],
		tier: "CNU",
		inherit: true,
	},
	togepi: {
		tier: "CLC",
		inherit: true,
	},
	togetic: {
		tier: "CPU",
		inherit: true,
	},
	togekiss: {
		randomBattleMoves: ["airslash", "aurasphere", "morningsun", "nastyplot", "thunderwave"],
		tier: "COU",
		inherit: true,
	},
	natu: {
		tier: "CLC",
		inherit: true,
	},
	xatu: {
		randomBattleMoves: ["heatwave", "lightscreen", "psychic", "reflect", "roost", "thunderwave", "uturn"],
		tier: "CUU",
		inherit: true,
	},
	mareep: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	flaaffy: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	ampharos: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	ampharosmega: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	azurill: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	marill: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	azumarill: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	bonsly: {
		tier: "CLC",
		inherit: true,
	},
	sudowoodo: {
		randomBattleMoves: ["earthquake", "headsmash", "stealthrock", "suckerpunch", "woodhammer"],
		tier: "CPU",
		inherit: true,
	},
	hoppip: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	skiploom: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	jumpluff: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	aipom: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	ambipom: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	sunkern: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	sunflora: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	yanma: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	yanmega: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	wooper: {
		tier: "CLC",
		inherit: true,
	},
	quagsire: {
		randomBattleMoves: ["earthquake", "encore", "icebeam", "recover", "scald", "toxic"],
		tier: "CNU",
		inherit: true,
	},
	murkrow: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	honchkrow: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	misdreavus: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	mismagius: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	unown: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	wynaut: {
		tier: "CLC",
		inherit: true,
	},
	wobbuffet: {
		randomBattleMoves: ["counter", "destinybond", "encore", "mirrorcoat"],
		tier: "CNU",
		inherit: true,
	},
	girafarig: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	pineco: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	forretress: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	dunsparce: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	gligar: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	gliscor: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	snubbull: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	granbull: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	qwilfish: {
		randomBattleMoves: ["destinybond", "liquidation", "spikes", "taunt", "thunderwave", "toxic", "toxicspikes"],
		tier: "CRU",
		inherit: true,
	},
	shuckle: {
		randomBattleMoves: ["encore", "infestation", "knockoff", "stealthrock", "stickyweb", "toxic"],
		tier: "CRU",
		inherit: true,
	},
	heracross: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	heracrossmega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	sneasel: {
		tier: "CRU",
		inherit: true,
	},
	weavile: {
		randomBattleMoves: ["iceshard", "iciclecrash", "lowkick", "swordsdance", "throatchop"],
		tier: "COU",
		inherit: true,
	},
	teddiursa: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	ursaring: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	slugma: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	magcargo: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	swinub: {
		tier: "CLC",
		inherit: true,
	},
	piloswine: {
		tier: "CNU",
		inherit: true,
	},
	mamoswine: {
		randomBattleMoves: ["earthquake", "iceshard", "iciclecrash", "stealthrock", "superpower"],
		tier: "CUU",
		inherit: true,
	},
	corsola: {
		randomBattleMoves: ["lightscreen", "reflect", "recover", "scald", "stealthrock"],
		tier: "CRU",
		inherit: true,
	},
	corsolagalar: {
		tier: "LC",
		inherit: true,
	},
	cursola: {
		tier: "New",
		inherit: true,
	},
	remoraid: {
		tier: "CLC",
		inherit: true,
	},
	octillery: {
		randomBattleMoves: ["energyball", "fireblast", "gunkshot", "hydropump", "icebeam", "rockblast"],
		tier: "CNU",
		inherit: true,
	},
	delibird: {
		randomBattleMoves: ["freezedry", "memento", "rapidspin", "spikes"],
		tier: "COU",
		inherit: true,
	},
	mantyke: {
		tier: "CLC",
		inherit: true,
	},
	mantine: {
		randomBattleMoves: ["airslash", "haze", "mirrorcoat", "roost", "scald", "tailwind"],
		tier: "CNU",
		inherit: true,
	},
	skarmory: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	houndour: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	houndoom: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	houndoommega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	phanpy: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	donphan: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	stantler: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	smeargle: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	miltank: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	raikou: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	entei: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	suicune: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	larvitar: {
		tier: "CLC",
		inherit: true,
	},
	pupitar: {
		tier: "CPU",
		inherit: true,
	},
	tyranitar: {
		randomBattleMoves: ["crunch", "dragondance", "earthquake", "firepunch", "stealthrock", "stoneedge"],
		tier: "COU",
		inherit: true,
	},
	tyranitarmega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	lugia: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	hooh: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	celebi: {
		randomBattleMoves: ["aurasphere", "gigadrain", "leafstorm", "nastyplot", "psychic", "recover", "stealthrock"],
		tier: "CUU",
		inherit: true,
	},
	treecko: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	grovyle: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	sceptile: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	sceptilemega: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	torchic: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	combusken: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	blaziken: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	blazikenmega: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	mudkip: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	marshtomp: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	swampert: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	swampertmega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	poochyena: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	mightyena: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	zigzagoon: {
		tier: "CLC",
		inherit: true,
	},
	zigzagoongalar: {
		tier: "LC",
		inherit: true,
	},
	linoone: {
		randomBattleMoves: ["bellydrum", "extremespeed", "stompingtantrum", "throatchop"],
		tier: "CRU",
		inherit: true,
	},
	linoonegalar: {
		tier: "NFE",
		inherit: true,
	},
	obstagoon: {
		randomBattleMoves: ["closecombat", "doubleedge", "facade", "firepunch", "gunkshot", "knockoff", "obstruct", "partingshot"],
		tier: "New",
		inherit: true,
	},
	wurmple: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	silcoon: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	beautifly: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	cascoon: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	dustox: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	lotad: {
		tier: "CLC",
		inherit: true,
	},
	lombre: {
		tier: "NFE",
		inherit: true,
	},
	ludicolo: {
		randomBattleMoves: ["focusblast", "gigadrain", "hydropump", "icebeam", "raindance", "scald"],
		tier: "CNU",
		inherit: true,
	},
	seedot: {
		tier: "CLC",
		inherit: true,
	},
	nuzleaf: {
		tier: "NFE",
		inherit: true,
	},
	shiftry: {
		randomBattleMoves: ["defog", "leafblade", "leafstorm", "suckerpunch", "swordsdance", "throatchop"],
		tier: "CNU",
		inherit: true,
	},
	taillow: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	swellow: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	wingull: {
		tier: "CLC",
		inherit: true,
	},
	pelipper: {
		randomBattleMoves: ["hurricane", "hydropump", "knockoff", "roost", "scald", "uturn"],
		tier: "CNU",
		inherit: true,
	},
	ralts: {
		tier: "CLC",
		inherit: true,
	},
	kirlia: {
		tier: "NFE",
		inherit: true,
	},
	gardevoir: {
		randomBattleMoves: ["calmmind", "focusblast", "moonblast", "psychic", "substitute", "trick", "willowisp"],
		tier: "CRU",
		inherit: true,
	},
	gardevoirmega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	gallade: {
		randomBattleMoves: ["closecombat", "knockoff", "shadowsneak", "swordsdance", "trick", "zenheadbutt"],
		tier: "CRU",
		inherit: true,
	},
	gallademega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	surskit: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	masquerain: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	shroomish: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	breloom: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	slakoth: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	vigoroth: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	slaking: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	nincada: {
		tier: "CLC",
		inherit: true,
	},
	ninjask: {
		randomBattleMoves: ["acrobatics", "leechlife", "nightslash", "swordsdance"],
		tier: "CRU",
		inherit: true,
	},
	shedinja: {
		randomBattleMoves: ["shadowclaw", "shadowsneak", "swordsdance", "willowisp", "xscissor"],
		tier: "COU",
		inherit: true,
	},
	whismur: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	loudred: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	exploud: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	makuhita: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	hariyama: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	nosepass: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	probopass: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	skitty: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	delcatty: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	sableye: {
		randomBattleMoves: ["encore", "foulplay", "knockoff", "recover", "taunt", "willowisp"],
		tier: "CNU",
		inherit: true,
	},
	sableyemega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	mawile: {
		randomBattleMoves: ["ironhead", "playrough", "suckerpunch", "stealthrock", "swordsdance"],
		tier: "CRU",
		inherit: true,
	},
	mawilemega: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	aron: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	lairon: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	aggron: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	aggronmega: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	meditite: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	medicham: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	medichammega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	electrike: {
		tier: "CLC",
		inherit: true,
	},
	manectric: {
		randomBattleMoves: ["flamethrower", "overheat", "switcheroo", "thunderbolt", "voltswitch"],
		tier: "CNU",
		inherit: true,
	},
	manectricmega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	plusle: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	minun: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	volbeat: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	illumise: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	budew: {
		tier: "CLC",
		inherit: true,
	},
	roselia: {
		tier: "CPU",
		inherit: true,
	},
	roserade: {
		randomBattleMoves: ["gigadrain", "leafstorm", "sleeppowder", "sludgebomb", "spikes", "synthesis", "toxicspikes"],
		tier: "CUU",
		inherit: true,
	},
	gulpin: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	swalot: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	carvanha: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	sharpedo: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	sharpedomega: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	wailmer: {
		tier: "CPU",
		inherit: true,
	},
	wailord: {
		randomBattleMoves: ["hydropump", "hypervoice", "icebeam", "waterspout"],
		tier: "CRU",
		inherit: true,
	},
	numel: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	camerupt: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	cameruptmega: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	torkoal: {
		randomBattleMoves: ["earthquake", "lavaplume", "rapidspin", "solarbeam", "stealthrock"],
		tier: "CPU",
		inherit: true,
	},
	spoink: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	grumpig: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	spinda: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	trapinch: {
		tier: "CLC",
		inherit: true,
	},
	vibrava: {
		tier: "CPU",
		inherit: true,
	},
	flygon: {
		randomBattleMoves: ["dragondance", "earthquake", "firepunch", "outrage", "uturn"],
		tier: "CUU",
		inherit: true,
	},
	cacnea: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	cacturne: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	swablu: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	altaria: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	altariamega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	zangoose: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	seviper: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	lunatone: {
		randomBattleMoves: ["earthpower", "icebeam", "nastyplot", "powergem", "psychic", "rockpolish", "stealthrock"],
		tier: "CRU",
		inherit: true,
	},
	solrock: {
		randomBattleMoves: ["earthquake", "explosion", "morningsun", "rockslide", "stealthrock", "swordsdance", "willowisp", "zenheadbutt"],
		tier: "CRU",
		inherit: true,
	},
	barboach: {
		tier: "CLC",
		inherit: true,
	},
	whiscash: {
		randomBattleMoves: ["dragondance", "earthquake", "liquidation", "stoneedge", "zenheadbutt"],
		tier: "CPU",
		inherit: true,
	},
	corphish: {
		tier: "CLC",
		inherit: true,
	},
	crawdaunt: {
		randomBattleMoves: ["aquajet", "closecombat", "crabhammer", "dragondance", "knockoff", "swordsdance"],
		tier: "CUU",
		inherit: true,
	},
	baltoy: {
		tier: "CLC",
		inherit: true,
	},
	claydol: {
		randomBattleMoves: ["earthquake", "icebeam", "psychic", "rapidspin", "stealthrock"],
		tier: "CNU",
		inherit: true,
	},
	lileep: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	cradily: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	anorith: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	armaldo: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	feebas: {
		tier: "CLC",
		inherit: true,
	},
	milotic: {
		randomBattleMoves: ["dragontail", "icebeam", "recover", "rest", "scald", "sleeptalk"],
		tier: "CRU",
		inherit: true,
	},
	castform: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	castformsunny: {
		tier: "CUU",
		inherit: true,
	},
	castformrainy: {
		tier: "CUU",
		inherit: true,
	},
	castformsnowy: {
		tier: "CUU",
		inherit: true,
	},
	kecleon: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	shuppet: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	banette: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	banettemega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	duskull: {
		tier: "CLC",
		inherit: true,
	},
	dusclops: {
		tier: "NFE",
		inherit: true,
	},
	dusknoir: {
		randomBattleMoves: ["earthquake", "icepunch", "painsplit", "shadowsneak", "substitute", "willowisp"],
		tier: "CRU",
		inherit: true,
	},
	tropius: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	chingling: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	chimecho: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	absol: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	absolmega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	snorunt: {
		tier: "CLC",
		inherit: true,
	},
	glalie: {
		randomBattleMoves: ["earthquake", "freezedry", "iceshard", "spikes", "taunt"],
		tier: "CNU",
		inherit: true,
	},
	glaliemega: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	froslass: {
		randomBattleMoves: ["destinybond", "icebeam", "shadowball", "spikes", "taunt", "thunderwave"],
		tier: "CRU",
		inherit: true,
	},
	spheal: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	sealeo: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	walrein: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	clamperl: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	huntail: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	gorebyss: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	relicanth: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	luvdisc: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	bagon: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	shelgon: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	salamence: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	salamencemega: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	beldum: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	metang: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	metagross: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	metagrossmega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	regirock: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	regice: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	registeel: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	latias: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	latiasmega: {
		isNonstandard: null,
		inherit: true,
	},
	latios: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	latiosmega: {
		isNonstandard: null,
		inherit: true,
	},
	kyogre: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	kyogreprimal: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	groudon: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	groudonprimal: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	rayquaza: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	rayquazamega: {
		isNonstandard: null,
		tier: "CAG",
		inherit: true,
	},
	jirachi: {
		randomBattleMoves: ["bodyslam", "firepunch", "ironhead", "stealthrock", "uturn", "wish"],
		tier: "COU",
		inherit: true,
	},
	deoxys: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	deoxysattack: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	deoxysdefense: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	deoxysspeed: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	turtwig: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	grotle: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	torterra: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	chimchar: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	monferno: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	infernape: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	piplup: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	prinplup: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	empoleon: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	starly: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	staravia: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	staraptor: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	bidoof: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	bibarel: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	kricketot: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	kricketune: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	shinx: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	luxio: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	luxray: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	cranidos: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	rampardos: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	shieldon: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	bastiodon: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	burmy: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	wormadam: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	wormadamsandy: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	wormadamtrash: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	mothim: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	combee: {
		tier: "CLC",
		inherit: true,
	},
	vespiquen: {
		randomBattleMoves: ["airslash", "bugbuzz", "powergem", "sludgebomb", "uturn"],
		tier: "CUU",
		inherit: true,
	},
	pachirisu: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	buizel: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	floatzel: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	cherubi: {
		tier: "CLC",
		inherit: true,
	},
	cherrim: {
		randomBattleMoves: ["dazzlinggleam", "energyball", "healingwish", "leechseed", "substitute"],
		tier: "CPU",
		inherit: true,
	},
	cherrimsunshine: {
		randomBattleMoves: ["dazzlinggleam", "morningsun", "solarbeam", "sunnyday", "weatherball"],
		tier: "COU",
		inherit: true,
	},
	shellos: {
		tier: "CLC",
		inherit: true,
	},
	gastrodon: {
		randomBattleMoves: ["clearsmog", "earthquake", "icebeam", "recover", "scald"],
		tier: "CNU",
		inherit: true,
	},
	drifloon: {
		inherit: true,
	},
	drifblim: {
		randomBattleMoves: ["acrobatics", "destinybond", "shadowball", "strengthsap", "substitute"],
		tier: "CNU",
		inherit: true,
	},
	buneary: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	lopunny: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	lopunnymega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	glameow: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	purugly: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	stunky: {
		tier: "CLC",
		inherit: true,
	},
	skuntank: {
		randomBattleMoves: ["crunch", "fireblast", "poisonjab", "suckerpunch", "taunt", "toxic"],
		tier: "CPU",
		inherit: true,
	},
	bronzor: {
		tier: "CLC",
		inherit: true,
	},
	bronzong: {
		randomBattleMoves: ["earthquake", "gyroball", "lightscreen", "psychic", "reflect", "stealthrock"],
		tier: "CRU",
		inherit: true,
	},
	chatot: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	spiritomb: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	gible: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	gabite: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	garchomp: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	garchompmega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	riolu: {
		tier: "CLC",
		inherit: true,
	},
	lucario: {
		randomBattleMoves: ["closecombat", "extremespeed", "icepunch", "meteormash", "swordsdance"],
		tier: "CUU",
		inherit: true,
	},
	lucariomega: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	hippopotas: {
		tier: "CLC",
		inherit: true,
	},
	hippowdon: {
		randomBattleMoves: ["earthquake", "slackoff", "stealthrock", "stoneedge", "whirlwind", "yawn"],
		tier: "CUU",
		inherit: true,
	},
	skorupi: {
		tier: "CLC",
		inherit: true,
	},
	drapion: {
		randomBattleMoves: ["earthquake", "knockoff", "poisonjab", "swordsdance", "taunt", "toxicspikes"],
		tier: "CRU",
		inherit: true,
	},
	croagunk: {
		tier: "CLC",
		inherit: true,
	},
	toxicroak: {
		randomBattleMoves: ["drainpunch", "gunkshot", "icepunch", "substitute", "suckerpunch", "swordsdance"],
		tier: "CNU",
		inherit: true,
	},
	carnivine: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	finneon: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	lumineon: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	snover: {
		tier: "CLC",
		inherit: true,
	},
	abomasnow: {
		randomBattleMoves: ["auroraveil", "blizzard", "earthquake", "iceshard", "woodhammer"],
		tier: "CPU",
		inherit: true,
	},
	abomasnowmega: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	rotom: {
		randomBattleMoves: ["nastyplot", "shadowball", "storedpower", "thunderbolt"],
		tier: "CRU",
		inherit: true,
	},
	rotomheat: {
		randomBattleMoves: ["overheat", "thunderbolt", "trick", "voltswitch", "willowisp"],
		tier: "CRU",
		inherit: true,
	},
	rotomwash: {
		randomBattleMoves: ["hydropump", "thunderbolt", "trick", "voltswitch", "willowisp"],
		tier: "COU",
		inherit: true,
	},
	rotomfrost: {
		randomBattleMoves: ["blizzard", "thunderbolt", "trick", "voltswitch", "willowisp"],
		tier: "CRU",
		inherit: true,
	},
	rotomfan: {
		randomBattleMoves: ["airslash", "thunderbolt", "trick", "voltswitch", "willowisp"],
		tier: "CRU",
		inherit: true,
	},
	rotommow: {
		randomBattleMoves: ["leafstorm", "thunderbolt", "trick", "voltswitch", "willowisp"],
		tier: "CRU",
		inherit: true,
	},
	uxie: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	mesprit: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	azelf: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	dialga: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	palkia: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	heatran: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	regigigas: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	giratina: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	giratinaorigin: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	cresselia: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	phione: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	manaphy: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	darkrai: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	shaymin: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	shayminsky: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	arceus: {
		isNonstandard: null,
		tier: "CAG",
		inherit: true,
	},
	arceusbug: {
		tier: "CUb",
		inherit: true,
	},
	arceusdark: {
		tier: "CUb",
		inherit: true,
	},
	arceusdragon: {
		tier: "CUb",
		inherit: true,
	},
	arceuselectric: {
		tier: "CUb",
		inherit: true,
	},
	arceusfairy: {
		tier: "CUb",
		inherit: true,
	},
	arceusfighting: {
		tier: "CUb",
		inherit: true,
	},
	arceusfire: {
		tier: "CUb",
		inherit: true,
	},
	arceusflying: {
		tier: "CUb",
		inherit: true,
	},
	arceusghost: {
		tier: "CUb",
		inherit: true,
	},
	arceusgrass: {
		tier: "CUb",
		inherit: true,
	},
	arceusground: {
		tier: "CUb",
		inherit: true,
	},
	arceusice: {
		tier: "CUb",
		inherit: true,
	},
	arceuspoison: {
		tier: "CUb",
		inherit: true,
	},
	arceuspsychic: {
		tier: "CUb",
		inherit: true,
	},
	arceusrock: {
		tier: "CUb",
		inherit: true,
	},
	arceussteel: {
		tier: "CUb",
		inherit: true,
	},
	arceuswater: {
		tier: "CUb",
		inherit: true,
	},
	victini: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	snivy: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	servine: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	serperior: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	tepig: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	pignite: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	emboar: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	oshawott: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	dewott: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	samurott: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	patrat: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	watchog: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	lillipup: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	herdier: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	stoutland: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	purrloin: {
		tier: "CLC",
		inherit: true,
	},
	liepard: {
		randomBattleMoves: ["copycat", "darkpulse", "encore", "nastyplot", "playrough", "substitute", "thunderwave", "uturn"],
		tier: "CNU",
		inherit: true,
	},
	pansage: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	simisage: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	pansear: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	simisear: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	panpour: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	simipour: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	munna: {
		tier: "CLC",
		inherit: true,
	},
	musharna: {
		randomBattleMoves: ["calmmind", "moonblast", "moonlight", "psychic", "shadowball", "thunderwave"],
		tier: "CNU",
		inherit: true,
	},
	pidove: {
		tier: "CLC",
		inherit: true,
	},
	tranquill: {
		tier: "NFE",
		inherit: true,
	},
	unfezant: {
		randomBattleMoves: ["bravebird", "defog", "nightslash", "roost", "uturn"],
		tier: "CNU",
		inherit: true,
	},
	blitzle: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	zebstrika: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	roggenrola: {
		tier: "CLC",
		inherit: true,
	},
	boldore: {
		tier: "NFE",
		inherit: true,
	},
	gigalith: {
		randomBattleMoves: ["earthquake", "explosion", "rockblast", "stealthrock", "stoneedge", "superpower"],
		tier: "CPU",
		inherit: true,
	},
	woobat: {
		tier: "CLC",
		inherit: true,
	},
	swoobat: {
		randomBattleMoves: ["airslash", "heatwave", "nastyplot", "roost", "storedpower"],
		tier: "CPU",
		inherit: true,
	},
	drilbur: {
		tier: "CLC",
		inherit: true,
	},
	excadrill: {
		randomBattleMoves: ["earthquake", "ironhead", "rapidspin", "rockslide", "swordsdance"],
		tier: "COU",
		inherit: true,
	},
	audino: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	audinomega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	timburr: {
		tier: "CLC",
		inherit: true,
	},
	gurdurr: {
		tier: "CPU",
		inherit: true,
	},
	conkeldurr: {
		randomBattleMoves: ["bulkup", "drainpunch", "facade", "machpunch", "stoneedge"],
		tier: "CRU",
		inherit: true,
	},
	tympole: {
		tier: "CLC",
		inherit: true,
	},
	palpitoad: {
		tier: "NFE",
		inherit: true,
	},
	seismitoad: {
		randomBattleMoves: ["earthquake", "liquidation", "raindance", "rockslide", "stealthrock"],
		tier: "CNU",
		inherit: true,
	},
	throh: {
		randomBattleMoves: ["bulkup", "circlethrow", "icepunch", "payback", "rest", "sleeptalk", "stormthrow"],
		tier: "CPU",
		inherit: true,
	},
	sawk: {
		randomBattleMoves: ["bulkup", "closecombat", "poisonjab", "stoneedge", "throatchop"],
		tier: "CNU",
		inherit: true,
	},
	sewaddle: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	swadloon: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	leavanny: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	venipede: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	whirlipede: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	scolipede: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	cottonee: {
		tier: "CLC",
		inherit: true,
	},
	whimsicott: {
		randomBattleMoves: ["encore", "energyball", "leechseed", "moonblast", "stunspore", "uturn"],
		tier: "CRU",
		inherit: true,
	},
	petilil: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	lilligant: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	basculin: {
		randomBattleMoves: ["aquajet", "crunch", "headsmash", "liquidation", "psychicfangs"],
		tier: "CNU",
		inherit: true,
	},
	basculinbluestriped: {
		randomBattleMoves: ["aquajet", "crunch", "headsmash", "liquidation", "psychicfangs"],
		tier: "CNU",
		inherit: true,
	},
	sandile: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	krokorok: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	krookodile: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	darumaka: {
		tier: "CLC",
		inherit: true,
	},
	darumakagalar: {
		tier: "LC",
		inherit: true,
	},
	darmanitan: {
		randomBattleMoves: ["earthquake", "flareblitz", "rockslide", "superpower", "uturn"],
		tier: "CRU",
		inherit: true,
	},
	darmanitanzen: {
		tier: "CRU",
		inherit: true,
	},
	darmanitangalar: {
		randomBattleMoves: ["earthquake", "flareblitz", "iciclecrash", "superpower", "uturn"],
		tier: "New",
		inherit: true,
	},
	darmanitanzengalar: {
		inherit: true,
	},
	maractus: {
		randomBattleMoves: ["solarbeam", "sunnyday", "synthesis", "weatherball"],
		tier: "CPU",
		inherit: true,
	},
	dwebble: {
		tier: "CLC",
		inherit: true,
	},
	crustle: {
		randomBattleMoves: ["earthquake", "shellsmash", "spikes", "stealthrock", "stoneedge", "xscissor"],
		tier: "CPU",
		inherit: true,
	},
	scraggy: {
		tier: "CLC",
		inherit: true,
	},
	scrafty: {
		randomBattleMoves: ["closecombat", "dragondance", "icepunch", "poisonjab", "throatchop"],
		tier: "CRU",
		inherit: true,
	},
	sigilyph: {
		randomBattleMoves: ["cosmicpower", "psychoshift", "roost", "storedpower"],
		tier: "CRU",
		inherit: true,
	},
	yamask: {
		tier: "CLC",
		inherit: true,
	},
	yamaskgalar: {
		tier: "LC",
		inherit: true,
	},
	cofagrigus: {
		randomBattleMoves: ["memento", "shadowball", "toxicspikes", "willowisp"],
		tier: "CRU",
		inherit: true,
	},
	runerigus: {
		randomBattleMoves: ["earthquake", "haze", "nightshade", "stealthrock", "toxicspikes", "willowisp"],
		tier: "New",
		inherit: true,
	},
	tirtouga: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	carracosta: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	archen: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	archeops: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	trubbish: {
		tier: "CLC",
		inherit: true,
	},
	garbodor: {
		randomBattleMoves: ["drainpunch", "gunkshot", "painsplit", "spikes", "toxicspikes"],
		tier: "CNU",
		inherit: true,
	},
	garbodorgmax: {
		tier: "New",
		inherit: true,
	},
	zorua: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	zoroark: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	minccino: {
		tier: "CLC",
		inherit: true,
	},
	cinccino: {
		randomBattleMoves: ["bulletseed", "knockoff", "rockblast", "tailslap", "uturn"],
		tier: "CNU",
		inherit: true,
	},
	gothita: {
		inherit: true,
	},
	gothorita: {
		tier: "NFE",
		inherit: true,
	},
	gothitelle: {
		randomBattleMoves: ["calmmind", "charm", "psychic", "rest"],
		tier: "CPU",
		inherit: true,
	},
	solosis: {
		tier: "CLC",
		inherit: true,
	},
	duosion: {
		tier: "NFE",
		inherit: true,
	},
	reuniclus: {
		randomBattleMoves: ["calmmind", "focusblast", "psychic", "recover", "shadowball", "trickroom"],
		tier: "CUU",
		inherit: true,
	},
	ducklett: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	swanna: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	vanillite: {
		tier: "CLC",
		inherit: true,
	},
	vanillish: {
		tier: "NFE",
		inherit: true,
	},
	vanilluxe: {
		randomBattleMoves: ["auroraveil", "autotomize", "blizzard", "explosion", "flashcannon", "freezedry"],
		tier: "CPU",
		inherit: true,
	},
	deerling: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	sawsbuck: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	emolga: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	karrablast: {
		tier: "CLC",
		inherit: true,
	},
	escavalier: {
		randomBattleMoves: ["closecombat", "drillrun", "ironhead", "knockoff", "megahorn", "swordsdance"],
		tier: "CRU",
		inherit: true,
	},
	foongus: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	amoonguss: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	frillish: {
		tier: "CLC",
		inherit: true,
	},
	jellicent: {
		randomBattleMoves: ["icebeam", "recover", "scald", "shadowball", "willowisp"],
		tier: "CNU",
		inherit: true,
	},
	alomomola: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	joltik: {
		tier: "CLC",
		inherit: true,
	},
	galvantula: {
		randomBattleMoves: ["bugbuzz", "gigadrain", "stickyweb", "thunder", "voltswitch"],
		tier: "CRU",
		inherit: true,
	},
	ferroseed: {
		tier: "CLC",
		inherit: true,
	},
	ferrothorn: {
		randomBattleMoves: ["leechseed", "gyroball", "powerwhip", "protect", "spikes", "stealthrock"],
		tier: "COU",
		inherit: true,
	},
	klink: {
		tier: "CLC",
		inherit: true,
	},
	klang: {
		tier: "NFE",
		inherit: true,
	},
	klinklang: {
		randomBattleMoves: ["geargrind", "shiftgear", "substitute", "wildcharge"],
		tier: "CRU",
		inherit: true,
	},
	tynamo: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	eelektrik: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	eelektross: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	elgyem: {
		tier: "CLC",
		inherit: true,
	},
	beheeyem: {
		randomBattleMoves: ["nastyplot", "psychic", "shadowball", "thunderbolt", "trick", "trickroom"],
		tier: "CPU",
		inherit: true,
	},
	litwick: {
		tier: "CLC",
		inherit: true,
	},
	lampent: {
		tier: "NFE",
		inherit: true,
	},
	chandelure: {
		randomBattleMoves: ["calmmind", "energyball", "fireblast", "shadowball", "substitute", "trick"],
		tier: "CUU",
		inherit: true,
	},
	axew: {
		tier: "CLC",
		inherit: true,
	},
	fraxure: {
		tier: "NFE",
		inherit: true,
	},
	haxorus: {
		randomBattleMoves: ["dragondance", "earthquake", "outrage", "poisonjab", "swordsdance", "taunt"],
		tier: "CUU",
		inherit: true,
	},
	cubchoo: {
		tier: "CLC",
		inherit: true,
	},
	beartic: {
		randomBattleMoves: ["iciclecrash", "liquidation", "raindance", "superpower", "throatchop"],
		tier: "CNU",
		inherit: true,
	},
	cryogonal: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	shelmet: {
		tier: "CLC",
		inherit: true,
	},
	accelgor: {
		randomBattleMoves: ["bugbuzz", "encore", "energyball", "focusblast", "spikes", "toxic"],
		tier: "CNU",
		inherit: true,
	},
	stunfisk: {
		randomBattleMoves: ["discharge", "earthpower", "foulplay", "scald", "stealthrock"],
		tier: "CNU",
		inherit: true,
	},
	stunfiskgalar: {
		randomBattleMoves: ["curse", "earthquake", "painsplit", "rockslide", "stealthrock"],
		tier: "New",
		inherit: true,
	},
	mienfoo: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	mienshao: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	druddigon: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	golett: {
		tier: "CLC",
		inherit: true,
	},
	golurk: {
		randomBattleMoves: ["drainpunch", "earthquake", "icepunch", "shadowpunch", "substitute"],
		tier: "CRU",
		inherit: true,
	},
	pawniard: {
		tier: "CLC",
		inherit: true,
	},
	bisharp: {
		randomBattleMoves: ["ironhead", "substitute", "suckerpunch", "swordsdance", "throatchop"],
		tier: "COU",
		inherit: true,
	},
	bouffalant: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	rufflet: {
		tier: "CLC",
		inherit: true,
	},
	braviary: {
		randomBattleMoves: ["bravebird", "bulkup", "closecombat", "crushclaw", "defog", "rockslide"],
		tier: "CRU",
		inherit: true,
	},
	vullaby: {
		tier: "CLC",
		inherit: true,
	},
	mandibuzz: {
		randomBattleMoves: ["defog", "foulplay", "roost", "taunt", "toxic", "uturn"],
		tier: "CUU",
		inherit: true,
	},
	heatmor: {
		randomBattleMoves: ["fireblast", "firelash", "gigadrain", "suckerpunch", "superpower"],
		tier: "CRU",
		inherit: true,
	},
	durant: {
		randomBattleMoves: ["firstimpression", "ironhead", "rockslide", "superpower"],
		tier: "CRU",
		inherit: true,
	},
	deino: {
		tier: "CLC",
		inherit: true,
	},
	zweilous: {
		tier: "CPU",
		inherit: true,
	},
	hydreigon: {
		randomBattleMoves: ["darkpulse", "dracometeor", "fireblast", "flashcannon", "nastyplot", "uturn"],
		tier: "COU",
		inherit: true,
	},
	larvesta: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	volcarona: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	cobalion: {
		randomBattleMoves: ["closecombat", "ironhead", "stealthrock", "stoneedge", "swordsdance", "voltswitch"],
		tier: "CUU",
		inherit: true,
	},
	terrakion: {
		randomBattleMoves: ["closecombat", "earthquake", "quickattack", "stoneedge", "swordsdance"],
		tier: "COU",
		inherit: true,
	},
	virizion: {
		randomBattleMoves: ["closecombat", "leafblade", "stoneedge", "substitute", "swordsdance"],
		tier: "CRU",
		inherit: true,
	},
	tornadus: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	tornadustherian: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	thundurus: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	thundurustherian: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	reshiram: {
		randomBattleMoves: ["blueflare", "dracometeor", "earthpower", "stoneedge", "willowisp"],
		tier: "CUb",
		inherit: true,
	},
	zekrom: {
		randomBattleMoves: ["boltstrike", "dragondance", "outrage", "substitute"],
		tier: "CUb",
		inherit: true,
	},
	landorus: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	landorustherian: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	kyurem: {
		randomBattleMoves: ["dracometeor", "earthpower", "focusblast", "freezedry", "icebeam", "outrage"],
		tier: "CUU",
		inherit: true,
	},
	kyuremblack: {
		randomBattleMoves: ["dragondance", "fusionbolt", "iciclespear", "outrage"],
		tier: "CUb",
		inherit: true,
	},
	kyuremwhite: {
		randomBattleMoves: ["dracometeor", "earthpower", "freezedry", "fusionflare", "icebeam"],
		tier: "CUb",
		inherit: true,
	},
	keldeo: {
		randomBattleMoves: ["airslash", "calmmind", "hydropump", "icywind", "scald", "secretsword", "substitute"],
		tier: "COU",
		inherit: true,
	},
	keldeoresolute: {
		tier: "COU",
		inherit: true,
	},
	meloetta: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	meloettapirouette: {
		tier: "COU",
		inherit: true,
	},
	genesect: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	genesectburn: {
		tier: "CUb",
		inherit: true,
	},
	genesectchill: {
		tier: "CUb",
		inherit: true,
	},
	genesectdouse: {
		tier: "CUb",
		inherit: true,
	},
	genesectshock: {
		tier: "CUb",
		inherit: true,
	},
	chespin: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	quilladin: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	chesnaught: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	fennekin: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	braixen: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	delphox: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	froakie: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	frogadier: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	greninja: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	greninjaash: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	bunnelby: {
		tier: "CLC",
		inherit: true,
	},
	diggersby: {
		randomBattleMoves: ["bodyslam", "earthquake", "swordsdance", "uturn", "wildcharge"],
		tier: "CPU",
		inherit: true,
	},
	fletchling: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	fletchinder: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	talonflame: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	scatterbug: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	spewpa: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	vivillon: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	vivillonfancy: {
		tier: "CNU",
		inherit: true,
	},
	vivillonpokeball: {
		tier: "CPU",
		inherit: true,
	},
	litleo: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	pyroar: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	flabebe: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	floette: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	floetteeternal: {
		isNonstandard: null,
		tier: "X",
		inherit: true,
	},
	florges: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	skiddo: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	gogoat: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	pancham: {
		tier: "CLC",
		inherit: true,
	},
	pangoro: {
		randomBattleMoves: ["closecombat", "darkestlariat", "drainpunch", "gunkshot", "icepunch", "partingshot"],
		tier: "CRU",
		inherit: true,
	},
	furfrou: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	espurr: {
		tier: "CLC",
		inherit: true,
	},
	meowstic: {
		randomBattleMoves: ["lightscreen", "psychic", "reflect", "thunderwave", "yawn"],
		tier: "CUU",
		inherit: true,
	},
	meowsticf: {
		randomBattleMoves: ["energyball", "nastyplot", "psychic", "shadowball", "thunderbolt"],
		tier: "CUU",
		inherit: true,
	},
	honedge: {
		tier: "CLC",
		inherit: true,
	},
	doublade: {
		randomBattleMoves: ["ironhead", "sacredsword", "shadowclaw", "shadowsneak", "swordsdance"],
		tier: "CUU",
		inherit: true,
	},
	aegislash: {
		randomBattleMoves: ["closecombat", "ironhead", "kingsshield", "shadowball", "shadowsneak", "swordsdance"],
		tier: "CUb",
		inherit: true,
	},
	aegislashblade: {
		tier: "CUb",
		inherit: true,
	},
	spritzee: {
		tier: "CLC",
		inherit: true,
	},
	aromatisse: {
		randomBattleMoves: ["aromatherapy", "lightscreen", "moonblast", "nastyplot", "reflect", "thunderbolt", "trickroom"],
		tier: "CRU",
		inherit: true,
	},
	swirlix: {
		tier: "CPU",
		inherit: true,
	},
	slurpuff: {
		randomBattleMoves: ["calmmind", "dazzlinggleam", "energyball", "flamethrower"],
		tier: "CRU",
		inherit: true,
	},
	inkay: {
		tier: "CLC",
		inherit: true,
	},
	malamar: {
		randomBattleMoves: ["rest", "sleeptalk", "superpower", "throatchop"],
		tier: "CNU",
		inherit: true,
	},
	binacle: {
		tier: "CLC",
		inherit: true,
	},
	barbaracle: {
		randomBattleMoves: ["crosschop", "earthquake", "liquidation", "shellsmash", "stoneedge"],
		tier: "CRU",
		inherit: true,
	},
	skrelp: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	dragalge: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	clauncher: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	clawitzer: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	helioptile: {
		tier: "CLC",
		inherit: true,
	},
	heliolisk: {
		randomBattleMoves: ["hypervoice", "grassknot", "raindance", "surf", "thunderbolt", "voltswitch"],
		tier: "CNU",
		inherit: true,
	},
	tyrunt: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	tyrantrum: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	amaura: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	aurorus: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	hawlucha: {
		randomBattleMoves: ["acrobatics", "closecombat", "stoneedge", "substitute", "swordsdance"],
		tier: "CUU",
		inherit: true,
	},
	dedenne: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	carbink: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	goomy: {
		tier: "CLC",
		inherit: true,
	},
	sliggoo: {
		tier: "NFE",
		inherit: true,
	},
	goodra: {
		randomBattleMoves: ["earthquake", "fireblast", "irontail", "outrage", "powerwhip"],
		tier: "CRU",
		inherit: true,
	},
	klefki: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	phantump: {
		tier: "CLC",
		inherit: true,
	},
	trevenant: {
		randomBattleMoves: ["earthquake", "hornleech", "rockslide", "shadowclaw", "trickroom", "woodhammer"],
		tier: "CNU",
		inherit: true,
	},
	pumpkaboo: {
		tier: "CLC",
		inherit: true,
	},
	pumpkaboosmall: {
		unreleasedHidden: false,
		tier: "CLC",
		inherit: true,
	},
	pumpkaboolarge: {
		unreleasedHidden: false,
		tier: "CLC",
		inherit: true,
	},
	pumpkaboosuper: {
		tier: "CLC",
		inherit: true,
	},
	gourgeist: {
		randomBattleMoves: ["leechseed", "powerwhip", "shadowsneak", "substitute", "willowisp"],
		tier: "CPU",
		inherit: true,
	},
	gourgeistsmall: {
		randomBattleMoves: ["leechseed", "powerwhip", "shadowsneak", "substitute", "willowisp"],
		unreleasedHidden: false,
		tier: "CPU",
		inherit: true,
	},
	gourgeistlarge: {
		randomBattleMoves: ["leechseed", "powerwhip", "shadowsneak", "substitute", "willowisp"],
		unreleasedHidden: false,
		tier: "CPU",
		inherit: true,
	},
	gourgeistsuper: {
		randomBattleMoves: ["explosion", "foulplay", "powerwhip", "rockslide", "shadowsneak", "trick"],
		tier: "CPU",
		inherit: true,
	},
	bergmite: {
		tier: "CLC",
		inherit: true,
	},
	avalugg: {
		randomBattleMoves: ["avalanche", "earthquake", "rapidspin", "recover"],
		tier: "CNU",
		inherit: true,
	},
	noibat: {
		tier: "CLC",
		inherit: true,
	},
	noivern: {
		randomBattleMoves: ["boomburst", "dracometeor", "flamethrower", "hurricane", "roost", "uturn"],
		tier: "CRU",
		inherit: true,
	},
	xerneas: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	yveltal: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	zygarde: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	zygarde10: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	zygardecomplete: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	diancie: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	dianciemega: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	hoopa: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	hoopaunbound: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	volcanion: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	rowlet: {
		tier: "CLC",
		inherit: true,
	},
	dartrix: {
		tier: "NFE",
		inherit: true,
	},
	decidueye: {
		randomBattleMoves: ["leafblade", "shadowsneak", "spiritshackle", "swordsdance", "uturn"],
		tier: "CRU",
		inherit: true,
	},
	litten: {
		tier: "CLC",
		inherit: true,
	},
	torracat: {
		tier: "NFE",
		inherit: true,
	},
	incineroar: {
		randomBattleMoves: ["darkestlariat", "earthquake", "fakeout", "flareblitz", "partingshot", "uturn"],
		tier: "CRU",
		inherit: true,
	},
	popplio: {
		tier: "CLC",
		inherit: true,
	},
	brionne: {
		tier: "NFE",
		inherit: true,
	},
	primarina: {
		randomBattleMoves: ["hydropump", "moonblast", "psychic", "sparklingaria", "energyball"],
		tier: "CUU",
		inherit: true,
	},
	pikipek: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	trumbeak: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	toucannon: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	yungoos: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	gumshoos: {
		isNonstandard: null,
		tier: "CPU",
		inherit: true,
	},
	gumshoostotem: {
		isNonstandard: null,
		inherit: true,
	},
	grubbin: {
		tier: "CLC",
		inherit: true,
	},
	charjabug: {
		tier: "NFE",
		inherit: true,
	},
	vikavolt: {
		randomBattleMoves: ["agility", "bugbuzz", "energyball", "stickyweb", "thunderbolt", "voltswitch"],
		tier: "CRU",
		inherit: true,
	},
	vikavolttotem: {
		isNonstandard: null,
		tier: "Illegal",
		inherit: true,
	},
	crabrawler: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	crabominable: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	oricorio: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	oricoriopompom: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	oricoriopau: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	oricoriosensu: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	cutiefly: {
		inherit: true,
	},
	ribombee: {
		randomBattleMoves: ["aromatherapy", "moonblast", "stickyweb", "stunspore", "uturn"],
		tier: "CRU",
		inherit: true,
	},
	ribombeetotem: {
		isNonstandard: null,
		tier: "Illegal",
		inherit: true,
	},
	rockruff: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	rockruffdusk: {
		isNonstandard: null,
		tier: "Illegal",
		inherit: true,
	},
	lycanroc: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	lycanrocmidnight: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	lycanrocdusk: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	wishiwashi: {
		randomBattleMoves: ["earthquake", "hydropump", "icebeam", "scald", "uturn"],
		tier: "CUU",
		inherit: true,
	},
	wishiwashischool: {
		tier: "CUU",
		inherit: true,
	},
	mareanie: {
		tier: "CLC",
		inherit: true,
	},
	toxapex: {
		randomBattleMoves: ["banefulbunker", "haze", "recover", "scald", "toxic", "toxicspikes"],
		tier: "COU",
		inherit: true,
	},
	mudbray: {
		tier: "CLC",
		inherit: true,
	},
	mudsdale: {
		randomBattleMoves: ["bodypress", "earthquake", "heavyslam", "rockslide", "stealthrock"],
		tier: "CRU",
		inherit: true,
	},
	dewpider: {
		tier: "CPU",
		inherit: true,
	},
	araquanid: {
		randomBattleMoves: ["liquidation", "leechlife", "mirrorcoat", "reflect", "stickyweb"],
		tier: "CRU",
		inherit: true,
	},
	araquanidtotem: {
		isNonstandard: null,
		tier: "Illegal",
		inherit: true,
	},
	fomantis: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	lurantis: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	lurantistotem: {
		isNonstandard: null,
		inherit: true,
	},
	morelull: {
		tier: "CLC",
		inherit: true,
	},
	shiinotic: {
		randomBattleMoves: ["gigadrain", "leechseed", "moonblast", "spore", "strengthsap", "substitute"],
		tier: "CRU",
		inherit: true,
	},
	salandit: {
		tier: "CLC",
		inherit: true,
	},
	salazzle: {
		randomBattleMoves: ["flamethrower", "protect", "substitute", "toxic"],
		tier: "CUU",
		inherit: true,
	},
	salazzletotem: {
		isNonstandard: null,
		tier: "Illegal",
		inherit: true,
	},
	stufful: {
		tier: "CLC",
		inherit: true,
	},
	bewear: {
		randomBattleMoves: ["closecombat", "darkestlariat", "doubleedge", "icepunch", "swordsdance"],
		tier: "CUU",
		inherit: true,
	},
	bounsweet: {
		tier: "CLC",
		inherit: true,
	},
	steenee: {
		tier: "NFE",
		inherit: true,
	},
	tsareena: {
		randomBattleMoves: ["highjumpkick", "playrough", "powerwhip", "rapidspin", "synthesis", "uturn", "zenheadbutt"],
		tier: "CRU",
		inherit: true,
	},
	comfey: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	oranguru: {
		randomBattleMoves: ["nastyplot", "focusblast", "psychic", "thunderbolt", "trickroom"],
		tier: "CPU",
		inherit: true,
	},
	passimian: {
		randomBattleMoves: ["closecombat", "earthquake", "gunkshot", "knockoff", "rockslide", "uturn"],
		tier: "CNU",
		inherit: true,
	},
	wimpod: {
		tier: "CLC",
		inherit: true,
	},
	golisopod: {
		randomBattleMoves: ["aquajet", "closecombat", "firstimpression", "liquidation", "spikes"],
		tier: "CRU",
		inherit: true,
	},
	sandygast: {
		isNonstandard: null,
		tier: "CLC",
		inherit: true,
	},
	palossand: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	pyukumuku: {
		randomBattleMoves: ["counter", "mirrorcoat", "recover", "toxic"],
		tier: "CRU",
		inherit: true,
	},
	typenull: {
		randomBattleMoves: ["crushclaw", "rest", "sleeptalk", "swordsdance", "uturn"],
		tier: "CRU",
		inherit: true,
	},
	silvally: {
		randomBattleMoves: ["crunch", "explosion", "flamethrower", "multiattack", "swordsdance", "uturn"],
		tier: "COU",
		inherit: true,
	},
	silvallybug: {
		randomBattleMoves: ["flamethrower", "multiattack", "psychicfangs", "rockslide", "swordsdance", "thunderbolt", "uturn"],
		tier: "COU",
		inherit: true,
	},
	silvallydark: {
		randomBattleMoves: ["ironhead", "multiattack", "psychicfangs", "swordsdance", "uturn"],
		tier: "COU",
		inherit: true,
	},
	silvallydragon: {
		randomBattleMoves: ["firefang", "ironhead", "multiattack", "partingshot", "swordsdance"],
		tier: "COU",
		inherit: true,
	},
	silvallyelectric: {
		randomBattleMoves: ["flamethrower", "icebeam", "multiattack", "uturn"],
		tier: "COU",
		inherit: true,
	},
	silvallyfairy: {
		randomBattleMoves: ["flamethrower", "multiattack", "partingshot", "psychicfangs", "thunderwave"],
		tier: "COU",
		inherit: true,
	},
	silvallyfighting: {
		randomBattleMoves: ["crunch", "ironhead", "multiattack", "rockslide", "swordsdance", "uturn"],
		tier: "COU",
		inherit: true,
	},
	silvallyfire: {
		randomBattleMoves: ["icebeam", "multiattack", "partingshot", "surf", "thunderbolt"],
		tier: "COU",
		inherit: true,
	},
	silvallyflying: {
		randomBattleMoves: ["flamethrower", "ironhead", "multiattack", "partingshot", "rockslide", "swordsdance"],
		tier: "COU",
		inherit: true,
	},
	silvallyghost: {
		randomBattleMoves: ["multiattack", "swordsdance", "thunderwave", "xscissor"],
		tier: "COU",
		inherit: true,
	},
	silvallygrass: {
		randomBattleMoves: ["flamethrower", "icebeam", "multiattack", "surf", "uturn"],
		tier: "COU",
		inherit: true,
	},
	silvallyground: {
		randomBattleMoves: ["multiattack", "partingshot", "rockslide", "swordsdance", "xscissor"],
		tier: "COU",
		inherit: true,
	},
	silvallyice: {
		randomBattleMoves: ["flamethrower", "multiattack", "thunderbolt", "uturn"],
		tier: "COU",
		inherit: true,
	},
	silvallypoison: {
		randomBattleMoves: ["flamethrower", "multiattack", "partingshot", "psychicfangs", "surf", "thunderwave"],
		tier: "COU",
		inherit: true,
	},
	silvallypsychic: {
		randomBattleMoves: ["crunch", "flamethrower", "multiattack", "swordsdance", "uturn", "xscissor"],
		tier: "COU",
		inherit: true,
	},
	silvallyrock: {
		randomBattleMoves: ["flamethrower", "multiattack", "partingshot", "psychicfangs", "surf", "thunderwave"],
		tier: "COU",
		inherit: true,
	},
	silvallysteel: {
		randomBattleMoves: ["flamethrower", "multiattack", "partingshot", "thunderbolt", "thunderwave"],
		tier: "COU",
		inherit: true,
	},
	silvallywater: {
		randomBattleMoves: ["icebeam", "multiattack", "partingshot", "thunderbolt", "thunderwave"],
		tier: "COU",
		inherit: true,
	},
	minior: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	miniormeteor: {
		tier: "CRU",
		inherit: true,
	},
	komala: {
		isNonstandard: null,
		tier: "CNU",
		inherit: true,
	},
	turtonator: {
		randomBattleMoves: ["dracometeor", "dragonpulse", "earthquake", "fireblast", "rapidspin", "shellsmash"],
		tier: "CNU",
		inherit: true,
	},
	togedemaru: {
		randomBattleMoves: ["ironhead", "nuzzle", "spikyshield", "uturn", "wish", "zingzap"],
		tier: "CPU",
		inherit: true,
	},
	togedemarutotem: {
		isNonstandard: null,
		tier: "Illegal",
		inherit: true,
	},
	mimikyu: {
		randomBattleMoves: ["playrough", "shadowclaw", "shadowsneak", "swordsdance", "taunt"],
		tier: "COU",
		inherit: true,
	},
	mimikyubusted: {
		tier: "COU",
		inherit: true,
	},
	mimikyutotem: {
		isNonstandard: null,
		tier: "Illegal",
		inherit: true,
	},
	mimikyubustedtotem: {
		isNonstandard: null,
		tier: "Illegal",
		inherit: true,
	},
	bruxish: {
		isNonstandard: null,
		tier: "CRU",
		inherit: true,
	},
	drampa: {
		randomBattleMoves: ["dracometeor", "fireblast", "focusblast", "glare", "hypervoice", "thunderbolt"],
		tier: "CNU",
		inherit: true,
	},
	dhelmise: {
		randomBattleMoves: ["anchorshot", "earthquake", "powerwhip", "rapidspin", "shadowclaw", "swordsdance"],
		tier: "CNU",
		inherit: true,
	},
	jangmoo: {
		tier: "CLC",
		inherit: true,
	},
	hakamoo: {
		tier: "NFE",
		inherit: true,
	},
	kommoo: {
		randomBattleMoves: ["clangoroussoul", "clangingscales", "closecombat", "dragondance", "drainpunch", "outrage", "poisonjab"],
		tier: "CUU",
		inherit: true,
	},
	kommoototem: {
		isNonstandard: null,
		tier: "Illegal",
		inherit: true,
	},
	tapukoko: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	tapulele: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	tapubulu: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	tapufini: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	cosmog: {
		tier: "CLC",
		inherit: true,
	},
	cosmoem: {
		tier: "NFE",
		inherit: true,
	},
	solgaleo: {
		randomBattleMoves: ["flareblitz", "morningsun", "psychicfangs", "stoneedge", "sunsteelstrike"],
		tier: "CUb",
		inherit: true,
	},
	lunala: {
		randomBattleMoves: ["calmmind", "focusblast", "moongeistbeam", "moonlight", "psychic"],
		tier: "CUb",
		inherit: true,
	},
	nihilego: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	buzzwole: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	pheromosa: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	xurkitree: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	celesteela: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	kartana: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	guzzlord: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	necrozma: {
		randomBattleMoves: ["calmmind", "heatwave", "moonlight", "photongeyser", "stealthrock"],
		tier: "CUU",
		inherit: true,
	},
	necrozmaduskmane: {
		randomBattleMoves: ["dragondance", "earthquake", "photongeyser", "stealthrock", "sunsteelstrike"],
		tier: "CUb",
		inherit: true,
	},
	necrozmadawnwings: {
		randomBattleMoves: ["calmmind", "heatwave", "moongeistbeam", "photongeyser", "trickroom"],
		tier: "CUb",
		inherit: true,
	},
	necrozmaultra: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	magearna: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	magearnaoriginal: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	marshadow: {
		randomBattleMoves: ["bulkup", "closecombat", "icepunch", "rocktomb", "shadowsneak", "spectralthief"],
		tier: "CUb",
		inherit: true,
	},
	poipole: {
		isNonstandard: null,
		tier: "NFE",
		inherit: true,
	},
	naganadel: {
		isNonstandard: null,
		tier: "CUb",
		inherit: true,
	},
	stakataka: {
		isNonstandard: null,
		tier: "CUU",
		inherit: true,
	},
	blacephalon: {
		isNonstandard: null,
		tier: "COU",
		inherit: true,
	},
	zeraora: {
		randomBattleMoves: ["bulkup", "closecombat", "grassknot", "plasmafists", "playrough", "voltswitch"],
		tier: "CUU",
		inherit: true,
	},
	meltan: {
		tier: "Unreleased",
		inherit: true,
	},
	melmetal: {
		randomBattleMoves: ["doubleironbash", "highhorsepower", "icepunch", "thunderpunch", "thunderwave"],
		tier: "Unreleased",
		inherit: true,
	},
	grookey: {
		unreleasedHidden: false,
		tier: "LC",
		inherit: true,
	},
	thwackey: {
		unreleasedHidden: false,
		tier: "NFE",
		inherit: true,
	},
	rillaboom: {
		randomBattleMoves: ["drumbeating", "highhorsepower", "knockoff", "superpower", "swordsdance", "uturn", "woodhammer"],
		unreleasedHidden: false,
		tier: "New",
		inherit: true,
	},
	scorbunny: {
		unreleasedHidden: false,
		tier: "LC",
		inherit: true,
	},
	raboot: {
		unreleasedHidden: false,
		tier: "NFE",
		inherit: true,
	},
	cinderace: {
		randomBattleMoves: ["courtchange", "gunkshot", "highjumpkick", "ironhead", "pyroball", "uturn", "zenheadbutt"],
		unreleasedHidden: false,
		tier: "New",
		inherit: true,
	},
	sobble: {
		unreleasedHidden: false,
		tier: "LC",
		inherit: true,
	},
	drizzile: {
		unreleasedHidden: false,
		tier: "NFE",
		inherit: true,
	},
	inteleon: {
		randomBattleMoves: ["airslash", "darkpulse", "hydropump", "icebeam", "scald", "snipeshot", "uturn"],
		unreleasedHidden: false,
		tier: "New",
		inherit: true,
	},
	skwovet: {
		unreleasedHidden: true,
		tier: "LC",
		inherit: true,
	},
	greedent: {
		randomBattleMoves: ["bodyslam", "crunch", "earthquake", "seedbomb", "superpower", "swordsdance", "wildcharge"],
		tier: "New",
		inherit: true,
	},
	rookidee: {
		tier: "LC",
		inherit: true,
	},
	corvisquire: {
		tier: "NFE",
		inherit: true,
	},
	corviknight: {
		randomBattleMoves: ["bodypress", "bravebird", "bulkup", "defog", "ironhead", "roost", "uturn"],
		tier: "New",
		inherit: true,
	},
	corviknightgmax: {
		tier: "New",
		inherit: true,
	},
	blipbug: {
		tier: "LC",
		inherit: true,
	},
	dottler: {
		tier: "NFE",
		inherit: true,
	},
	orbeetle: {
		randomBattleMoves: ["bugbuzz", "calmmind", "psychic", "recover", "stickyweb", "uturn"],
		tier: "New",
		inherit: true,
	},
	orbeetlegmax: {
		tier: "New",
		inherit: true,
	},
	nickit: {
		unreleasedHidden: true,
		tier: "LC",
		inherit: true,
	},
	thievul: {
		randomBattleMoves: ["darkpulse", "knockoff", "nastyplot", "psychic", "taunt", "uturn"],
		tier: "New",
		inherit: true,
	},
	gossifleur: {
		tier: "LC",
		inherit: true,
	},
	eldegoss: {
		randomBattleMoves: ["charm", "gigadrain", "pollenpuff", "rapidspin", "sleeppowder", "synthesis"],
		tier: "New",
		inherit: true,
	},
	wooloo: {
		unreleasedHidden: true,
		tier: "LC",
		inherit: true,
	},
	dubwool: {
		randomBattleMoves: ["bodypress", "bodyslam", "doubleedge", "swordsdance", "zenheadbutt"],
		tier: "New",
		inherit: true,
	},
	chewtle: {
		tier: "LC",
		inherit: true,
	},
	drednaw: {
		randomBattleMoves: ["crunch", "earthquake", "jawlock", "liquidation", "stealthrock", "stoneedge"],
		tier: "New",
		inherit: true,
	},
	drednawgmax: {
		tier: "New",
		inherit: true,
	},
	yamper: {
		unreleasedHidden: true,
		tier: "LC",
		inherit: true,
	},
	boltund: {
		randomBattleMoves: ["crunch", "firefang", "nuzzle", "playrough", "psychicfangs", "thunderfang", "voltswitch"],
		tier: "New",
		inherit: true,
	},
	rolycoly: {
		tier: "LC",
		inherit: true,
	},
	carkol: {
		tier: "NFE",
		inherit: true,
	},
	coalossal: {
		randomBattleMoves: ["earthquake", "fireblast", "rapidspin", "spikes", "stealthrock", "stoneedge"],
		tier: "New",
		inherit: true,
	},
	coalossalgmax: {
		tier: "New",
		inherit: true,
	},
	applin: {
		tier: "LC",
		inherit: true,
	},
	flapple: {
		randomBattleMoves: ["acrobatics", "dragondance", "gravapple", "outrage", "suckerpunch"],
		tier: "New",
		inherit: true,
	},
	flapplegmax: {
		tier: "New",
		inherit: true,
	},
	appletun: {
		randomBattleMoves: ["appleacid", "dragonpulse", "earthquake", "leechseed", "recover"],
		tier: "New",
		inherit: true,
	},
	appletungmax: {
		tier: "New",
		inherit: true,
	},
	silicobra: {
		tier: "LC",
		inherit: true,
	},
	sandaconda: {
		randomBattleMoves: ["bodypress", "coil", "earthquake", "glare", "stoneedge"],
		tier: "New",
		inherit: true,
	},
	sandacondagmax: {
		tier: "New",
		inherit: true,
	},
	cramorant: {
		randomBattleMoves: ["defog", "hurricane", "icebeam", "roost", "scald", "surf"],
		tier: "New",
		inherit: true,
	},
	cramorantgulping: {
		inherit: true,
	},
	cramorantgorging: {
		inherit: true,
	},
	arrokuda: {
		tier: "LC",
		inherit: true,
	},
	barraskewda: {
		randomBattleMoves: ["aquajet", "closecombat", "crunch", "liquidation", "poisonjab"],
		tier: "New",
		inherit: true,
	},
	toxel: {
		tier: "LC",
		inherit: true,
	},
	toxtricity: {
		randomBattleMoves: ["boomburst", "drainpunch", "firepunch", "gunkshot", "overdrive", "poisonjab", "sludgebomb", "voltswitch"],
		tier: "New",
		inherit: true,
	},
	toxtricitylowkey: {
		randomBattleMoves: ["boomburst", "drainpunch", "firepunch", "gunkshot", "overdrive", "poisonjab", "shiftgear", "sludgebomb", "voltswitch"],
		tier: "New",
		inherit: true,
	},
	sizzlipede: {
		tier: "LC",
		inherit: true,
	},
	centiskorch: {
		randomBattleMoves: ["coil", "firelash", "knockoff", "leechlife", "powerwhip"],
		tier: "New",
		inherit: true,
	},
	centiskorchgmax: {
		tier: "New",
		inherit: true,
	},
	clobbopus: {
		tier: "LC",
		inherit: true,
	},
	grapploct: {
		randomBattleMoves: ["brutalswing", "closecombat", "icepunch", "octolock", "suckerpunch"],
		tier: "New",
		inherit: true,
	},
	sinistea: {
		tier: "LC",
		inherit: true,
	},
	sinisteaantique: {
		unreleasedHidden: true,
		tier: "LC",
	},
	polteageist: {
		randomBattleMoves: ["gigadrain", "shadowball", "shellsmash", "storedpower", "strengthsap"],
		tier: "New",
		inherit: true,
	},
	hatenna: {
		tier: "LC",
		inherit: true,
	},
	hattrem: {
		tier: "NFE",
		inherit: true,
	},
	hatterene: {
		randomBattleMoves: ["calmmind", "dazzlinggleam", "mysticalfire", "psychic", "shadowball", "trickroom"],
		tier: "New",
		inherit: true,
	},
	hatterenegmax: {
		tier: "New",
		inherit: true,
	},
	impidimp: {
		tier: "LC",
		inherit: true,
	},
	morgrem: {
		tier: "NFE",
		inherit: true,
	},
	grimmsnarl: {
		randomBattleMoves: ["bulkup", "drainpunch", "falsesurrender", "playrough", "spiritbreak", "suckerpunch", "superpower", "thunderwave", "taunt"],
		tier: "New",
		inherit: true,
	},
	grimmsnarlgmax: {
		tier: "New",
		inherit: true,
	},
	milcery: {
		tier: "LC",
		inherit: true,
	},
	alcremie: {
		randomBattleMoves: ["aromatherapy", "calmmind", "dazzlinggleam", "mysticalfire", "psychic", "recover"],
		tier: "New",
		inherit: true,
	},
	alcremiegmax: {
		tier: "New",
		inherit: true,
	},
	falinks: {
		randomBattleMoves: ["closecombat", "megahorn", "noretreat", "poisonjab", "rockslide", "throatchop"],
		tier: "New",
		inherit: true,
	},
	pincurchin: {
		randomBattleMoves: ["recover", "scald", "spikes", "suckerpunch", "toxicspikes", "zingzap"],
		tier: "New",
		inherit: true,
	},
	snom: {
		tier: "LC",
		inherit: true,
	},
	frosmoth: {
		randomBattleMoves: ["bugbuzz", "dazzlinggleam", "gigadrain", "icebeam", "quiverdance"],
		tier: "New",
		inherit: true,
	},
	stonjourner: {
		randomBattleMoves: ["earthquake", "heatcrash", "rockpolish", "stoneedge"],
		tier: "New",
		inherit: true,
	},
	eiscue: {
		randomBattleMoves: ["bellydrum", "iciclecrash", "liquidation", "zenheadbutt"],
		tier: "New",
		inherit: true,
	},
	eiscuenoice: {
		inherit: true,
	},
	indeedee: {
		randomBattleMoves: ["calmmind", "hypervoice", "mysticalfire", "psychic", "trick"],
		tier: "New",
		inherit: true,
	},
	indeedeef: {
		randomBattleMoves: ["aromatherapy", "calmmind", "hypervoice", "mysticalfire", "psychic"],
		tier: "New",
		inherit: true,
	},
	morpeko: {
		randomBattleMoves: ["aurawheel", "crunch", "partingshot", "psychicfangs", "rapidspin", "superfang", "wildcharge"],
		tier: "New",
		inherit: true,
	},
	morpekohangry: {
		inherit: true,
	},
	cufant: {
		tier: "LC",
		inherit: true,
	},
	copperajah: {
		randomBattleMoves: ["curse", "earthquake", "heavyslam", "ironhead", "powerwhip", "playrough", "rockslide", "stealthrock"],
		tier: "New",
		inherit: true,
	},
	copperajahgmax: {
		tier: "New",
		inherit: true,
	},
	dracozolt: {
		randomBattleMoves: ["boltbeak", "dragontail", "earthquake", "fireblast", "outrage"],
		unreleasedHidden: false,
		tier: "New",
		inherit: true,
	},
	arctozolt: {
		randomBattleMoves: ["boltbeak", "bulldoze", "iciclecrash", "freezedry"],
		unreleasedHidden: false,
		tier: "New",
		inherit: true,
	},
	dracovish: {
		randomBattleMoves: ["crunch", "earthquake", "fishiousrend", "iciclecrash", "ironhead", "psychicfangs"],
		unreleasedHidden: false,
		tier: "New",
		inherit: true,
	},
	arctovish: {
		randomBattleMoves: ["crunch", "fishiousrend", "freezedry", "iciclecrash", "ironhead", "psychicfangs"],
		unreleasedHidden: false,
		tier: "New",
		inherit: true,
	},
	duraludon: {
		randomBattleMoves: ["dracometeor", "dragontail", "flashcannon", "stealthrock", "thunderbolt"],
		tier: "New",
		inherit: true,
	},
	duraludongmax: {
		tier: "New",
		inherit: true,
	},
	dreepy: {
		tier: "LC",
		inherit: true,
	},
	drakloak: {
		tier: "NFE",
		inherit: true,
	},
	dragapult: {
		randomBattleMoves: ["dragondance", "dragondarts", "fireblast", "phantomforce", "psychicfangs", "shadowball", "uturn"],
		tier: "New",
		inherit: true,
	},
	zacian: {
		randomBattleMoves: ["closecombat", "crunch", "ironhead", "playrough", "psychicfangs", "swordsdance"],
		tier: "Uber",
		inherit: true,
	},
	zaciancrowned: {
		randomBattleMoves: ["behemothblade", "closecombat", "crunch", "playrough", "psychicfangs", "swordsdance"],
		tier: "Uber",
		inherit: true,
	},
	zamazenta: {
		randomBattleMoves: ["closecombat", "crunch", "ironhead", "psychicfangs"],
		tier: "Uber",
		inherit: true,
	},
	zamazentacrowned: {
		randomBattleMoves: ["behemothbash", "closecombat", "crunch", "psychicfangs"],
		tier: "Uber",
		inherit: true,
	},
	eternatus: {
		randomBattleMoves: ["dynamaxcannon", "flamethrower", "recover", "sludgewave"],
		tier: "Uber",
		inherit: true,
	},
	missingno: {
		isNonstandard: "Custom",
		tier: "X",
		inherit: true,
	},
};

exports.BattleFormatsData = BattleFormatsData;
