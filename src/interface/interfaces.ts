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
    resturant_name : string
    owner_name : string
    password : string
    address : IAddress
}

export interface IResturantLogIn {
    owner_name : string,
    resturant_name : string,
    password : string
}

export interface IjwtData {
    id : number
    username : string
}