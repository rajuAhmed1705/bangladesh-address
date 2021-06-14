import data from "../json/bd-upazila.json";
import _ from "lodash";

export const upazilasOf = (district: string) => {
    const upazila = _.filter(data, {
        district: _.upperFirst(district),
    });

    return upazila;
};

export const allUpazila = () => {
    let upazila: any = [];

    data.forEach((u) => {
        upazila.push(_.pick(u, "upazila"));
    });

    return upazila.map((u: any) => u.upazila);
};
