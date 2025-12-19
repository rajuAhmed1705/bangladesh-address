import {
  upazilasOf,
  allUpazila,
  allThana,
  thanasOf,
  isThana,
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
  });

});
