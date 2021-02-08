import data from "../json/bd-upazila.json";
import _ from "lodash";

export const getDivision = (name: string) => {
    return _.filter(data, {
        division: _.upperFirst(name),
    });
};
