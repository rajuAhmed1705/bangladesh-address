# Database Dumps

Pre-built database dumps for Bangladesh administrative divisions data. Use these to integrate the data directly into your database without npm.

## Available Formats

| Database | File | Size |
|----------|------|------|
| MySQL | `mysql/bangladesh-address.sql` | ~50KB |
| PostgreSQL | `postgresql/bangladesh-address.sql` | ~50KB |
| SQLite | `sqlite/bangladesh-address.sql` | ~60KB |
| MongoDB | `mongodb/bangladesh-address.json` | ~70KB |

## Schema

All databases use the same normalized schema:

```
divisions (8 records)
├── id (PK)
├── name
├── name_bn (reserved for Bengali)
└── timestamps

districts (64 records)
├── id (PK)
├── division_id (FK → divisions.id)
├── name
├── name_bn
└── timestamps

upazilas (495 records)
├── id (PK)
├── district_id (FK → districts.id)
├── name
├── name_bn
└── timestamps

thanas (26 records)
├── id (PK)
├── district_id (FK → districts.id)
├── name
├── name_bn
└── timestamps
```

## Import Instructions

### MySQL

```bash
mysql -u username -p database_name < db/mysql/bangladesh-address.sql
```

Or in MySQL client:
```sql
SOURCE /path/to/db/mysql/bangladesh-address.sql;
```

### PostgreSQL

```bash
psql -U username -d database_name -f db/postgresql/bangladesh-address.sql
```

Or in psql:
```sql
\i /path/to/db/postgresql/bangladesh-address.sql
```

### SQLite

```bash
sqlite3 database.db < db/sqlite/bangladesh-address.sql
```

Or create a new database:
```bash
sqlite3 bangladesh.db < db/sqlite/bangladesh-address.sql
```

### MongoDB

Import all collections:
```bash
mongoimport --db bangladesh --collection divisions --file db/mongodb/divisions.json --jsonArray
mongoimport --db bangladesh --collection districts --file db/mongodb/districts.json --jsonArray
mongoimport --db bangladesh --collection upazilas --file db/mongodb/upazilas.json --jsonArray
mongoimport --db bangladesh --collection thanas --file db/mongodb/thanas.json --jsonArray
```

Or use the combined file in your application:
```javascript
const data = require('./db/mongodb/bangladesh-address.json');
// data.divisions, data.districts, data.upazilas, data.thanas
```

## Example Queries

### MySQL / PostgreSQL / SQLite

```sql
-- Get all districts in Dhaka division
SELECT d.name as district
FROM districts d
JOIN divisions div ON d.division_id = div.id
WHERE div.name = 'Dhaka';

-- Get all upazilas in a district
SELECT u.name as upazila
FROM upazilas u
JOIN districts d ON u.district_id = d.id
WHERE d.name = 'Tangail';

-- Get district and division for an upazila
SELECT u.name as upazila, d.name as district, div.name as division
FROM upazilas u
JOIN districts d ON u.district_id = d.id
JOIN divisions div ON d.division_id = div.id
WHERE u.name = 'Savar';

-- Count upazilas per district
SELECT d.name as district, COUNT(u.id) as upazila_count
FROM districts d
LEFT JOIN upazilas u ON d.id = u.district_id
GROUP BY d.id, d.name
ORDER BY upazila_count DESC;

-- Get all thanas in Dhaka
SELECT t.name as thana
FROM thanas t
JOIN districts d ON t.district_id = d.id
WHERE d.name = 'Dhaka';
```

### MongoDB

```javascript
// Get all districts in Dhaka division
const dhakaDivision = await db.divisions.findOne({ name: 'Dhaka' });
const districts = await db.districts.find({ division_id: dhakaDivision._id }).toArray();

// Get all upazilas in a district
const tangail = await db.districts.findOne({ name: 'Tangail' });
const upazilas = await db.upazilas.find({ district_id: tangail._id }).toArray();

// Aggregation: Count upazilas per district
const counts = await db.upazilas.aggregate([
  { $group: { _id: '$district_id', count: { $sum: 1 } } },
  { $lookup: { from: 'districts', localField: '_id', foreignField: '_id', as: 'district' } },
  { $unwind: '$district' },
  { $project: { district: '$district.name', count: 1 } },
  { $sort: { count: -1 } }
]).toArray();
```

## Language Support

These dumps can be used with any programming language:

- **PHP**: Use PDO, mysqli, or Laravel migrations
- **Python**: Use SQLAlchemy, Django ORM, or pymongo
- **Java**: Use JDBC, Hibernate, or Spring Data
- **Go**: Use database/sql, GORM, or mongo-driver
- **Ruby**: Use ActiveRecord or Mongoid
- **C#/.NET**: Use Entity Framework or MongoDB.Driver

## Regenerating Dumps

If you modify the source JSON files, regenerate the dumps:

```bash
npx ts-node scripts/generate-db-dumps.ts
```

## Data Source

Generated from:
- `src/json/bd-upazila.json` (495 upazilas)
- `src/json/bd-thana.json` (26 metropolitan thanas)

For the npm package with TypeScript support, see the [main README](../README.md).
