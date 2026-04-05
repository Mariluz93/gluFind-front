# gluFind - Backend API

## Descripción

gluFind es el frontend de una aplicación web desarrollada como MVP (Minimum Viable Product) orientada a personas celíacas.

Permite a los usuarios explorar restaurantes con opciones sin gluten, consultar sus menús y guardar favoritos. Además, los restaurantes pueden gestionar su propio contenido creando y editando platos.

El objetivo a futuro es evolucionar hacia un marketplace completo de comida gluten free con funcionalidades de pedido y entrega.

---
## Deploy

- API desplegada en producción: https://glu-find-front.vercel.app/
- Backend conectado: https://glufind-back.onrender.com

## Tecnologías utilizadas

- Vite
- React
- React Router DOM
- Context API
- CSS
- Fetch API

---

## Funcionalidades

### Autenticación

- Registro (user/restaurant)
- Login
- Redirección según rol (user/restaurant)
- Persistencia de sesión mediante localStorage

---

### Navegación

- Rutas públicas y privadas
- Protección de rutas
- Control de acceso según atenticación

---

### Restaurantes

- Visualización del listado de restaurantes
- Acceso al detalle de cada restaurante
- Visualización de la información del restaurante: imagen, descripción y dirección

---

### Platos

- Visualización del listado de platos dentro del detalle de restaurante
- Filtrado de platos sin gluten

---

### Favoritos (usuario)

- Añadir restaurante a favoritos
- Eliminar restaurante de favoritos
- Ver listado de favoritos

---

### Dashboard (restaurante)

- Creación del propio restaurante
- Edición de la información del restaurante: nombre, descripción, dirección e imagen
- Visualización del restaurante
- Creación de platos
- Edición de platos
- Eliminación de platos

---

## Gestión de estado

La aplicación utiliza Context API para gestionar la autenticación:

- Almacenamiento de user y token en localStorage
- Recuperación de sesión al recargar la app
- Funciones de login y logout centralizadas

---

## Estructura del proyecto

src/
│
├── assets/
│    └──logo.png
├── components/
│   ├── DashboardDishCard.jsx
│   ├── DishCard.jsx
│   ├── DishList.jsx
│   ├── FavoriteButton.jsx
│   ├── FavoriteCard.jsx
│   ├── LoginForm.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── RegisterForm.jsx
│   ├── RestaurantCard.jsx
│   ├── RestaurantList.jsx
│   └── RoleProtectedRoutes.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Favorites.jsx
│   ├── RestaurantDetail.jsx
│   ├── RestaurantDashboard.jsx
│   ├── CreateRestaurant.jsx
│   ├── EditRestaurant.jsx
│   ├── CreateDish.jsx
│   ├── EditDish.jsx
│   ├── NotFound.jsx
│   └── Unauthorized.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── App.jsx
├── main.jsx
└── index.css

---

## Instalación en local

1. Clonar el repositorio:

git clone https://github.com/Mariluz93/gluFind-front

2. Instalar dependencias:

npm install

3. Iniciar el proyecto:

npm run dev

---

## Despliegue

El frontend ha sido desplegado con Vercel. Configuración de entorno sin necesidad de variables adicionales.

---

### Futuras mejoras

- Mejoras de diseño UI/UX
- Implementación de loadins spinner más avanzados
- Validaciones de formularios más completas
- Subida de imágenes (Cloudinary)
- Sistema de pedidos
- Carrito de la compra
- Pagos
- Reviews de usuarios
- Geolocalización/mapa

---

## Estado del proyecto

Aplicación funcional en fase MVP con frontend y backend desplegados y conectados correctamente.

---

## Autor

Proyecto desarrollado por María Luz Castro como proyecto final del bootcamp Full Stack Developer en The Bridge.