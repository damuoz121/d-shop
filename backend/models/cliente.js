const bd = require("../config/connection");

const SchemaCliente = new bd.Schema({
  nombre: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ubicacion: {
    center: {
      latitud: Number,
      longitud: Number
    },
    zoom: { type: Number }
  },

  totalComprado: {
    type: Number,
    default: 0
  },

  historicoComprado:
    {
      type: Array,
      default: []
    },

  rol: {
    type: String

  }

});

const Cliente = bd.model("cliente", SchemaCliente);
module.exports = Cliente;
