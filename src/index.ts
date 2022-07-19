import  express, {json}  from "express";
import "express-async-errors"
import dotenv from "dotenv"
import chalk from "chalk"
import cors from "cors"
import router from "./routers/index.js";
import { errorHandlerMiddleware } from "./middlewares/errorHanderMiddleware.js";


dotenv.config()

const app = express()

app.use(json())
app.use(cors())
app.use(router)
app.use(errorHandlerMiddleware)

const PORT = +process.env.PORT || 4000

app.listen(PORT, () => console.log(chalk.bgBlack(`Server running on port: ${PORT}`)))
