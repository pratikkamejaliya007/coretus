import express from 'express'
import db from './db.js'
const port = 9000 
const app = express()
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import ProductRouter from './route/Product.route.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3000",
    credentials : true
}))

app.use("/product",ProductRouter)


app.listen(port,()=> console.log(`server is port ${port} run`))