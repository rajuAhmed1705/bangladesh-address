import { suggest } from "../suggest";

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

  describe("Fuzzy typo-tolerant matching", () => {
    it("matches 'mirpr' to Mirpur", () => {
      const results = suggest("mirpr");
      const names = results.map((r) => r.name);
      expect(names).toContain("Mirpur");
      results.forEach((r) => {
        expect(r.score).toBeGreaterThan(0);
        expect(r.score).toBeLessThanOrEqual(1);
      });
    });

    it("matches 'kaligonj' within Gazipur to Kaliganj", () => {
      const results = suggest("kaligonj", { within: { district: "Gazipur" }, limit: 5 });
      expect(results.length).toBe(1);
      expect(results[0].name).toBe("Kaliganj");
      expect(results[0].path.district).toBe("Gazipur");
      expect(results[0].score).toBeGreaterThanOrEqual(0.75);
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

  describe("Options: within, types, limit, and edge cases", () => {
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
