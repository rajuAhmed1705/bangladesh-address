# Roadmap

This document outlines the development roadmap for `@bangladeshi/bangladesh-address`.

---

## Current Version: v1.3.0

### What's Working
- 8 divisions of Bangladesh
- 64 districts
- 495 upazilas (updated July 2021)
- 26 metropolitan thanas (Dhaka, Chattogram, Rajshahi, Khulna)
- Functions: `allDivision()`, `divisionalDataOf()`, `districtsOf()`, `allDistict()`, `allDistricts()`, `upazilasOf()`, `allUpazila()`, `isUpazila()`, `getUpazila()`, `allThana()`, `allThanaNames()`, `thanasOf()`, `isThana()`, `getThana()`

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

## v1.4.0 - Type Safety (Planned)

Focus: Enhanced TypeScript support.

### Type Improvements
- [ ] Add `DistrictName` type/enum for compile-time district validation
- [ ] Add district context to `isThana(name, district?)` for disambiguation
- [ ] Add `DivisionName` alias (correct spelling of `DivisonName`)
- [ ] Add JSDoc `@returns` tags to all functions

### Performance
- [ ] Implement caching with pre-computed lookup maps
- [ ] O(1) lookups instead of O(n) filtering for `isThana`, `isUpazila`

---

## v1.5.0 - Enhancements (Planned)

Focus: New utility functions and reverse lookups.

### New Functions
- [ ] `isValidDivision(name)` - Check if division name is valid
- [ ] `isValidDistrict(name)` - Check if district name is valid
- [ ] `getDivisionOfDistrict(district)` - Reverse lookup: get division from district
- [ ] `getDistrictOfUpazila(upazila)` - Reverse lookup: get district from upazila
- [ ] `searchLocations(query)` - Search across all locations
- [ ] `upazilasOfDivision(division)` - Get all upazilas for a division directly

### Data Exports
- [ ] Export raw JSON data for advanced use cases (`upazilaData`, `thanaData`)

---

## v2.0.0 - Breaking Changes (Planned)

Focus: Clean up deprecated APIs.

### Removals
- [ ] Remove `DivisonName` enum (use `DivisionName`)
- [ ] Remove `allDistict()` function (use `allDistricts()`)

### API Consistency
- [ ] Standardize return types across all functions
- [ ] All `*Of` functions return objects, add `*Names` variants for strings
- [ ] Add `type` field to Thana interface for consistency with Upazila

### Migration Guide
A migration guide will be provided for users upgrading from v1.x to v2.0.

---

## Future Considerations (Not Scheduled)

These items are under consideration for future versions:

- **Metropolitan city data**: Add city corporation structures with thana mappings
- **Union data**: Add 4th administrative level (~4,500 unions)
- **Bengali names**: Add Bengali translations for all locations
- **Postal codes**: Add postal code data
- **Coordinates**: Add lat/long for districts/upazilas
- **ESM support**: Dual ESM/CommonJS output

---

## Known Issues

### Typos in Public API
These typos exist in the public API and will be fixed in v2.0.0:
- `DivisonName` should be `DivisionName` (missing 'i')
- `allDistict()` should be `allDistrict()` (missing 'r')

Aliases have been added in v1.1.0 (`allDistricts()`). Users should migrate to the correct spellings.

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

See [CHANGELOG.md](../CHANGELOG.md) for version history (coming soon).
