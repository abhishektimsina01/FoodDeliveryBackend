"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const get_env_utils_js_1 = require("../utils/get.env.utils.js");
const exception_js_1 = require("../exception/exception.js");
const http_status_constants_js_1 = require("../constants/http-status.constants.js");
const admin_entity_js_1 = require("./Entity/admin.entity.js");
const customer_entity_js_1 = require("./Entity/customer.entity.js");
const resturant_entity_js_1 = require("./Entity/resturant.entity.js");
const delivery_person_entity_js_1 = require("./Entity/delivery_person.entity.js");
const delivery_entity_js_1 = require("./Entity/delivery.entity.js");
const order_entity_js_1 = require("./Entity/order.entity.js");
const menu_entity_js_1 = require("./Entity/menu.entity.js");
const transaction_entity_js_1 = require("./Entity/transaction.entity.js");
const address_entity_js_1 = require("./Entity/address.entity.js");
const order_item_entity_js_1 = require("./Entity/ManyToMany/order_item.entity.js");
const user_entity_js_1 = require("./Entity/user.entity.js");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    username: (0, get_env_utils_js_1.getEnvProperty)("db_username"),
    password: (0, get_env_utils_js_1.getEnvProperty)("db_password"),
    database: "FoodDelivery",
    port: 3306,
    entities: [
        address_entity_js_1.Address,
        user_entity_js_1.User,
        admin_entity_js_1.Admin,
        customer_entity_js_1.Customer,
        resturant_entity_js_1.Resturant,
        delivery_person_entity_js_1.DeliveryPerson,
        delivery_entity_js_1.Delivery,
        order_entity_js_1.Order,
        menu_entity_js_1.Menu,
        transaction_entity_js_1.Transaction,
        order_item_entity_js_1.OrderItem
    ],
    synchronize: false,
});
const connectToDatabase = async () => {
    let count = 1;
    let status = false;
    while (count <= 5) {
        try {
            await exports.AppDataSource.initialize();
            console.log("Database Connected successfully✅.");
            status = true;
            break;
        }
        catch (err) {
            console.log(`${count} failed to connect.`);
            console.log(err);
            status = false;
            count++;
        }
    }
    if (!status) {
        throw new exception_js_1.DatabaseException("Database couldnot be connected❌.", http_status_constants_js_1.HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE);
    }
};
exports.connectToDatabase = connectToDatabase;
