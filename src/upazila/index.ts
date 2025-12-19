import data from "../json/bd-upazila.json";
import { Upazila } from "../types";

/**
 * Get all upazilas in a given district
 * @param district - The district name
 * @returns Array of upazila objects containing upazila, district, and division
 */
export const upazilasOf = (district: string): Upazila[] => {
  const normalizedDistrict = district.toLowerCase();
  return (data as Upazila[]).filter(
    (item) => item.district.toLowerCase() === normalizedDistrict
  );
};

/**
 * Get all upazila names in Bangladesh
 * @returns Array of all upazila names
 */
export const allUpazila = (): string[] => {
  return (data as Upazila[]).map((item) => item.upazila);
};
