import express from "express";
import dotenv from 'dotenv'
import {Contenedor} from "./contenedor.js";

const app = express();
dotenv.config();

const Products = new Contenedor("products.txt");

app.get('/productos', (_req, res) =>{
    Products.getAll().then( product => {
        res.status(200).json(product)
    })
});


app.get('/productoRandom', (_req, res) =>{
    Products.getAll().then( product => {
        let random = product[Math.floor(Math.random()*product.length)];
        res.status(200).send(random)
    })
});


const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })