const ColorOrder = {
	W: 0,
	U: 1,
	B: 2,
	R: 3,
	G: 4,
};

const RarityOrder = {
	mythic: 0,
	rare: 1,
	uncommon: 2,
	common: 3,
};

const Comparators = {
	// Arena counts each X as 100 basically
	// Arena uses the front half of split cards here
	// TODO: handle X, handle split cards
	cmc: (lhs, rhs) => {
		return lhs.cmc - rhs.cmc;
	},

	// Arena puts creatures before non-creatures
	// TODO: add that data to card
	type: (lhs, rhs) => {
		return 0;
	},

	// Arena does W U B R G WU WB UB UR BR BG RG RW GW GB WUB UBR BRG RGW GWU WRB URG WBG URW BGU, ??, WUBRG, no colors
	// TODO: handle cards that aren't monocolor
	color: (lhs, rhs) => {
		const l = lhs.color_identity;
		const r = rhs.color_identity;
		if (!l || !r) return 0;
		if (l.length === 1 && r.length === 1) return ColorOrder[l[0]] - ColorOrder[r[0]];
		else if (l.length === 1) return -1;
		else if (r.length === 1) return 1;
		else return String(l).localeCompare(String(r));
	},

	rarity: (lhs, rhs) => {
		return RarityOrder[lhs.rarity] - RarityOrder[rhs.rarity];
	},

	name: (lhs, rhs) => {
		return String(lhs.name).localeCompare(rhs.name);
	},

	id: (lhs, rhs) => {
		return lhs.id - rhs.id;
	},

	arena: (lhs, rhs) => {
		const arenaComparators = [
			Comparators.cmc,
			Comparators.type,
			Comparators.color,
			Comparators.name,
			Comparators.id,
		];
		for (let comparitor of arenaComparators) {
			let result = comparitor(lhs, rhs);
			if (result != 0) {
				return result;
			}
		}
		return 0;
	},
};

export function columnCMC(cards) {
	let a = cards.reduce((acc, item) => {
		if (!acc[item.cmc]) acc[item.cmc] = [];
		acc[item.cmc].push(item);
		return acc;
	}, {});
	for (let col in a) this.orderByArenaInPlace(a[col]);
	return a;
}

export function columnColor(cards) {
	let a = cards.reduce(
		(acc, item) => {
			if (item.color_identity.length > 1) {
				if (!acc["multi"]) acc["multi"] = [];
				acc["multi"].push(item);
			} else {
				if (!acc[item.color_identity]) acc[item.color_identity] = [];
				acc[item.color_identity].push(item);
			}
			return acc;
		},
		{ "": [], W: [], U: [], B: [], R: [], G: [], multi: [] }
	);
	for (let col in a) this.orderByArenaInPlace(a[col]);
	return a;
}

export function idColumnCMC(cardids) {
	let a = cardids.reduce((acc, id) => {
		const cmc = Math.min(7, this.cards[id].cmc);
		if (!acc[cmc]) acc[cmc] = [];
		acc[cmc].push(id);
		return acc;
	}, {});
	for (let col in a) this.orderByArenaInPlace(a[col]);
	return a;
}

export function orderByCMCInPlace(cards) {
	return cards.sort(function(lhs, rhs) {
		if (lhs.cmc == rhs.cmc) return Comparators.color(lhs, rhs);
		return lhs.cmc - rhs.cmc;
	});
}

export function orderByCMC(cards) {
	return orderByCMCInPlace([...cards]);
}

export function orderByColorInPlace(cards) {
	return cards.sort(function(lhs, rhs) {
		if (Comparators.color(lhs, rhs) == 0) return Comparators.arena(lhs, rhs);
		return Comparators.color(lhs, rhs);
	});
}

export function orderByColor(cards) {
	return this.orderByColorInPlace([...cards]);
}

export function orderByRarityInPlace(cards) {
	const order = { mythic: 0, rare: 1, uncommon: 2, common: 3 };
	return cards.sort(function(lhs, rhs) {
		if (order[lhs.rarity] == order[rhs.rarity]) Comparators.arena(lhs, rhs);
		return order[lhs.rarity] - order[rhs.rarity];
	});
}

export function orderByRarity(cards) {
	return orderByRarityInPlace([...cards]);
}

export function orderByArenaInPlace(cards) {
	return cards.sort(Comparators.arena);
}

export function orderByArena(cards) {
	return this.orderByArenaInPlace([...cards]);
}

export function isOrdered(cards, comparator) {
	for (let i = 0; i < cards.length - 1; i++) {
		if (comparator(cards[i], cards[i + 1]) > 0) {
			return false;
		}
	}
	return true;
}

export default {
	Comparators,
	columnCMC,
	columnColor,
	idColumnCMC,
	orderByCMCInPlace,
	orderByCMC,
	orderByColorInPlace,
	orderByColor,
	orderByRarityInPlace,
	orderByRarity,
	orderByArenaInPlace,
	orderByArena,
	isOrdered,
};
