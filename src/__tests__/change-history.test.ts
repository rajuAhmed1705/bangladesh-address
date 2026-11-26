import { allDivision, allDistricts } from "../index";
import changeData from "../json/bd-changes.json";

interface ChangeRecord {
  date: string;
  type: string;
  name: string;
  district?: string;
  division?: string;
  from?: string[];
  document: {
    title: string;
    url: string;
  };
}

const changes = changeData as ChangeRecord[];

describe("Administrative change history", () => {
  it("records the Mokamtola upazila creation with its gazette", () => {
    const mokamtola = changes.find((change) => change.name === "Mokamtola");
    expect(mokamtola).toBeDefined();
    expect(mokamtola?.date).toBe("2026-05-18");
    expect(mokamtola?.type).toBe("created");
    expect(mokamtola?.district).toBe("Bogra");
    expect(mokamtola?.document.url).toBe(
      "https://www.dpp.gov.bd/upload_file/gazettes/62632_37900.pdf"
    );
  });

  it("every record has a date, a type, a name and a document URL", () => {
    expect(changes.length).toBeGreaterThan(0);

    changes.forEach((change) => {
      expect(change.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(change.date))).toBe(false);
      expect(["created", "renamed", "split", "upgraded"]).toContain(change.type);
      expect(change.name.trim().length).toBeGreaterThan(0);
      expect(change.document.title.trim().length).toBeGreaterThan(0);
      expect(change.document.url).toMatch(/^https?:\/\/\S+$/);
    });
  });

  it("every record uses valid district and division names", () => {
    const validDistricts = allDistricts();
    const validDivisions = allDivision();

    changes.forEach((change) => {
      if (change.district) {
        expect(validDistricts).toContain(change.district);
      }
      if (change.division) {
        expect(validDivisions).toContain(change.division);
      }
    });
  });
});
