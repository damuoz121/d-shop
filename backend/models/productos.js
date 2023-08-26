const bd = require("../config/connection");

const productos = new bd.Schema({

  referencia: {
    type: String,
    require: true
  },

  nombre: {
    type: String,
    required: true
  },

  descripcion: {
    type: String,
    required: true
  },

  stock: {
    type: Number,
    required: true
  },

  precio: {
    type: String,
    required: true
  },

  imagen: {
    type: String
  },

  habilitado: {
    type: String
  }

});

module.exports = bd.model("Product", productos);
