const bd = require("../config/connection");
const venta = new bd.Schema({

  producto: { type: String, required: true },

  subtotalVenta: { type: Number, required: true },

  fechaVenta: { type: String, required: true },

  impuesto: { type: Number, default: 0.19, required: true },

  totalVenta: { type: Number, required: true },

  cliente: { type: Object, required: true },

  vendedor: { type: Object, required: true },

  productosVenta: { type: Array, required: true }

});

module.exports = bd.model("venta", venta);
