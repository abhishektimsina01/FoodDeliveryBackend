import { resturantFilter } from "../constants/filters.constants";
import { Role } from "../enums/enums";
import { IResturantFilterType } from "../types/types";

export const purifyResturantFilter = (filter : IResturantFilterType, role : Role) : IResturantFilterType => {
    // prepare the purifiedFilte which contains of only things that is required
    let purifiedFilter : IResturantFilterType = {}
    for(let f of resturantFilter[role]){
        if(f in filter){
            purifiedFilter[f] = filter[f]
        }
    }
    return purifiedFilter
}