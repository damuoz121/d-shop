const express = require("express");
const app = express();
const PORT = 8100;
const path = require("path");
const router = require("./backend/routes/routes");

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

// puerto

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto:${PORT}`);
});
