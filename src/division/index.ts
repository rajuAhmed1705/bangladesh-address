import data from "../json/bd-upazila.json";
import { getDivision } from "./division";
import { DivisonName } from "./types/division-name";
import { Upazila, DivisionalData } from "../types";

// Pre-computed set for O(1) division validation
const divisionNameSet = new Set(
  Object.values(DivisonName).map((d) => d.toLowerCase())
);

/**
 * Get all division names
 * @returns Array of all division names in Bangladesh
 */
export const allDivision = (): string[] => {
  const divisions = new Set<string>();
  (data as Upazila[]).forEach((item) => divisions.add(item.division));
  return Array.from(divisions);
};

/**
 * Check if a name is a valid division
 * @param name - The name to check
 * @returns true if the name is a valid division, false otherwise
 */
export const isValidDivision = (name: string): boolean => {
  if (!name || typeof name !== "string") {
    return false;
  }
  return divisionNameSet.has(name.trim().toLowerCase());
};

/**
 * Get all districts and upazilas for a given division
 * @param division - The division name
 * @returns Array of objects containing district and upazila names
 */
export const divisionalDataOf = (division: DivisonName): DivisionalData[] => {
  const filteredDivision = getDivision(division);
  return filteredDivision.map((item) => ({
    district: item.district,
    upazila: item.upazila,
  }));
};

export { getDivision };
