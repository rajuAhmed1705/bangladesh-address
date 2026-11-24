import {
  allDistricts,
  allDivision,
  districtAliases,
  districtsOf,
  divisionAliases,
  divisionalDataOf,
  DivisionName,
  getDistrictOfUpazila,
  getDivisionOfDistrict,
  getThana,
  getUpazila,
  isThana,
  isUpazila,
  isValidDistrict,
  isValidDivision,
  searchLocations,
  thanaNamesOf,
  thanasOf,
  upazilaNamesOf,
  upazilaNamesOfDivision,
  upazilasOf,
  upazilasOfDivision,
} from "../index";

describe("Spelling aliases", () => {
  describe("alias tables", () => {
    it("should map the officially renamed districts to the dataset spelling", () => {
      expect(districtAliases).toMatchObject({
        Barishal: "Barisal",
        Bogura: "Bogra",
        Cumilla: "Comilla",
        Jashore: "Jessore",
        Chittagong: "Chattogram",
      });
    });

    it("should map the renamed divisions to the dataset spelling", () => {
      expect(divisionAliases).toMatchObject({
        Barishal: "Barisal",
        Chittagong: "Chattogram",
      });
    });

    it("should only point district aliases at districts that exist in the data", () => {
      const districts = allDistricts();
      Object.values(districtAliases).forEach((canonical) => {
        expect(districts).toContain(canonical);
      });
    });

    it("should only point division aliases at divisions that exist in the data", () => {
      const divisions = allDivision();
      Object.values(divisionAliases).forEach((canonical) => {
        expect(divisions).toContain(canonical);
      });
    });

    it("should never use an existing district name as an alias", () => {
      const districts = allDistricts().map((d) => d.toLowerCase());
      Object.keys(districtAliases).forEach((alias) => {
        expect(districts).not.toContain(alias.toLowerCase());
      });
    });

    it("should never use an existing division name as an alias", () => {
      const divisions = allDivision().map((d) => d.toLowerCase());
      Object.keys(divisionAliases).forEach((alias) => {
        expect(divisions).not.toContain(alias.toLowerCase());
      });
    });
  });

  describe("district lookups", () => {
    const pairs = Object.entries(districtAliases);

    it.each(pairs)("upazilasOf(%s) should return the upazilas of %s", (alias, canonical) => {
      expect(upazilasOf(alias).length).toBeGreaterThan(0);
      expect(upazilasOf(alias)).toEqual(upazilasOf(canonical));
    });

    it.each(pairs)("isValidDistrict(%s) should be true", (alias) => {
      expect(isValidDistrict(alias)).toBe(true);
    });

    it.each(pairs)("getDivisionOfDistrict(%s) should match %s", (alias, canonical) => {
      expect(getDivisionOfDistrict(alias)).toBeDefined();
      expect(getDivisionOfDistrict(alias)).toBe(getDivisionOfDistrict(canonical));
    });

    it("should return upazila names for an alias", () => {
      expect(upazilaNamesOf("Cumilla")).toEqual(upazilaNamesOf("Comilla"));
      expect(upazilaNamesOf("Cumilla")).toContain("Comilla Sadar");
    });

    it("should keep the dataset spelling in returned records", () => {
      expect(upazilasOf("Cumilla").length).toBeGreaterThan(0);
      upazilasOf("Cumilla").forEach((upazila) => {
        expect(upazila.district).toBe("Comilla");
      });
    });

    it("should return thanas for an alias", () => {
      expect(thanasOf("Chittagong").length).toBeGreaterThan(0);
      expect(thanasOf("Chittagong")).toEqual(thanasOf("Chattogram"));
      expect(thanaNamesOf("Chittagong")).toEqual(thanaNamesOf("Chattogram"));
    });

    it("should ignore case and surrounding whitespace in an alias", () => {
      expect(upazilasOf("  CUMILLA ")).toEqual(upazilasOf("Comilla"));
    });

    it("should accept Cox's Bazar without the apostrophe or with a curly one", () => {
      const expected = upazilasOf("Cox's Bazar");
      expect(expected.length).toBeGreaterThan(0);
      expect(upazilasOf("Coxs Bazar")).toEqual(expected);
      expect(upazilasOf("Cox’s Bazar")).toEqual(expected);
    });

    it("should accept an alias as the district filter of upazila lookups", () => {
      expect(isUpazila("Bogra Sadar", "Bogura")).toBe(true);
      expect(getUpazila("Bogra Sadar", "Bogura")).toEqual(
        getUpazila("Bogra Sadar", "Bogra")
      );
    });

    it("should accept an alias as the district filter of thana lookups", () => {
      const thana = thanaNamesOf("Chattogram")[0];
      expect(isThana(thana, "Chittagong")).toBe(true);
      expect(getThana(thana, "Chittagong")).toEqual(getThana(thana, "Chattogram"));
    });

    it("should still return nothing for a name that is not a district", () => {
      expect(upazilasOf("Atlantis")).toEqual([]);
      expect(isValidDistrict("Atlantis")).toBe(false);
      expect(getDivisionOfDistrict("Atlantis")).toBeUndefined();
    });
  });

  describe("division lookups", () => {
    it("should validate a division alias", () => {
      expect(isValidDivision("Barishal")).toBe(true);
      expect(isValidDivision("Chittagong")).toBe(true);
    });

    it("should return districts for a division alias", () => {
      expect(districtsOf("Barishal")).toEqual(districtsOf(DivisionName.Barisal));
      expect(districtsOf("Chittagong")).toEqual(districtsOf(DivisionName.Chattogram));
    });

    it("should accept a plain string division name", () => {
      expect(districtsOf("Dhaka")).toEqual(districtsOf(DivisionName.Dhaka));
      expect(divisionalDataOf("Dhaka")).toEqual(divisionalDataOf(DivisionName.Dhaka));
    });

    it("should return divisional data for a division alias", () => {
      expect(divisionalDataOf("Barishal").length).toBeGreaterThan(0);
      expect(divisionalDataOf("Barishal")).toEqual(divisionalDataOf(DivisionName.Barisal));
    });

    it("should return upazilas for a division alias", () => {
      expect(upazilasOfDivision("Barishal").length).toBeGreaterThan(0);
      expect(upazilasOfDivision("Barishal")).toEqual(upazilasOfDivision("Barisal"));
      expect(upazilaNamesOfDivision("Chittagong")).toEqual(
        upazilaNamesOfDivision("Chattogram")
      );
    });

    it("should accept an alias as the division filter of a reverse lookup", () => {
      expect(getDistrictOfUpazila("Barisal Sadar", "Barishal")).toBe("Barisal");
    });
  });

  describe("searchLocations", () => {
    it("should find a district by its alias", () => {
      const results = searchLocations("Cumilla");
      expect(results).toContainEqual({
        name: "Comilla",
        type: "district",
        division: "Chattogram",
      });
    });

    it("should find a division by its alias", () => {
      const results = searchLocations("Barishal");
      expect(results).toContainEqual({ name: "Barisal", type: "division" });
    });

    it("should find an upazila whose name contains an aliased district name", () => {
      const names = searchLocations("Bogura Sadar").map((r) => r.name);
      expect(names).toContain("Bogra Sadar");
    });

    it("should still find a real name that happens to be an alias", () => {
      // "Khagrachhari" is an alias of the district "Khagrachari" and also the
      // exact name of an upazila, so both must be found.
      const results = searchLocations("Khagrachhari");
      expect(results.some((r) => r.type === "upazila" && r.name === "Khagrachhari")).toBe(true);
      expect(results.some((r) => r.type === "district" && r.name === "Khagrachari")).toBe(true);
    });

    it("should not return the same location twice", () => {
      const results = searchLocations("Khagrachhari");
      const keys = results.map((r) => `${r.type}|${r.name}|${r.district ?? ""}`);
      expect(new Set(keys).size).toBe(keys.length);
    });
  });
});
