"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../enums/enums");
const resturant_entity_1 = require("./resturant.entity");
let Menu = class Menu {
    item_id;
    item_name;
    item_type;
    price;
    resturant;
};
exports.Menu = Menu;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], Menu.prototype, "item_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Menu.prototype, "item_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: enums_1.ITEM_TYPE, default: enums_1.ITEM_TYPE.FAST_FOOD }),
    __metadata("design:type", String)
], Menu.prototype, "item_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", scale: 2 }),
    __metadata("design:type", Number)
], Menu.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resturant_entity_1.Resturant, (resturant) => resturant.items, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", resturant_entity_1.Resturant)
], Menu.prototype, "resturant", void 0);
exports.Menu = Menu = __decorate([
    (0, typeorm_1.Entity)()
], Menu);
