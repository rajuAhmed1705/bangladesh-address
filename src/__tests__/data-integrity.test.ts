import { allDivision, allDistict, allUpazila, districtsOf, upazilasOf } from "../index";
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
    it("should have exactly 492 upazilas", () => {
      expect(allUpazila()).toHaveLength(492);
    });

    it("every district should have at least one upazila", () => {
      const districts = allDistict();
      districts.forEach((district) => {
        const upazilas = upazilasOf(district);
        expect(upazilas.length).toBeGreaterThan(0);
      });
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
  });
});
