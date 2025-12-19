import { upazilasOf, allUpazila } from "../upazila";

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
    it("should return all 492 upazilas of Bangladesh", () => {
      const upazilas = allUpazila();
      expect(upazilas).toHaveLength(492);
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
  });
});
