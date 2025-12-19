import upazilaData from "../json/bd-upazila.json";
import thanaData from "../json/bd-thana.json";
import { Upazila, Thana } from "../types";

/**
 * Get all upazilas in a given district
 * @param district - The district name
 * @returns Array of upazila objects containing upazila, district, and division
 */
export const upazilasOf = (district: string): Upazila[] => {
  const normalizedDistrict = district.toLowerCase();
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
 * Get thanas in a given district
 * @param district - The district name
 * @returns Array of thana objects
 */
export const thanasOf = (district: string): Thana[] => {
  const normalizedDistrict = district.toLowerCase();
  return (thanaData as Thana[]).filter(
    (item) => item.district.toLowerCase() === normalizedDistrict
  );
};

/**
 * Check if a location is a thana (metropolitan police station)
 * @param name - The location name to check
 * @returns true if the location is a thana
 */
export const isThana = (name: string): boolean => {
  const normalizedName = name.toLowerCase();
  return (thanaData as Thana[]).some(
    (item) => item.thana.toLowerCase() === normalizedName
  );
};
