/**
 * Alternative spellings of district names, mapped to the spelling used in this
 * dataset. Every function that takes a district name accepts these as well.
 *
 * Includes the official 2018 renames (Barishal, Bogura, Cumilla, Jashore), the
 * pre-2018 name of Chattogram, and other common transliterations.
 */
export const districtAliases: Readonly<Record<string, string>> = {
  Barishal: "Barisal",
  Bogura: "Bogra",
  Cumilla: "Comilla",
  Jashore: "Jessore",
  Chittagong: "Chattogram",
  "Chapai Nawabganj": "Chapainawabganj",
  "Coxs Bazar": "Cox's Bazar",
  "Cox Bazar": "Cox's Bazar",
  Jhalakathi: "Jhalokati",
  Jhalokathi: "Jhalokati",
  Khagrachhari: "Khagrachari",
  Laxmipur: "Lakshmipur",
  Maulvibazar: "Moulvibazar",
  "Moulvi Bazar": "Moulvibazar",
  Netrakona: "Netrokona",
  Jaipurhat: "Joypurhat",
};

/**
 * Alternative spellings of division names, mapped to the spelling used in this
 * dataset. Every function that takes a division name accepts these as well.
 */
export const divisionAliases: Readonly<Record<string, string>> = {
  Barishal: "Barisal",
  Chittagong: "Chattogram",
};

/**
 * Lower-case a name, trim it, collapse inner whitespace and straighten curly
 * apostrophes, so that "  Cox’s  Bazar " and "cox's bazar" compare equal.
 */
const clean = (name: string): string =>
  name
    .trim()
    .toLowerCase()
    .replace(/[‘’`]/g, "'")
    .replace(/\s+/g, " ");

const toLookup = (aliases: Readonly<Record<string, string>>): Map<string, string> =>
  new Map(
    Object.entries(aliases).map(([alias, canonical]) => [
      clean(alias),
      canonical.toLowerCase(),
    ])
  );

const districtLookup = toLookup(districtAliases);
const divisionLookup = toLookup(divisionAliases);

/**
 * Lower-case key for a district name, with aliases resolved to the dataset
 * spelling. Names that are not aliases are only cleaned.
 */
export const normalizeDistrictName = (name: string): string => {
  const key = clean(name);
  return districtLookup.get(key) ?? key;
};

/**
 * Lower-case key for a division name, with aliases resolved to the dataset
 * spelling. Names that are not aliases are only cleaned.
 */
export const normalizeDivisionName = (name: string): string => {
  const key = clean(name);
  return divisionLookup.get(key) ?? key;
};

// Longest alias first, so "coxs bazar" is replaced before a shorter overlap.
const searchReplacements = [...districtLookup, ...divisionLookup].sort(
  (a, b) => b[0].length - a[0].length
);

/**
 * Lower-case search terms for a query: the query itself and, when it contains
 * an alias, the same query with the alias replaced by the dataset spelling.
 * The original is kept because an alias can also be a real name elsewhere
 * ("Khagrachhari" is an alias of a district and the name of an upazila).
 */
export const expandSearchQuery = (query: string): string[] => {
  const original = clean(query);
  if (original.length === 0) {
    return [];
  }
  const replaced = searchReplacements.reduce(
    (text, [alias, canonical]) => text.split(alias).join(canonical),
    original
  );
  return replaced === original ? [original] : [original, replaced];
};
