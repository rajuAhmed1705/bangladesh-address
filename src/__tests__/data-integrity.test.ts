import {
  allDivision,
  allDistict,
  allUpazila,
  districtsOf,
  upazilasOf,
  allThana,
  thanasOf,
  isThana,
} from "../index";
import { DivisonName } from "../division/types/division-name";

describe("Data Integrity", () => {
  describe("Division counts", () => {
    it("should have exactly 8 divisions", () => {
      expect(allDivision()).toHaveLength(8);
    });

    it("should match DivisonName enum values", () => {
      const divisions = allDivision();
      const enumValues = Object.values(DivisonName);
      expect(divisions.sort()).toEqual(enumValues.sort());
    });
  });

  describe("District counts", () => {
    it("should have exactly 64 districts", () => {
      expect(allDistict()).toHaveLength(64);
    });

    it("should have correct district count per division", () => {
      const divisionDistrictCounts: Record<DivisonName, number> = {
        [DivisonName.Barisal]: 6,
        [DivisonName.Chattogram]: 11,
        [DivisonName.Dhaka]: 13,
        [DivisonName.Khulna]: 10,
        [DivisonName.Mymensingh]: 4,
        [DivisonName.Rajshahi]: 8,
        [DivisonName.Rangpur]: 8,
        [DivisonName.Sylhet]: 4,
      };

      Object.entries(divisionDistrictCounts).forEach(([division, expectedCount]) => {
        const districts = districtsOf(division as DivisonName);
        expect(districts.length).toBe(expectedCount);
      });
    });

    it("total districts from all divisions should equal 64", () => {
      const divisions = Object.values(DivisonName);
      const allDistrictNames = new Set<string>();

      divisions.forEach((division) => {
        const districts = districtsOf(division);
        districts.forEach((d) => allDistrictNames.add(d));
      });

      expect(allDistrictNames.size).toBe(64);
    });
  });

  describe("Upazila counts", () => {
    it("should have exactly 495 upazilas", () => {
      expect(allUpazila()).toHaveLength(495);
    });

    it("every district should have at least one upazila", () => {
      const districts = allDistict();
      districts.forEach((district) => {
        const upazilas = upazilasOf(district);
        expect(upazilas.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Thana counts", () => {
    it("should have 26 metropolitan thanas", () => {
      const thanas = allThana();
      expect(thanas.length).toBe(26);
    });

    it("Dhaka should have 15 thanas", () => {
      const dhakaThanas = thanasOf("Dhaka");
      expect(dhakaThanas.length).toBe(15);
    });

    it("Chattogram should have 6 thanas", () => {
      const chattogramThanas = thanasOf("Chattogram");
      expect(chattogramThanas.length).toBe(6);
    });

    it("Rajshahi should have 2 thanas", () => {
      const rajshahiThanas = thanasOf("Rajshahi");
      expect(rajshahiThanas.length).toBe(2);
    });

    it("Khulna should have 3 thanas", () => {
      const khulnaThanas = thanasOf("Khulna");
      expect(khulnaThanas.length).toBe(3);
    });

    it("isThana should return true for metropolitan thanas", () => {
      expect(isThana("Gulshan")).toBe(true);
      expect(isThana("Dhanmondi")).toBe(true);
      expect(isThana("Kotwali")).toBe(true);
    });

    it("isThana should return false for regular upazilas", () => {
      expect(isThana("Savar")).toBe(false);
      expect(isThana("Keraniganj")).toBe(false);
    });
  });

  describe("Data consistency", () => {
    it("all upazilas should have valid division references", () => {
      const validDivisions = allDivision();
      const districts = allDistict();

      districts.forEach((district) => {
        const upazilas = upazilasOf(district);
        upazilas.forEach((upazila) => {
          expect(validDivisions).toContain(upazila.division);
        });
      });
    });

    it("all upazilas should have valid district references", () => {
      const validDistricts = allDistict();
      const districts = allDistict();

      districts.forEach((district) => {
        const upazilas = upazilasOf(district);
        upazilas.forEach((upazila) => {
          expect(validDistricts).toContain(upazila.district);
        });
      });
    });

    it("thanas should have valid thana objects", () => {
      const thanas = allThana();
      thanas.forEach((thana) => {
        expect(thana).toHaveProperty("thana");
        expect(thana).toHaveProperty("district");
        expect(thana).toHaveProperty("division");
      });
    });
  });
});
