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
    type: String,
    required: true
  },

  habilitado: {
    type: Boolean,
    required: true
  }

});

const productsSchema = new bd.Schema({
  nombre: String,
  unidadesVendidas: Number,
  fechaVenta: Date,
  clienteRegistrado: Boolean
});

const productoSchema = new bd.Schema({
  nombre: String,
  precio: Number,
  descripcion: String
  // Otros campos según tus necesidades
});
module.exports = bd.model("Productos", productsSchema);
module.exports = bd.model("Product", productos);
