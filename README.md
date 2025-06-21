
# Proyecto e-commerce API

API backend modular y escalable para un sistema de e-commerce, construida con Node.js, Express y MongoDB. Incluye autenticación JWT, control de acceso por roles, gestión de productos y carritos.

## Installation

Install my-project with npm

Clonar el repositorio:
```bash
  git clone https://github.com/FrancoUrsino/backend_2
  cd backend_2
```
Instalar dependencias: Asegúrate de tener Node.js y npm instalados. Luego, ejecuta:
```bash
  npm install
```

## 🔐 .env config 

MONGO_URI=mongodb+srv://francoursino:Fran1234@data.0v4ga.mongodb.net/?retryWrites=true&w=majority&appName=data
PORT=8080
JWT_SECRET=secretkey122333


## tecnologias usadas


Node.js
Express.js
MongoDB
Mongoose
JWT
Passport.js
Dotenv
Bcrypt
Docker
Swagger

# Proyecto Backend Dockerizado

## Documentación Swagger

[Ver documentación](http://localhost:8080/api/docs)

## Imagen de Docker

[Imagen en DockerHub](https://hub.docker.com/r/francoursino/backend-proyecto)

Para correr:

```bash
docker pull francoursino/backend-proyecto
docker run -p 8080:8080 francoursino/backend-proyecto

