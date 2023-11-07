import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  // Obtenemos el token luego de Bearer --> "bearer token"
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (!error)
        next(); // pasamos a la siguiente función luego de autenticar al usuario
      else res.status(401).send(); // Error "Unauthorized"
    });
  } else {
    // Solicitud invalida
    res.status(400).json({ error: "No token provided." });
  }
};
