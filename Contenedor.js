const fs = require('fs');

class Contenedor {
    constructor (file){
        this.file = file
    }

    // recibe obj, lo transforma y lo guarda en archivo
    async save(producto){
        let contenido = await fs.promises.readFile (this.file)
        let contObj = JSON.parse(contenido)
        contObj.push(producto)
        await fs.promises.writeFile(this.file, JSON.stringify(contObj))
    }

    // devuelve todos los objetos en el archivo
    async getAll(){
        let contenido = await fs.promises.readFile (this.file)
        let contObj = JSON.parse(contenido)
        return contObj
    }

    // en base al id devuelve el objeto que coincida
    async getById(id){
        let contObj = await this.getAll()
        let resultado = contObj.find(obj => obj.id == id)
        return resultado
    }

    async deleteById(id){
        let contObj = await this.getAll()
        let nuevoObj = contObj.filter(obj => obj.id !== id)
        console.log(nuevoObj)
        await fs.promises.writeFile(this.file, JSON.stringify(nuevoObj))
    }

    async deleteAll(){
        await fs.promises.writeFile(this.file, "[]")
    }
}

let productos = new Contenedor('productos.txt')
let carrito = new Contenedor('carrito.txt')

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

const usarContenedor = async () => {
    await productos.save(producto1)
    await productos.save(producto2)
    await productos.save(producto3)

    await carrito.save(producto1)
    await carrito.save(producto2)
    await carrito.save(producto3)
}
// let idProducto1 = contenedor.save(producto1)

module.exports = Contenedor