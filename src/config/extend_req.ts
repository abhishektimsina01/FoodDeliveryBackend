import { Role } from "../enums/enums"

declare global {
    namespace Express{
        interface Request {
            user?: {
                id : number,
                username : string,
                role : Role
            }
        }
    }
}