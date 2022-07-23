import { UserData } from "../interfaces/authInterface.js";
import prisma from "../config/database.js"

export async function getUser(email: string) {
    return await prisma.user.findFirst({where:{email}})
}

export async function createUser(userObj:UserData) {
    return await prisma.user.create({data:userObj})
}