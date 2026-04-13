import express from 'express'
import DbConeection from './config/db.js'
import cors from 'cors'
import router from './routes/UserRoute.js'
import dotenv from 'dotenv'
import customerRouter from './routes/customerRouter.js'
import itemrouter from './routes/item.js'
import Gstrouter from './routes/gstfetchRoute.js'
import SignatureRouter from './routes/signatureRouter.js'
import fs from 'fs'

const app = express()
const port = (process.env.PORT || 5000)
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// automatic create folder for store images

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}
// api endpoint

app.use("/api/user", router)
app.use("/api/customer", customerRouter);
app.use("/api/items", itemrouter);
app.use("/api/gst", Gstrouter);
app.use("/api/customer", SignatureRouter);
app.use("/uploads", express.static("uploads"));

// mongo db cnnection
DbConeection()


app.get("/", (req, res) => {
    res.send("server is busy");
})

app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);

}) 