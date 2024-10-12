# 📊 Prueba Técnica - API de Gestión de Proyectos y Tareas

### Descripción
Este proyecto es una **API basada en Node.js** utilizando **Express** como framework de servidor y **Axios** para las solicitudes HTTP en el front-end. La API permite la gestión de proyectos y tareas, con operaciones en tiempo real como la creación, actualización y eliminación.

### Tabla de Contenidos
1. [Modelo de Datos](#modelo-de-datos)
2. [Endpoints de la API](#endpoints-de-la-api)
3. [Lógica de Negocio](#lógica-de-negocio)
4. [Características Clave](#características-clave)
5. [Demo](#demo)
6. [Instrucciones de Configuración](#instrucciones-de-configuración)

---

## 1. 📦 Modelo de Datos

Los siguientes modelos de datos se utilizan en esta API:

### 🧑‍💻 **Usuario**
- `id` (int): Identificador único.
- `nombre` (VARCHAR): Nombre del usuario.
- `email` (VARCHAR): Dirección de correo electrónico.
- `contraseña` (VARCHAR): Contraseña almacenada de forma segura.
- `rol` ENUM('admin', 'usuario') DEFAULT 'usuario'

### 🗂️ **Proyecto**
- `id` (int): Identificador único.
- `nombre` (VARCHAR): Nombre del proyecto.
- `descripción` (TEXT): Descripción del proyecto.
- `fecha_inicio` (DATE): Fecha de inicio del proyecto.
- `fecha_finalización` (DATE): Fecha de finalización del proyecto.
- `usuario_id` (INT): ID del usuario responsable del proyecto.

### ✅ **Tarea**
- `id` (INT): Identificador único.
- `nombre` (VARCHAR): Nombre de la tarea.
- `descripción` (TEXT): Descripción de la tarea.
- `estado` (ENUM): Estado de la tarea (`pendiente`, `en progreso`, `completada`).
- `proyecto_id` (INT): ID del proyecto asociado.
- `asignada_a` (INT): ID del usuario asignado a la tarea.

---

## 2. 🔗 Endpoints de la API

### 📁 **Proyectos**
- `GET /projects`: Obtener todos los proyectos.
- `GET /projects/{id}`: Obtener un proyecto específico.
- `POST /projects`: Crear un nuevo proyecto.
- `PUT /projects/{id}`: Actualizar un proyecto existente.
- `DELETE /projects/{id}`: Eliminar un proyecto (con eliminación en cascada de todas las tareas asociadas).

### 📝 **Tareas**
- `POST /tasks`: Crear una nueva tarea.
- `PATCH /tasks/{id}`: Actualizar el estado de una tarea.
- `GET /tasks?project_id={id}`: Obtener tareas filtradas por proyecto.

---

## 3. 🧠 Lógica de Negocio

### Gestión de Estado de las Tareas
- Las tareas se crean con un estado inicial (`pendiente`), y las transiciones de estado (como `en progreso` o `completada`) se manejan correctamente.
- Se simulan notificaciones (a través de la consola o la respuesta de la API) cuando las tareas son asignadas o actualizadas.

---

## 4. ✨ Características Clave

- **Actualizaciones en tiempo real**: Los cambios en proyectos y tareas se manejan en tiempo real, asegurando actualizaciones inmediatas y fluidas.
- **Eliminación en cascada**: Al eliminar un proyecto, todas las tareas asociadas se eliminan automáticamente.
- **Consistencia de datos**: Se gestiona correctamente el ciclo de vida y los cambios de estado de las tareas.

---

## 5. 🎥 Demo

Puedes ver la funcionalidad en tiempo real en el siguiente **demo**:

### 📸 Capturas de Pantalla
- Inicio: <br>
<img src='https://github.com/user-attachments/assets/90f39e35-6fbb-4866-8bf5-5678c69694fd' width=600><br>
- Lista de proyectos y creación de estes con sus tareas: <br>
<img src='https://github.com/user-attachments/assets/e71a9dc3-0ea5-4be6-be11-005c59150420' width=600><br>
- Tareas y detalles del proyecto seleccionado: <br>
<img src='https://github.com/user-attachments/assets/28edadc2-5b0e-4791-be82-a9f8e4730694' width=600><br>

- Responsive: <br>
<img src='https://github.com/user-attachments/assets/2e75eeab-c271-43f8-b63b-845e4e6a6184' width=200>
<img src='https://github.com/user-attachments/assets/89670f98-e3a7-4fb3-ab87-fe211009e040' width=200>
<img src='https://github.com/user-attachments/assets/a0e8b6b1-9ecb-45b6-b641-b167cfaff6ec' width=200>


### 📹 Video Demo
- [Mira el video demo]()
<a href="https://youtu.be/q39eyvShLXw">
  <img src="https://github.com/user-attachments/assets/90f39e35-6fbb-4866-8bf5-5678c69694fd" width="600">
</a>

---

## 6. 🚀 Instrucciones de Configuración

Para ejecutar este proyecto localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-repo/prueba-tecnica.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   npm install express
   npm instal axios
   npm install mysql2
   npm install --save sweetalert2 sweetalert2-react-content y npm install sweetalert2
   ```
3. Configura la base de datos:
   - Ejecuta los scripts SQL que se encuentran en la carpeta `/db` para crear las tablas necesarias.
4. Inicia el servidor y el backend:
   ```bash
   npm start
   node server.js
   ```
5. Accede a la API en `http://localhost:3000`.

---

### Notas:
- Aunque no se implementó completamente un sistema de inicio de sesión, el modelo de datos de usuario está diseñado para soportar permisos basados en roles.
- Al eliminar un proyecto, todas las tareas asociadas se eliminan automáticamente en tiempo real.
  

## :computer: Desarrollado por: :computer:
| [<img src="https://user-images.githubusercontent.com/104279565/209356707-1a7b8815-ff11-42dd-bdc2-8bc90fb27ea9.png" width=130><br>Andrea Mejia<br><sub>Game and Front End Developer</sub>](https://linkedin.com/in/andrea-mejia95/) | 

