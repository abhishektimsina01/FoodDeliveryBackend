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
exports.Resturant = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("./address.entity");
const admin_entity_1 = require("./admin.entity");
const enums_1 = require("../../enums/enums");
const menu_entity_1 = require("./menu.entity");
const order_entity_1 = require("./order.entity");
const transaction_entity_1 = require("./transaction.entity");
const user_entity_1 = require("./user.entity");
let Resturant = class Resturant {
    resturant_id;
    resturant_name;
    owner_name;
    email;
    approval_status;
    password;
    status;
    approved_by;
    items;
    orders;
    transaction;
    user;
    address;
    created_at;
    updated_at;
};
exports.Resturant = Resturant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], Resturant.prototype, "resturant_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Resturant.prototype, "resturant_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Resturant.prototype, "owner_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Resturant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: enums_1.RESTURANT_IS_APPROVED, default: enums_1.RESTURANT_IS_APPROVED.RESTURANT_PENDING }),
    __metadata("design:type", String)
], Resturant.prototype, "approval_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Resturant.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: [enums_1.RESTURANT_STATUS.RESTURANT_OPEN, enums_1.RESTURANT_STATUS.RESTURANT_CLOSE], default: enums_1.RESTURANT_STATUS.RESTURANT_CLOSE }),
    __metadata("design:type", String)
], Resturant.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin, (admin) => admin.resturants, { onDelete: "SET NULL", nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Resturant.prototype, "approved_by", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => menu_entity_1.Menu, (menu) => menu.resturant),
    __metadata("design:type", Array)
], Resturant.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.resturant),
    __metadata("design:type", Array)
], Resturant.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.Transaction, (trans) => trans.resturant),
    __metadata("design:type", Array)
], Resturant.prototype, "transaction", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Resturant.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entity_1.Address),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_entity_1.Address)
], Resturant.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Resturant.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Resturant.prototype, "updated_at", void 0);
exports.Resturant = Resturant = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['resturant_name', 'email'])
], Resturant);
