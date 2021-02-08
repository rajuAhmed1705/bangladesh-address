import data from "../json/bd-upazila.json";
import _ from "lodash";
import { getDivision } from "../division/division";
import { DivisonName } from "../division/types/division-name";

export const districtsOf = (division: DivisonName | string) => {
    const filteredDivision = getDivision(division);

    const uniqueDistrict = _.uniqBy(filteredDivision, "district");

    var district: any = [];

    uniqueDistrict.forEach((d) => {
        district.push(_.pick(d, "district"));
    });

    return district.map((d: any) => d.district);
};

export const allDistict = () => {
    let uniqueDistrict = _.uniqBy(data, "district");

    var district: any = [];

    uniqueDistrict.forEach((d) => {
        district.push(_.pick(d, "district"));
    });

    return district.map((d: any) => d.district);
};
