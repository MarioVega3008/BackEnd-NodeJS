import {Application} from 'express';
import { createProducto, deleteProducto, listProductos, retrieveProducto, updateProducto } from './controllers/producto.controller';

export const router = (app: Application)=>{
    app.post("/productos", createProducto);  
    app.get("/productos/:id", retrieveProducto);
    app.put("/productos/:id", updateProducto);
    app.delete("/productos/:id", deleteProducto);    
    app.get("/productos", listProductos);
}