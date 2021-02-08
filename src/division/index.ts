import data from "../json/bd-upazila.json";
import _ from "lodash";
import { getDivision } from "./division";
import { DivisonName } from "./types/division-name";

export const allDivision = () => {
    let uniqueDivision = _.uniqBy(data, "division");

    let division: any = [];

    uniqueDivision.forEach((d) => {
        division.push(_.pick(d, "division"));
    });

    return division.map((d: any) => d.division);
};

export const divisionalDataOf = (division: DivisonName | string) => {
    const filteredDivision = getDivision(division);

    let allDistrict: any = [];

    filteredDivision.forEach((d) => {
        allDistrict.push(_.pick(d, ["district", "upazila"]));
    });

    return allDistrict;
};
