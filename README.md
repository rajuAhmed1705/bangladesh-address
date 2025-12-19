# Bangladesh Address (division, district, upazila, thana)

A simple npm package that exports methods representing divisions, districts, upazilas and thanas (metropolitan police stations) of Bangladesh.

## Data Coverage

- **8 Divisions** - All administrative divisions
- **64 Districts** - All districts
- **495 Upazilas** - All upazilas (updated July 2021 with Eidgaon, Dasar, Madhyanagar)
- **26 Metropolitan Thanas** - Police stations in Dhaka, Chattogram, Rajshahi, Khulna

## Installation

```bash
npm i @bangladeshi/bangladesh-address
```

## Usage

### CommonJS
```javascript
const address = require('@bangladeshi/bangladesh-address')
```

### ES Modules / TypeScript
```typescript
import { allDivision, districtsOf, upazilasOf, DivisionName } from '@bangladeshi/bangladesh-address'
```

## API Reference

### Division

```javascript
allDivision()
// Returns: ['Dhaka', 'Chattogram', 'Mymensingh', ...]

divisionalDataOf(DivisionName.Dhaka)
// Returns: All districts and upazilas of Dhaka division
```

### Districts

```javascript
districtsOf(DivisionName.Dhaka)
// Returns: Districts of Dhaka division

allDistricts()
// Returns: Array of all 64 district names

// Deprecated: Use allDistricts() instead
allDistict()
```

### Upazilas

```javascript
upazilasOf("Tangail")
// Returns: Array of upazila objects for Tangail district

allUpazila()
// Returns: Array of all 495 upazila names

isUpazila("Savar")
// Returns: true (Savar is an upazila)

getUpazila("Savar")
// Returns: { upazila: "Savar", district: "Dhaka", division: "Dhaka" }
```

### Thanas (Metropolitan Police Stations)

```javascript
allThana()
// Returns: Array of all 26 thana objects

allThanaNames()
// Returns: Array of all 26 thana names (strings)

thanasOf("Dhaka")
// Returns: Array of thana objects for Dhaka (15 thanas)

isThana("Gulshan")
// Returns: true (Gulshan is a metropolitan thana)

isThana("Savar")
// Returns: false (Savar is an upazila, not a thana)

isThana("Kotwali", "Dhaka")
// Returns: true (disambiguate with district context)

getThana("Gulshan")
// Returns: { thana: "Gulshan", district: "Dhaka", division: "Dhaka" }

getThana("Kotwali", "Chattogram")
// Returns: { thana: "Kotwali", district: "Chattogram", division: "Chattogram" }
```

### Types

```typescript
import { DivisionName, DistrictName, Upazila, Thana } from '@bangladeshi/bangladesh-address'

// Division enum (correctly spelled alias for DivisonName)
DivisionName.Dhaka
DivisionName.Chattogram
DivisionName.Mymensingh
DivisionName.Khulna
DivisionName.Rajshahi
DivisionName.Rangpur
DivisionName.Sylhet
DivisionName.Barisal

// DistrictName type (all 64 districts)
type DistrictName = "Dhaka" | "Chattogram" | "Khulna" | ... // 64 districts

// Upazila interface
interface Upazila {
  upazila: string;
  district: string;
  division: string;
}

// Thana interface
interface Thana {
  thana: string;
  district: string;
  division: string;
}
```

## Metropolitan Thana Distribution

| City | Thana Count |
|------|-------------|
| Dhaka | 15 |
| Chattogram | 6 |
| Khulna | 3 |
| Rajshahi | 2 |

## Contribution

If you want to contribute please follow the guideline. [Contribution](https://github.com/rajuAhmed1705/bangladesh-address/blob/master/CONTRIBUTING.md)
