import { Request, Response } from 'express';
import { Producto, IProducto } from '../models/producto.model';
import { IResponse } from '../models/response.model';

export const createProducto = async (req: Request, res: Response)=> {           
    const { nombre, fechaVencimiento, categoria, precio, peso } : IProducto = req.body;
    const response = await new ProductoController().create({ nombre, fechaVencimiento, categoria, precio, peso});         
    return res.status(response.status).json(response);   
}

export const retrieveProducto = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new ProductoController().retrieve(docId);         
    return res.status(response.status).json(response);   
 }

 export const updateProducto = async (req: Request, res: Response)=> {           
    const { nombre, fechaVencimiento, categoria, precio, peso } : IProducto = req.body;
    const docId : String = req.params.id; 
    const response = await new ProductoController().update(docId, { nombre, fechaVencimiento, categoria, precio, peso});         
    return res.status(response.status).json(response);   
}

export const deleteProducto = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new ProductoController().delete(docId);         
    return res.status(response.status).json(response);   
 }

 export const listProductos = async (req: Request, res: Response) => {
    const response = await new ProductoController().list();         
    return res.status(200).json(response);    
}


class ProductoController{

    public async create(payload : IProducto) : Promise<IResponse> {
        const producto = new Producto(payload);
        return producto.save().then(data => {
            return {
                message: "CREATED: Producto added to database",
                status: 201,
                content : data
            }
        }).catch(err => {
            return {
                message: "Error on create Producto",
                status: 500,
                content : err
            }
        });        
    }

    public async retrieve(docId: String) : Promise<IResponse> {        
        return Producto.findOne({_id: docId}).then(data => {
            if(data === null) {
                return {
                    message: "NOT FOUND: Producto not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Producto retrieve",
                status: 200,
                content : data
            };
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name ,
                status: 500,
                content : err
            };
        });        
    }

    public async update(docId: String, payload : IProducto) : Promise<IResponse>{
        return Producto.updateOne({_id: docId} , { $set: { 
            nombre: payload.nombre, 
            fechaVencimiento: payload.fechaVencimiento, 
            categoria: payload.categoria, 
            precio: payload.precio, 
            peso: payload.peso
          } }).then(data => {            
            return {
                message: "OK: Product updated",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: Product not updated",
                status: 500,
                content : err
            }
        });
    }

    public async delete(docId: String) : Promise<IResponse> {
        return Producto.deleteOne({_id: docId}).then(data => {
            if (data.deletedCount == 0) {
                return {
                    message: "NOT FOUND: Product not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Product deleted",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name,
                status: 500,
                content : err
            }
        });
    }

    public async list() : Promise<IResponse> {
        return Producto.find({}).then(data => {
                return {
                    message: "OK: All Products retrieve",
                    status: 200,
                    content : data
                };
            }).catch(err => {
                return { message: "Error on retrieve Products", status: 500, content : err }
        });       
    }
}