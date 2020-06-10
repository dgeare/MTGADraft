export const Languages = [
	{ code: "en", name: "English" },
	{ code: "es", name: "Spanish" },
	{ code: "fr", name: "French" },
	{ code: "de", name: "German" },
	{ code: "it", name: "Italian" },
	{ code: "pt", name: "Portuguese" },
	{ code: "ja", name: "Japanese" },
	{ code: "ko", name: "Korean" },
	{ code: "ru", name: "Russian" },
	{ code: "zhs", name: "汉语" },
	{ code: "zht", name: "漢語" },
];
export const MTGSets = ["xln", "rix", "dom", "m19", "grn", "rna", "war", "m20", "eld", "thb", "iko"];

export const BasicLandNames = {
	en: {
		W: "Plains",
		U: "Island",
		B: "Swamp",
		R: "Mountain",
		G: "Forest",
	},
	es: {
		W: "Llanura",
		U: "Isla",
		B: "Pantano",
		R: "Montaña",
		G: "Bosque",
	},
	fr: {
		W: "Plaine",
		U: "Île",
		B: "Marais",
		R: "Montagne",
		G: "Forêt",
	},
	de: {
		W: "Ebene",
		U: "Insel",
		B: "Sumpf",
		R: "Gebirge",
		G: "Wald",
	},
	it: {
		W: "Pianura",
		U: "Isola",
		B: "Palude",
		R: "Montagna",
		G: "Foresta",
	},
	pt: {
		W: "Planície",
		U: "Ilha",
		B: "Pântano",
		R: "Montanha",
		G: "Floresta",
	},
	ja: {
		W: "平地",
		U: "島",
		B: "沼",
		R: "山",
		G: "森",
	},
	ko: {
		W: "들",
		U: "섬",
		B: "늪",
		R: "산",
		G: "숲",
	},
	ru: {
		W: "Равнина",
		U: "Остров",
		B: "Болото",
		R: "Гора",
		G: "Лес",
	},
	zhs: {
		W: "平原",
		U: "海岛",
		B: "沼泽",
		R: "山脉",
		G: "树林",
	},
	zht: {
		W: "平原",
		U: "海島",
		B: "沼澤",
		R: "山脈",
		G: "樹林",
	},
};

export const SwalCustomClasses = {
	popup: "custom-swal-popup",
	title: "custom-swal-title",
	content: "custom-swal-content",
};

Object.freeze(Languages);
Object.freeze(MTGSets);
Object.freeze(BasicLandNames);
