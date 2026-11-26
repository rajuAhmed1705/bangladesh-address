import data from "../json/bd-upazila.json";
import districtData from "../json/bd-district.json";
import { getDivision } from "../division/division";
import { DivisionName } from "../division/types/division-name";
import { Upazila, District } from "../types";
import { normalizeDistrictName, normalizeDivisionName } from "../aliases";

// Pre-computed set for O(1) district validation
const districtNameSet = new Set(
  (data as Upazila[]).map((item) => item.district.toLowerCase())
);

// Pre-computed map for O(1) district to division lookup
const districtToDivisionMap = new Map<string, string>();
(data as Upazila[]).forEach((item) => {
  districtToDivisionMap.set(item.district.toLowerCase(), item.division);
});

/**
 * Get all districts in a given division
 * @param division - The division name, as a string or DivisionName. Case-insensitive; "Barishal" and "Chittagong" are accepted (see divisionAliases)
 * @returns Array of district names in the division
 */
export const districtsOf = (division: DivisionName | string): string[] => {
  const filteredDivision = getDivision(division);
  const districts = new Set<string>();
  filteredDivision.forEach((item) => districts.add(item.district));
  return Array.from(districts);
};

/**
 * Get all districts in Bangladesh
 * @returns Array of all district names (64 districts)
 */
export const allDistricts = (): string[] => {
  const districts = new Set<string>();
  (data as Upazila[]).forEach((item) => districts.add(item.district));
  return Array.from(districts);
};

/**
 * Get all district names in Bengali
 * @returns Array of all 64 district names in Bengali
 */
export const allDistrictsBn = (): string[] => {
  return (districtData as District[]).map((item) => item.nameBn);
};

/**
 * Get all district names in Bengali for a given division
 * @param division - The division name, as a string or DivisionName. Case-insensitive; aliases like "Barishal" and "Chittagong" are accepted
 * @returns Array of Bengali district names in the division
 */
export const districtsOfBn = (division: DivisionName | string): string[] => {
  if (!division || typeof division !== "string") {
    return [];
  }
  const normalizedDivision = normalizeDivisionName(division);
  return (districtData as District[])
    .filter((item) => item.division.toLowerCase() === normalizedDivision)
    .map((item) => item.nameBn);
};

/**
 * Check if a name is a valid district
 * @param name - The name to check
 * @returns true if the name is a valid district, false otherwise
 */
export const isValidDistrict = (name: string): boolean => {
  if (!name || typeof name !== "string") {
    return false;
  }
  return districtNameSet.has(normalizeDistrictName(name));
};

/**
 * Get the division for a given district (reverse lookup)
 * @param district - The district name
 * @returns The division name if found, undefined otherwise
 */
export const getDivisionOfDistrict = (district: string): string | undefined => {
  if (!district || typeof district !== "string") {
    return undefined;
  }
  return districtToDivisionMap.get(normalizeDistrictName(district));
};
