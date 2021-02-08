import data from "../json/bd-upazila.json";
import _ from "lodash";

export const division = () => {
    let uniqueDivision = _.uniqBy(data, "division");

    var division: any = [];

    uniqueDivision.forEach((d) => {
        division.push(_.pick(d, "division"));
    });

    return division.map((d: any) => d.division);
};
