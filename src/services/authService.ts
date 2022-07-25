import { UserData } from "../interfaces/authInterface";
import { AppError } from "../utils/error.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { chalkLogger } from "../utils/chalkLogger.js"
import * as authRepository from "../repositories/authRepository.js"

const signup = async (userObj: UserData) => {
    const {email, password} = userObj
    const hasUser = await authRepository.getUser(email)
    if(hasUser) {
        throw new AppError(400, 'User already registered!')
    }
    const cryptPass = bcrypt.hashSync(password, 10)
    await authRepository.createUser({email, password: cryptPass})
}


const signin = async (userObj: UserData) => {
    const {email, password} = userObj
    const activeUser = await authRepository.getUser(email)
    if(!activeUser) {
        throw new AppError(401, 'Invalid user!')
    }
    const confirmPassword = bcrypt.compareSync(password, activeUser.password)
    if(!confirmPassword){
        throw new AppError(401, 'Invalid password!')
    }
    const [jwtUser, jwtId] = [activeUser.email, activeUser.id]
    const token = jwt.sign({jwtUser, jwtId}, process.env.JWT_SECRET, {expiresIn:'24h'})
    chalkLogger.log('service', token)
    return token
}

export {
    signup,
    signin
}