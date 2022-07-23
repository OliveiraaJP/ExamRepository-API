import app from "./app.js"

import colors from "colors"
import dotenv from "dotenv"
dotenv.config()

const PORT = +process.env.PORT || 4000

app.listen(PORT, () => console.log(colors.bgBlack(`Server running on port: ${PORT}`)))