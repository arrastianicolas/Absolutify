const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const spotifyRoutes = require("./routes/spotifyRoutes");
const spotifyController = require("./controllers/spotifyController");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Permite el envío de cookies
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
// Rutas básicas
app.get("/", (req, res) => {
  res.send("¡El servidor está corriendo!");
});
app.post("/logout", (req, res) => {
  res.clearCookie("spotifyAccessToken", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.clearCookie("spotifyRefreshToken", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Logout exitoso" });
});

// Rutas
app.use("/spotify", spotifyRoutes);

app.get("/absolutify", spotifyController.callback);
app.get("/search", spotifyController.searchTracks);
app.get("/me", spotifyController.meUsers);

// //Test de base de datos
// const pool = require("./config/db.js");

// app.get("/test-db", async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT 1 + 1 AS solution");
//     res.send(`Conexión exitosa. Resultado: ${rows[0].solution}`);
//   } catch (err) {
//     res.status(500).send("Error al conectar a la base de datos");
//     console.error(err);
//   }
// });

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
