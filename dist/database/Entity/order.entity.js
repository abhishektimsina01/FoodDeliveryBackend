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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../enums/enums");
const resturant_entity_1 = require("./resturant.entity");
const order_item_entity_1 = require("./ManyToMany/order_item.entity");
const delivery_entity_1 = require("./delivery.entity");
const transaction_entity_1 = require("./transaction.entity");
const customer_entity_1 = require("./customer.entity");
let Order = class Order {
    order_id;
    status;
    resturant;
    order_item;
    customer;
    delivery;
    cost_order;
    delivery_price;
    transaction;
    created_at;
    updated_at;
    deadline;
    session_id;
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], Order.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: enums_1.RESTURANT_ORDER_STATUS, default: enums_1.RESTURANT_ORDER_STATUS.ORDER_PENDING }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resturant_entity_1.Resturant, (resturant) => resturant.orders, { onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", resturant_entity_1.Resturant)
], Order.prototype, "resturant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_item_entity_1.OrderItem, (order_item) => order_item.order),
    __metadata("design:type", Array)
], Order.prototype, "order_item", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.orders),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", customer_entity_1.Customer)
], Order.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => delivery_entity_1.Delivery, (delivery) => delivery.order, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Order.prototype, "delivery", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", scale: 2, default: 0.00 }),
    __metadata("design:type", Number)
], Order.prototype, "cost_order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "delivery_price", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => transaction_entity_1.Transaction, (trans) => trans.order, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Order.prototype, "transaction", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "deadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "session_id", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)()
], Order);
