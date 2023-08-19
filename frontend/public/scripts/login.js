const cliente = require("../../../backend/models/cliente");
exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.json({ error: "Ingresa todas las credenciales" });
    }
    const usuarioRegistrado = await cliente.findOne({ Email: email });
    console.log(usuarioRegistrado);
    if (!usuarioRegistrado) {
      return res.json({ error: "este usuario no existe" });
    }
    res.cookie();
    return res.render("perfil", { rol: usuarioRegistrado.rol });
  } catch (err) {
    return res.json({ error: " es el catch+ err" });
  }
};
