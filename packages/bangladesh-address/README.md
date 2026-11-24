# bangladesh-address

This is an alias of [`@bangladeshi/bangladesh-address`](https://www.npmjs.com/package/@bangladeshi/bangladesh-address): divisions, districts, upazilas and metropolitan thanas of Bangladesh as a typed npm package.

It re-exports the scoped package unchanged, so both names give you the same API and the same data.

```bash
npm install bangladesh-address
```

```javascript
import { allDivision, districtsOf, upazilaNamesOf } from 'bangladesh-address'

allDivision()             // ['Barisal', 'Chattogram', 'Dhaka', ...]
districtsOf('Dhaka')      // ['Dhaka', 'Faridpur', 'Gazipur', ...]
upazilaNamesOf('Gazipur') // ['Gazipur Sadar-Joydebpur', 'Kaliakior', ...]
```

Full documentation, the changelog and the issue tracker are in the main repository:
https://github.com/rajuAhmed1705/bangladesh-address
