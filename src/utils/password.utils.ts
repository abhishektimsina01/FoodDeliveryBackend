import bcrypt from "bcryptjs"

export const hashPassword = async (originalPassword : string) => {
    const hashed_password = await bcrypt.hash(originalPassword, 10)
    return hashed_password
}

export const checkPassword = async (originalPassword : string, hashPassword : string) => {
    const IsSame = await bcrypt.compare(originalPassword, hashPassword)
    return IsSame
}