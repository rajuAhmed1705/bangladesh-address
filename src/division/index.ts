import data from "../json/bd-upazila.json";
import { getDivision } from "./division";
import { DivisonName } from "./types/division-name";
import { Upazila, DivisionalData } from "../types";

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
