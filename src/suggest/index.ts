import divisionData from "../json/bd-division.json";
import districtData from "../json/bd-district.json";
import upazilaData from "../json/bd-upazila.json";
import thanaData from "../json/bd-thana.json";
import {
  Division,
  District,
  Upazila,
  Thana,
  SuggestOptions,
  SuggestResult,
  SuggestUnitType,
} from "../types";
import {
  expandSearchQuery,
  normalizeDistrictName,
  normalizeDivisionName,
} from "../aliases";

interface IndexedEntry {
  result: Omit<SuggestResult, "score">;
  nameLower: string;
  wordsLower: string[];
  foldedName: string;
  nameBnNorm?: string;
  bnWords?: string[];
  divisionLower: string;
  districtLower?: string;
}

const TYPE_RANK: Record<SuggestUnitType, number> = {
  division: 0,
  district: 1,
  upazila: 2,
  thana: 3,
};

const DEFAULT_LIMIT = 10;
const MAX_QUERY_LENGTH = 64;

const cleanText = (value: string): string =>
  value
    .trim()
    .normalize("NFC")
    .replace(/['’`]/g, "'")
    .replace(/\s+/g, " ");

const foldSounds = (value: string): string =>
  value
    .replace(/['\s-]/g, "")
    .replace(/bh|v/g, "b")
    .replace(/sh/g, "s")
    .replace(/ph/g, "f")
    .replace(/z/g, "j")
    .replace(/oo|ou/g, "u")
    .replace(/g[ou]n[jg]/g, "ganj");

// Lookup maps for Bengali names of divisions and districts
const divisionBnByLower = new Map<string, string>(
  (divisionData as Division[]).map((d) => [d.name.toLowerCase(), d.nameBn])
);

const divisionEnByBn = new Map<string, string>(
  (divisionData as Division[]).map((d) => [cleanText(d.nameBn), d.name.toLowerCase()])
);

const districtBnByLower = new Map<string, string>(
  (districtData as District[]).map((d) => [d.name.toLowerCase(), d.nameBn])
);

const districtEnByBn = new Map<string, string>(
  (districtData as District[]).map((d) => [cleanText(d.nameBn), d.name.toLowerCase()])
);

// Build unified search index once at module load
const buildIndex = (): IndexedEntry[] => {
  const entries: IndexedEntry[] = [];

  for (const div of divisionData as Division[]) {
    const nameLower = div.name.toLowerCase();
    const nameBnNorm = cleanText(div.nameBn);
    entries.push({
      result: {
        type: "division",
        name: div.name,
        nameBn: div.nameBn,
        path: { division: div.name },
        label: div.name,
        labelBn: div.nameBn,
      },
      nameLower,
      wordsLower: nameLower.split(/[\s-]+/),
      foldedName: foldSounds(nameLower),
      nameBnNorm,
      bnWords: nameBnNorm.split(/[\s-]+/),
      divisionLower: nameLower,
    });
  }

  for (const dist of districtData as District[]) {
    const nameLower = dist.name.toLowerCase();
    const divLower = dist.division.toLowerCase();
    const divBn = divisionBnByLower.get(divLower);
    const nameBnNorm = cleanText(dist.nameBn);
    entries.push({
      result: {
        type: "district",
        name: dist.name,
        nameBn: dist.nameBn,
        path: { division: dist.division, district: dist.name },
        label: `${dist.name}, ${dist.division}`,
        labelBn: divBn ? `${dist.nameBn}, ${divBn}` : undefined,
      },
      nameLower,
      wordsLower: nameLower.split(/[\s-]+/),
      foldedName: foldSounds(nameLower),
      nameBnNorm,
      bnWords: nameBnNorm.split(/[\s-]+/),
      divisionLower: divLower,
      districtLower: nameLower,
    });
  }

  for (const upazila of upazilaData as Upazila[]) {
    const nameLower = upazila.upazila.toLowerCase();
    const divLower = upazila.division.toLowerCase();
    const distLower = upazila.district.toLowerCase();
    const divBn = divisionBnByLower.get(divLower);
    const distBn = districtBnByLower.get(distLower);
    const hasBn = Boolean(upazila.upazilaBn && distBn && divBn);
    const nameBnNorm = upazila.upazilaBn ? cleanText(upazila.upazilaBn) : undefined;

    entries.push({
      result: {
        type: "upazila",
        name: upazila.upazila,
        ...(upazila.upazilaBn ? { nameBn: upazila.upazilaBn } : {}),
        path: {
          division: upazila.division,
          district: upazila.district,
          upazila: upazila.upazila,
        },
        label: `${upazila.upazila}, ${upazila.district}, ${upazila.division}`,
        ...(hasBn ? { labelBn: `${upazila.upazilaBn}, ${distBn}, ${divBn}` } : {}),
      },
      nameLower,
      wordsLower: nameLower.split(/[\s-]+/),
      foldedName: foldSounds(nameLower),
      nameBnNorm,
      bnWords: nameBnNorm ? nameBnNorm.split(/[\s-]+/) : undefined,
      divisionLower: divLower,
      districtLower: distLower,
    });
  }

  for (const thana of thanaData as Thana[]) {
    const nameLower = thana.thana.toLowerCase();
    const divLower = thana.division.toLowerCase();
    const distLower = thana.district.toLowerCase();
    const divBn = divisionBnByLower.get(divLower);
    const distBn = districtBnByLower.get(distLower);
    const hasBn = Boolean(thana.thanaBn && distBn && divBn);
    const nameBnNorm = thana.thanaBn ? cleanText(thana.thanaBn) : undefined;

    entries.push({
      result: {
        type: "thana",
        name: thana.thana,
        ...(thana.thanaBn ? { nameBn: thana.thanaBn } : {}),
        path: {
          division: thana.division,
          district: thana.district,
          thana: thana.thana,
        },
        label: `${thana.thana}, ${thana.district}, ${thana.division}`,
        ...(hasBn ? { labelBn: `${thana.thanaBn}, ${distBn}, ${divBn}` } : {}),
      },
      nameLower,
      wordsLower: nameLower.split(/[\s-]+/),
      foldedName: foldSounds(nameLower),
      nameBnNorm,
      bnWords: nameBnNorm ? nameBnNorm.split(/[\s-]+/) : undefined,
      divisionLower: divLower,
      districtLower: distLower,
    });
  }

  return entries;
};

const SEARCH_INDEX: readonly IndexedEntry[] = buildIndex();

/**
 * Optimal string alignment (restricted Damerau-Levenshtein) distance.
 * Treats adjacent transpositions (e.g. "mripur" -> "mirpur") as cost 1.
 */
const damerauLevenshtein = (a: string, b: string): number => {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let val = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
      if (
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        val = Math.min(val, dp[i - 2][j - 2] + 1);
      }
      dp[i][j] = val;
    }
  }

  return dp[m][n];
};

const isSubsequence = (needle: string, haystack: string): boolean => {
  let i = 0;
  for (let j = 0; j < haystack.length && i < needle.length; j++) {
    if (needle[i] === haystack[j]) {
      i++;
    }
  }
  return i === needle.length;
};

const scoreTermAgainstCandidate = (
  query: string,
  candidate: string,
  candidateWords: string[],
  foldedQuery?: string,
  foldedCandidate?: string
): number => {
  if (!query || !candidate) {
    return 0;
  }

  if (candidate === query) {
    return 1;
  }

  if (candidate.startsWith(query)) {
    return 0.9 + 0.08 * (query.length / candidate.length);
  }

  for (const word of candidateWords) {
    if (word.startsWith(query)) {
      return 0.85 + 0.04 * (query.length / word.length);
    }
  }

  if (foldedQuery && foldedCandidate && foldedQuery === foldedCandidate) {
    return 0.89;
  }

  if (candidate.includes(query)) {
    return 0.72 + 0.08 * (query.length / candidate.length);
  }

  // Fuzzy matching for typos / missing vowels (e.g. "mirpr" -> "Mirpur", "dhnmondi" -> "Dhanmondi")
  if (query.length >= 3) {
    const maxLen = Math.max(query.length, candidate.length);
    const dist = damerauLevenshtein(query, candidate);
    const maxAllowedDist = Math.max(1, Math.floor(maxLen / 3));

    if (dist <= maxAllowedDist) {
      const similarity = 1 - dist / maxLen;
      const prefixBonus = query[0] === candidate[0] ? 0.05 : 0;
      const subseqBonus = isSubsequence(query, candidate) ? 0.04 : 0;
      const raw = 0.52 + similarity * 0.32 + prefixBonus + subseqBonus;
      if (raw >= 0.6) {
        return Math.min(0.88, raw);
      }
    }

    // Check fuzzy match against individual words (e.g. "sadr" -> "Sadar")
    for (const word of candidateWords) {
      if (word.length < 3) continue;
      const wMaxLen = Math.max(query.length, word.length);
      const wDist = damerauLevenshtein(query, word);
      const wAllowed = Math.max(1, Math.floor(wMaxLen / 3));
      if (wDist <= wAllowed) {
        const wSim = 1 - wDist / wMaxLen;
        const prefixBonus = query[0] === word[0] ? 0.04 : 0;
        const raw = 0.48 + wSim * 0.3 + prefixBonus;
        if (raw >= 0.58) {
          return Math.min(0.84, raw);
        }
      }
    }
  }

  return 0;
};

const resolveWithinDivision = (division: string): string | undefined => {
  const cleaned = cleanText(division);
  if (!cleaned) return undefined;
  return divisionEnByBn.get(cleaned) ?? normalizeDivisionName(cleaned);
};

const resolveWithinDistrict = (district: string): string | undefined => {
  const cleaned = cleanText(district);
  if (!cleaned) return undefined;
  return districtEnByBn.get(cleaned) ?? normalizeDistrictName(cleaned);
};

/**
 * Search across divisions, districts, upazilas, and thanas in English or Bengali,
 * supporting partial, alias, phonetic, and typo-tolerant queries.
 *
 * @param query - Search text in English or Bengali (e.g. "mirpr", "মিরপুর", "jessore")
 * @param options - Optional filters (`within`, `types`, `limit`)
 * @returns Ranked array of matching suggestions with hierarchy path, labels, and score (0-1)
 */
export const suggest = (
  query: string,
  options?: SuggestOptions
): SuggestResult[] => {
  if (!query || typeof query !== "string" || query.length > MAX_QUERY_LENGTH * 4) {
    return [];
  }

  const rawTrimmed = cleanText(query);
  if (rawTrimmed.length === 0 || rawTrimmed.length > MAX_QUERY_LENGTH) {
    return [];
  }

  const safeOptions: SuggestOptions =
    options && typeof options === "object" ? options : {};

  const limit =
    typeof safeOptions.limit === "number" ? safeOptions.limit : DEFAULT_LIMIT;
  if (limit <= 0) {
    return [];
  }

  const queries = expandSearchQuery(rawTrimmed);
  const foldedQueries = queries.map((q) => foldSounds(q));
  const bnQuery = rawTrimmed;

  const rawWithin =
    safeOptions.within && typeof safeOptions.within === "object"
      ? safeOptions.within
      : undefined;

  const withinDivision =
    rawWithin && typeof rawWithin.division === "string"
      ? resolveWithinDivision(rawWithin.division)
      : undefined;
  const withinDistrict =
    rawWithin && typeof rawWithin.district === "string"
      ? resolveWithinDistrict(rawWithin.district)
      : undefined;
  const allowedTypes = Array.isArray(safeOptions.types)
    ? new Set(safeOptions.types)
    : undefined;

  const matches: SuggestResult[] = [];

  for (const entry of SEARCH_INDEX) {
    if (allowedTypes && !allowedTypes.has(entry.result.type)) {
      continue;
    }
    if (withinDivision && entry.divisionLower !== withinDivision) {
      continue;
    }
    if (withinDistrict && entry.districtLower !== withinDistrict) {
      continue;
    }

    let bestScore = 0;

    for (let i = 0; i < queries.length; i++) {
      const enScore = scoreTermAgainstCandidate(
        queries[i],
        entry.nameLower,
        entry.wordsLower,
        foldedQueries[i],
        entry.foldedName
      );
      if (enScore > bestScore) {
        bestScore = enScore;
      }
    }

    if (entry.nameBnNorm && entry.bnWords) {
      const bnScore = scoreTermAgainstCandidate(
        bnQuery,
        entry.nameBnNorm,
        entry.bnWords
      );
      if (bnScore > bestScore) {
        bestScore = bnScore;
      }
    }

    if (bestScore > 0) {
      matches.push({
        ...entry.result,
        path: { ...entry.result.path },
        score: Math.round(bestScore * 100) / 100,
      });
    }
  }

  matches.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (TYPE_RANK[a.type] !== TYPE_RANK[b.type]) {
      return TYPE_RANK[a.type] - TYPE_RANK[b.type];
    }
    return a.name.localeCompare(b.name);
  });

  return matches.slice(0, limit);
};
