import data from "../json/bd-upazila.json";
import _ from "lodash";

export const district = (division: string) => {
    const filteredDistrict = _.filter(data, {
        division: _.upperFirst(division),
    });

    const uniqueDistrict = _.uniqBy(filteredDistrict, "district");

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
