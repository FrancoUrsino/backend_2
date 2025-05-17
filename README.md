
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


## Estructura 

backend_2/
│
├── public/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── passport.js
│   ├── controllers/
│   │   ├── cart.controller.js
│   │   └── sessions.controller.js
│   ├── managers/
│   │   ├── cart.manager.js
│   │   └── product.manager.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   ├── models/
│   │   ├── cart.model.js
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── cart.router.js
│   │   ├── checkout.router.js
│   │   ├── product.router.js
│   │   ├── sessions.router.js
│   │   ├── user.router.js
│   │   └── view.router.js
│   ├── services/
│   │   └── cart.service.js
│   ├── utils/
│   │   ├── cookieExtractor.js
│   │   ├── hash.js
│   │   └── validators.js
│   └── app.js
├── .env
├── .gitignore
├── server.js
├── package-lock.json
├── package.json
└── README.md



## tecnologias usadas


Node.js
Express.js
MongoDB
Mongoose
JWT
Passport.js
Dotenv
Bcrypt
