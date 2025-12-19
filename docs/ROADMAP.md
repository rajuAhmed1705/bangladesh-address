# Roadmap

This document outlines the development roadmap for `@bangladeshi/bangladesh-address`.

---

## Current Version: v1.0.5

### What's Working
- 8 divisions of Bangladesh
- 64 districts
- 492 upazilas
- Functions: `allDivision()`, `divisionalDataOf()`, `districtsOf()`, `allDistict()`, `upazilasOf()`, `allUpazila()`

---

## v1.1.0 - Foundation (In Progress)

Focus: Testing, code quality, and type safety improvements.

### Testing Infrastructure
- [ ] Add Jest testing framework
- [ ] Unit tests for all exported functions
- [ ] Data integrity tests (validate all divisions, districts, upazilas)
- [ ] Aim for 90%+ code coverage

### Code Quality
- [ ] Add ESLint with TypeScript support
- [ ] Fix all linting issues
- [ ] Remove all `any` types
- [ ] Replace `var` with `const`/`let`

### Dependencies
- [ ] Remove lodash (use native JavaScript)
- [ ] Update TypeScript to 5.x
- [ ] Update dev dependencies to latest versions
- [ ] Result: Zero runtime dependencies

### CI/CD
- [ ] Update Node.js to v18 or v20 LTS
- [ ] Add test step before npm publish
- [ ] Add coverage reporting

---

## v1.2.0 - Enhancements

Focus: New utility functions and deprecations.

### New Functions
- [ ] `isValidDivision(name)` - Check if division name is valid
- [ ] `isValidDistrict(name)` - Check if district name is valid
- [ ] `isValidUpazila(name)` - Check if upazila name is valid
- [ ] `getDivisionOfDistrict(district)` - Reverse lookup: get division from district
- [ ] `getDistrictOfUpazila(upazila)` - Reverse lookup: get district from upazila
- [ ] `searchLocations(query)` - Search across all locations
- [ ] `upazilasOfDivision(division)` - Get all upazilas for a division directly

### Deprecations
- [ ] Deprecate `DivisonName` → use `DivisionName` (typo fix)
- [ ] Deprecate `allDistict()` → use `allDistricts()` (typo fix)

### Performance
- [ ] Implement caching with lookup maps
- [ ] O(1) lookups instead of O(n) filtering

---

## v2.0.0 - Breaking Changes

Focus: Clean up deprecated APIs.

### Removals
- [ ] Remove `DivisonName` enum (use `DivisionName`)
- [ ] Remove `allDistict()` function (use `allDistricts()`)

### API Consistency
- [ ] Standardize return types across all functions

### Migration Guide
A migration guide will be provided for users upgrading from v1.x to v2.0.

---

## Future Considerations (Not Scheduled)

These items are under consideration for future versions:

- **Union data**: Add 4th administrative level (~4,500 unions)
- **Bengali names**: Add Bengali translations for all locations
- **Postal codes**: Add postal code data
- **Coordinates**: Add lat/long for districts/upazilas
- **ESM support**: Dual ESM/CommonJS output

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### Priority Areas
- Writing tests
- Documentation improvements
- Performance optimizations

### How to Help
1. Check [GitHub Issues](https://github.com/rajuAhmed1705/bangladesh-address/issues) for open tasks
2. Look for `good first issue` labels
3. Submit PRs following our contribution guidelines

---

## Changelog

See [CHANGELOG.md](../CHANGELOG.md) for version history (coming soon).
