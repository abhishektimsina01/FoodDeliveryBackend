import { ICustomerLogIn, ICustomerSignUp, IResturantLogIn, IResturantSignUp } from "../interface/interfaces";
import { CustomerRepository } from "../repositories/customer.repo";
import { checkPassword, hashPassword } from "../utils/password.utils";
import { APIError } from "../exception/exception";
import { HTTP_STATUS } from "../constants/http-status.constants";
import { addAddress } from "../repositories/address.repos";
import { Role } from "../enums/enums";
import { generateToken } from "../utils/jwt.utils";
import { ResturantRepository } from "../repositories/resturant.repos";


export class AuthService {
    custoRepo : CustomerRepository
    restroRepo : ResturantRepository

    constructor(){
        this.custoRepo = new CustomerRepository()
        this.restroRepo = new ResturantRepository()
    }

    public customerSignUpService = async (userData : ICustomerSignUp) => {

        try{
            const { address, ...userInfo} = userData
            const IsUser = await this.custoRepo.checkCustomer("email", userInfo.email)
            if(IsUser){
                throw new APIError("user already exist", HTTP_STATUS.CLIENT_ERROR.CONFLICT.CODE, {
                    content : "please logIn!!"
                })
            }
            const new_adddress_id : number = await addAddress(address)
            const newUserData = { 
                ...userInfo,
                address : new_adddress_id
            }
            const hashedPassword = await hashPassword(newUserData.password)
            newUserData.password = hashedPassword
            const user = await this.custoRepo.createCustomer(newUserData)
            const { password, email, updated_at, ...safeData} = user
            const {access_token, refresh_token } = generateToken({id : user.customer_id, username : user.username}, Role.CUSTOMER)
            return {
                safeData,
                access_token,
                refresh_token
            }
        }
        catch(err){
            throw err   
        }
    }

    public customerLogInService = async (userData : ICustomerLogIn) => {
        try{
            const user = await this.custoRepo.findCustomer("email", userData.email, true)
            if(!user){
               throw new APIError("User doesnot exist", HTTP_STATUS.CLIENT_ERROR.NOT_FOUND.CODE, {
                    content : "user was not found"
                })
            }
            const IsSame = await checkPassword(userData.password, user.password)
            if(!IsSame){
                throw new APIError("LogIn credentials wrong", HTTP_STATUS.CLIENT_ERROR.NOT_FOUND.CODE, {
                    content : "email or password is wrong"
                })
            }
            const {password, ...safeData} = user
            const {access_token, refresh_token} = generateToken({ id : user.customer_id, username : user.username}, Role.CUSTOMER)
            return {
                safeData,
                access_token,
                refresh_token
            }
        }
        catch(err){
            throw err
        }
    }

    public ResturantSignUpService = async (restroData : IResturantSignUp) => {
        try{
            const resturant = await this.restroRepo.findResturant("email", restroData.email, true)
            if(resturant){
                throw new APIError("resturant already created under that name", HTTP_STATUS.CLIENT_ERROR.CONFLICT.CODE)
            }
            restroData.password = await hashPassword(restroData.password)
            const {address, ...resturant_data} = restroData
            const new_address_id = await addAddress(address)
            const resturantData = {
                ...resturant_data,
                address : new_address_id
            }
            const new_resturant = await this.restroRepo.createResturant(resturantData)
            const {password, ...safeData} = new_resturant
            const {access_token, refresh_token} = generateToken({id : safeData.resturant_id, username : safeData.resturant_name}, Role.RESTURANT)
            return {
                safeData,
                access_token,
                refresh_token
            }
        }
        catch(error){
            throw error
        }
    }

    public ResturantLogInService = async(restroData : IResturantLogIn) => {
        try{
            const resturant = await this.restroRepo.findResturant("email", restroData.email, true)
            if(!resturant){
                throw new APIError("no resturant found", HTTP_STATUS.CLIENT_ERROR.NOT_FOUND.CODE)
            }
            if(!await checkPassword(restroData.password, resturant.password)){
                throw new APIError("logIn credentials didnot match", HTTP_STATUS.CLIENT_ERROR.FORBIDDEN.CODE)
            }
            const {access_token, refresh_token} = generateToken({id : resturant.resturant_id, username : resturant.resturant_name}, Role.RESTURANT)
            const {password, ...safeData} = resturant
            return {
                safeData,
                access_token,
                refresh_token
            }
        }
        catch(error){
            throw error
        }
    }
}