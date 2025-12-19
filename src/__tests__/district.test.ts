import { districtsOf, allDistict, allDistricts } from "../district";
import { DivisonName } from "../division/types/division-name";

describe("District functions", () => {
  describe("districtsOf", () => {
    it("should return districts for Dhaka division", () => {
      const districts = districtsOf(DivisonName.Dhaka);
      expect(districts.length).toBeGreaterThan(0);
      expect(districts).toContain("Dhaka");
      expect(districts).toContain("Gazipur");
    });

    it("should return districts for Chattogram division", () => {
      const districts = districtsOf(DivisonName.Chattogram);
      expect(districts.length).toBeGreaterThan(0);
      expect(districts).toContain("Chattogram");
      expect(districts).toContain("Cox's Bazar");
    });

    it("should return an array of strings", () => {
      const districts = districtsOf(DivisonName.Rajshahi);
      districts.forEach((district) => {
        expect(typeof district).toBe("string");
      });
    });

    it("should return unique district names", () => {
      const districts = districtsOf(DivisonName.Khulna);
      const uniqueDistricts = [...new Set(districts)];
      expect(districts.length).toBe(uniqueDistricts.length);
    });
  });

  describe("allDistict", () => {
    it("should return all 64 districts of Bangladesh", () => {
      const districts = allDistict();
      expect(districts).toHaveLength(64);
    });

    it("should return an array of strings", () => {
      const districts = allDistict();
      districts.forEach((district) => {
        expect(typeof district).toBe("string");
      });
    });

    it("should contain major districts", () => {
      const districts = allDistict();
      expect(districts).toContain("Dhaka");
      expect(districts).toContain("Chattogram");
      expect(districts).toContain("Sylhet");
      expect(districts).toContain("Rajshahi");
    });

    it("should return unique district names", () => {
      const districts = allDistict();
      const uniqueDistricts = [...new Set(districts)];
      expect(districts.length).toBe(uniqueDistricts.length);
    });
  });

  describe("allDistricts (alias)", () => {
    it("should be an alias for allDistict", () => {
      expect(allDistricts).toBe(allDistict);
    });

    it("should return the same results as allDistict", () => {
      const fromOld = allDistict();
      const fromNew = allDistricts();
      expect(fromNew).toEqual(fromOld);
    });
  });
});
