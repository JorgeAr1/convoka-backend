# 🕊️ Convoka - Backend

**Convoka** es una plataforma web diseñada para iglesias cristianas, enfocada en la gestión de eventos, registro de asistentes, control de pagos, check-in por QR y mucho más.

Este repositorio contiene el backend desarrollado con **NestJS**, **Prisma** como ORM y **PostgreSQL** como base de datos (usando [Neon](https://neon.tech) en la nube).

---

## 🚀 Tecnologías principales

- [NestJS](https://nestjs.com/) - Framework backend modular y escalable
- [Prisma ORM](https://www.prisma.io/) - ORM para TypeScript moderno
- [PostgreSQL](https://www.postgresql.org/) - Base de datos relacional
- [Neon](https://neon.tech/) - PostgreSQL serverless
- [Swagger](https://swagger.io/tools/swagger-ui/) - Documentación interactiva de la API REST

---

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/convoka-backend.git
cd convoka-backend
npm install
```

---

## ⚙️ Configuración

Copia el archivo `.env.example` y crea tu propio `.env`:

```bash
cp .env.example .env
```

Edita `.env` con la conexión a tu base de datos (por ejemplo, Neon):

```
DATABASE_URL="postgresql://usuario:contraseña@tu-host-db/db-name"
```

---

## 🛠️ Migraciones y Seed

### Ejecutar migración inicial
```bash
npx prisma migrate dev --name init
```

### Ejecutar seed
```bash
npx prisma db seed
```

> Asegúrate de tener configurado en tu `package.json`:
```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

---

## 🧪 Ejecutar en desarrollo

```bash
npm run start:dev
```

API disponible en: [http://localhost:3000](http://localhost:3000)

---

## 📖 Documentación Swagger

Una vez en ejecución, accede a:

[http://localhost:3000/api](http://localhost:3000/api)

---

## 🔐 Estructura inicial de módulos

- `auth`: Autenticación y registro de usuarios
- `organization`: Gestión de organizaciones
- `event`: Gestión de eventos
- `user`: Gestión de usuarios
- `attendance`: Registro de asistentes
- `family`: Relaciones familiares entre personas

---

## 🚀 Características principales (Versión Alpha)

- **Autenticación JWT** con control de roles
- **Gestión de organizaciones** y usuarios con diferentes roles por organización
- **Módulo de invitaciones** por correo electrónico, con verificación automática y expiración
- **Creación y gestión de eventos** con ubicaciones dinámicas
- **Registro de asistentes** con posibilidad de crear personas nuevas o seleccionar existentes
- **Soporte para información adicional dinámica por evento**
- **Relaciones familiares** entre personas (padres, tutores, etc.)
- **Restricciones por evento** (ej. menores deben tener un tutor)
- **Validaciones de relaciones requeridas antes del registro**
- **Módulo cron para invalidar invitaciones vencidas**

---

## 📈 Planes

Convoka está diseñado para escalar con distintos planes:

| Plan         | Ubicaciones | Eventos       | Usuarios     | Soporte      |
|--------------|-------------|----------------|--------------|--------------|
| Gratuito     | 1           | hasta 3        | 3            | Básico       |
| Iglesia      | 1           | ilimitados     | hasta 10     | Medio        |
| Premium      | Ilimitadas  | ilimitados     | Ilimitados   | Prioritario  |

---

## ✨ Futuras funcionalidades

- Check-in por QR
- Auto-registro de asistentes
- Campos dinámicos en eventos y asistentes
- Exportación de reportes
- Notificaciones

---

## 🙌 Créditos

Desarrollado con ❤️ por Jorge Luis Arreygue Avila.

---

## 🛡️ Licencia

MIT License
