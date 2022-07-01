"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProductos = exports.deleteProducto = exports.updateProducto = exports.retrieveProducto = exports.createProducto = void 0;
const producto_model_1 = require("../models/producto.model");
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, fechaVencimiento, categoria, precio, peso } = req.body;
    const response = yield new ProductoController().create({ nombre, fechaVencimiento, categoria, precio, peso });
    return res.status(response.status).json(response);
});
exports.createProducto = createProducto;
const retrieveProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new ProductoController().retrieve(docId);
    return res.status(response.status).json(response);
});
exports.retrieveProducto = retrieveProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, fechaVencimiento, categoria, precio, peso } = req.body;
    const docId = req.params.id;
    const response = yield new ProductoController().update(docId, { nombre, fechaVencimiento, categoria, precio, peso });
    return res.status(response.status).json(response);
});
exports.updateProducto = updateProducto;

const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new ProductoController().delete(docId);
    return res.status(response.status).json(response);
});
exports.deleteProducto = deleteProducto;

const listProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new ProductoController().list();
    return res.status(200).json(response);
});
exports.listProductos = listProductos;

class ProductoController {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = new producto_model_1.Producto(payload);
            return producto.save().then(data => {
                return {
                    message: "CREATED: Product added to database",
                    status: 201,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error on create Product",
                    status: 500,
                    content: err
                };
            });
        });
    }
    retrieve(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return producto_model_1.Producto.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "NOT FOUND: Product not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Product retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    update(docId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return producto_model_1.Producto.updateOne({ _id: docId }, { $set: {
                    nombre: payload.nombre,
                    fechaVencimiento: payload.fechaVencimiento,
                    categoria: payload.categoria,
                    precio: payload.precio,
                    peso: payload.peso
                } }).then(data => {
                return {
                    message: "OK: Producto updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: Producto not updated",
                    status: 500,
                    content: err
                };
            });
        });
    }
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return producto_model_1.Producto.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount == 0) {
                    return {
                        message: "NOT FOUND: Product not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Product deleted",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return producto_model_1.Producto.find({}).then(data => {
                return {
                    message: "OK: All Products retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return { message: "Error on retrieve Products", status: 500, content: err };
            });
        });
    }
}
