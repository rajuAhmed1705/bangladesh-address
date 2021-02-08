import data from "../json/bd-upazila.json";
import _ from "lodash";

export const upazila = (district: string) => {
    const upazila = _.filter(data, {
        district: _.upperFirst(district),
    });

    return upazila;
};
