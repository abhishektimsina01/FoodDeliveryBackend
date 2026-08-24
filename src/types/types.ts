import { Role } from "../enums/enums"

export type genericAndNull<T> = T | T[] | null
export type roleType = Role.ADMIN | Role.CUSTOMER | Role.DELIVERY | Role.RESTURANT