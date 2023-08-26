const express = require("express");
const router = express.Router();
const Product = require("../models/productos");
const cliente = require("../models/cliente.js");
const vendedors = require("../models/vendedor.js");
const venta = require("../models/venta.js");
const clientes = require("../models/cliente");
const mongoose = require("mongoose");
const cors = require("cors");

// Definición de rutas
router.get("/", function (req, res) {
  res.render("pages/index");
});
router.get("/login", function (req, res) {
  res.render("pages/login");
});
router.get("/signup", function (req, res) {
  res.render("pages/signup");
});

router.get("/perfilusuario", function (req, res) {
  res.render("pages/perfilusuario");
});

router.get("/carrito", async (req, res) => {
  // Recuperar productos de la base de datos.
  const listaproductos = await Product.find();
  res.render("pages/carrito", { listaproductos });
});

router.get("/", function (req, res) {
  res.render("pages/index");
});

// usar cors
router.use(cors("http:/localhost:8100"));

router.get("/product/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  res.json(product);
});

// inicio de sesion
router.get("/login", function (req, res) {
  res.render("pages/login");

  // registro
});
router.get("/signup", function (req, res) {
  res.render("pages/signup");
});

// registro producto
router.get("/listaproducto", function (req, res) {
  res.render("pages/listaproducto");
});

// registro venta
router.get("/registroventa", function (req, res) {
  res.render("pages/registroventa");
});
// pagar
router.get("/pagar", function (req, res) {
  res.render("pages/pagar");
});
router.get("/admin", function (req, res) {
  res.render("pages/admin");
});
router.post("/login", function (req, res) {
  res.render("pages/login");
});
router.get("/recovery", function (req, res) {
  res.render("pages/recovery");
});
router.post("/perfil", function (req, res) {
  res.render("pages/perfil");
});

// registro venta
router.get("/registroventa", function (req, res) {
  res.render("pages/registroventa");
});

router.get("/signupvendedor", function (req, res) {
  res.render("pages/signupvendedor");
});
// producto
// Ruta para mostrar el listado de productos
router.get("/productos", async (req, res) => {
  try {
    const productos = await products.find();
    res.render("productos.json", { productos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar los productos");
  }
});

// registro producto
router.post("/listaproducto", async (req, res) => {
  try {
    console.log(req.body.nombre);// para probar
    const productoNuevo = new prod({
      referencia: req.body.referencia,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      stock: req.body.stock,
      imagen: req.body.imagen,
      habilitado: req.body.habilitado
    });
    await productoNuevo.save();
    res.send("Producto Registrado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar el producto");
  }
});

// actualizar producto
router.put("/editarproducto/:id", async (req, res) => {
  try {
    const productoId = req.params.id;
    const productoActualizado = {
      referencia: req.body.referencia,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      stock: req.body.stock,
      imagen: req.body.imagen,
      habilitado: req.body.habilitado
    };

    // Buscar y actualizar el producto en la base de datos
    await prod.findByIdAndUpdate(productoId, productoActualizado);

    res.send("Producto actualizado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el producto");
  }
});

// eliminar producto
router.delete("/eliminarproducto", (req, res) => {
  productos.findOneAndDelete(req.params.nombre).then(doc => res.json(doc));
});

// vendedor
// registro vendedor
router.post("/signupvendedor", async (req, res) => {
  try {
    const vendedorNuevo = new vendedors({
      nombre: req.body.nombre,
      documento: req.body.documento,
      email: req.body.email,
      telefono: req.body.telefono,
      password: req.body.password,
      rol: req.body.rol
    });
    await vendedorNuevo.save();
    res.send("Vendedor Registrado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar el vendedor");
  }
});
// actualizar vendedor
router.put("/:id", (req, res) => {
  const vendedorActualizado = req.body;
  const id = req.params.id;
  const indice = vendedors.findIndex(vendedor => vendedor.id == id);
  if (indice >= 0) {
    vendedors[indice] = vendedorActualizado;
  }
  res.send(JSON.stringify(vendedors));
});

router.patch("/:id", (req, res) => {
  const vendeNuevo = req.body;
  const id = req.params.id;
  const indice = vendedors.findIndex(vendedor => vendedor.id == id);
  if (indice >= 0) {
    const vendedoramodificar = vendedors[indice];
    Object.assign(vendedoramodificar, vendeNuevo);
  }
  res.send(JSON.stringify(vendedors));
});

// delete vendedor
router.delete("/eliminarvendedor", (req, res) => {
  vendedors.findOneAndDelete(({ nombre: { $lt: new vendedors() } }), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("vendedor eliminado");
    }
  });
});

// registrocliente
router.post("/signup", async (req, res) => {
  try {
    const clienteNuevo = new cliente({
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      password: req.body.password,
      email: req.body.email,
      rol: req.body.rol,
      ubicacion: req.body.ubicacion,
      historicoComprado: req.body.historicoComprado,
      totalComprado: req.body.totalComprado
    });
    await clienteNuevo.save();
    res.send("Cliente Registrado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar el cliente");
  }
});

router.get("/signupcliente", function (req, res) {
  res.render("pages/signupcliente");
});

// editar cliente
router.put("/editarcliente/:id", async (req, res) => {
  try {
    const clienteId = req.params.id;
    const clienteActualizado = {
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      ubicacion: req.body.ubicacion,
      historicoComprado: req.body.historicoComprado,
      totalComprado: req.body.totalComprado
    };

    // Buscar y actualizar el cliente en la base de datos
    await cliente.findByIdAndUpdate(clienteId, clienteActualizado);

    res.send("Cliente actualizado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el cliente");
  }
});

// eliminar cliente
router.delete("/eliminarcliente/:id", async (req, res) => {
  try {
    const clienteId = req.params.id;

    // Buscar y eliminar el cliente en la base de datos
    await cliente.findByIdAndDelete(clienteId);

    res.send("Cliente eliminado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el cliente");
  }
});

// producto
// registro producto
router.post("/listaproductos", async (req, res) => {
  try {
    console.log(req.body.nombre);// para probar
    const productoNuevo = new prod({
      referencia: req.body.referencia,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      stock: req.body.stock,
      imagen: req.body.imagen,
      habilitado: req.body.habilitado
    });
    await productoNuevo.save();
    res.send("Producto Registrado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar el producto");
  }
});

// actualizar producto
router.put("/editarproducto/:id", async (req, res) => {
  try {
    const productoId = req.params.id;
    const productoActualizado = {
      referencia: req.body.referencia,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      stock: req.body.stock,
      imagen: req.body.imagen,
      habilitado: req.body.habilitado
    };

    // Buscar y actualizar el producto en la base de datos
    await prod.findByIdAndUpdate(productoId, productoActualizado);

    res.send("Producto actualizado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el producto");
  }
});

// eliminar producto
router.delete("/eliminarproducto", (req, res) => {
  productos.findOneAndDelete(req.params.nombre).then(doc => res.json(doc));
});

// venta
// registro venta
router.post("/registroventa", async (req, res) => {
  try {
    console.log(req.body.producto);// para probar
    const ventaNueva = new venta({
      producto: req.body.producto,
      subtotalVenta: req.body.subtotalVenta,
      fechaVenta: req.body.fechaVenta,
      totalVenta: req.body.totalVenta,
      impuesto: req.body.impuesto,
      cliente: req.body.cliente,
      vendedor: req.body.vendedor

    });
    await ventaNueva.save();
    res.send("Venta Registrado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar el producto");
  }
});

// actualizar venta
router.put("/editarventa/:id", async (req, res) => {
  try {
    const ventaId = req.params.id;
    const ventaActualizado = {
      producto: req.body.producto,
      subtotalVenta: req.body.subtotalVenta,
      fechaVenta: req.body.fechaVenta,
      totalVenta: req.body.totalVenta,
      impuesto: req.body.impuesto,
      cliente: req.body.cliente,
      vendedor: req.body.vendedor
    };

    // Buscar y actualizar la venta en la base de datos
    await prod.findByIdAndUpdate(ventaId, ventaActualizado);

    res.send("Producto actualizado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el producto");
  }
});

// eliminar producto
router.delete("/eliminarventa", (req, res) => {
  venta.findOneAndDelete(req.params.products).then(doc => res.json(doc));
});

// admin
// listausuarios
router.get("/listausuarios", async (req, res) => {
  const listausuarios = await clientes.find();
  res.render("pages/listas/listausuarios", { listausuarios });
});
router.get("/carrito", async (req, res) => {
  // Recuperar productos de la base de datos.
  const listaproductos = await Product.find();
  res.render("pages/productos", { listaproductos });
});
router.get("/listaproductos", async (req, res) => {
  // Recuperar productos de la base de datos.
  const listaproductos = await products.find();
  res.render("pages/listas/listaproductos", { listaproductos });
});

router.get("/listavendedores", async (req, res) => {
  const listavendedores = await vendedors.find();
  res.render("pages/listas/listavendedores", { listavendedores });
});

router.get("/listaventas", async (req, res) => {
  const listaventas = await venta.find();
  res.render("pages/listas/listaventas", { listaventas });
});

// Ruta para recibir los datos del carrito
const CartItem = mongoose.model("CartItem", {
  nombre: String,
  precio: Number,
  cantidad: Number
});

// Ruta para recibir y guardar el carrito en MongoDB
router.post("/api/enviarCarrito", (req, res) => {
  const carritoData = req.body;

  // Guardar los items del carrito en MongoDB
  const itemsToSave = carritoData.items.map(item => ({
    productName: item.nombre,
    price: item.precio,
    quantity: item.cantidad
  }));

  CartItem.insertMany(itemsToSave)
    .then(savedItems => {
      res.json({ message: "Carrito guardado exitosamente en MongoDB" });
    })
    .catch(error => {
      res.status(500).json({ error: "Error al guardar el carrito en MongoDB" });
    });
});

module.exports = router;
