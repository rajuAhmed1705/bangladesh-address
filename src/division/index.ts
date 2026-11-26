import data from "../json/bd-upazila.json";
import divisionData from "../json/bd-division.json";
import { getDivision } from "./division";
import { DivisionName } from "./types/division-name";
import { Upazila, Division, DivisionalData } from "../types";
import { normalizeDivisionName } from "../aliases";

// Pre-computed set for O(1) division validation
const divisionNameSet = new Set(
  Object.values(DivisionName).map((d) => d.toLowerCase())
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
 * Get all division names in Bengali
 * @returns Array of all 8 division names in Bengali
 */
export const allDivisionBn = (): string[] => {
  return (divisionData as Division[]).map((item) => item.nameBn);
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
  return divisionNameSet.has(normalizeDivisionName(name));
};

/**
 * Get all districts and upazilas for a given division
 * @param division - The division name
 * @returns Array of objects containing district and upazila names
 */
export const divisionalDataOf = (
  division: DivisionName | string
): DivisionalData[] => {
  const filteredDivision = getDivision(division);
  return filteredDivision.map((item) => ({
    district: item.district,
    upazila: item.upazila,
  }));
};

export { getDivision };
