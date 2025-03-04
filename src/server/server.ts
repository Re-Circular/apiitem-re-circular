import express from "express";
import router from "../routes/itemRouter";
import dotenv from 'dotenv'

dotenv.config();

const app= express();

app.use(express.json());
app.use('/itens', router)

app.listen(3333,()=>{ console.log("Server On Port 3333")})
