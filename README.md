# Bangladesh Address (division, district, upazila)

It's a simple npm package that exports methods representing divisions, districts and upazilas of Bangladesh.

## Usage:

### Install:

    npm i @bangladeshi/bangladesh-address

Import the package in your file to use it.

    const address = require('@bangladeshi/bangladesh-address')

### Methods:

Division

    allDivision()

> get array of all divisions

    divisionalDataOf(DivisionName.Dhaka)

> get every districts and upazilas of Dhaka division

Districts

    districtOf(DivisionName.Dhaka)

> get districts of Dhaka division

    allDistrict()

> get an array of all district names of Bangladesh

upazila

    upazilasOf("tangail")

> get all upazilas of Tangail

    allUpazila()

> get an array of all Upazilas

Types

    DivisionName.Dhaka
    DivisionName.Chittogram
    DivisionName.Mymensingh
    DivisionName.Khulna
    DivisionName.Rajshahi
    DivisionName.Rangpur
    DivisionName.Sylhet
    DivisionName.Barisal
