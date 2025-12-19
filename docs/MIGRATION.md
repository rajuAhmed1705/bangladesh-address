# Migration Guide: v1.x to v2.0.0

This guide helps you migrate from `@bangladeshi/bangladesh-address` v1.x to v2.0.0.

## Breaking Changes Summary

| Change | v1.x | v2.0.0 |
|--------|------|--------|
| Division enum | `DivisonName` (deprecated) | `DivisionName` only |
| All districts function | `allDistict()` (deprecated) | `allDistricts()` only |
| Thana interface | `{ thana, district, division }` | `{ thana, district, division, type: "thana" }` |

---

## 1. Replace `DivisonName` with `DivisionName`

The incorrectly spelled `DivisonName` enum has been removed. Use `DivisionName` instead.

### Before (v1.x)

```typescript
import { DivisonName, districtsOf } from '@bangladeshi/bangladesh-address';

const districts = districtsOf(DivisonName.Dhaka);
```

### After (v2.0.0)

```typescript
import { DivisionName, districtsOf } from '@bangladeshi/bangladesh-address';

const districts = districtsOf(DivisionName.Dhaka);
```

### Find & Replace

Search your codebase for `DivisonName` and replace with `DivisionName`:

```bash
# Using grep to find occurrences
grep -r "DivisonName" --include="*.ts" --include="*.tsx" --include="*.js"

# Using sed to replace (macOS)
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) -exec sed -i '' 's/DivisonName/DivisionName/g' {} +

# Using sed to replace (Linux)
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) -exec sed -i 's/DivisonName/DivisionName/g' {} +
```

---

## 2. Replace `allDistict()` with `allDistricts()`

The incorrectly spelled `allDistict()` function has been removed. Use `allDistricts()` instead.

### Before (v1.x)

```typescript
import { allDistict } from '@bangladeshi/bangladesh-address';

const districts = allDistict();
```

### After (v2.0.0)

```typescript
import { allDistricts } from '@bangladeshi/bangladesh-address';

const districts = allDistricts();
```

### Find & Replace

```bash
# Using grep to find occurrences
grep -r "allDistict" --include="*.ts" --include="*.tsx" --include="*.js"

# Using sed to replace (macOS)
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) -exec sed -i '' 's/allDistict/allDistricts/g' {} +

# Using sed to replace (Linux)
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) -exec sed -i 's/allDistict/allDistricts/g' {} +
```

---

## 3. Thana Interface Changes

The `Thana` interface now includes a `type` field for consistency.

### Before (v1.x)

```typescript
interface Thana {
  thana: string;
  district: string;
  division: string;
}
```

### After (v2.0.0)

```typescript
interface Thana {
  thana: string;
  district: string;
  division: string;
  type: "thana";  // New required field
}
```

### Impact

- If you're only reading thana data, no changes needed
- If you're creating mock Thana objects in tests, add the `type` field:

```typescript
// Before (v1.x)
const mockThana: Thana = {
  thana: "Gulshan",
  district: "Dhaka",
  division: "Dhaka"
};

// After (v2.0.0)
const mockThana: Thana = {
  thana: "Gulshan",
  district: "Dhaka",
  division: "Dhaka",
  type: "thana"
};
```

---

## 4. New Functions in v2.0.0

These new functions provide string array variants of existing object-returning functions:

| Function | Returns | Description |
|----------|---------|-------------|
| `upazilaNamesOf(district)` | `string[]` | Upazila names for a district |
| `thanaNamesOf(district)` | `string[]` | Thana names for a district |
| `upazilaNamesOfDivision(division)` | `string[]` | Upazila names for a division |

### Usage

```typescript
import {
  upazilaNamesOf,
  thanaNamesOf,
  upazilaNamesOfDivision
} from '@bangladeshi/bangladesh-address';

// Get upazila names for Dhaka district
const upazilaNames = upazilaNamesOf("Dhaka");
// Returns: ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"]

// Get thana names for Dhaka district
const thanaNames = thanaNamesOf("Dhaka");
// Returns: ["Kotwali", "Mohammadpur", "Lalbagh", ...]

// Get all upazila names in Sylhet division
const sylhetUpazilas = upazilaNamesOfDivision("Sylhet");
// Returns: ["Beanibazar", "Bishwanath", "Companiganj", ...]
```

---

## Quick Migration Checklist

- [ ] Replace all `DivisonName` imports with `DivisionName`
- [ ] Replace all `allDistict()` calls with `allDistricts()`
- [ ] Update mock Thana objects to include `type: "thana"`
- [ ] Run tests to verify no breaking changes
- [ ] Consider using new `*Names` functions for cleaner code

---

## Need Help?

If you encounter issues during migration:

1. Check [GitHub Issues](https://github.com/rajuAhmed1705/bangladesh-address/issues)
2. Open a new issue with the `migration` label
3. Include your v1.x version and the error message
