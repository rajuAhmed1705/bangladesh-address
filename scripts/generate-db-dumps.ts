/**
 * Script to generate database dumps from JSON data
 * Run: npx ts-node scripts/generate-db-dumps.ts
 */

import * as fs from "fs";
import * as path from "path";

// Load JSON data
const upazilaData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../src/json/bd-upazila.json"), "utf-8")
);
const thanaData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../src/json/bd-thana.json"), "utf-8")
);

// Extract unique divisions and districts
const divisions = [...new Set(upazilaData.map((u: any) => u.division))].sort();
const districtsMap = new Map<string, string>();
upazilaData.forEach((u: any) => {
  if (!districtsMap.has(u.district)) {
    districtsMap.set(u.district, u.division);
  }
});
const districts = Array.from(districtsMap.entries())
  .map(([name, division]) => ({ name, division }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Helper to escape SQL strings
const escapeSQL = (str: string): string => str.replace(/'/g, "''");

// Generate MySQL dump
function generateMySQL(): string {
  let sql = `-- Bangladesh Address Database
-- Generated: ${new Date().toISOString()}
-- Source: https://github.com/rajuAhmed1705/bangladesh-address

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table: divisions
-- ----------------------------
DROP TABLE IF EXISTS \`divisions\`;
CREATE TABLE \`divisions\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(50) NOT NULL,
  \`name_bn\` VARCHAR(50) DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_divisions_name\` (\`name\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table: districts
-- ----------------------------
DROP TABLE IF EXISTS \`districts\`;
CREATE TABLE \`districts\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`division_id\` INT UNSIGNED NOT NULL,
  \`name\` VARCHAR(50) NOT NULL,
  \`name_bn\` VARCHAR(50) DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_districts_name\` (\`name\`),
  KEY \`idx_districts_division\` (\`division_id\`),
  CONSTRAINT \`fk_districts_division\` FOREIGN KEY (\`division_id\`) REFERENCES \`divisions\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table: upazilas
-- ----------------------------
DROP TABLE IF EXISTS \`upazilas\`;
CREATE TABLE \`upazilas\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`district_id\` INT UNSIGNED NOT NULL,
  \`name\` VARCHAR(50) NOT NULL,
  \`name_bn\` VARCHAR(50) DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_upazilas_district\` (\`district_id\`),
  KEY \`idx_upazilas_name\` (\`name\`),
  CONSTRAINT \`fk_upazilas_district\` FOREIGN KEY (\`district_id\`) REFERENCES \`districts\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table: thanas
-- ----------------------------
DROP TABLE IF EXISTS \`thanas\`;
CREATE TABLE \`thanas\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`district_id\` INT UNSIGNED NOT NULL,
  \`name\` VARCHAR(50) NOT NULL,
  \`name_bn\` VARCHAR(50) DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_thanas_district\` (\`district_id\`),
  KEY \`idx_thanas_name\` (\`name\`),
  CONSTRAINT \`fk_thanas_district\` FOREIGN KEY (\`district_id\`) REFERENCES \`districts\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------
-- Data: divisions
-- ----------------------------
INSERT INTO \`divisions\` (\`id\`, \`name\`) VALUES
`;

  sql += divisions.map((d, i) => `(${i + 1}, '${escapeSQL(d as string)}')`).join(",\n");
  sql += ";\n\n";

  // Create division ID map
  const divisionIdMap = new Map<string, number>();
  divisions.forEach((d, i) => divisionIdMap.set(d as string, i + 1));

  sql += `-- ----------------------------
-- Data: districts
-- ----------------------------
INSERT INTO \`districts\` (\`id\`, \`division_id\`, \`name\`) VALUES
`;

  sql += districts
    .map((d, i) => `(${i + 1}, ${divisionIdMap.get(d.division)}, '${escapeSQL(d.name)}')`)
    .join(",\n");
  sql += ";\n\n";

  // Create district ID map
  const districtIdMap = new Map<string, number>();
  districts.forEach((d, i) => districtIdMap.set(d.name, i + 1));

  sql += `-- ----------------------------
-- Data: upazilas
-- ----------------------------
INSERT INTO \`upazilas\` (\`id\`, \`district_id\`, \`name\`) VALUES
`;

  sql += upazilaData
    .map((u: any, i: number) => `(${i + 1}, ${districtIdMap.get(u.district)}, '${escapeSQL(u.upazila)}')`)
    .join(",\n");
  sql += ";\n\n";

  sql += `-- ----------------------------
-- Data: thanas
-- ----------------------------
INSERT INTO \`thanas\` (\`id\`, \`district_id\`, \`name\`) VALUES
`;

  sql += thanaData
    .map((t: any, i: number) => `(${i + 1}, ${districtIdMap.get(t.district)}, '${escapeSQL(t.thana)}')`)
    .join(",\n");
  sql += ";\n";

  return sql;
}

// Generate PostgreSQL dump
function generatePostgreSQL(): string {
  let sql = `-- Bangladesh Address Database
-- Generated: ${new Date().toISOString()}
-- Source: https://github.com/rajuAhmed1705/bangladesh-address

-- ----------------------------
-- Table: divisions
-- ----------------------------
DROP TABLE IF EXISTS thanas;
DROP TABLE IF EXISTS upazilas;
DROP TABLE IF EXISTS districts;
DROP TABLE IF EXISTS divisions;

CREATE TABLE divisions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  name_bn VARCHAR(50) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- Table: districts
-- ----------------------------
CREATE TABLE districts (
  id SERIAL PRIMARY KEY,
  division_id INTEGER NOT NULL REFERENCES divisions(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL UNIQUE,
  name_bn VARCHAR(50) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_districts_division ON districts(division_id);

-- ----------------------------
-- Table: upazilas
-- ----------------------------
CREATE TABLE upazilas (
  id SERIAL PRIMARY KEY,
  district_id INTEGER NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  name_bn VARCHAR(50) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_upazilas_district ON upazilas(district_id);
CREATE INDEX idx_upazilas_name ON upazilas(name);

-- ----------------------------
-- Table: thanas
-- ----------------------------
CREATE TABLE thanas (
  id SERIAL PRIMARY KEY,
  district_id INTEGER NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  name_bn VARCHAR(50) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_thanas_district ON thanas(district_id);
CREATE INDEX idx_thanas_name ON thanas(name);

-- ----------------------------
-- Data: divisions
-- ----------------------------
INSERT INTO divisions (id, name) VALUES
`;

  sql += divisions.map((d, i) => `(${i + 1}, '${escapeSQL(d as string)}')`).join(",\n");
  sql += ";\n\n";

  const divisionIdMap = new Map<string, number>();
  divisions.forEach((d, i) => divisionIdMap.set(d as string, i + 1));

  sql += `-- ----------------------------
-- Data: districts
-- ----------------------------
INSERT INTO districts (id, division_id, name) VALUES
`;

  sql += districts
    .map((d, i) => `(${i + 1}, ${divisionIdMap.get(d.division)}, '${escapeSQL(d.name)}')`)
    .join(",\n");
  sql += ";\n\n";

  const districtIdMap = new Map<string, number>();
  districts.forEach((d, i) => districtIdMap.set(d.name, i + 1));

  sql += `-- ----------------------------
-- Data: upazilas
-- ----------------------------
INSERT INTO upazilas (id, district_id, name) VALUES
`;

  sql += upazilaData
    .map((u: any, i: number) => `(${i + 1}, ${districtIdMap.get(u.district)}, '${escapeSQL(u.upazila)}')`)
    .join(",\n");
  sql += ";\n\n";

  sql += `-- ----------------------------
-- Data: thanas
-- ----------------------------
INSERT INTO thanas (id, district_id, name) VALUES
`;

  sql += thanaData
    .map((t: any, i: number) => `(${i + 1}, ${districtIdMap.get(t.district)}, '${escapeSQL(t.thana)}')`)
    .join(",\n");
  sql += ";\n\n";

  sql += `-- Reset sequences
SELECT setval('divisions_id_seq', (SELECT MAX(id) FROM divisions));
SELECT setval('districts_id_seq', (SELECT MAX(id) FROM districts));
SELECT setval('upazilas_id_seq', (SELECT MAX(id) FROM upazilas));
SELECT setval('thanas_id_seq', (SELECT MAX(id) FROM thanas));
`;

  return sql;
}

// Generate SQLite dump
function generateSQLite(): string {
  let sql = `-- Bangladesh Address Database
-- Generated: ${new Date().toISOString()}
-- Source: https://github.com/rajuAhmed1705/bangladesh-address

PRAGMA foreign_keys = OFF;

-- ----------------------------
-- Table: divisions
-- ----------------------------
DROP TABLE IF EXISTS thanas;
DROP TABLE IF EXISTS upazilas;
DROP TABLE IF EXISTS districts;
DROP TABLE IF EXISTS divisions;

CREATE TABLE divisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  name_bn TEXT DEFAULT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- Table: districts
-- ----------------------------
CREATE TABLE districts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  division_id INTEGER NOT NULL,
  name TEXT NOT NULL UNIQUE,
  name_bn TEXT DEFAULT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (division_id) REFERENCES divisions(id) ON DELETE CASCADE
);

CREATE INDEX idx_districts_division ON districts(division_id);

-- ----------------------------
-- Table: upazilas
-- ----------------------------
CREATE TABLE upazilas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  district_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  name_bn TEXT DEFAULT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE
);

CREATE INDEX idx_upazilas_district ON upazilas(district_id);
CREATE INDEX idx_upazilas_name ON upazilas(name);

-- ----------------------------
-- Table: thanas
-- ----------------------------
CREATE TABLE thanas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  district_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  name_bn TEXT DEFAULT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE
);

CREATE INDEX idx_thanas_district ON thanas(district_id);
CREATE INDEX idx_thanas_name ON thanas(name);

PRAGMA foreign_keys = ON;

-- ----------------------------
-- Data: divisions
-- ----------------------------
`;

  divisions.forEach((d, i) => {
    sql += `INSERT INTO divisions (id, name) VALUES (${i + 1}, '${escapeSQL(d as string)}');\n`;
  });

  const divisionIdMap = new Map<string, number>();
  divisions.forEach((d, i) => divisionIdMap.set(d as string, i + 1));

  sql += `\n-- ----------------------------
-- Data: districts
-- ----------------------------
`;

  districts.forEach((d, i) => {
    sql += `INSERT INTO districts (id, division_id, name) VALUES (${i + 1}, ${divisionIdMap.get(d.division)}, '${escapeSQL(d.name)}');\n`;
  });

  const districtIdMap = new Map<string, number>();
  districts.forEach((d, i) => districtIdMap.set(d.name, i + 1));

  sql += `\n-- ----------------------------
-- Data: upazilas
-- ----------------------------
`;

  upazilaData.forEach((u: any, i: number) => {
    sql += `INSERT INTO upazilas (id, district_id, name) VALUES (${i + 1}, ${districtIdMap.get(u.district)}, '${escapeSQL(u.upazila)}');\n`;
  });

  sql += `\n-- ----------------------------
-- Data: thanas
-- ----------------------------
`;

  thanaData.forEach((t: any, i: number) => {
    sql += `INSERT INTO thanas (id, district_id, name) VALUES (${i + 1}, ${districtIdMap.get(t.district)}, '${escapeSQL(t.thana)}');\n`;
  });

  return sql;
}

// Generate MongoDB collections
function generateMongoDB(): object {
  const divisionIdMap = new Map<string, number>();
  divisions.forEach((d, i) => divisionIdMap.set(d as string, i + 1));

  const districtIdMap = new Map<string, number>();
  districts.forEach((d, i) => districtIdMap.set(d.name, i + 1));

  return {
    divisions: divisions.map((name, i) => ({
      _id: i + 1,
      name,
      name_bn: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    districts: districts.map((d, i) => ({
      _id: i + 1,
      division_id: divisionIdMap.get(d.division),
      name: d.name,
      name_bn: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    upazilas: upazilaData.map((u: any, i: number) => ({
      _id: i + 1,
      district_id: districtIdMap.get(u.district),
      name: u.upazila,
      name_bn: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    thanas: thanaData.map((t: any, i: number) => ({
      _id: i + 1,
      district_id: districtIdMap.get(t.district),
      name: t.thana,
      name_bn: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
  };
}

// Write files
const dbDir = path.join(__dirname, "../db");

console.log("Generating MySQL dump...");
fs.writeFileSync(path.join(dbDir, "mysql/bangladesh-address.sql"), generateMySQL());

console.log("Generating PostgreSQL dump...");
fs.writeFileSync(path.join(dbDir, "postgresql/bangladesh-address.sql"), generatePostgreSQL());

console.log("Generating SQLite dump...");
fs.writeFileSync(path.join(dbDir, "sqlite/bangladesh-address.sql"), generateSQLite());

console.log("Generating MongoDB collections...");
const mongoData = generateMongoDB();
fs.writeFileSync(
  path.join(dbDir, "mongodb/bangladesh-address.json"),
  JSON.stringify(mongoData, null, 2)
);

// Also write individual collection files for MongoDB
fs.writeFileSync(
  path.join(dbDir, "mongodb/divisions.json"),
  JSON.stringify((mongoData as any).divisions, null, 2)
);
fs.writeFileSync(
  path.join(dbDir, "mongodb/districts.json"),
  JSON.stringify((mongoData as any).districts, null, 2)
);
fs.writeFileSync(
  path.join(dbDir, "mongodb/upazilas.json"),
  JSON.stringify((mongoData as any).upazilas, null, 2)
);
fs.writeFileSync(
  path.join(dbDir, "mongodb/thanas.json"),
  JSON.stringify((mongoData as any).thanas, null, 2)
);

console.log("\nDatabase dumps generated successfully!");
console.log(`- MySQL:      db/mysql/bangladesh-address.sql`);
console.log(`- PostgreSQL: db/postgresql/bangladesh-address.sql`);
console.log(`- SQLite:     db/sqlite/bangladesh-address.sql`);
console.log(`- MongoDB:    db/mongodb/bangladesh-address.json`);
console.log(`\nStats:`);
console.log(`- Divisions: ${divisions.length}`);
console.log(`- Districts: ${districts.length}`);
console.log(`- Upazilas:  ${upazilaData.length}`);
console.log(`- Thanas:    ${thanaData.length}`);
