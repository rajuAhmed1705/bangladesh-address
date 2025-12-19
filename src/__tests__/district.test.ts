import { districtsOf, allDistricts, isValidDistrict, getDivisionOfDistrict } from "../district";
import { DivisionName } from "../division/types/division-name";

describe("District functions", () => {
  describe("districtsOf", () => {
    it("should return districts for Dhaka division", () => {
      const districts = districtsOf(DivisionName.Dhaka);
      expect(districts.length).toBeGreaterThan(0);
      expect(districts).toContain("Dhaka");
      expect(districts).toContain("Gazipur");
    });

    it("should return districts for Chattogram division", () => {
      const districts = districtsOf(DivisionName.Chattogram);
      expect(districts.length).toBeGreaterThan(0);
      expect(districts).toContain("Chattogram");
      expect(districts).toContain("Cox's Bazar");
    });

    it("should return an array of strings", () => {
      const districts = districtsOf(DivisionName.Rajshahi);
      districts.forEach((district) => {
        expect(typeof district).toBe("string");
      });
    });

    it("should return unique district names", () => {
      const districts = districtsOf(DivisionName.Khulna);
      const uniqueDistricts = [...new Set(districts)];
      expect(districts.length).toBe(uniqueDistricts.length);
    });
  });

  describe("allDistricts", () => {
    it("should return all 64 districts of Bangladesh", () => {
      const districts = allDistricts();
      expect(districts).toHaveLength(64);
    });

    it("should return an array of strings", () => {
      const districts = allDistricts();
      districts.forEach((district) => {
        expect(typeof district).toBe("string");
      });
    });

    it("should contain major districts", () => {
      const districts = allDistricts();
      expect(districts).toContain("Dhaka");
      expect(districts).toContain("Chattogram");
      expect(districts).toContain("Sylhet");
      expect(districts).toContain("Rajshahi");
    });

    it("should return unique district names", () => {
      const districts = allDistricts();
      const uniqueDistricts = [...new Set(districts)];
      expect(districts.length).toBe(uniqueDistricts.length);
    });
  });

  describe("isValidDistrict", () => {
    it("should return true for valid districts", () => {
      expect(isValidDistrict("Dhaka")).toBe(true);
      expect(isValidDistrict("Chattogram")).toBe(true);
      expect(isValidDistrict("Sylhet")).toBe(true);
      expect(isValidDistrict("Tangail")).toBe(true);
      expect(isValidDistrict("Cox's Bazar")).toBe(true);
    });

    it("should return false for invalid districts", () => {
      expect(isValidDistrict("InvalidDistrict")).toBe(false);
      expect(isValidDistrict("Savar")).toBe(false);
      expect(isValidDistrict("Gulshan")).toBe(false);
    });

    it("should handle case-insensitive input", () => {
      expect(isValidDistrict("dhaka")).toBe(true);
      expect(isValidDistrict("CHATTOGRAM")).toBe(true);
      expect(isValidDistrict("SyLhEt")).toBe(true);
    });

    it("should return false for null/undefined input", () => {
      expect(isValidDistrict(null as unknown as string)).toBe(false);
      expect(isValidDistrict(undefined as unknown as string)).toBe(false);
      expect(isValidDistrict("")).toBe(false);
    });

    it("should handle whitespace in input", () => {
      expect(isValidDistrict("  Dhaka  ")).toBe(true);
      expect(isValidDistrict("  Chattogram  ")).toBe(true);
    });

    it("should return false for non-districts", () => {
      expect(isValidDistrict("Dhaka")).toBe(true);
      expect(isValidDistrict("InvalidDistrict")).toBe(false);
    });
  });

  describe("getDivisionOfDistrict", () => {
    it("should return correct division for districts", () => {
      expect(getDivisionOfDistrict("Dhaka")).toBe("Dhaka");
      expect(getDivisionOfDistrict("Gazipur")).toBe("Dhaka");
      expect(getDivisionOfDistrict("Tangail")).toBe("Dhaka");
      expect(getDivisionOfDistrict("Chattogram")).toBe("Chattogram");
      expect(getDivisionOfDistrict("Cox's Bazar")).toBe("Chattogram");
      expect(getDivisionOfDistrict("Sylhet")).toBe("Sylhet");
      expect(getDivisionOfDistrict("Rajshahi")).toBe("Rajshahi");
      expect(getDivisionOfDistrict("Khulna")).toBe("Khulna");
      expect(getDivisionOfDistrict("Barisal")).toBe("Barisal");
      expect(getDivisionOfDistrict("Rangpur")).toBe("Rangpur");
      expect(getDivisionOfDistrict("Mymensingh")).toBe("Mymensingh");
    });

    it("should return undefined for invalid districts", () => {
      expect(getDivisionOfDistrict("InvalidDistrict")).toBeUndefined();
      expect(getDivisionOfDistrict("Savar")).toBeUndefined();
      expect(getDivisionOfDistrict("Gulshan")).toBeUndefined();
    });

    it("should handle case-insensitive input", () => {
      expect(getDivisionOfDistrict("dhaka")).toBe("Dhaka");
      expect(getDivisionOfDistrict("CHATTOGRAM")).toBe("Chattogram");
      expect(getDivisionOfDistrict("SyLhEt")).toBe("Sylhet");
    });

    it("should return undefined for null/undefined input", () => {
      expect(getDivisionOfDistrict(null as unknown as string)).toBeUndefined();
      expect(getDivisionOfDistrict(undefined as unknown as string)).toBeUndefined();
      expect(getDivisionOfDistrict("")).toBeUndefined();
    });

    it("should handle whitespace in input", () => {
      expect(getDivisionOfDistrict("  Dhaka  ")).toBe("Dhaka");
      expect(getDivisionOfDistrict("  Chattogram  ")).toBe("Chattogram");
    });

    it("should return correct division for all 64 districts", () => {
      const districts = allDistricts();
      districts.forEach((district) => {
        const division = getDivisionOfDistrict(district);
        expect(division).toBeDefined();
        expect(["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"]).toContain(division);
      });
    });
  });
});
