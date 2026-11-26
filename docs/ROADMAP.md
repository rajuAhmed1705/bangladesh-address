# Roadmap

This document outlines the development roadmap for `@bangladeshi/bangladesh-address`.

---

## Current Version: v2.2.0

### What's Working
- 8 divisions of Bangladesh
- 64 districts
- 495 upazilas (updated July 2021)
- 26 metropolitan thanas (Dhaka, Chattogram, Rajshahi, Khulna)
- Functions: `allDivision()`, `divisionalDataOf()`, `districtsOf()`, `allDistricts()`, `upazilasOf()`, `upazilaNamesOf()`, `allUpazila()`, `isUpazila()`, `getUpazila()`, `allThana()`, `allThanaNames()`, `thanasOf()`, `thanaNamesOf()`, `isThana()`, `getThana()`, `isValidDivision()`, `isValidDistrict()`, `getDivisionOfDistrict()`, `getDistrictOfUpazila()`, `upazilasOfDivision()`, `upazilaNamesOfDivision()`, `searchLocations()`

### On `master`, not released yet
- 500 upazila records: added Naldanga, Mokamtola, Karnaphuli, Lalmai and Guimara
- 12 city corporations with their official codes (data file only, no functions yet)
- Bengali names for divisions, districts, thanas and the upazilas of Barisal, Rajshahi and Sylhet
- New functions: `allDivisionBn()`, `allDistrictsBn()`, `districtsOfBn()`

---

## v1.1.0 - Foundation (Completed)

Focus: Testing, code quality, and type safety improvements.

### Testing Infrastructure
- [x] Add Jest testing framework
- [x] Unit tests for all exported functions
- [x] Data integrity tests (validate all divisions, districts, upazilas)
- [x] 90%+ code coverage achieved

### Code Quality
- [x] Add ESLint with TypeScript support
- [x] Fix all linting issues
- [x] Remove all `any` types
- [x] Replace `var` with `const`/`let`

### Dependencies
- [x] Remove lodash (use native JavaScript)
- [x] Update TypeScript to 5.x
- [x] Update dev dependencies to latest versions
- [x] Result: Zero runtime dependencies

### CI/CD
- [x] Update Node.js to v18 or v20 LTS
- [x] Add test step before npm publish
- [x] Add coverage reporting

---

## v1.2.0 - Thana Support (Completed)

Focus: Add thana data and functions.

### New Features
- [x] Add `bd-thana.json` with 26 metropolitan thanas
- [x] Update `bd-upazila.json` to 495 upazilas (added Eidgaon, Dasar, Madhyanagar)
- [x] Add `allThana()` - Get all thana objects
- [x] Add `thanasOf(district)` - Get thanas for a district
- [x] Add `isThana(name)` - Check if location is a thana

### Data Separation
- [x] Separate thanas from upazilas into distinct JSON files
- [x] Clean upazila data (no thanas mixed in)

---

## v1.3.0 - API Consistency (Completed)

Focus: Improve API consistency and add utility functions.

### New Functions
- [x] `allThanaNames()` - Return `string[]` for consistency with `allUpazila()`
- [x] `isUpazila(name)` - Check if location is an upazila (symmetry with `isThana`)
- [x] `getThana(name)` - Get full thana object by name
- [x] `getUpazila(name)` - Get full upazila object by name

### Input Validation
- [x] Add input validation to all functions (handle null, undefined, empty strings)
- [x] Return empty arrays instead of crashing on invalid input

### Test Improvements
- [x] Add thana district validation test (verify all thanas reference valid districts)
- [x] Add edge case tests for duplicate names (e.g., "Mohammadpur" in Dhaka vs Magura)

---

## v1.4.0 - Type Safety (Completed)

Focus: Enhanced TypeScript support.

### Type Improvements
- [x] Add `DistrictName` type for compile-time district validation (all 64 districts)
- [x] Add district context to `isThana(name, district?)` for disambiguation
- [x] Add district context to `isUpazila(name, district?)` for disambiguation
- [x] Add district context to `getThana(name, district?)` for disambiguation
- [x] Add district context to `getUpazila(name, district?)` for disambiguation
- [x] Add `DivisionName` alias (correct spelling of `DivisonName`)
- [x] Add JSDoc `@returns` tags to all functions

### Performance
- [x] Implement caching with pre-computed lookup maps (Set and Map)
- [x] O(1) lookups for `isThana`, `isUpazila` without district context

---

## v1.5.0 - Enhancements (Completed)

Focus: New utility functions and reverse lookups.

### New Functions
- [x] `isValidDivision(name)` - Check if division name is valid
- [x] `isValidDistrict(name)` - Check if district name is valid
- [x] `getDivisionOfDistrict(district)` - Reverse lookup: get division from district
- [x] `getDistrictOfUpazila(upazila)` - Reverse lookup: get district from upazila
- [x] `searchLocations(query)` - Search across all locations
- [x] `upazilasOfDivision(division)` - Get all upazilas for a division directly

### Data Exports
- [x] Export raw JSON data for advanced use cases (`upazilaData`, `thanaData`)

---

## v2.0.0 - Breaking Changes (Completed)

Focus: Clean up deprecated APIs.

### Removals
- [x] Remove `DivisonName` enum (use `DivisionName`)
- [x] Remove `allDistict()` function (use `allDistricts()`)

### API Consistency
- [x] Standardize return types across all functions
- [x] All `*Of` functions return objects, add `*Names` variants for strings
- [x] Add `type` field to Thana interface for consistency with Upazila

### New Functions
- [x] `upazilaNamesOf(district)` - Get upazila names for a district
- [x] `thanaNamesOf(district)` - Get thana names for a district
- [x] `upazilaNamesOfDivision(division)` - Get upazila names for a division

### Migration Guide
See [MIGRATION.md](MIGRATION.md) for upgrading from v1.x to v2.0.0.

---

## v2.1.0 - Database Dumps (Completed)

Focus: Provide database-ready SQL and NoSQL dumps for cross-language support.

### SQL Dumps
- [x] MySQL dump (`db/mysql/bangladesh-address.sql`)
- [x] PostgreSQL dump (`db/postgresql/bangladesh-address.sql`)
- [x] SQLite dump (`db/sqlite/bangladesh-address.sql`)

### NoSQL Dumps
- [x] MongoDB dump (`db/mongodb/`) - JSON collections

### Database Schema
- [x] `divisions` table (id, name, name_bn)
- [x] `districts` table (id, name, name_bn, division_id)
- [x] `upazilas` table (id, name, name_bn, district_id)
- [x] `thanas` table (id, name, name_bn, district_id)
- [x] Proper foreign key relationships
- [x] Indexes for common queries

### Documentation
- [x] Import instructions for each database
- [x] Example queries for common use cases
- [x] Language examples (PHP, Python, Java, Go)

### Benefits
- Use data in PHP, Python, Java, Go, Ruby, etc.
- Direct database integration without npm
- Optimized for relational queries
- Seed data for new projects

---

## v2.2.0 - Spelling Aliases & Discoverability (Completed)

Focus: Make the package work on the first try, for people and for AI coding assistants.

### Spelling Aliases
- [x] Accept alternative district and division spellings (`Barishal`, `Bogura`, `Cumilla`, `Jashore`, `Chittagong` and others)
- [x] Export `districtAliases` and `divisionAliases`
- [x] Resolve aliases in `searchLocations()`
- [x] Accept plain strings in `districtsOf()` and `divisionalDataOf()`

### Documentation
- [x] Quick Start with a cascading dropdown example
- [x] `llms.txt` API summary for AI coding assistants
- [x] CDN URLs for the raw JSON data

---

## v2.3.0 - Bengali Language Support (In Progress)

Focus: Add Bengali names for all locations. Tracking issue: [#17](https://github.com/rajuAhmed1705/bangladesh-address/issues/17).

The finished parts are merged on `master` but not released on npm yet.

### Data
- [x] `nameBn` for the 8 divisions and 64 districts ([#18](https://github.com/rajuAhmed1705/bangladesh-address/issues/18))
- [x] `thanaBn` for the 26 metropolitan thanas ([#19](https://github.com/rajuAhmed1705/bangladesh-address/issues/19))
- [x] `upazilaBn` for Barisal division ([#20](https://github.com/rajuAhmed1705/bangladesh-address/issues/20))
- [x] `upazilaBn` for Rajshahi division ([#25](https://github.com/rajuAhmed1705/bangladesh-address/issues/25))
- [x] `upazilaBn` for Sylhet division ([#27](https://github.com/rajuAhmed1705/bangladesh-address/issues/27))
- [ ] `upazilaBn` for Chattogram division ([#21](https://github.com/rajuAhmed1705/bangladesh-address/issues/21))
- [ ] `upazilaBn` for Dhaka division ([#22](https://github.com/rajuAhmed1705/bangladesh-address/issues/22))
- [ ] `upazilaBn` for Khulna division ([#23](https://github.com/rajuAhmed1705/bangladesh-address/issues/23))
- [ ] `upazilaBn` for Mymensingh division ([#24](https://github.com/rajuAhmed1705/bangladesh-address/issues/24))
- [ ] `upazilaBn` for Rangpur division ([#26](https://github.com/rajuAhmed1705/bangladesh-address/issues/26))

### Types and functions
- [x] Add the Bengali fields to the TypeScript interfaces
- [x] Add `LocalizedName` type for bilingual support
- [x] `allDivisionBn()` - Get all division names in Bengali
- [x] `allDistrictsBn()` - Get all district names in Bengali
- [x] `districtsOfBn(division)` - Get the district names of a division in Bengali
- [ ] Fill `name_bn` in the database dumps
- [ ] Document the Bengali fields and functions in the README

Searching with Bengali text will be part of the planned `suggest()` ([#55](https://github.com/rajuAhmed1705/bangladesh-address/issues/55)), see "Maps & Smart Address Tools" below.

### Data corrections, also on `master`
- [x] Add the 12 city corporations ([#36](https://github.com/rajuAhmed1705/bangladesh-address/issues/36))
- [x] Add the missing upazilas Naldanga and Mokamtola ([#45](https://github.com/rajuAhmed1705/bangladesh-address/issues/45))
- [x] Add the missing upazilas Karnaphuli, Lalmai and Guimara ([#46](https://github.com/rajuAhmed1705/bangladesh-address/issues/46))
- [ ] Decide what to do with 4 records that are not upazilas ([#48](https://github.com/rajuAhmed1705/bangladesh-address/issues/48))
- [ ] Add the units created in 2026, each one only after its gazette is published ([#47](https://github.com/rajuAhmed1705/bangladesh-address/issues/47))

---

## v2.4.0 - Official Codes & Coordinates (Planned)

Focus: Add the official code (the BBS geocode, as published on HDX) and the centre point (latitude/longitude) for divisions, districts and upazilas. Issue: [#35](https://github.com/rajuAhmed1705/bangladesh-address/issues/35).

This moved up because the map, location and API work below all join to the names through these codes.

### Data Updates
- [ ] Create `bd-geo.json` with `bbsCode`, `lat` and `lng` for the 8 divisions, 64 districts and the upazilas that are in the source
- [ ] Add `lat`, `lng` for thanas (not covered by #35, needs its own source)

### New Functions
- [ ] `getCoordinates(location)` - Get lat/lng for any location
- [ ] `findNearbyLocations(lat, lng, radius)` - Find locations within radius
- [ ] `getDistanceBetween(location1, location2)` - Calculate distance

### Interfaces
- [ ] Add `Coordinates` interface `{ lat: number, lng: number }`
- [ ] Update location interfaces to include optional coordinates

---

## v2.5.0 - Union Data (Planned)

Focus: Add the 4th administrative level - unions. Issue: [#30](https://github.com/rajuAhmed1705/bangladesh-address/issues/30).

This is about union names. Union boundaries (map shapes) are not planned: the source says that level is not officially confirmed, and the only open set is from 2020.

### Data Addition
- [ ] Compile union data (~4,500 unions) from the source named in the issue
- [ ] Create `bd-union.json` with union, upazila, district, division fields
- [ ] Add `Union` interface to types
- [ ] Add `unionBn` Bengali names to union data

### New Functions
- [ ] `allUnion()` - Get all union names
- [ ] `allUnionData()` - Get all union objects
- [ ] `unionsOf(upazila)` - Get unions for an upazila
- [ ] `unionNamesOf(upazila)` - Get union names for an upazila
- [ ] `isUnion(name)` - Check if location is a union
- [ ] `getUnion(name, upazila?)` - Get union object by name
- [ ] `getUpazilaOfUnion(union)` - Reverse lookup: get upazila from union

### Data Integrity
- [ ] Validate all unions reference valid upazilas
- [ ] Add union count tests per upazila

---

## v2.6.0 - Postal Codes (Planned)

Focus: Add postal code data for Bangladesh. Issue: [#34](https://github.com/rajuAhmed1705/bangladesh-address/issues/34).

### Data Addition
- [ ] Create `bd-postal.json` with postal code mappings (4-digit codes)
- [ ] Map postal codes to upazilas/thanas

### New Functions
- [ ] `allPostalCodes()` - Get all postal codes
- [ ] `postalCodesOf(district)` - Get postal codes for a district
- [ ] `getLocationByPostalCode(code)` - Get location details from postal code
- [ ] `isValidPostalCode(code)` - Validate postal code format and existence

---

## Maps & Smart Address Tools (Planned)

Focus: Maps, location lookup and smarter address entry, all from static files with no server and no API key. Tracking issue: [#53](https://github.com/rajuAhmed1705/bangladesh-address/issues/53).

These are not tied to a version number yet. Map data will be a separate package, so the main package stays small.

### Foundation
- Official codes and centre points: see v2.4.0 above ([#35](https://github.com/rajuAhmed1705/bangladesh-address/issues/35))
- [ ] History of administrative changes, each with its official source ([#58](https://github.com/rajuAhmed1705/bangladesh-address/issues/58))

### Maps and location
- [ ] Map data for divisions, districts and upazilas, small enough for the web ([#54](https://github.com/rajuAhmed1705/bangladesh-address/issues/54))
- [ ] Find the division, district and upazila of a GPS point, offline ([#56](https://github.com/rajuAhmed1705/bangladesh-address/issues/56))

### Address entry
- [ ] `suggest(query)` - One search box for Bengali and English names ([#55](https://github.com/rajuAhmed1705/bangladesh-address/issues/55))
- [ ] `parseAddress(text)` - Paste a whole address and get the fields ([#59](https://github.com/rajuAhmed1705/bangladesh-address/issues/59))

### Use from any language
- [ ] Static JSON API and demo site on GitHub Pages ([#57](https://github.com/rajuAhmed1705/bangladesh-address/issues/57))

### Extra data
- [ ] 2022 population for divisions and districts ([#60](https://github.com/rajuAhmed1705/bangladesh-address/issues/60))
- [ ] Research: bank routing number format ([#61](https://github.com/rajuAhmed1705/bangladesh-address/issues/61))

### Sources and licences
- Boundaries will come from the HDX dataset COD-AB (from BBS, published by UN OCHA) and population from the HDX dataset COD-PS (from UNFPA and the US Census Bureau). Both are CC BY-IGO and will be credited separately from the MIT-licensed code.
- Only primary sources are used. New administrative units are added only after their gazette is published.

---

## Other Open Work

Smaller items that are not tied to a version:

- [ ] Add thanas for more metropolitan areas and check the existing cities are complete ([#28](https://github.com/rajuAhmed1705/bangladesh-address/issues/28))
- [ ] Add a runnable React dropdown example in `examples/react-dropdown/` ([#29](https://github.com/rajuAhmed1705/bangladesh-address/issues/29))

---

## v3.0.0 - ESM & Modern JavaScript (Planned)

Focus: Modern module system and build improvements.

### Build System
- [ ] Dual ESM/CommonJS output
- [ ] Tree-shaking support
- [ ] Smaller bundle size with code splitting

### Package Updates
- [ ] Add `"type": "module"` to package.json
- [ ] Add `exports` field for proper module resolution
- [ ] Maintain backward compatibility with CommonJS

### Developer Experience
- [ ] Improve TypeScript strict mode compliance
- [ ] Add source maps
- [ ] Optimize build for modern bundlers (Vite, esbuild)

---

## Future Considerations (Not Scheduled)

These items are under consideration but not yet planned:

- **Ward data**: Ward mappings for the city corporations
- **Address form component**: A ready-made form that works in any framework
- **Plus Codes**: Short location codes for places that have no street address
- **Other languages**: Packages for Laravel, Flutter and Python generated from the same data
- **Offline-first**: Service worker support for offline access

Not planned: union boundaries, street-level address search, courier area lists, bank branch lists, and data from GADM or OpenStreetMap inside the package. The reasons are in [#53](https://github.com/rajuAhmed1705/bangladesh-address/issues/53).

---

## Known Issues

### Duplicate Names
Some thana names appear in multiple districts (e.g., "Kotwali" in both Dhaka and Chattogram). Use `thanasOf(district)` to disambiguate.

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### Priority Areas
- Writing tests
- Documentation improvements
- Performance optimizations
- Adding new utility functions

### How to Help
1. Check [GitHub Issues](https://github.com/rajuAhmed1705/bangladesh-address/issues) for open tasks
2. Look for `good first issue` labels
3. Submit PRs following our contribution guidelines

---

## Changelog

See [CHANGELOG.md](../CHANGELOG.md) for detailed version history.
