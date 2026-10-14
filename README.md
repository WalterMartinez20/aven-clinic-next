<div align="center">
  <h1>🏥 Aven Clinic (Sanctuary Health)</h1>
  <p><em>Suite Integral y Moderna para la Gestión Clínica, Triage y Analíticas Operativas en Tiempo Real</em></p>
  
  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white" />
    <img alt="React" src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img alt="Supabase" src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  </p>
</div>

<br />

**Aven Clinic** (Sanctuary Health) es una plataforma web médica integral y de alto rendimiento diseñada para modernizar y optimizar la gestión operativa de clínicas, hospitales y centros de salud. Con una interfaz limpia, reactiva y orientada a la toma de decisiones clínicas, la aplicación centraliza el flujo de triaje, la agenda médica, el control de especialistas y la analítica operacional y financiera en tiempo real.

---

## ✨ Características Principales

- 📊 **Dashboard & Flujo Clínico en Tiempo Real:** Visualización en vivo del flujo de pacientes, gráficos dinámicos de capacidad vs. ocupación por hora/semana/mes, tiempos promedio de espera y tasa de resolución médica.
- 📅 **Gestión Integral de Citas Médicas:** Calendario interactivo con vistas de Día, Semana y Mes, filtrado por estado (*Confirmed*, *Pending*, *Completed*, *Canceled*), búsqueda predictiva y modal de detalles clínicos.
- 👥 **Directorio y Triaje de Pacientes:** Registro organizado de pacientes con código MRN, clasificación por nivel de urgencia (*Critical*, *Urgent*, *Normal*), condición médica y asignación de consultorio.
- 🩺 **Control de Especialistas y Personal:** Directorio de doctores y personal clínico por especialidad, control de asistencia semanal (*clock in/out*), horas extras, métricas de puntualidad y calificaciones de desempeño con valoraciones de pacientes.
- 📈 **Módulo Completo de Analíticas Clínicas y Financieras:**
  - **Patient Analysis:** Estado de cola en vivo (*Live Queue Status*), tiempos de atención y distribución de triaje por niveles.
  - **Employee Analysis:** Carga laboral por departamento, utilización de personal, tabla de especialistas destacados (*Elite Performers*) y métricas de cumplimiento normativo (HIPAA, BLS/ACLS).
  - **Financial Analysis:** Evolución del gasto operativo mensual, desglose por categoría de infraestructura y registro de facturas/pagos procesados con exportación a PDF.
  - **Platform Analytics:** Métricas de interacción de plataforma, uso por módulos y distribución de consultas por especialidad.
- 🏥 **Configuración y Personalización de la Clínica:** Panel de gestión de la institución con administración de logotipo/branding, especialidades médicas, horarios de operación por día y ubicación geográfica con vista de mapa.
- 🔐 **Autenticación y Seguridad Robusta:** Sistema integrado con Supabase Auth, políticas Row Level Security (RLS) y sincronización automática de perfiles mediante PostgreSQL Triggers.

---

## 🛠️ Tecnologías

Este proyecto está construido con herramientas modernas de última generación:

- **Frontend:** **[Next.js 16](https://nextjs.org/)** (App Router, Server & Client Components), **[React 19](https://react.dev/)** y **[Tailwind CSS v4](https://tailwindcss.com/)** con un sistema de tokens y componentes de alta fidelidad.
- **Lenguaje:** **[TypeScript 5](https://www.typescriptlang.org/)** para una experiencia fuertemente tipada y mantenible.
- **Backend & Base de Datos:** **[Supabase](https://supabase.com/)** (PostgreSQL, Supabase Auth, `@supabase/ssr`, triggers y funciones plpgsql).
- **Iconografía & Tipografía:** Google Material Symbols Rounded y Geist Font.
- **Despliegue:** Optimizado para la infraestructura serverless de **[Vercel](https://vercel.com/)**.

---

## 🚀 Instalación y Despliegue Local

Sigue estos pasos para levantar el proyecto en tu entorno local:

### 1. Requisitos Previos

- Node.js (versión 20 o superior recomendada).
- Una cuenta en [Supabase](https://supabase.com/).
- Git instalado en tu máquina.

### 2. Clonar el repositorio

```bash
git clone https://github.com/WalterMartinez20/aven-clinic-next.git
cd aven-clinic-next
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Configurar las Variables de Entorno

Copia el archivo de variables de entorno de ejemplo para crear el tuyo:

```bash
cp env.example .env.local
```

Abre `.env.local` e introduce las credenciales de tu proyecto de Supabase (las encuentras en **Project Settings > API** de tu panel de Supabase):

```env
NEXT_PUBLIC_SUPABASE_URL="https://tu-proyecto.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu_clave_publica_anon"
```

### 5. Configurar la Base de Datos (Supabase)

En la raíz del proyecto encontrarás el directorio `supabase/migrations/` con los scripts SQL necesarios:

1. `01_create_users_table.sql`: Crea la tabla `users` con secuencias, claves foráneas y campos de auditoría.
2. `02_auth_triggers.sql`: Configura la función y trigger para sincronizar los registros de `auth.users` con la tabla pública `users`.

Si tienes instalada la CLI de Supabase, puedes aplicar los cambios ejecutando:
```bash
supabase db push
```

Alternativamente (si no usas la CLI), abre cada archivo SQL dentro de `supabase/migrations/`, copia su contenido y ejecútalo en el **SQL Editor** de tu panel de Supabase.

### 6. Ejecutar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 👨‍💻 Autor

**Walter** - Estudiante de Ingeniería en la Universidad Gerardo Barrios (El Salvador), apasionado por la creación de arquitecturas backend robustas y aplicaciones full-stack escalables.

- [Conectar en LinkedIn](https://www.linkedin.com/in/walter-martínez-4712162b7)
- [Seguir en GitHub](https://github.com/WalterMartinez20)

---

_Este proyecto fue creado como una demostración técnica de software clínico y analíticas médicas de alto rendimiento._
