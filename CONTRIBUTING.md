# Contributing to Bangladesh Address

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Adding new data (unions, postal codes, coordinates)

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajuAhmed1705/bangladesh-address.git
   cd bangladesh-address
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests**
   ```bash
   npm test
   ```

4. **Run linter**
   ```bash
   npm run lint
   ```

5. **Build the project**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── division/          # Division-related functions
├── district/          # District-related functions
├── upazila/           # Upazila and thana functions
├── json/              # Data files
│   ├── bd-division.json
│   ├── bd-upazila.json
│   └── bd-thana.json
├── types/             # TypeScript type definitions
└── __tests__/         # Test files
```

## We Use GitHub Flow

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation (README.md, CHANGELOG.md).
4. Ensure the test suite passes (`npm test`).
5. Make sure your code lints (`npm run lint`).
6. Issue that pull request!

## Code Quality Requirements

- **Tests**: All new functions must have corresponding tests
- **Coverage**: Maintain 90%+ code coverage
- **Types**: No `any` types - use proper TypeScript typing
- **Linting**: Code must pass ESLint checks
- **Documentation**: Add JSDoc comments with `@param` and `@returns` tags

## Adding New Data

When adding or updating location data:

1. Update the appropriate JSON file in `src/json/`
2. Ensure data follows the existing format
3. Add tests to verify data integrity
4. Update data counts in README.md if needed

### Data Format Examples

**Upazila** (in `bd-upazila.json`):
```json
{
  "upazila": "Savar",
  "district": "Dhaka",
  "division": "Dhaka"
}
```

**Thana** (in `bd-thana.json`):
```json
{
  "thana": "Gulshan",
  "district": "Dhaka",
  "division": "Dhaka",
  "type": "thana"
}
```

## Report Bugs

We use GitHub issues to track bugs. Report a bug by [opening a new issue](https://github.com/rajuAhmed1705/bangladesh-address/issues/new).

**Great Bug Reports** include:

- A quick summary and/or background
- Steps to reproduce (be specific!)
- Sample code if applicable
- What you expected to happen
- What actually happens
- Notes on what you tried

## Coding Style

- 2 spaces for indentation
- Use `const`/`let` (never `var`)
- Prefer arrow functions
- Run `npm run lint:fix` for automatic formatting

## Priority Contribution Areas

- Writing tests for edge cases
- Documentation improvements
- Performance optimizations
- Adding new utility functions
- Data corrections or additions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue with the `question` label if you need help getting started.
