/**
 * Type of administrative unit - upazila (rural) or thana (metropolitan)
 */
export type AdminUnitType = "upazila" | "thana";

/**
 * All 64 district names of Bangladesh
 */
export type DistrictName =
  | "Bagerhat"
  | "Bandarban"
  | "Barguna"
  | "Barisal"
  | "Bhola"
  | "Bogra"
  | "Brahmanbaria"
  | "Chandpur"
  | "Chapainawabganj"
  | "Chattogram"
  | "Chuadanga"
  | "Comilla"
  | "Cox's Bazar"
  | "Dhaka"
  | "Dinajpur"
  | "Faridpur"
  | "Feni"
  | "Gaibandha"
  | "Gazipur"
  | "Gopalganj"
  | "Habiganj"
  | "Jamalpur"
  | "Jessore"
  | "Jhalokati"
  | "Jhenaidah"
  | "Joypurhat"
  | "Khagrachari"
  | "Khulna"
  | "Kishoreganj"
  | "Kurigram"
  | "Kushtia"
  | "Lakshmipur"
  | "Lalmonirhat"
  | "Madaripur"
  | "Magura"
  | "Manikganj"
  | "Meherpur"
  | "Moulvibazar"
  | "Munshiganj"
  | "Mymensingh"
  | "Naogaon"
  | "Narail"
  | "Narayanganj"
  | "Narsingdi"
  | "Natore"
  | "Netrokona"
  | "Nilphamari"
  | "Noakhali"
  | "Pabna"
  | "Panchagarh"
  | "Patuakhali"
  | "Pirojpur"
  | "Rajbari"
  | "Rajshahi"
  | "Rangamati"
  | "Rangpur"
  | "Satkhira"
  | "Shariatpur"
  | "Sherpur"
  | "Sirajganj"
  | "Sunamganj"
  | "Sylhet"
  | "Tangail"
  | "Thakurgaon";

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
