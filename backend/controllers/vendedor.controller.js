import router from "../routes/routes";

router.get("/vendedores", async (req, res) => {
  const listavendedores = await vendedor.find({});
  res.render("lista", {
    vendedor: listavendedores
  });
}
);

router.post("/vendedorNuevo", async (req, res) => {
  const nuevoVendedor = new vendedor({
    id: req.body.id,
    name: req.body.name,
    edad: req.body.edad
  });
  await nuevoVendedor.save();
  res.send("Registrado exitosamente");
});
