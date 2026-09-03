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
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const customer_entity_1 = require("./customer.entity");
const resturant_entity_1 = require("./resturant.entity");
let Transaction = class Transaction {
    transanction_id;
    payment_id;
    order;
    customer;
    resturant;
    payment;
};
exports.Transaction = Transaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], Transaction.prototype, "transanction_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Transaction.prototype, "payment_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => order_entity_1.Order, (order) => order.transaction),
    __metadata("design:type", order_entity_1.Order)
], Transaction.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.transaction),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", customer_entity_1.Customer)
], Transaction.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resturant_entity_1.Resturant, (resturant) => resturant.transaction),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", resturant_entity_1.Resturant)
], Transaction.prototype, "resturant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Object)
], Transaction.prototype, "payment", void 0);
exports.Transaction = Transaction = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(["payment_id"])
], Transaction);
