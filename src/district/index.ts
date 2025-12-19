import data from "../json/bd-upazila.json";
import { getDivision } from "../division/division";
import { DivisonName } from "../division/types/division-name";
import { Upazila } from "../types";

/**
 * Get all districts in a given division
 * @param division - The division name
 * @returns Array of district names in the division
 */
export const districtsOf = (division: DivisonName): string[] => {
  const filteredDivision = getDivision(division);
  const districts = new Set<string>();
  filteredDivision.forEach((item) => districts.add(item.district));
  return Array.from(districts);
};

/**
 * Get all districts in Bangladesh
 * @returns Array of all district names
 */
export const allDistict = (): string[] => {
  const districts = new Set<string>();
  (data as Upazila[]).forEach((item) => districts.add(item.district));
  return Array.from(districts);
};

/**
 * Get all districts in Bangladesh (correctly spelled alias)
 * @returns Array of all district names
 */
export const allDistricts = allDistict;
