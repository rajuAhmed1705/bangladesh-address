import { suggest, SuggestOptions } from "../index";
import divisionData from "../json/bd-division.json";
import districtData from "../json/bd-district.json";
import upazilaData from "../json/bd-upazila.json";
import { Division, District, Upazila } from "../types";

describe("suggest", () => {
  describe("English exact, prefix, and alias queries", () => {
    it("returns exact match with score 1 and full path/label", () => {
      const results = suggest("Kaliganj", { within: { district: "Gazipur" }, limit: 5 });
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toEqual({
        type: "upazila",
        name: "Kaliganj",
        path: {
          division: "Dhaka",
          district: "Gazipur",
          upazila: "Kaliganj",
        },
        label: "Kaliganj, Gazipur, Dhaka",
        score: 1,
      });
    });

    it("resolves district aliases like jessore -> Jessore", () => {
      const results = suggest("jessore");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name).toBe("Jessore");
      expect(results[0].type).toBe("district");
      expect(results[0].score).toBe(1);
      expect(results[0].label).toBe("Jessore, Khulna");
      expect(results[0].labelBn).toBe("যশোর, খুলনা");
    });

    it("resolves division aliases like chittagong -> Chattogram", () => {
      const results = suggest("chittagong");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name).toBe("Chattogram");
      expect(results[0].type).toBe("division");
      expect(results[0].score).toBe(1);
    });
  });

  describe("Issue #55 expected first results table", () => {
    it.each([
      ["mirpr", "Mirpur"],
      ["মিরপুর", "Mirpur"],
      ["jessore", "Jessore"],
      ["sabhar", "Savar"],
      ["rangpoor", "Rangpur"],
      ["kaligunj", "Kaliganj"],
      ["dhnmondi", "Dhanmondi"],
      ["barishal", "Barisal"],
      ["cumilla", "Comilla"],
    ])("suggest(%p) returns %p as first result", (query, expectedName) => {
      const results = suggest(query);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name).toBe(expectedName);
    });

    it("matches 'kaligonj' within Gazipur to Kaliganj", () => {
      const results = suggest("kaligonj", { within: { district: "Gazipur" }, limit: 5 });
      expect(results.length).toBe(1);
      expect(results[0].name).toBe("Kaliganj");
      expect(results[0].path.district).toBe("Gazipur");
      expect(results[0].score).toBeGreaterThanOrEqual(0.75);
    });
  });

  describe("All dataset entries lookup", () => {
    it("finds every division, district, and upazila by English name and Bengali name (where present)", () => {
      for (const div of divisionData as Division[]) {
        const en = suggest(div.name, { types: ["division"], limit: 5 });
        expect(en.some((r) => r.name === div.name)).toBe(true);

        const bn = suggest(div.nameBn, { types: ["division"], limit: 5 });
        expect(bn.some((r) => r.name === div.name)).toBe(true);
      }

      for (const dist of districtData as District[]) {
        const en = suggest(dist.name, { types: ["district"], limit: 5 });
        expect(en.some((r) => r.name === dist.name)).toBe(true);

        const bn = suggest(dist.nameBn, { types: ["district"], limit: 5 });
        expect(bn.some((r) => r.name === dist.name)).toBe(true);
      }

      for (const upa of upazilaData as Upazila[]) {
        const en = suggest(upa.upazila, {
          types: ["upazila"],
          within: { district: upa.district },
          limit: 5,
        });
        expect(en.some((r) => r.name === upa.upazila)).toBe(true);

        if (upa.upazilaBn) {
          const bn = suggest(upa.upazilaBn, {
            types: ["upazila"],
            within: { district: upa.district },
            limit: 5,
          });
          expect(bn.some((r) => r.name === upa.upazila)).toBe(true);
        }
      }
    });
  });

  describe("Bengali queries", () => {
    it("matches Bengali query 'মিরপুর'", () => {
      const results = suggest("মিরপুর");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].nameBn).toBe("মিরপুর");
      expect(results[0].type).toBe("thana");
      expect(results[0].path).toEqual({
        division: "Dhaka",
        district: "Dhaka",
        thana: "Mirpur",
      });
      expect(results[0].labelBn).toBe("মিরপুর, ঢাকা, ঢাকা");
      expect(results[0].score).toBe(1);
    });

    it("matches Bengali division and district names", () => {
      const results = suggest("সিলেট");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].type).toBe("division");
      expect(results[0].name).toBe("Sylhet");
      expect(results[0].score).toBe(1);
    });
  });

  describe("Options: within, types, limit, and safety guards", () => {
    it("filters by within.division (including alias)", () => {
      const results = suggest("Sadar", { within: { division: "Barishal" }, limit: 20 });
      expect(results.length).toBeGreaterThan(0);
      results.forEach((r) => {
        expect(r.path.division).toBe("Barisal");
      });
    });

    it("filters by within.district in Bengali", () => {
      const results = suggest("সদর", { within: { district: "সিলেট" } });
      expect(results.length).toBe(1);
      expect(results[0].name).toBe("Sylhet Sadar");
    });

    it("filters by types option", () => {
      const results = suggest("Dhaka", { types: ["division"] });
      expect(results).toHaveLength(1);
      expect(results[0].type).toBe("division");
    });

    it("respects limit option", () => {
      const results = suggest("Sadar", { limit: 3 });
      expect(results).toHaveLength(3);
    });

    it("never throws on null options or non-string within fields", () => {
      expect(() => suggest("dhaka", null as unknown as SuggestOptions)).not.toThrow();
      expect(suggest("dhaka", null as unknown as SuggestOptions).length).toBeGreaterThan(0);

      expect(() =>
        suggest("dhaka", { within: { division: 123 as unknown as string } })
      ).not.toThrow();
      expect(
        suggest("dhaka", { within: { division: 123 as unknown as string } }).length
      ).toBeGreaterThan(0);

      expect(() =>
        suggest("dhaka", { within: { district: 123 as unknown as string } })
      ).not.toThrow();

      expect(() =>
        suggest("dhaka", { within: null as unknown as SuggestOptions["within"] })
      ).not.toThrow();
    });

    it("isolates returned path objects from the internal index", () => {
      const first = suggest("dhaka")[0];
      first.path.division = "x";
      const second = suggest("dhaka")[0];
      expect(second.path.division).toBe("Dhaka");
    });

    it("returns empty array for overly long queries (> 64 chars)", () => {
      expect(suggest("a".repeat(65))).toEqual([]);
      expect(suggest("a".repeat(5000))).toEqual([]);
    });

    it("returns empty array for empty, whitespace, non-string, or limit <= 0", () => {
      expect(suggest("")).toEqual([]);
      expect(suggest("   ")).toEqual([]);
      expect(suggest(null as unknown as string)).toEqual([]);
      expect(suggest("Dhaka", { limit: 0 })).toEqual([]);
      expect(suggest("Dhaka", { limit: -1 })).toEqual([]);
    });

    it("sorts results by score descending, then unit type hierarchy", () => {
      const results = suggest("Sylhet");
      expect(results[0].type).toBe("division");
      expect(results[1].type).toBe("district");
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
      }
    });
  });
});
