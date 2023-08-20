const express = require("express");
const app = express();
const PORT = 8100;
const cliente = require("./backend/models/cliente");
const path = require("path");
const Product = require("./backend/models/productos");
const products = require("./backend/models/productos");
const cors = require("cors");
const venta = require("./backend/models/venta.js");
const clientes = require("./backend/models/cliente");
const vendedors = require("./backend/models/vendedor");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/frontend/public")));

app.use("/", router);

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Data received");
});

app.set("view engine", "ejs");
app.set("views", path.join("frontend/views"));

// index
app.get("/", function (req, res) {
  res.render("pages/index");
});

// usar cors
app.use(cors("http:/localhost:8100"));

// Routes
app.get("/carrito", async (req, res) => {
  // Recuperar productos de la base de datos.
  const listaproductos = await Product.find();
  res.render("pages/carrito", { listaproductos });
});

app.get("/product/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  res.json(product);
});



// inicio de sesion
app.get("/login", function (req, res) {
  res.render("pages/login");

  // registro
});
app.get("/signup", function (req, res) {
  res.render("pages/signup");
});
// registro vendedor
app.get("/signupvendedor", function (req, res) {
  res.render("pages/signupvendedor");
});
// registro producto
app.get("/registroproducto", function (req, res) {
  res.render("pages/registroproducto");
});

// registro venta
app.get("/registroventa", function (req, res) {
  res.render("pages/registroventa");
});
// pagar
app.get("/pagar", function (req, res) {
  res.render("pages/pagar");
});
app.get("/admin", function (req, res) {
  res.render("pages/admin");
});
app.post("/login", function (req, res) {
  res.render("pages/login");
});
app.get("/recovery", function (req, res) {
  res.render("pages/recovery");
});
app.post("/loginadmin", function (req, res) {
  res.render("pages/loginadmin");
});
app.post("/perfil", function (req, res) {
  res.render("pages/perfil");
});

// registro venta
app.get("/registroventa", function (req, res) {
  res.render("pages/registroventa");
});

// producto
// Ruta para mostrar el listado de productos
app.get("/productos", async (req, res) => {
  try {
    const productos = await products.find();
    res.render("productos.json", { productos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar los productos");
  }
});

// registro producto
app.post("/registroproducto", async (req, res) => {
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
app.put("/editarproducto/:id", async (req, res) => {
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
app.delete("/eliminarproducto", (req, res) => {
  productos.findOneAndDelete(req.params.nombre).then(doc => res.json(doc));
});

// vendedor
// registro vendedor
app.post("/signupvendedor", async (req, res) => {
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
app.put("/:id", (req, res) => {
  const vendedorActualizado = req.body;
  const id = req.params.id;
  const indice = vendedors.findIndex(vendedor => vendedor.id == id);
  if (indice >= 0) {
    vendedors[indice] = vendedorActualizado;
  }
  res.send(JSON.stringify(vendedors));
});

app.patch("/:id", (req, res) => {
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
app.delete("/eliminarvendedor", (req, res) => {
  vendedors.findOneAndDelete(({ nombre: { $lt: new vendedors() } }), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("vendedor eliminado");
    }
  });
});

// registrocliente
app.post("/signup", async (req, res) => {
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

app.get("/signupcliente", function (req, res) {
  res.render("pages/signupcliente");
});

// editar cliente
app.put("/editarcliente/:id", async (req, res) => {
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
app.delete("/eliminarcliente/:id", async (req, res) => {
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
app.post("/registroproducto", async (req, res) => {
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
app.put("/editarproducto/:id", async (req, res) => {
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
app.delete("/eliminarproducto", (req, res) => {
  productos.findOneAndDelete(req.params.nombre).then(doc => res.json(doc));
});

// venta
// registro venta
app.post("/registroventa", async (req, res) => {
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
app.put("/editarventa/:id", async (req, res) => {
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
app.delete("/eliminarventa", (req, res) => {
  venta.findOneAndDelete(req.params.producto).then(doc => res.json(doc));
});

// admin
// listausuarios
app.get("/listausuarios", async (req, res) => {
  const listausuarios = await clientes.find();
  res.render("pages/listas/listausuarios", { listausuarios });
});

app.get("/listaproductos", async (req, res) => {
  // Recuperar productos de la base de datos.
  const listaproductos = await productos.find();
  res.render("pages/listas/listaproductos", { listaproductos });
});

app.get("/listavendedores", async (req, res) => {
  const listavendedores = await vendedors.find();
  res.render("pages/listas/listavendedores", { listavendedores });
});

app.get("/listaventas", async (req, res) => {
  const listaventas = await venta.find();
  res.render("pages/listas/listaventas", { listaventas });
});

// login







//errores

app.get('/404', function(req, res, next){
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
  next();
});

app.get('/403', function(req, res, next){
  // trigger a 403 error
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

app.get('/500', function(req, res, next){
  // trigger a generic (500) error
  next(new Error('keyboard cat!'));
});


app.use(function(req, res, next){
  res.status(404);

  res.format({
    html: function () {
      res.render('404', { url: req.url })
    },
    json: function () {
      res.json({ error: 'Not found' })
    },
    default: function () {
      res.type('txt').send('Not found')
    }
  })
});

// error-handling middleware, take the same form
// as regular middleware, however they require an
// arity of 4, aka the signature (err, req, res, next).
// when connect has an error, it will invoke ONLY error-handling
// middleware.

// If we were to next() here any remaining non-error-handling
// middleware would then be executed, or if we next(err) to
// continue passing the error, only error-handling middleware
// would remain being executed, however here
// we simply respond with an error page.

app.use(function(err, req, res, next){
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render('500', { error: err });
});


app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});


// puerto

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto:${PORT}`);
});
