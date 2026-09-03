import { resturantFilter } from "../constants/filters.constants";
import { Role } from "../enums/enums";
import { IResturantFilterType } from "../types/types";

export const purifyResturantFilter = <T extends Record<string, unknown>>(filter : T, role : Exclude<Role, Role.DELIVERY | Role.RESTURANT>) : IResturantFilterType => {
    // prepare the purifiedFilte which contains of only things that is required
    let purifiedFilter : Record<string, unknown> = {}
    let f : string
    for(f  of resturantFilter[role]){
        if(f in filter){
            purifiedFilter[f] = filter[f]
        }
    }
    return purifiedFilter as T
} 