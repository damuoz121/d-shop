const cliente = require("./models/cliente");

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.json({ error: "Ingresa todas las credenciales" });
    }

    const usuarioRegistrado = await cliente.findOne({ Email: email });

    if (!usuarioRegistrado) {
      return res.json({ error: "Este usuario no existe" });
    }

    // contraseña -autenticación

    // Renderizar perfil y pasar datos según el rol
    if (usuarioRegistrado.rol === "vendedor") {
      return res.render("perfil", { rol: "vendedor", usuario: usuarioRegistrado });
    } else if (usuarioRegistrado.rol === "cliente") {
      return res.render("perfil", { rol: "cliente", usuario: usuarioRegistrado });
    } else {
      return res.json({ error: "Rol desconocido" });
    }
  } catch (err) {
    return res.json({ error: "Ocurrió un error" });
  }
};
