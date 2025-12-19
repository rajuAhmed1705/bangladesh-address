import {
  upazilasOf,
  upazilaNamesOf,
  allUpazila,
  allThana,
  allThanaNames,
  thanasOf,
  thanaNamesOf,
  isThana,
  isUpazila,
  getThana,
  getUpazila,
  getDistrictOfUpazila,
  upazilasOfDivision,
  upazilaNamesOfDivision,
  searchLocations,
  upazilaData,
  thanaData,
} from "../upazila";

describe("Upazila functions", () => {
  describe("upazilasOf", () => {
    it("should return upazilas for Dhaka district", () => {
      const upazilas = upazilasOf("Dhaka");
      expect(upazilas.length).toBeGreaterThan(0);
      upazilas.forEach((item) => {
        expect(item.district).toBe("Dhaka");
      });
    });

    it("should handle lowercase input", () => {
      const upazilas = upazilasOf("dhaka");
      expect(upazilas.length).toBeGreaterThan(0);
      upazilas.forEach((item) => {
        expect(item.district).toBe("Dhaka");
      });
    });

    it("should return objects with upazila, district, and division", () => {
      const upazilas = upazilasOf("Sylhet");
      expect(upazilas.length).toBeGreaterThan(0);
      upazilas.forEach((item) => {
        expect(item).toHaveProperty("upazila");
        expect(item).toHaveProperty("district");
        expect(item).toHaveProperty("division");
      });
    });

    it("should return empty array for invalid district", () => {
      const upazilas = upazilasOf("InvalidDistrict");
      expect(upazilas).toHaveLength(0);
    });

    it("should return correct division for each upazila", () => {
      const upazilas = upazilasOf("Chattogram");
      upazilas.forEach((item) => {
        expect(item.division).toBe("Chattogram");
      });
    });

    it("should return empty array for null/undefined input", () => {
      expect(upazilasOf(null as unknown as string)).toHaveLength(0);
      expect(upazilasOf(undefined as unknown as string)).toHaveLength(0);
      expect(upazilasOf("")).toHaveLength(0);
    });

    it("should handle whitespace in input", () => {
      const upazilas = upazilasOf("  Dhaka  ");
      expect(upazilas.length).toBeGreaterThan(0);
    });
  });

  describe("allUpazila", () => {
    it("should return all 495 upazilas of Bangladesh", () => {
      const upazilas = allUpazila();
      expect(upazilas).toHaveLength(495);
    });

    it("should return an array of strings", () => {
      const upazilas = allUpazila();
      upazilas.forEach((upazila) => {
        expect(typeof upazila).toBe("string");
      });
    });

    it("should contain known upazilas", () => {
      const upazilas = allUpazila();
      expect(upazilas).toContain("Savar");
      expect(upazilas).toContain("Keraniganj");
    });

    it("should not contain thanas (they are separate)", () => {
      const upazilas = allUpazila();
      expect(upazilas).not.toContain("Gulshan");
      expect(upazilas).not.toContain("Dhanmondi");
    });
  });

  describe("allThana", () => {
    it("should return all 26 metropolitan thanas", () => {
      const thanas = allThana();
      expect(thanas).toHaveLength(26);
    });

    it("should return thana objects with correct properties", () => {
      const thanas = allThana();
      thanas.forEach((thana) => {
        expect(thana).toHaveProperty("thana");
        expect(thana).toHaveProperty("district");
        expect(thana).toHaveProperty("division");
      });
    });

    it("should contain Dhaka metropolitan thanas", () => {
      const thanas = allThana();
      const thanaNames = thanas.map((t) => t.thana);
      expect(thanaNames).toContain("Gulshan");
      expect(thanaNames).toContain("Dhanmondi");
      expect(thanaNames).toContain("Mirpur");
    });
  });

  describe("allThanaNames", () => {
    it("should return all 26 thana names", () => {
      const thanaNames = allThanaNames();
      expect(thanaNames).toHaveLength(26);
    });

    it("should return an array of strings", () => {
      const thanaNames = allThanaNames();
      thanaNames.forEach((name) => {
        expect(typeof name).toBe("string");
      });
    });

    it("should contain known thana names", () => {
      const thanaNames = allThanaNames();
      expect(thanaNames).toContain("Gulshan");
      expect(thanaNames).toContain("Dhanmondi");
      expect(thanaNames).toContain("Kotwali");
    });

    it("should be consistent with allThana", () => {
      const thanaObjects = allThana();
      const thanaNames = allThanaNames();
      expect(thanaNames.length).toBe(thanaObjects.length);
      thanaObjects.forEach((thana) => {
        expect(thanaNames).toContain(thana.thana);
      });
    });
  });

  describe("thanasOf", () => {
    it("should return thanas for Dhaka district", () => {
      const thanas = thanasOf("Dhaka");
      expect(thanas.length).toBe(15);
      thanas.forEach((thana) => {
        expect(thana.district).toBe("Dhaka");
      });
    });

    it("should return empty array for districts without thanas", () => {
      const thanas = thanasOf("Barguna");
      expect(thanas).toHaveLength(0);
    });

    it("should handle case-insensitive input", () => {
      const thanas = thanasOf("dhaka");
      expect(thanas.length).toBe(15);
    });

    it("should return empty array for null/undefined input", () => {
      expect(thanasOf(null as unknown as string)).toHaveLength(0);
      expect(thanasOf(undefined as unknown as string)).toHaveLength(0);
      expect(thanasOf("")).toHaveLength(0);
    });

    it("should handle whitespace in input", () => {
      const thanas = thanasOf("  Dhaka  ");
      expect(thanas.length).toBe(15);
    });
  });

  describe("isThana", () => {
    it("should return true for known thanas", () => {
      expect(isThana("Gulshan")).toBe(true);
      expect(isThana("Dhanmondi")).toBe(true);
      expect(isThana("Motijheel")).toBe(true);
    });

    it("should return false for regular upazilas", () => {
      expect(isThana("Savar")).toBe(false);
      expect(isThana("Keraniganj")).toBe(false);
    });

    it("should handle case-insensitive input", () => {
      expect(isThana("gulshan")).toBe(true);
      expect(isThana("DHANMONDI")).toBe(true);
    });

    it("should return false for non-existent locations", () => {
      expect(isThana("NonExistent")).toBe(false);
    });

    it("should return false for null/undefined input", () => {
      expect(isThana(null as unknown as string)).toBe(false);
      expect(isThana(undefined as unknown as string)).toBe(false);
      expect(isThana("")).toBe(false);
    });

    it("should handle whitespace in input", () => {
      expect(isThana("  Gulshan  ")).toBe(true);
    });

    it("should disambiguate with district context", () => {
      // Kotwali exists in both Dhaka and Chattogram
      expect(isThana("Kotwali")).toBe(true);
      expect(isThana("Kotwali", "Dhaka")).toBe(true);
      expect(isThana("Kotwali", "Chattogram")).toBe(true);
      expect(isThana("Kotwali", "Sylhet")).toBe(false);
    });
  });

  describe("isUpazila", () => {
    it("should return true for known upazilas", () => {
      expect(isUpazila("Savar")).toBe(true);
      expect(isUpazila("Keraniganj")).toBe(true);
      expect(isUpazila("Dhamrai")).toBe(true);
    });

    it("should return false for thanas", () => {
      expect(isUpazila("Gulshan")).toBe(false);
      expect(isUpazila("Dhanmondi")).toBe(false);
    });

    it("should handle case-insensitive input", () => {
      expect(isUpazila("savar")).toBe(true);
      expect(isUpazila("KERANIGANJ")).toBe(true);
    });

    it("should return false for non-existent locations", () => {
      expect(isUpazila("NonExistent")).toBe(false);
    });

    it("should return false for null/undefined input", () => {
      expect(isUpazila(null as unknown as string)).toBe(false);
      expect(isUpazila(undefined as unknown as string)).toBe(false);
      expect(isUpazila("")).toBe(false);
    });

    it("should handle whitespace in input", () => {
      expect(isUpazila("  Savar  ")).toBe(true);
    });

    it("should disambiguate with district context", () => {
      // Mohammadpur exists as upazila in Magura
      expect(isUpazila("Mohammadpur")).toBe(true);
      expect(isUpazila("Mohammadpur", "Magura")).toBe(true);
      expect(isUpazila("Mohammadpur", "Dhaka")).toBe(false);
    });
  });

  describe("getThana", () => {
    it("should return thana object for known thana", () => {
      const thana = getThana("Gulshan");
      expect(thana).toBeDefined();
      expect(thana?.thana).toBe("Gulshan");
      expect(thana?.district).toBe("Dhaka");
      expect(thana?.division).toBe("Dhaka");
    });

    it("should return undefined for non-existent thana", () => {
      expect(getThana("NonExistent")).toBeUndefined();
    });

    it("should return undefined for upazilas", () => {
      expect(getThana("Savar")).toBeUndefined();
    });

    it("should handle case-insensitive input", () => {
      const thana = getThana("gulshan");
      expect(thana?.thana).toBe("Gulshan");
    });

    it("should return undefined for null/undefined input", () => {
      expect(getThana(null as unknown as string)).toBeUndefined();
      expect(getThana(undefined as unknown as string)).toBeUndefined();
      expect(getThana("")).toBeUndefined();
    });

    it("should handle whitespace in input", () => {
      const thana = getThana("  Gulshan  ");
      expect(thana?.thana).toBe("Gulshan");
    });

    it("should disambiguate with district context", () => {
      // Kotwali exists in both Dhaka and Chattogram
      const dhakaKotwali = getThana("Kotwali", "Dhaka");
      const chattogramKotwali = getThana("Kotwali", "Chattogram");
      expect(dhakaKotwali?.district).toBe("Dhaka");
      expect(chattogramKotwali?.district).toBe("Chattogram");
    });
  });

  describe("getUpazila", () => {
    it("should return upazila object for known upazila", () => {
      const upazila = getUpazila("Savar");
      expect(upazila).toBeDefined();
      expect(upazila?.upazila).toBe("Savar");
      expect(upazila?.district).toBe("Dhaka");
      expect(upazila?.division).toBe("Dhaka");
    });

    it("should return undefined for non-existent upazila", () => {
      expect(getUpazila("NonExistent")).toBeUndefined();
    });

    it("should return undefined for thanas", () => {
      expect(getUpazila("Gulshan")).toBeUndefined();
    });

    it("should handle case-insensitive input", () => {
      const upazila = getUpazila("savar");
      expect(upazila?.upazila).toBe("Savar");
    });

    it("should return undefined for null/undefined input", () => {
      expect(getUpazila(null as unknown as string)).toBeUndefined();
      expect(getUpazila(undefined as unknown as string)).toBeUndefined();
      expect(getUpazila("")).toBeUndefined();
    });

    it("should handle whitespace in input", () => {
      const upazila = getUpazila("  Savar  ");
      expect(upazila?.upazila).toBe("Savar");
    });

    it("should disambiguate with district context", () => {
      // Mohammadpur exists as upazila in Magura
      const maguraUpazila = getUpazila("Mohammadpur", "Magura");
      expect(maguraUpazila?.district).toBe("Magura");
      expect(getUpazila("Mohammadpur", "Dhaka")).toBeUndefined();
    });
  });

  describe("getDistrictOfUpazila", () => {
    it("should return district for known upazila", () => {
      expect(getDistrictOfUpazila("Savar")).toBe("Dhaka");
      expect(getDistrictOfUpazila("Keraniganj")).toBe("Dhaka");
    });

    it("should return undefined for non-existent upazila", () => {
      expect(getDistrictOfUpazila("NonExistent")).toBeUndefined();
    });

    it("should return undefined for thanas", () => {
      expect(getDistrictOfUpazila("Gulshan")).toBeUndefined();
    });

    it("should handle case-insensitive input", () => {
      expect(getDistrictOfUpazila("savar")).toBe("Dhaka");
      expect(getDistrictOfUpazila("KERANIGANJ")).toBe("Dhaka");
    });

    it("should return undefined for null/undefined input", () => {
      expect(getDistrictOfUpazila(null as unknown as string)).toBeUndefined();
      expect(getDistrictOfUpazila(undefined as unknown as string)).toBeUndefined();
      expect(getDistrictOfUpazila("")).toBeUndefined();
    });

    it("should handle whitespace in input", () => {
      expect(getDistrictOfUpazila("  Savar  ")).toBe("Dhaka");
    });

    it("should disambiguate with division context", () => {
      // Mohammadpur exists as upazila in Magura (Khulna division)
      expect(getDistrictOfUpazila("Mohammadpur")).toBe("Magura");
      expect(getDistrictOfUpazila("Mohammadpur", "Khulna")).toBe("Magura");
    });
  });

  describe("upazilasOfDivision", () => {
    it("should return upazilas for Dhaka division", () => {
      const upazilas = upazilasOfDivision("Dhaka");
      expect(upazilas.length).toBeGreaterThan(0);
      upazilas.forEach((item) => {
        expect(item.division).toBe("Dhaka");
      });
    });

    it("should return all 8 divisions worth of upazilas", () => {
      const divisions = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];
      divisions.forEach((division) => {
        const upazilas = upazilasOfDivision(division);
        expect(upazilas.length).toBeGreaterThan(0);
      });
    });

    it("should return empty array for invalid division", () => {
      expect(upazilasOfDivision("InvalidDivision")).toHaveLength(0);
    });

    it("should handle case-insensitive input", () => {
      const upazilas = upazilasOfDivision("dhaka");
      expect(upazilas.length).toBeGreaterThan(0);
    });

    it("should return empty array for null/undefined input", () => {
      expect(upazilasOfDivision(null as unknown as string)).toHaveLength(0);
      expect(upazilasOfDivision(undefined as unknown as string)).toHaveLength(0);
      expect(upazilasOfDivision("")).toHaveLength(0);
    });

    it("should handle whitespace in input", () => {
      const upazilas = upazilasOfDivision("  Dhaka  ");
      expect(upazilas.length).toBeGreaterThan(0);
    });

    it("total upazilas from all divisions should equal 495", () => {
      const divisions = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];
      let totalCount = 0;
      divisions.forEach((division) => {
        totalCount += upazilasOfDivision(division).length;
      });
      expect(totalCount).toBe(495);
    });
  });

  describe("searchLocations", () => {
    it("should find divisions", () => {
      const results = searchLocations("Dhaka");
      const divisionResults = results.filter((r) => r.type === "division");
      expect(divisionResults.length).toBeGreaterThan(0);
      expect(divisionResults[0].name).toBe("Dhaka");
    });

    it("should find districts", () => {
      const results = searchLocations("Tangail");
      const districtResults = results.filter((r) => r.type === "district");
      expect(districtResults.length).toBeGreaterThan(0);
      expect(districtResults[0].name).toBe("Tangail");
    });

    it("should find upazilas", () => {
      const results = searchLocations("Savar");
      const upazilaResults = results.filter((r) => r.type === "upazila");
      expect(upazilaResults.length).toBeGreaterThan(0);
      expect(upazilaResults[0].name).toBe("Savar");
    });

    it("should find thanas", () => {
      const results = searchLocations("Gulshan");
      const thanaResults = results.filter((r) => r.type === "thana");
      expect(thanaResults.length).toBeGreaterThan(0);
      expect(thanaResults[0].name).toBe("Gulshan");
    });

    it("should return multiple matches for partial queries", () => {
      const results = searchLocations("pur");
      expect(results.length).toBeGreaterThan(5);
    });

    it("should handle case-insensitive search", () => {
      const results = searchLocations("DHAKA");
      expect(results.length).toBeGreaterThan(0);
    });

    it("should return empty array for no matches", () => {
      const results = searchLocations("xyz123nonexistent");
      expect(results).toHaveLength(0);
    });

    it("should return empty array for null/undefined input", () => {
      expect(searchLocations(null as unknown as string)).toHaveLength(0);
      expect(searchLocations(undefined as unknown as string)).toHaveLength(0);
      expect(searchLocations("")).toHaveLength(0);
      expect(searchLocations("   ")).toHaveLength(0);
    });

    it("should include district and division in results", () => {
      const results = searchLocations("Savar");
      const upazilaResult = results.find((r) => r.type === "upazila" && r.name === "Savar");
      expect(upazilaResult?.district).toBe("Dhaka");
      expect(upazilaResult?.division).toBe("Dhaka");
    });
  });

  describe("Raw data exports", () => {
    it("should export upazilaData with 495 entries", () => {
      expect(Array.isArray(upazilaData)).toBe(true);
      expect(upazilaData.length).toBe(495);
    });

    it("should export thanaData with 26 entries", () => {
      expect(Array.isArray(thanaData)).toBe(true);
      expect(thanaData.length).toBe(26);
    });

    it("upazilaData entries should have correct structure", () => {
      upazilaData.forEach((item) => {
        expect(item).toHaveProperty("upazila");
        expect(item).toHaveProperty("district");
        expect(item).toHaveProperty("division");
      });
    });

    it("thanaData entries should have correct structure", () => {
      thanaData.forEach((item) => {
        expect(item).toHaveProperty("thana");
        expect(item).toHaveProperty("district");
        expect(item).toHaveProperty("division");
      });
    });
  });

  describe("*NamesOf functions (v2.0.0)", () => {
    describe("upazilaNamesOf", () => {
      it("should return upazila names for a district", () => {
        const names = upazilaNamesOf("Dhaka");
        expect(names.length).toBeGreaterThan(0);
        names.forEach((name) => {
          expect(typeof name).toBe("string");
        });
      });

      it("should return same count as upazilasOf", () => {
        const objects = upazilasOf("Dhaka");
        const names = upazilaNamesOf("Dhaka");
        expect(names.length).toBe(objects.length);
      });

      it("should return empty array for invalid district", () => {
        expect(upazilaNamesOf("InvalidDistrict")).toHaveLength(0);
      });
    });

    describe("thanaNamesOf", () => {
      it("should return thana names for a district", () => {
        const names = thanaNamesOf("Dhaka");
        expect(names.length).toBe(15);
        names.forEach((name) => {
          expect(typeof name).toBe("string");
        });
      });

      it("should return same count as thanasOf", () => {
        const objects = thanasOf("Dhaka");
        const names = thanaNamesOf("Dhaka");
        expect(names.length).toBe(objects.length);
      });

      it("should return empty array for districts without thanas", () => {
        expect(thanaNamesOf("Tangail")).toHaveLength(0);
      });
    });

    describe("upazilaNamesOfDivision", () => {
      it("should return upazila names for a division", () => {
        const names = upazilaNamesOfDivision("Dhaka");
        expect(names.length).toBeGreaterThan(0);
        names.forEach((name) => {
          expect(typeof name).toBe("string");
        });
      });

      it("should return same count as upazilasOfDivision", () => {
        const objects = upazilasOfDivision("Dhaka");
        const names = upazilaNamesOfDivision("Dhaka");
        expect(names.length).toBe(objects.length);
      });

      it("should return empty array for invalid division", () => {
        expect(upazilaNamesOfDivision("InvalidDivision")).toHaveLength(0);
      });

      it("total upazila names from all divisions should equal 495", () => {
        const divisions = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];
        let totalCount = 0;
        divisions.forEach((division) => {
          totalCount += upazilaNamesOfDivision(division).length;
        });
        expect(totalCount).toBe(495);
      });
    });
  });
});
