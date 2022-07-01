import { Schema, model } from 'mongoose';

//Interface
export interface IProducto{
    nombre:   null | string;
    fechaVencimiento:    null | Date;
    categoria:      null | string;
    precio:         null | string;
    peso:        null | string;
}

//Schema 

const productoSchema = new Schema<IProducto>({

    nombre:   {type:String},
    fechaVencimiento:    {type:Date},
    categoria:      {type:String},
    precio:         {type:String},
    peso:        {type:String}

});

//Model

const Producto = model<IProducto>('Producto', productoSchema);
export {Producto}