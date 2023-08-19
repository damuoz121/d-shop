const bd = require("../config/connection");
const vendedor = new bd.Schema({

  nombre: { type: String, require: true },

  documento: { type: Number, require: true },

  telefono: { type: Number, require: true },

  email: { type: String, require: true },

  password: { type: String, required: true },

  ventasDespachadas: {
    type: Array,
    default: []
  },

  rol: { type: String }

});
const modeloVendedor = bd.model("Vendedor", vendedor);
module.exports = modeloVendedor;
