# Bangladesh Address (division, district, upazila, thana)

[![npm version](https://img.shields.io/npm/v/@bangladeshi/bangladesh-address)](https://www.npmjs.com/package/@bangladeshi/bangladesh-address)
[![npm downloads](https://img.shields.io/npm/dm/@bangladeshi/bangladesh-address)](https://www.npmjs.com/package/@bangladeshi/bangladesh-address)
[![CI/CD](https://github.com/rajuAhmed1705/bangladesh-address/actions/workflows/npm.yml/badge.svg)](https://github.com/rajuAhmed1705/bangladesh-address/actions/workflows/npm.yml)
[![license](https://img.shields.io/npm/l/@bangladeshi/bangladesh-address)](https://github.com/rajuAhmed1705/bangladesh-address/blob/master/LICENSE)

Divisions, districts, upazilas and metropolitan thanas of Bangladesh as a typed npm package with zero dependencies. Use it to build address forms and cascading dropdowns, validate location names, or look up which district and division a place belongs to. The same data is also available as SQL and MongoDB dumps and as plain JSON for projects that do not use JavaScript.

## Quick Start

```bash
npm install @bangladeshi/bangladesh-address
```

A cascading division → district → upazila selection, which is what most address forms need:

```javascript
import {
  allDivision,
  districtsOf,
  upazilaNamesOf,
  thanaNamesOf,
} from '@bangladeshi/bangladesh-address'

// 1. All divisions, for the first dropdown
allDivision()
// ['Barisal', 'Chattogram', 'Dhaka', 'Mymensingh', 'Khulna', 'Rajshahi', 'Rangpur', 'Sylhet']

// 2. Districts of the selected division
districtsOf('Dhaka')
// ['Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', ...] (13 districts)

// 3. Upazilas of the selected district
upazilaNamesOf('Gazipur')
// ['Gazipur Sadar-Joydebpur', 'Kaliakior', 'Kapasia', 'Sripur', 'Kaliganj', 'Tongi']

// 4. Metropolitan thanas, for the districts that have them (empty array otherwise)
thanaNamesOf('Dhaka')
// ['Kotwali', 'Mohammadpur', 'Lalbagh', 'Sutrapur', ...] (15 thanas)
```

Good to know:

- Works with `require`, `import` and TypeScript. Type definitions are included.
- Every function is synchronous and the data is bundled, so there are no network calls.
- Names are matched case-insensitively and whitespace is trimmed.
- Unknown names return an empty array, `false` or `undefined`. With string inputs, nothing throws.
- Current official spellings such as `Barishal`, `Cumilla`, `Jashore` and `Bogura` are accepted. See [Spelling Variants](#spelling-variants).

A plain-text summary of the whole API for AI coding assistants is in [llms.txt](https://github.com/rajuAhmed1705/bangladesh-address/blob/master/llms.txt).

## Data Coverage

- **8 Divisions** - All administrative divisions
- **64 Districts** - All districts
- **500 Upazilas** - All upazilas (updated July 2021 with Eidgaon, Dasar, Madhyanagar)
- **26 Metropolitan Thanas** - Police stations in Dhaka, Chattogram, Rajshahi, Khulna
- **12 City Corporations** - Urban administrative units from BBS/COD-AB

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

divisionalDataOf("Dhaka")
// Returns: All districts and upazilas of Dhaka division
// Division names can be passed as a string or as DivisionName.Dhaka
```

### Districts

```javascript
districtsOf("Dhaka")
// Returns: Districts of Dhaka division

allDistricts()
// Returns: Array of all 64 district names
```

### Upazilas

```javascript
upazilasOf("Tangail")
// Returns: Array of upazila objects for Tangail district

upazilaNamesOf("Tangail")
// Returns: Array of upazila names (strings) for Tangail district

allUpazila()
// Returns: Array of all 500 upazila names

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

thanaNamesOf("Dhaka")
// Returns: Array of thana names (strings) for Dhaka

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

### Validation Functions

```javascript
isValidDivision("Dhaka")
// Returns: true

isValidDivision("InvalidName")
// Returns: false

isValidDistrict("Tangail")
// Returns: true

isValidDistrict("Savar")
// Returns: false (Savar is an upazila, not a district)
```

### Spelling Variants

The dataset uses one spelling for each name, and returned values always use that spelling. Functions that take a district or division name also accept common alternatives, including the official names adopted in 2018:

| You can pass | Dataset spelling |
|--------------|------------------|
| Barishal | Barisal (district and division) |
| Chittagong | Chattogram (district and division) |
| Bogura | Bogra |
| Cumilla | Comilla |
| Jashore | Jessore |
| Chapai Nawabganj | Chapainawabganj |
| Coxs Bazar, Cox Bazar | Cox's Bazar |
| Jhalakathi, Jhalokathi | Jhalokati |
| Khagrachhari | Khagrachari |
| Laxmipur | Lakshmipur |
| Maulvibazar, Moulvi Bazar | Moulvibazar |
| Netrakona | Netrokona |
| Jaipurhat | Joypurhat |

```javascript
upazilaNamesOf("Cumilla")
// Returns: the upazilas of Comilla district

getDivisionOfDistrict("Jashore")
// Returns: "Khulna"

isValidDistrict("Bogura")
// Returns: true

searchLocations("Cumilla")
// Returns: [{ name: "Comilla", type: "district", division: "Chattogram" }, ...]
```

The full lists are exported as `districtAliases` and `divisionAliases`. Aliases apply to district and division names only; upazila and thana names must use the dataset spelling. In `searchLocations`, an alias is resolved once it is typed in full: `"Cumilla"` finds Comilla, but the partial `"Cumil"` does not.

### Reverse Lookups

```javascript
getDivisionOfDistrict("Tangail")
// Returns: "Dhaka"

getDivisionOfDistrict("Cox's Bazar")
// Returns: "Chattogram"

getDistrictOfUpazila("Savar")
// Returns: "Dhaka"

getDistrictOfUpazila("Mohammadpur", "Khulna")
// Returns: "Magura" (disambiguate with division context)
```

### Get Upazilas by Division

```javascript
upazilasOfDivision("Sylhet")
// Returns: Array of all upazila objects in Sylhet division

upazilaNamesOfDivision("Sylhet")
// Returns: Array of all upazila names (strings) in Sylhet division
```

### Search Locations

```javascript
searchLocations("pur")
// Returns: Array of matching locations across divisions, districts, upazilas, and thanas
// [
//   { name: "Rangpur", type: "division" },
//   { name: "Rangpur", type: "district", division: "Rangpur" },
//   { name: "Mirpur", type: "thana", district: "Dhaka", division: "Dhaka" },
//   ... more matches
// ]
```

### Raw Data Access

```javascript
import { upazilaData, thanaData } from '@bangladeshi/bangladesh-address'

// upazilaData: Array of all 500 upazila objects
// thanaData: Array of all 26 thana objects
```

### Types

```typescript
import { DivisionName, DistrictName, Upazila, Thana, SearchResult } from '@bangladeshi/bangladesh-address'

// Division enum
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
  type: "thana";
}
```

## Metropolitan Thana Distribution

| City | Thana Count |
|------|-------------|
| Dhaka | 15 |
| Chattogram | 6 |
| Khulna | 3 |
| Rajshahi | 2 |

## Database Dumps (For Non-JavaScript Projects)

If you're using PHP, Python, Java, Go, Ruby, or any other language, you can use our pre-built database dumps instead of the npm package.

### Available Formats

| Database | File |
|----------|------|
| MySQL | [`db/mysql/bangladesh-address.sql`](db/mysql/bangladesh-address.sql) |
| PostgreSQL | [`db/postgresql/bangladesh-address.sql`](db/postgresql/bangladesh-address.sql) |
| SQLite | [`db/sqlite/bangladesh-address.sql`](db/sqlite/bangladesh-address.sql) |
| MongoDB | [`db/mongodb/`](db/mongodb/) |

### Quick Import

```bash
# MySQL
mysql -u username -p database_name < db/mysql/bangladesh-address.sql

# PostgreSQL
psql -U username -d database_name -f db/postgresql/bangladesh-address.sql

# SQLite
sqlite3 bangladesh.db < db/sqlite/bangladesh-address.sql

# MongoDB
mongoimport --db bangladesh --collection divisions --file db/mongodb/divisions.json --jsonArray
```

See [db/README.md](db/README.md) for full documentation, schema details, and example queries.

### Raw JSON over HTTP

The data can also be fetched directly, without installing anything:

| Data | URL |
|------|-----|
| Upazilas (with district and division) | `https://cdn.jsdelivr.net/npm/@bangladeshi/bangladesh-address/build/json/bd-upazila.json` |
| Metropolitan thanas | `https://cdn.jsdelivr.net/npm/@bangladeshi/bangladesh-address/build/json/bd-thana.json` |

Add a version after the package name (for example `bangladesh-address@2.2.0`) to pin the data to a release.

## Data sources

City corporation names, district/division references and BBS codes come from [Bangladesh - Subnational Administrative Boundaries (COD-AB)](https://data.humdata.org/dataset/cod-ab-bgd) on the Humanitarian Data Exchange. The data is published by UN OCHA from Bangladesh Bureau of Statistics (BBS) sources and licensed under [CC BY-IGO](https://creativecommons.org/licenses/by/3.0/igo/legalcode).

## Contribution

If you want to contribute please follow the guideline. [Contribution](https://github.com/rajuAhmed1705/bangladesh-address/blob/master/CONTRIBUTING.md)

## Support

This package is free and maintained in spare time. If it saves you work, you can support it:

❤️ [Support on Ko-fi](https://ko-fi.com/raju1705) or [donate with PayPal](https://www.paypal.me/raju1705)
