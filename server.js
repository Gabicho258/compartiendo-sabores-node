import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

//Importación de rutas
import { UserRouter, CommentRouter, RecipeRouter } from "./api/routes/index.js";

// Conexión con Mongo DB Atlas

const dbURL = process.env.DB_URL;
await mongoose
  .connect(dbURL)
  .then(() => console.log("Conectado"))
  .catch((error) => console.error(error));

mongoose.connection.on("error", (error) => console.log("Error:" + error));
mongoose.connection.on("connected", (error) =>
  console.log("Base de datos conectada")
);

// Server

const app = express();

// Middleware

app.use(cors());
app.use(express.json());

// Routes

app.use("/api", UserRouter);
app.use("/api", CommentRouter);
app.use("/api", RecipeRouter);

app.use("/", (req, res) => {
  res.send("Welcome to 'Compartiendo Sabores' :)");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
