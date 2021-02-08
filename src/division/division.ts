import data from "../json/bd-upazila.json";
import _ from "lodash";
import { DivisonName } from "./types/division-name";

export const getDivision = (name: DivisonName) => {
    return _.filter(data, {
        division: _.upperFirst(name),
    });
};
