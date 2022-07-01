"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const mongoose_1 = require("mongoose");
//Schema 
const productoSchema = new mongoose_1.Schema({
    nombre: { type: String },
    fechaVencimiento: { type: Date },
    categoria: { type: String },
    precio: { type: String },
    peso: { type: String }
});
//Model
const Producto = (0, mongoose_1.model)('Producto', productoSchema);
exports.Producto = Producto;
