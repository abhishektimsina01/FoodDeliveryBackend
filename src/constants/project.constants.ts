import { Role } from "../enums/enums";

export const resturantSelect = {

    customer : {
        resturant_id : true,
        resturant_name : true,
        status : true,
        address : {
            city : true,
            ward_num : true,
            phone_number1 : true,
            street_name : true
        },
        items : {
            item_id : true,
            item_name : true,
            item_type : true,
            price : true,
        }
    },
    
    resturant : {
        resturant_id : true,
        resturant_name : true,
        status : true,
        address : {
            city : true,
            ward_num : true,
            phone_number1 : true,
            street_name : true
        },
        items : {
            item_id : true,
            item_name : true,
            item_type : true,
            price : true,
        },
        orders : {
            order_id : true,
            order_item : true,
            cost_order : true,
        },
        approval_status : true,
        approved_by : true,
    },

    admin : {
        resturant_id : true,
        resturant_name : true,
        status : true,
        address : {
            city : true,
            ward_num : true,
            phone_number1 : true,
            street_name : true
        },
        items : {
            item_id : true,
            item_name : true,
            item_type : true,
            price : true,
        },
        approval_status : true,
        approved_by : true,
        created_at : true
    }
}


export const allResturantsSelect = {
    customer : {
        resturant_id : true,
        resturant_name : true,
        status : true,
        address : {
            city : true,
            ward_num : true,
            phone_number1 : true,
            street_name : true
        },
    },

    admin : {
        resturant_id : true,
        resturant_name : true,
        status : true,
        address : {
            city : true,
            ward_num : true,
            phone_number1 : true,
            street_name : true
        },
        approval_status : true,
        approved_by : true
    }
}