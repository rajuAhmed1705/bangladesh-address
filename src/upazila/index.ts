import upazilaData from "../json/bd-upazila.json";
import thanaData from "../json/bd-thana.json";
import { Upazila, Thana } from "../types";

/**
 * Get all upazilas in a given district
 * @param district - The district name
 * @returns Array of upazila objects containing upazila, district, and division
 */
export const upazilasOf = (district: string): Upazila[] => {
  if (!district || typeof district !== "string") {
    return [];
  }
  const normalizedDistrict = district.trim().toLowerCase();
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
 * Get all thana names in Bangladesh
 * @returns Array of all thana names (26 thanas)
 */
export const allThanaNames = (): string[] => {
  return (thanaData as Thana[]).map((item) => item.thana);
};

/**
 * Get thanas in a given district
 * @param district - The district name
 * @returns Array of thana objects
 */
export const thanasOf = (district: string): Thana[] => {
  if (!district || typeof district !== "string") {
    return [];
  }
  const normalizedDistrict = district.trim().toLowerCase();
  return (thanaData as Thana[]).filter(
    (item) => item.district.toLowerCase() === normalizedDistrict
  );
};

/**
 * Check if a location is a thana (metropolitan police station)
 * @param name - The location name to check
 * @returns true if the location is a thana, false otherwise
 */
export const isThana = (name: string): boolean => {
  if (!name || typeof name !== "string") {
    return false;
  }
  const normalizedName = name.trim().toLowerCase();
  return (thanaData as Thana[]).some(
    (item) => item.thana.toLowerCase() === normalizedName
  );
};

/**
 * Check if a location is an upazila
 * @param name - The location name to check
 * @returns true if the location is an upazila, false otherwise
 */
export const isUpazila = (name: string): boolean => {
  if (!name || typeof name !== "string") {
    return false;
  }
  const normalizedName = name.trim().toLowerCase();
  return (upazilaData as Upazila[]).some(
    (item) => item.upazila.toLowerCase() === normalizedName
  );
};

/**
 * Get a thana by name
 * @param name - The thana name to find
 * @returns The thana object if found, undefined otherwise
 */
export const getThana = (name: string): Thana | undefined => {
  if (!name || typeof name !== "string") {
    return undefined;
  }
  const normalizedName = name.trim().toLowerCase();
  return (thanaData as Thana[]).find(
    (item) => item.thana.toLowerCase() === normalizedName
  );
};

/**
 * Get an upazila by name
 * @param name - The upazila name to find
 * @returns The upazila object if found, undefined otherwise
 */
export const getUpazila = (name: string): Upazila | undefined => {
  if (!name || typeof name !== "string") {
    return undefined;
  }
  const normalizedName = name.trim().toLowerCase();
  return (upazilaData as Upazila[]).find(
    (item) => item.upazila.toLowerCase() === normalizedName
  );
};
