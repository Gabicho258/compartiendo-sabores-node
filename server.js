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
// socket io
const list_users = {};
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});
io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("register", (nickname) => {
    if (list_users[nickname]) {
      socket.emit("userExists");
      return;
    } else {
      list_users[nickname] = socket.id;
      socket.nickname = nickname;
      socket.emit("login");
      io.emit("activeSessions", list_users);
    }
  });

  socket.on("disconnect", () => {
    delete list_users[socket.nickname];
    io.emit("activeSessions", list_users);
  });

  socket.on("sendMessage", ({ message, image }) => {
    io.emit("sendMessage", { message, user: socket.nickname, image });
  });

  socket.on("sendMessagesPrivate", ({ message, image, selectUser }) => {
    if (list_users[selectUser]) {
      io.to(list_users[selectUser]).emit("sendMessage", {
        message,
        user: socket.nickname,
        image,
      });
      io.to(list_users[socket.nickname]).emit("sendMessage", {
        message,
        user: socket.nickname,
        image,
      });
    } else {
      console.log(
        "El usuario al que intentas enviar el mensaje no está conectado o no existe!"
      );
    }
  });
});
//////////////////////
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
