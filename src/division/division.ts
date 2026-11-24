import data from "../json/bd-upazila.json";
import { DivisionName } from "./types/division-name";
import { Upazila } from "../types";
import { normalizeDivisionName } from "../aliases";

/**
 * Get all upazilas for a given division
 */
export const getDivision = (name: DivisionName | string): Upazila[] => {
  const normalizedName = normalizeDivisionName(String(name));
  return (data as Upazila[]).filter(
    (item) => item.division.toLowerCase() === normalizedName
  );
};
