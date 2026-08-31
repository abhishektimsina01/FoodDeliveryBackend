import { ITEM_TYPE, RESTURANT_IS_APPROVED, RESTURANT_STATUS, Role } from "../enums/enums"

export interface IAddress {
    city : string,
    ward_num : number
    street_name : string
    country_id ?: number
    phone_number1 : number
}

export interface ICustomerSignUp {
    username : string
    password : string
    email : string
    address : IAddress
}

export interface ICustomerLogIn {
    email : string
    password : string
}

export interface IResturantSignUp {
    email : string
    resturant_name : string
    owner_name : string
    password : string
    address : IAddress
}

export interface IResturantLogIn {
    email : string
    password : string
}

export interface IjwtData {
    id : number
    username : string
}

export interface IPayload {
    id : number
    username : string
    role : Role
    iat ?: number
    exp ?: number
}

export interface IRestroParams {
    id : string
}

export interface ICustomerFilter {
    status ?: RESTURANT_STATUS
}

export interface IAdmin {
    status ?: RESTURANT_STATUS
    approval_status ?: RESTURANT_IS_APPROVED
}

export interface IResturantUpdate {
    status ?: RESTURANT_STATUS,
    resturant_name ?: string,
    owner_name ?: string,
}

export interface IResturantUpdateByAdmin {
    approval_status : RESTURANT_IS_APPROVED,
}

export interface IMenuData {
    item_name : string
    item_type : ITEM_TYPE
    price : number
}

export interface IItem {
    item_id : number
    quantity : number
}

export interface IOrderData {
    resturant_id : number
    items : IItem[]
    deadline : Date | null
}

export interface ITransaction {
    id: string;
    amount_total: number;
    currency: string;
    mode: "payment";
    payment_status: "unpaid" | "paid" | "no_payment_required";
    status: "open" | "complete" | "expired";
    payment_intent: string | null;
    metadata: Record<string, string>;
}