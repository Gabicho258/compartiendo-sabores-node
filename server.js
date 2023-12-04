import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";
import http from "http";
import { Server } from "socket.io";

//Importación de rutas
import {
  UserRouter,
  CommentRouter,
  RecipeRouter,
  ChatRouter,
  MessageRouter,
} from "./api/routes/index.js";

// Conexión con Mongo DB Atlas

const dbURL = process.env.DB_URL;
await mongoose
  .connect(dbURL)
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.error(error));

// Server

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});
io.on("connection", (socket) => {
  console.log("Se ha conectado un cliente");

  socket.broadcast.emit("chat_message", {
    usuario: "INFO",
    mensaje: "Se ha conectado un nuevo usuario",
  });

  socket.on("chat_message", (data) => {
    io.emit("chat_message", data);
  });
});
// Middleware

app.use(cors());
app.use(express.json());

// Routes

app.use("/api", UserRouter);
app.use("/api", CommentRouter);
app.use("/api", RecipeRouter);
app.use("/api", ChatRouter);
app.use("/api", MessageRouter);

app.use("/", (req, res) => {
  res.send("Welcome to 'Compartiendo Sabores' :)");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
