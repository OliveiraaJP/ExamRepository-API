import { Router } from "express";
import { createTest } from "../controllers/testController.js";
import { validateSchemaMiddleware } from "../middlewares/validSchema.js";
import { tokenValidator } from "../middlewares/validToken.js";
import { testSchema } from "../schemas/testSchema.js";


const testRouter = Router()


testRouter.post('/tests', tokenValidator ,validateSchemaMiddleware(testSchema) ,createTest)

export default testRouter