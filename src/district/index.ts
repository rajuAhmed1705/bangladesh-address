import data from "../json/bd-upazila.json";
import { getDivision } from "../division/division";
import { DivisionName } from "../division/types/division-name";
import { Upazila } from "../types";

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
 * @param division - The division name
 * @returns Array of district names in the division
 */
export const districtsOf = (division: DivisionName): string[] => {
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
 * Check if a name is a valid district
 * @param name - The name to check
 * @returns true if the name is a valid district, false otherwise
 */
export const isValidDistrict = (name: string): boolean => {
  if (!name || typeof name !== "string") {
    return false;
  }
  return districtNameSet.has(name.trim().toLowerCase());
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
  return districtToDivisionMap.get(district.trim().toLowerCase());
};
