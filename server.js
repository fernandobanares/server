
const express = require('express')
const app = express ()
const Contenedor = require('./Contenedor')

const productos = new Contenedor ('productos.txt')

// productos

let producto1 ={
    "title":"titulo1",
    "price":5000,
    "thumbnail":"url1"
}
let producto2 ={
    "title":"titulo1",
    "price":10000,
    "thumbnail":"url2"
}
let producto3 ={
    "title":"titulo1",
    "price":15000,
    "thumbnail":"url3"
}

// envío de productos a txt

const usarContenedor = async () => {
    await productos.save (producto1)
    await productos.save (producto2)
    await productos.save (producto3)
}

usarContenedor()

const getProduct = async () => {
    let listProduct = JSON.stringify(await productos.getAll())
    return listProduct
}

const getProductRandom = async () =>{
    let length = await productos.getLength()
    let random = Math.floor(Math.random() * length)
    let productRandom = await productos.getAll();
    console.log(length, random, productRandom)
    return JSON.stringify(productRandom[random]);
}


app.get('/', (req, res) => {
    res.send(`Root!!!!!`);
})

app.get('/productos',async (req, res) => {
    res.send(`Lista de productos: ${await getProduct()}`)
})

app.get('/productoRandom',async (req, res) => {
    res.send(`Lista de productos: ${await getProductRandom()}`)
})

app.get('/fyh',(req, res) => {
    res.send({fyh: new Date().toLocaleString()})
})

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))