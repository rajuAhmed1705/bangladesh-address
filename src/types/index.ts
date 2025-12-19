/**
 * Represents a single upazila entry with its district and division
 */
export interface Upazila {
  upazila: string;
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
