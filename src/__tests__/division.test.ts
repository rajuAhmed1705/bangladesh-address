import { allDivision, divisionalDataOf, getDivision, isValidDivision } from "../division";
import { DivisionName } from "../division/types/division-name";

describe("Division functions", () => {
  describe("allDivision", () => {
    it("should return all 8 divisions of Bangladesh", () => {
      const divisions = allDivision();
      expect(divisions).toHaveLength(8);
    });

    it("should contain all expected division names", () => {
      const divisions = allDivision();
      const expectedDivisions = [
        "Barisal",
        "Chattogram",
        "Dhaka",
        "Khulna",
        "Mymensingh",
        "Rajshahi",
        "Rangpur",
        "Sylhet",
      ];
      expectedDivisions.forEach((div) => {
        expect(divisions).toContain(div);
      });
    });

    it("should return an array of strings", () => {
      const divisions = allDivision();
      divisions.forEach((div) => {
        expect(typeof div).toBe("string");
      });
    });
  });

  describe("getDivision", () => {
    it("should return upazilas for Dhaka division", () => {
      const result = getDivision(DivisionName.Dhaka);
      expect(result.length).toBeGreaterThan(0);
      result.forEach((item) => {
        expect(item.division).toBe("Dhaka");
      });
    });

    it("should accept string input", () => {
      const result = getDivision("dhaka");
      expect(result.length).toBeGreaterThan(0);
      result.forEach((item) => {
        expect(item.division).toBe("Dhaka");
      });
    });

    it("should return empty array for invalid division", () => {
      const result = getDivision("InvalidDivision");
      expect(result).toHaveLength(0);
    });

    it("should return objects with upazila, district, and division properties", () => {
      const result = getDivision(DivisionName.Chattogram);
      expect(result.length).toBeGreaterThan(0);
      result.forEach((item) => {
        expect(item).toHaveProperty("upazila");
        expect(item).toHaveProperty("district");
        expect(item).toHaveProperty("division");
      });
    });
  });

  describe("divisionalDataOf", () => {
    it("should return districts and upazilas for a division", () => {
      const result = divisionalDataOf(DivisionName.Sylhet);
      expect(result.length).toBeGreaterThan(0);
      result.forEach((item) => {
        expect(item).toHaveProperty("district");
        expect(item).toHaveProperty("upazila");
      });
    });

    it("should not include division in returned objects", () => {
      const result = divisionalDataOf(DivisionName.Khulna);
      result.forEach((item) => {
        expect(item).not.toHaveProperty("division");
      });
    });
  });

  describe("isValidDivision", () => {
    it("should return true for valid divisions", () => {
      expect(isValidDivision("Dhaka")).toBe(true);
      expect(isValidDivision("Chattogram")).toBe(true);
      expect(isValidDivision("Sylhet")).toBe(true);
      expect(isValidDivision("Khulna")).toBe(true);
      expect(isValidDivision("Rajshahi")).toBe(true);
      expect(isValidDivision("Rangpur")).toBe(true);
      expect(isValidDivision("Barisal")).toBe(true);
      expect(isValidDivision("Mymensingh")).toBe(true);
    });

    it("should return false for invalid divisions", () => {
      expect(isValidDivision("InvalidDivision")).toBe(false);
      expect(isValidDivision("Tangail")).toBe(false);
      expect(isValidDivision("Savar")).toBe(false);
    });

    it("should handle case-insensitive input", () => {
      expect(isValidDivision("dhaka")).toBe(true);
      expect(isValidDivision("CHATTOGRAM")).toBe(true);
      expect(isValidDivision("SyLhEt")).toBe(true);
    });

    it("should return false for null/undefined input", () => {
      expect(isValidDivision(null as unknown as string)).toBe(false);
      expect(isValidDivision(undefined as unknown as string)).toBe(false);
      expect(isValidDivision("")).toBe(false);
    });

    it("should handle whitespace in input", () => {
      expect(isValidDivision("  Dhaka  ")).toBe(true);
      expect(isValidDivision("  Chattogram  ")).toBe(true);
    });
  });
});
