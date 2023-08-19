const express = require("express");
const router = express.Router();
const controller = require("./cliente.controller");

router.get("/login", controller.showLoginForm);

// Procesar inicio de sesión
router.post("/login", controller.login);
