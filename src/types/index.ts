/**
 * Type of administrative unit - upazila (rural) or thana (metropolitan)
 */
export type AdminUnitType = "upazila" | "thana";

/**
 * Represents a single upazila/thana entry with its district and division
 */
export interface Upazila {
  upazila: string;
  district: string;
  division: string;
  type?: AdminUnitType;
}

/**
 * Represents a thana (metropolitan police station area)
 */
export interface Thana {
  thana: string;
  district: string;
  division: string;
}

/**
 * Represents divisional data containing district and upazila
 */
export interface DivisionalData {
  district: string;
  upazila: string;
}
