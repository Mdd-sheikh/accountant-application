import express from 'express'
import DbConeection from './config/db.js'
import cors from 'cors'
import router from './routes/UserRoute.js'
import dotenv from 'dotenv'
import customerRouter from './routes/customerRouter.js'

const app = express()
const port = (process.env.PORT || 5000)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
dotenv.config()

// api endpoint

app.use("/api/user",router)
app.use("/api/customer",customerRouter)

// mongo db cnnection
DbConeection()


app.get("/", (req, res) => {
    res.send("server is busy");
})

app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);

}) 