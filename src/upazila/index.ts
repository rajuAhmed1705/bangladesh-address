import upazilaData from "../json/bd-upazila.json";
import thanaData from "../json/bd-thana.json";
import { Upazila, Thana } from "../types";
import { DivisonName } from "../division/types/division-name";

// Pre-computed lookup maps for O(1) performance
const thanaNameSet = new Set(
  (thanaData as Thana[]).map((t) => t.thana.toLowerCase())
);
const upazilaNameSet = new Set(
  (upazilaData as Upazila[]).map((u) => u.upazila.toLowerCase())
);
const thanaByName = new Map(
  (thanaData as Thana[]).map((t) => [t.thana.toLowerCase(), t])
);
const upazilaByName = new Map(
  (upazilaData as Upazila[]).map((u) => [u.upazila.toLowerCase(), u])
);

// Pre-computed set for O(1) division validation
const divisionNameSet = new Set(
  Object.values(DivisonName).map((d) => d.toLowerCase())
);

/**
 * Get all upazilas in a given district
 * @param district - The district name
 * @returns Array of upazila objects containing upazila, district, and division
 */
export const upazilasOf = (district: string): Upazila[] => {
  if (!district || typeof district !== "string") {
    return [];
  }
  const normalizedDistrict = district.trim().toLowerCase();
  return (upazilaData as Upazila[]).filter(
    (item) => item.district.toLowerCase() === normalizedDistrict
  );
};

/**
 * Get all upazila names in Bangladesh
 * @returns Array of all upazila names (495 upazilas)
 */
export const allUpazila = (): string[] => {
  return (upazilaData as Upazila[]).map((item) => item.upazila);
};

/**
 * Get all thanas (metropolitan police stations) in Bangladesh
 * @returns Array of thana objects (26 thanas)
 */
export const allThana = (): Thana[] => {
  return thanaData as Thana[];
};

/**
 * Get all thana names in Bangladesh
 * @returns Array of all thana names (26 thanas)
 */
export const allThanaNames = (): string[] => {
  return (thanaData as Thana[]).map((item) => item.thana);
};

/**
 * Get thanas in a given district
 * @param district - The district name
 * @returns Array of thana objects for the district
 */
export const thanasOf = (district: string): Thana[] => {
  if (!district || typeof district !== "string") {
    return [];
  }
  const normalizedDistrict = district.trim().toLowerCase();
  return (thanaData as Thana[]).filter(
    (item) => item.district.toLowerCase() === normalizedDistrict
  );
};

/**
 * Check if a location is a thana (metropolitan police station)
 * @param name - The location name to check
 * @param district - Optional district name to disambiguate (e.g., "Kotwali" exists in both Dhaka and Chattogram)
 * @returns true if the location is a thana, false otherwise
 */
export const isThana = (name: string, district?: string): boolean => {
  if (!name || typeof name !== "string") {
    return false;
  }
  const normalizedName = name.trim().toLowerCase();

  if (district) {
    const normalizedDistrict = district.trim().toLowerCase();
    return (thanaData as Thana[]).some(
      (item) =>
        item.thana.toLowerCase() === normalizedName &&
        item.district.toLowerCase() === normalizedDistrict
    );
  }

  return thanaNameSet.has(normalizedName);
};

/**
 * Check if a location is an upazila
 * @param name - The location name to check
 * @param district - Optional district name to disambiguate
 * @returns true if the location is an upazila, false otherwise
 */
export const isUpazila = (name: string, district?: string): boolean => {
  if (!name || typeof name !== "string") {
    return false;
  }
  const normalizedName = name.trim().toLowerCase();

  if (district) {
    const normalizedDistrict = district.trim().toLowerCase();
    return (upazilaData as Upazila[]).some(
      (item) =>
        item.upazila.toLowerCase() === normalizedName &&
        item.district.toLowerCase() === normalizedDistrict
    );
  }

  return upazilaNameSet.has(normalizedName);
};

/**
 * Get a thana by name
 * @param name - The thana name to find
 * @param district - Optional district name to disambiguate (e.g., "Kotwali" exists in both Dhaka and Chattogram)
 * @returns The thana object if found, undefined otherwise
 */
export const getThana = (name: string, district?: string): Thana | undefined => {
  if (!name || typeof name !== "string") {
    return undefined;
  }
  const normalizedName = name.trim().toLowerCase();

  if (district) {
    const normalizedDistrict = district.trim().toLowerCase();
    return (thanaData as Thana[]).find(
      (item) =>
        item.thana.toLowerCase() === normalizedName &&
        item.district.toLowerCase() === normalizedDistrict
    );
  }

  return thanaByName.get(normalizedName);
};

/**
 * Get an upazila by name
 * @param name - The upazila name to find
 * @param district - Optional district name to disambiguate
 * @returns The upazila object if found, undefined otherwise
 */
export const getUpazila = (name: string, district?: string): Upazila | undefined => {
  if (!name || typeof name !== "string") {
    return undefined;
  }
  const normalizedName = name.trim().toLowerCase();

  if (district) {
    const normalizedDistrict = district.trim().toLowerCase();
    return (upazilaData as Upazila[]).find(
      (item) =>
        item.upazila.toLowerCase() === normalizedName &&
        item.district.toLowerCase() === normalizedDistrict
    );
  }

  return upazilaByName.get(normalizedName);
};

/**
 * Get the district for a given upazila (reverse lookup)
 * @param upazila - The upazila name
 * @param division - Optional division name to disambiguate if upazila name exists in multiple districts
 * @returns The district name if found, undefined otherwise
 */
export const getDistrictOfUpazila = (upazila: string, division?: string): string | undefined => {
  if (!upazila || typeof upazila !== "string") {
    return undefined;
  }
  const normalizedName = upazila.trim().toLowerCase();

  if (division) {
    const normalizedDivision = division.trim().toLowerCase();
    const found = (upazilaData as Upazila[]).find(
      (item) =>
        item.upazila.toLowerCase() === normalizedName &&
        item.division.toLowerCase() === normalizedDivision
    );
    return found?.district;
  }

  const found = upazilaByName.get(normalizedName);
  return found?.district;
};

/**
 * Get all upazilas in a given division
 * @param division - The division name
 * @returns Array of upazila objects for the division
 */
export const upazilasOfDivision = (division: string): Upazila[] => {
  if (!division || typeof division !== "string") {
    return [];
  }
  const normalizedDivision = division.trim().toLowerCase();
  if (!divisionNameSet.has(normalizedDivision)) {
    return [];
  }
  return (upazilaData as Upazila[]).filter(
    (item) => item.division.toLowerCase() === normalizedDivision
  );
};

/**
 * Search result item representing a location match
 */
export interface SearchResult {
  name: string;
  type: "division" | "district" | "upazila" | "thana";
  district?: string;
  division?: string;
}

/**
 * Search across all locations (divisions, districts, upazilas, thanas)
 * @param query - The search query (case-insensitive, partial match)
 * @returns Array of matching locations sorted by type (division > district > upazila > thana)
 */
export const searchLocations = (query: string): SearchResult[] => {
  if (!query || typeof query !== "string") {
    return [];
  }
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery.length === 0) {
    return [];
  }

  const results: SearchResult[] = [];

  // Search divisions
  Object.values(DivisonName).forEach((divisionName) => {
    if (divisionName.toLowerCase().includes(normalizedQuery)) {
      results.push({
        name: divisionName,
        type: "division",
      });
    }
  });

  // Search districts (use Set to avoid duplicates)
  const matchedDistricts = new Set<string>();
  (upazilaData as Upazila[]).forEach((item) => {
    if (
      item.district.toLowerCase().includes(normalizedQuery) &&
      !matchedDistricts.has(item.district)
    ) {
      matchedDistricts.add(item.district);
      results.push({
        name: item.district,
        type: "district",
        division: item.division,
      });
    }
  });

  // Search upazilas
  (upazilaData as Upazila[]).forEach((item) => {
    if (item.upazila.toLowerCase().includes(normalizedQuery)) {
      results.push({
        name: item.upazila,
        type: "upazila",
        district: item.district,
        division: item.division,
      });
    }
  });

  // Search thanas
  (thanaData as Thana[]).forEach((item) => {
    if (item.thana.toLowerCase().includes(normalizedQuery)) {
      results.push({
        name: item.thana,
        type: "thana",
        district: item.district,
        division: item.division,
      });
    }
  });

  return results;
};

// Export raw data for advanced use cases
export { upazilaData, thanaData };
