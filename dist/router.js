"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const producto_controller_1 = require("./controllers/producto.controller");
const router = (app) => {
    app.post("/productos", producto_controller_1.createProducto);
    app.get("/productos/:id", producto_controller_1.retrieveProducto);
    app.put("/productos/:id", producto_controller_1.updateProducto);
    app.delete("/productos/:id", producto_controller_1.deleteProducto);
    app.get("/productos", producto_controller_1.listProductos);
};
exports.router = router;
