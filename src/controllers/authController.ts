import { Request, Response } from "express";
import { UserData } from "../interfaces/authInterface.js";
import { chalkLogger } from "../utils/chalkLogger.js";
import * as authService from "../services/authService.js"

export async function signup(req: Request, res:Response) {
    const {email, password} : UserData = req.body 
    const userObj = {email, password}
    await authService.signup(userObj)
    chalkLogger.log('controller', 'registered')
    res.status(201).send('Registered User" :D')
}

export async function signin(req: Request, res:Response) {
    const {email, password} : UserData = req.body
    const userObj = {email, password}
    const token = await authService.signin(userObj)
    chalkLogger.log('controller', 'logged')
    res.status(201).send(token)    
}