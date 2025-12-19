# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-12-19

### Breaking Changes
- **Removed `DivisonName` enum** - Use `DivisionName` instead (typo fix)
- **Removed `allDistict()` function** - Use `allDistricts()` instead (typo fix)
- **Thana interface now requires `type` field** - All thana objects now include `type: "thana"`

### Added
- `upazilaNamesOf(district)` - Get upazila names (strings) for a district
- `thanaNamesOf(district)` - Get thana names (strings) for a district
- `upazilaNamesOfDivision(division)` - Get upazila names (strings) for a division
- Migration guide: see [MIGRATION.md](docs/MIGRATION.md)

### Changed
- Thana interface now includes `type: "thana"` field for consistency
- All thana data in `bd-thana.json` now includes `type` field

## [1.5.0] - 2025-12-19

### Added
- `isValidDivision(name)` - Check if a name is a valid division
- `isValidDistrict(name)` - Check if a name is a valid district
- `getDivisionOfDistrict(district)` - Reverse lookup: get division from district name
- `getDistrictOfUpazila(upazila, division?)` - Reverse lookup: get district from upazila name
- `upazilasOfDivision(division)` - Get all upazilas for a division directly
- `searchLocations(query)` - Search across all locations (divisions, districts, upazilas, thanas)
- `SearchResult` interface for search results
- Raw data exports: `upazilaData` and `thanaData` for advanced use cases

### Changed
- All new functions use O(1) lookups via pre-computed Set and Map caches

## [1.4.0] - 2025-12-19

### Added
- `DistrictName` type for compile-time district validation (all 64 districts)
- `DivisionName` alias (correct spelling of `DivisonName`)
- District context parameter for disambiguation:
  - `isThana(name, district?)` - disambiguate duplicate thana names
  - `isUpazila(name, district?)` - disambiguate duplicate upazila names
  - `getThana(name, district?)` - get specific thana by district
  - `getUpazila(name, district?)` - get specific upazila by district
- JSDoc `@returns` tags to all functions

### Changed
- Implemented O(1) lookups using pre-computed Set and Map for `isThana`, `isUpazila`, `getThana`, `getUpazila`

### Deprecated
- `DivisonName` enum (use `DivisionName` instead)

## [1.3.0] - 2025-12-19

### Added
- `allThanaNames()` - returns array of thana names (strings) for consistency with `allUpazila()`
- `isUpazila(name)` - check if location is an upazila (symmetry with `isThana`)
- `getUpazila(name)` - get full upazila object by name
- `getThana(name)` - get full thana object by name
- Input validation for all functions (handles null, undefined, empty strings)
- Whitespace trimming for all input parameters

### Changed
- Functions now return empty arrays or `undefined` instead of crashing on invalid input

## [1.2.0] - 2025-12-19

### Added
- 26 metropolitan thanas in separate `bd-thana.json` file
- `allThana()` - get all thana objects
- `thanasOf(district)` - get thanas for a specific district
- `isThana(name)` - check if location is a thana
- Thana data for Dhaka (15), Chattogram (6), Rajshahi (2), Khulna (3)

### Changed
- Updated upazila data to 495 entries (added Eidgaon, Dasar, Madhyanagar from July 2021)
- Separated thanas from upazilas into distinct JSON files
- Updated package description and keywords

### Fixed
- Closes #4 - Added missing thana data

## [1.1.0] - 2025-12-19

### Added
- Jest testing framework with 90%+ code coverage
- ESLint with TypeScript support
- Unit tests for all exported functions
- Data integrity tests
- `allDistricts()` function (correct spelling alias for `allDistict()`)

### Changed
- Replaced lodash with native JavaScript (zero runtime dependencies)
- Updated TypeScript to 5.x
- Removed all `any` types
- Replaced `var` with `const`/`let`

### Deprecated
- `allDistict()` function (use `allDistricts()` instead)

## [1.0.5] - Initial tracked release

### Features
- 8 divisions of Bangladesh
- 64 districts
- 492 upazilas
- Functions: `allDivision()`, `divisionalDataOf()`, `districtsOf()`, `allDistict()`, `upazilasOf()`, `allUpazila()`
- `DivisonName` enum for division names
