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
exports.Delivery = void 0;
const typeorm_1 = require("typeorm");
const delivery_person_entity_1 = require("./delivery_person.entity");
const enums_1 = require("../../enums/enums");
const order_entity_1 = require("./order.entity");
let Delivery = class Delivery {
    delivery_id;
    delivery_person;
    order_status;
    order;
    created_at;
};
exports.Delivery = Delivery;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], Delivery.prototype, "delivery_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => delivery_person_entity_1.DeliveryPerson, (person) => person.delivery, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", delivery_person_entity_1.DeliveryPerson)
], Delivery.prototype, "delivery_person", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: enums_1.DELIVERY_STATUS, default: enums_1.DELIVERY_STATUS.ORDER_PLACED }),
    __metadata("design:type", String)
], Delivery.prototype, "order_status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => order_entity_1.Order, (order) => order.delivery),
    __metadata("design:type", order_entity_1.Order)
], Delivery.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Delivery.prototype, "created_at", void 0);
exports.Delivery = Delivery = __decorate([
    (0, typeorm_1.Entity)()
], Delivery);
