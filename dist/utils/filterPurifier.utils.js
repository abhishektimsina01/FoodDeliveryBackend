"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purifyResturantFilter = void 0;
const filters_constants_1 = require("../constants/filters.constants");
const purifyResturantFilter = (filter, role) => {
    // prepare the purifiedFilte which contains of only things that is required
    let purifiedFilter = {};
    let f;
    for (f of filters_constants_1.resturantFilter[role]) {
        if (f in filter) {
            purifiedFilter[f] = filter[f];
        }
    }
    return purifiedFilter;
};
exports.purifyResturantFilter = purifyResturantFilter;
