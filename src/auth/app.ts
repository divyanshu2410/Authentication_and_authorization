import express, { urlencoded } from "express"
import dotenv from "dotenv"
import CompositionRoot from "./CompositionRoot"


dotenv.config()
CompositionRoot.configure()

const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth', CompositionRoot.authRouter())

app.listen(PORT, () => {
    console.log('Listening on port ',(PORT) )
})