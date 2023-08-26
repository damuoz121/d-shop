const bd = require("../config/connection");

const SchemaCarrito = new bd.Schema({
  nombre: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }

});

const Carrito = bd.model("carrito", SchemaCarrito);
module.exports = Carrito;
