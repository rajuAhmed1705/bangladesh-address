import data from "../json/bd-upazila.json";
import { DivisonName } from "./types/division-name";
import { Upazila } from "../types";

/**
 * Get all upazilas for a given division
 */
export const getDivision = (name: DivisonName | string): Upazila[] => {
  const normalizedName = String(name).toLowerCase();
  return (data as Upazila[]).filter(
    (item) => item.division.toLowerCase() === normalizedName
  );
};
