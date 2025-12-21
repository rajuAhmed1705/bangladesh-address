# Roadmap

This document outlines the development roadmap for `@bangladeshi/bangladesh-address`.

---

## Current Version: v2.0.0

### What's Working
- 8 divisions of Bangladesh
- 64 districts
- 495 upazilas (updated July 2021)
- 26 metropolitan thanas (Dhaka, Chattogram, Rajshahi, Khulna)
- Functions: `allDivision()`, `divisionalDataOf()`, `districtsOf()`, `allDistricts()`, `upazilasOf()`, `upazilaNamesOf()`, `allUpazila()`, `isUpazila()`, `getUpazila()`, `allThana()`, `allThanaNames()`, `thanasOf()`, `thanaNamesOf()`, `isThana()`, `getThana()`, `isValidDivision()`, `isValidDistrict()`, `getDivisionOfDistrict()`, `getDistrictOfUpazila()`, `upazilasOfDivision()`, `upazilaNamesOfDivision()`, `searchLocations()`

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

## v2.1.0 - Database Dumps (Planned)

Focus: Provide database-ready SQL and NoSQL dumps for cross-language support.

### SQL Dumps
- [ ] MySQL dump (`db/mysql/bangladesh-address.sql`)
- [ ] PostgreSQL dump (`db/postgresql/bangladesh-address.sql`)
- [ ] SQLite dump (`db/sqlite/bangladesh-address.sql`)

### NoSQL Dumps
- [ ] MongoDB dump (`db/mongodb/`) - BSON/JSON collections
- [ ] Firebase/Firestore format (`db/firestore/bangladesh-address.json`)

### Database Schema
- [ ] `divisions` table (id, name, name_bn)
- [ ] `districts` table (id, name, name_bn, division_id)
- [ ] `upazilas` table (id, name, name_bn, district_id, division_id)
- [ ] `thanas` table (id, name, name_bn, district_id, division_id, type)
- [ ] Proper foreign key relationships
- [ ] Indexes for common queries

### Documentation
- [ ] Database schema diagram (ERD)
- [ ] Import instructions for each database
- [ ] Example queries for common use cases

### Benefits
- Use data in PHP, Python, Java, Go, Ruby, etc.
- Direct database integration without npm
- Optimized for relational queries
- Seed data for new projects

---

## v2.2.0 - Union Data (Planned)

Focus: Add the 4th administrative level - unions.

### Data Addition
- [ ] Research and compile union data (~4,500 unions)
- [ ] Create `bd-union.json` with union, upazila, district, division fields
- [ ] Add `Union` interface to types

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

## v2.3.0 - Bengali Language Support (Planned)

Focus: Add Bengali translations for all locations.

### Data Updates
- [ ] Add `nameBn` field to division data
- [ ] Add `nameBn` field to district data
- [ ] Add `upazilaBn` field to upazila data
- [ ] Add `thanaBn` field to thana data
- [ ] Add `unionBn` field to union data (if v2.1.0 completed)

### New Functions
- [ ] `allDivisionBn()` - Get all division names in Bengali
- [ ] `allDistrictsBn()` - Get all district names in Bengali
- [ ] `searchLocationsBn(query)` - Search using Bengali text

### Interfaces
- [ ] Update all interfaces to include Bengali name fields
- [ ] Add `LocalizedName` type for bilingual support

---

## v2.4.0 - Postal Codes (Planned)

Focus: Add postal code data for Bangladesh.

### Data Addition
- [ ] Research postal code structure (4-digit codes)
- [ ] Create `bd-postal.json` with postal code mappings
- [ ] Map postal codes to upazilas/thanas

### New Functions
- [ ] `allPostalCodes()` - Get all postal codes
- [ ] `postalCodesOf(district)` - Get postal codes for a district
- [ ] `getLocationByPostalCode(code)` - Get location details from postal code
- [ ] `isValidPostalCode(code)` - Validate postal code format and existence

---

## v2.5.0 - Geographic Coordinates (Planned)

Focus: Add latitude/longitude for all locations.

### Data Updates
- [ ] Add `lat`, `lng` fields to division data (central point)
- [ ] Add `lat`, `lng` fields to district data
- [ ] Add `lat`, `lng` fields to upazila data
- [ ] Add `lat`, `lng` fields to thana data

### New Functions
- [ ] `getCoordinates(location)` - Get lat/lng for any location
- [ ] `findNearbyLocations(lat, lng, radius)` - Find locations within radius
- [ ] `getDistanceBetween(location1, location2)` - Calculate distance

### Interfaces
- [ ] Add `Coordinates` interface `{ lat: number, lng: number }`
- [ ] Update location interfaces to include optional coordinates

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

- **Metropolitan city data**: Add city corporation structures with ward mappings
- **Autocomplete helpers**: Fuzzy matching and suggestion algorithms
- **Offline-first**: Service worker support for offline access

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
