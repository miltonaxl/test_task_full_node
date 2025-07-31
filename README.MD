# Documentación de la Aplicación test-cpocket

Este documento proporciona una guía completa para entender, configurar y ejecutar la aplicación `test-cpocket`, que consta de un backend desarrollado con Node.js, Express y TypeScript, y un frontend construido con Next.js y React. También se detalla la estructura del proyecto, los endpoints de la API y cómo acceder a la documentación de Swagger.

## 1. Estructura del Proyecto

El proyecto `test-cpocket` está organizado en dos directorios principales:

- `backend/`: Contiene todo el código y la configuración del servidor API.
- `frontend/`: Contiene todo el código y la configuración de la interfaz de usuario.

```
test-cpocket/
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── data-source.ts
│   │   ├── main.ts
│   │   ├── migrations/
│   │   ├── modules/
│   │   │   └── task/
│   │   │       ├── dtos/
│   │   │       ├── task.controller.ts
│   │   │       ├── task.entity.ts
│   │   │       ├── task.repository.ts
│   │   │       ├── task.routes.ts
│   │   │       └── task.service.ts
│   │   └── swagger.ts
│   ├── docker-compose.yml
│   ├── ormconfig.ts
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
└── frontend/
    ├── app/
    ├── components/
    ├── components.json
    ├── hooks/
    ├── lib/
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.mjs
    ├── public/
    ├── styles/
    ├── tsconfig.json
    └── yarn.lock
```

## 2. Backend

El backend de la aplicación es una API RESTful desarrollada con Node.js, Express y TypeScript. Utiliza TypeORM para la interacción con la base de datos MySQL y `swagger-jsdoc` junto con `swagger-ui-express` para la documentación automática de la API.

### 2.1. Tecnologías Utilizadas

- **Lenguaje:** TypeScript
- **Entorno de Ejecución:** Node.js
- **Framework Web:** Express.js
- **ORM:** TypeORM
- **Base de Datos:** MySQL (gestionada con Docker Compose)
- **Validación:** `class-validator` y `class-transformer`
- **Documentación API:** Swagger (a través de `swagger-jsdoc` y `swagger-ui-express`)
- **Variables de Entorno:** `dotenv`

### 2.2. Cómo Levantar y Ejecutar el Backend

Para levantar y ejecutar el backend, siga los siguientes pasos:

1.  **Navegar al directorio del Backend:**

    ```bash
    cd test-cpocket/backend
    ```

2.  **Configurar Variables de Entorno:**
    Cree un archivo `.env` en el directorio `backend` con las siguientes variables de entorno para la conexión a la base de datos y la configuración del servidor. Puede usar el `docker-compose.yml` como referencia para los nombres de las variables.

    Ejemplo de `.env`:

    ```
    PORT=3000
    API_VERSION=/api/v1

    # Configuración de la Base de Datos MySQL
    MYSQL_HOST=db
    MYSQL_PORT=3306
    MYSQL_USER=root
    MYSQL_PASSWORD=root_password
    MYSQL_DATABASE=test_cpocket_db
    ```

    **Nota:** Asegúrese de que `MYSQL_HOST` sea `db` si está utilizando Docker Compose, ya que `db` es el nombre del servicio de la base de datos en el archivo `docker-compose.yml`.

3.  **Levantar la Base de Datos MySQL con Docker Compose:**
    Asegúrese de tener Docker y Docker Compose instalados en su sistema. Desde el directorio `backend`, ejecute el siguiente comando para iniciar el contenedor de la base de datos MySQL:

    ```bash
    docker-compose up -d
    ```

    Este comando iniciará un contenedor MySQL en segundo plano (`-d` para modo detached). Los datos de la base de datos se persistirán en un volumen llamado `mysql-data`.

4.  **Instalar Dependencias del Backend:**
    Una vez que la base de datos esté levantada, instale las dependencias del proyecto Node.js:

    ```bash
    npm install
    ```

5.  **Ejecutar Migraciones de Base de Datos (Opcional, primera vez o cambios en el esquema):**
    Si es la primera vez que ejecuta la aplicación o si ha habido cambios en el esquema de la base de datos, debe ejecutar las migraciones para crear las tablas necesarias. El proyecto ya tiene una migración inicial (`Init`).

    ```bash
    npm run migration:run
    ```

6.  **Iniciar el Servidor Backend:**
    Una vez que las dependencias estén instaladas y las migraciones ejecutadas (si aplica), puede iniciar el servidor backend. Asegúrese de que la base de datos MySQL esté en funcionamiento antes de iniciar el servidor.

    - **Modo Desarrollo (con `ts-node-dev` para reinicio automático):**

      ```bash
      npm run dev
      ```

      Este comando es ideal para el desarrollo, ya que el servidor se reiniciará automáticamente cada vez que se detecten cambios en los archivos fuente.

    - **Modo Producción (ejecución de la aplicación compilada):**
      ```bash
      npm start
      ```
      Este comando ejecuta la aplicación compilada y es el recomendado para entornos de producción.

    El servidor se iniciará en `http://localhost:3000/api/v1` (o el puerto y versión de API que configure en su `.env`).

### 2.3. Endpoints de la API

El backend expone los siguientes endpoints para la gestión de tareas, bajo el prefijo `/api/v1`:

#### `GET /api/v1/tasks`

- **Descripción:** Obtiene una lista de todas las tareas existentes.
- **Respuestas:**

  - `200 OK`: Retorna un array de objetos `Task`.

  ```json
  [
    {
      "id": "a1b2c3d4",
      "name": "Comprar pan",
      "description": "Ir a la tienda y comprar pan para el desayuno",
      "createdAt": "2025-07-31T12:34:56.789Z",
      "updatedAt": "2025-07-31T12:34:56.789Z"
    }
  ]
  ```

#### `POST /api/v1/tasks`

- **Descripción:** Crea una nueva tarea.
- **Cuerpo de la Solicitud (Request Body):** `application/json` con un objeto `CreateTaskDto`.
  ```json
  {
    "name": "Leer un libro",
    "description": "Leer 30 páginas del libro de historia"
  }
  ```
- **Respuestas:**

  - `200 OK`: Retorna el objeto `Task` recién creado.

  ```json
  {
    "id": "e5f6g7h8",
    "name": "Leer un libro",
    "description": "Leer 30 páginas del libro de historia",
    "createdAt": "2025-07-31T12:34:56.789Z",
    "updatedAt": "2025-07-31T12:34:56.789Z"
  }
  ```

### 2.4. Documentación de Swagger

El backend incluye documentación interactiva de la API generada automáticamente con Swagger UI. Puede acceder a ella una vez que el servidor backend esté en funcionamiento.

- **URL de Swagger UI:** `http://localhost:3000/api-docs` (o el puerto configurado en su `.env`)

Desde esta interfaz, podrá ver todos los endpoints disponibles, sus descripciones, los modelos de datos (`schemas`) y probar las solicitudes directamente desde el navegador.

## 3. Frontend

El frontend de la aplicación es una interfaz de usuario moderna y reactiva construida con Next.js y React.

### 3.1. Tecnologías Utilizadas

- **Framework:** Next.js
- **Librería UI:** React
- **Estilos:** Tailwind CSS
- **Componentes UI:** Radix UI, Shadcn/ui
- **Validación de Formularios:** React Hook Form, Zod

### 3.2. Cómo Levantar y Ejecutar el Frontend

Para levantar y ejecutar el frontend, siga los siguientes pasos:

1.  **Navegar al directorio del Frontend:**

    ```bash
    cd test-cpocket/frontend
    ```

2.  **Instalar Dependencias del Frontend:**

    ```bash
    npm install
    ```

3.  **Iniciar el Servidor de Desarrollo del Frontend:**

    ```bash
    npm run dev
    ```

    Este comando iniciará el servidor de desarrollo de Next.js. El frontend se iniciará en `http://localhost:3001` (o el puerto por defecto de Next.js si no hay conflictos). Asegúrese de que el backend esté corriendo y accesible para que el frontend pueda comunicarse con la API.

## 4. Conclusión

Esta documentación ha cubierto los aspectos clave para la configuración y ejecución de la aplicación `test-cpocket`, incluyendo su estructura, las tecnologías utilizadas en el backend y frontend, los endpoints de la API y el acceso a la documentación de Swagger. Siguiendo estos pasos, debería poder poner en marcha la aplicación y entender su funcionamiento básico.
