import express from 'express'
import DbConeection from './config/db.js'
import cors from 'cors'
import router from './routes/UserRoute.js'
import dotenv from 'dotenv'
import customerRouter from './routes/customerRouter.js'
import itemrouter from './routes/item.js'

const app = express()
const port = (process.env.PORT || 5000)
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// api endpoint

app.use("/api/user", router)
app.use("/api/customer", customerRouter);
app.use("/api/items",itemrouter); 

// mongo db cnnection
DbConeection()


app.get("/", (req, res) => {
    res.send("server is busy");
})

app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);

}) 