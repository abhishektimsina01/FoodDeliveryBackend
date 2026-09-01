import { Role } from "../enums/enums"
import { IAdmin, ICustomerFilter, IjwtData, IResturantUpdate, IResturantUpdateByAdmin } from "../interface/interfaces"

export type genericAndNull<T> = T | null
export type roleType = Role.ADMIN | Role.CUSTOMER | Role.DELIVERY | Role.RESTURANT
export type IuserData = IjwtData & { role : Role}
export type IResturantFilterType = ICustomerFilter | IAdmin 
export type IResturantUpdateType = 
                        |IResturantUpdate 
                        | IResturantUpdateByAdmin