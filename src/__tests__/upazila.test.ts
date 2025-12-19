import {
  upazilasOf,
  allUpazila,
  allThana,
  allThanaNames,
  thanasOf,
  isThana,
  isUpazila,
  getThana,
  getUpazila,
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
});
