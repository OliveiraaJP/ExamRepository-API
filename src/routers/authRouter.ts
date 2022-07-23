import { Router } from "express";
import { signin, signup } from "../controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/validSchema.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

const authRouter = Router()

authRouter.post("/sign-up",validateSchemaMiddleware(signUpSchema) ,signup)
authRouter.post("/sign-in",validateSchemaMiddleware(signInSchema) ,signin)

export default authRouter;