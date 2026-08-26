import { RESTURANT_IS_APPROVED, RESTURANT_STATUS, Role } from "../enums/enums"

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