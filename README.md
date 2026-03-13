# cobranzas




Aquí tienes la propuesta transformada en una **Guía de Contribución y Flujo de Trabajo** ideal para tu `README.md` o un archivo `CONTRIBUTING.md`. 

He eliminado el tono de "reunión", lo he estructurado como un estándar de ingeniería profesional y le he añadido formato avanzado (como checklists y diagramas) para que tu equipo lo adopte fácilmente.

***

Copia y pega el siguiente código en tu repositorio:

```markdown
# 🛠️ Guía de Desarrollo y Flujo de Trabajo del Equipo

Esta guía define el estándar de trabajo de nuestro equipo para la creación de nuevas funcionalidades. Nuestro objetivo principal es **evitar la fricción entre Frontend y Backend**, garantizando que los contratos de comunicación sean claros, estables y definidos antes de escribir la primera línea de código.

---

## 🚀 El Paso a Paso (Flujo de Trabajo Obligatorio)

Antes de iniciar cualquier nueva funcionalidad (Feature), el equipo debe seguir estrictamente este orden:

1. 🧠 **Modelar el Dominio:** Definir qué entidades participan y qué atributos tienen.
2. 🤝 **Definir el Contrato de la API (API-First):** Acordar el JSON de entrada y salida entre Front y Back.
3. 🗄️ **Diseñar la Base de Datos:** Estructurar las tablas necesarias en base al dominio.
4. ⚙️ **Implementar Backend:** Desarrollar la lógica respetando el contrato acordado.
5. 🎨 **Implementar Frontend:** Construir las vistas consumiendo el contrato establecido.

---

## 📖 1. Lenguaje Ubicuo (Vocabulario Único)

Para evitar confusiones en el código, bases de datos y conversaciones, utilizamos un único nombre para cada concepto del negocio. **Están prohibidos los sinónimos**.

| Concepto en el Mundo Real | Nombre Oficial en el Código | Nombres Prohibidos (No usar) |
| :--- | :--- | :--- |
| Empresa cliente del SaaS | `Tenant` | Empresa, Compañía, Cliente |
| Persona que usa el sistema | `Usuario` | Empleado, User, Trabajador |
| Nivel de suscripción | `PlanServicio` | Plan, Suscripción, Nivel |
| Deuda a cobrar | `Prestamo` | Crédito, Deuda, Cuenta |

---

## 🤝 2. Enfoque "API-First" (El Contrato Manda)

El contrato de la API es la **única fuente de verdad** para la comunicación entre Frontend y Backend. 
* No se programa ni en Front ni en Back hasta que el JSON de la petición y la respuesta esté documentado y acordado.
* Idealmente, el contrato debe registrarse en **Swagger / OpenAPI**.

**Ejemplo de Contrato Acordado (`POST /api/tenants`):**
```json
{
  "nombreTenant": "Empresa ACME",
  "subdominio": "acme",
  "email": "admin@acme.com",
  "telefono": "3001234567",
  "planServicio": "BASICO"
}
```

---

## 🏗️ 3. Reglas de Arquitectura

### Para el Backend: Separación de Responsabilidades
Para que los cambios en la Base de Datos no rompan la API (o viceversa), es obligatorio separar la capa de transporte de la capa de persistencia:

* **DTO (Data Transfer Object):** Define exactamente lo que recibe y devuelve la API.
* **Entity / Model:** Define exactamente cómo se guarda en la base de datos.

**Flujo Backend:**
`Controlador (Recibe DTO)` ➡️ `Servicio (Lógica)` ➡️ `Repositorio (Guarda Entity)`

### Para el Frontend: Uso de Mappers
El estado interno de los formularios en UI no debe estar acoplado directamente al payload de la API. Se deben usar funciones de mapeo antes de enviar los datos.

Si el backend cambia, **solo se modifica el mapper, no todo el componente**.

```javascript
// Ejemplo de Mapper en Frontend
export const toTenantPayload = (formData) => {
  return {
    nombreTenant: formData.nombreEmpresaUI, // Desacoplamos la vista de la API
    email: formData.email,
    subdominio: formData.subdominio.toLowerCase(),
    telefono: formData.telefono,
    planServicio: "BASICO" // Valor por defecto gestionado en el mapper
  };
};
```

---

## 📚 4. Documentación Viva

El repositorio mantendrá una carpeta `docs/` en la raíz con la documentación técnica mínima pero suficiente:

```text
📁 docs/
 ├── 📄 api.md         # Endpoints, métodos y ejemplos de JSON
 ├── 📄 domain.md      # Diagramas de clases o relaciones del negocio
 └── 📄 database.md    # Esquema de base de datos
```

*Los diagramas pueden hacerse en UML simple, Mermaid o incluso viñetas de Markdown, pero deben existir antes de programar.*

---

## ✅ 5. Checklist para Pull Requests (Merge)

Antes de fusionar código a la rama principal, asegúrate de cumplir con lo siguiente:

- [ ] ¿El vocabulario usado en las variables respeta el "Lenguaje Ubicuo"?
- [ ] ¿Si hubo un cambio en la API, fue validado tanto por el dev Frontend como Backend?
- [ ] Backend: ¿Están separados los DTOs de las Entidades de DB?
- [ ] Frontend: ¿Se están utilizando Mappers para comunicarse con la API?
- [ ] ¿Se actualizó la carpeta `docs/` con los nuevos endpoints/modelos?
```

### 💡 Por qué esta versión es mejor:
1. **Tiene un "Checklist":** Hace que el proceso sea procesable. Cuando alguien hace un PR (Pull Request), puede marcar esas casillas.
2. **Es autoritaria pero colaborativa:** Palabras como *"Fuente de verdad"* o *"Están prohibidos los sinónimos"* evitan ambigüedades en el equipo.
3. **Formatos visuales:** Usa tablas y bloques de código limpios que GitHub/GitLab/Bitbucket renderizan perfectamente de forma nativa.
4. **Escalable:** Si mañana integran QA o DevOps, se pueden añadir pasos al flujo sin romper la estructura.

---

## 🎨 Diseño en Figma  
[Figma Project](https://www.figma.com/design/vL2vTcdrXw8leNFWbbP5pj/Untitled?t=IUTGUjYwjzGPReWQ-0)

---

```markdown
# 🚀 Cómo levantar el proyecto

Este proyecto cuenta con un **Backend (Spring Boot)** y un **Frontend (React/Vite + Storybook)**. 

---

## 🖥️ Backend - Spring Boot (Maven)

### ✅ 1. Instalar dependencias y compilar

Después de clonar el proyecto o hacer `git pull`, abre tu terminal en la carpeta del backend y ejecuta:

```bash
mvn clean install
```

**¿Qué hace esto?**
- Descarga todas las dependencias definidas en el `pom.xml`.
- Compila el proyecto.
- Ejecuta los tests automáticos.
- Genera el archivo compilado `.jar`.

### ▶️ 2. Arrancar el servidor

Para levantar el entorno local (específicamente en Linux como Arch / Nobara usando Java 21), ejecuta el siguiente comando:

```bash
JAVA_HOME=/usr/lib/jvm/java-21-openjdk mvn spring-boot:run -DskipTests
```

**🔎 ¿Por qué usamos `-DskipTests`?**
Porque evita ejecutar los tests al iniciar, lo que hace que el arranque sea **mucho más rápido**. Es el comando ideal para nuestro día a día en desarrollo.

> ⚠️ **Nota:** Antes de hacer commit o subir cambios importantes al repositorio, te recomendamos correr `mvn clean install` (sin el flag de saltar tests) para asegurarnos de que todo compila bien y ninguna prueba ha fallado.

---

## 🎨 Frontend - React (Vite)

### ✅ 1. Actualizar dependencias (Después de cada `git pull`)

**Siempre** que bajes cambios del repositorio (`git pull`), asegúrate de ejecutar:

```bash
npm i
```
Esto asegura que todas las librerías estén sincronizadas y te evitará errores extraños por dependencias faltantes.

### ▶️ 2. Arrancar el proyecto

Para levantar el frontend en modo desarrollo, simplemente ejecuta:

```bash
npm run dev
```

### 📚 3. Storybook (Desarrollo de componentes)

Para trabajar en la UI de forma aislada, abre **otra terminal** y ejecuta:

```bash
npm run storybook
```

**Beneficios de usar Storybook:**
- Puedes visualizar y construir componentes individualmente.
- Te permite probar todos los estados de un componente.
- Puedes avanzar en la UI **sin depender de que el backend esté levantado**.

---

## 🧠 Flujo de trabajo rápido recomendado para Frontend

Para resumir, cada vez que comiences a trabajar o actualices tu rama local, este debería ser tu flujo en la terminal del frontend:

```bash
git pull
npm i
npm run dev
```

Y si vas a modificar o crear componentes, abre una **segunda pestaña en tu terminal** y corre:

```bash
npm run storybook
```
```
```


# 🏗️ Arquitectura del Backend (Spring Boot)

Para este proyecto usamos una arquitectura de capas, similar a la usada en Node.js (Express/Sequelize), pero adaptada a los estándares de Java.


# 💥 PROPUESTA DE VALOR DEL MVP (EL BOOM DEL PROYECTO)

Este MVP existe por una razón principal:

👉 **Eliminar completamente el uso de tarjetones físicos del cobrador.**

Hoy muchos prestamistas cargan cientos de tarjetas de clientes en el bolso, lo que genera:

- desorden
- pérdida de información
- errores de cálculo
- riesgo de robo o daño físico
- lentitud operativa
- cero control financiero real

🎯 Este sistema convierte todo ese control manual en digital, simple y rápido.

**Muchos prestamistas pagarían solo por no cargar 500 tarjetas físicas.**

Ese es el problema real que resolvemos.

Todo el MVP gira alrededor de reemplazar el tarjetón físico por un control digital confiable.

---

# 🧱 Arquitectura MVP SIMPLE

El objetivo es validar negocio lo más rápido posible, sin complejidad técnica innecesaria.


# 🎯 Qué valida este MVP

- si los prestamistas lo usan realmente
- si pagarían por el sistema
- cómo es el flujo real de cobro diario
- qué funcionalidades faltan
- modelo de precios viable

Validar esto es más importante que cualquier arquitectura compleja.

---


---

# 🚀 FEATURES SENCILLAS (MVP REALISTA)

El objetivo del MVP es reemplazar completamente el tarjetón físico del cobrador con una solución digital simple, rápida y funcional en campo.

---

## 🪪 1. Registro rápido de clientes
Crear cliente en menos de 30 segundos con:

- nombre
- teléfono
- dirección
- foto (opcional)
- monto prestado
- valor cuota diaria
- fecha inicio

---

## 💸 2. Registro de pagos en un toque
Botones grandes:

✔ PAGÓ HOY  
✔ NO PAGÓ  

El sistema automáticamente:

- descuenta cuota
- actualiza saldo
- guarda fecha

Optimizado para uso rápido en calle.

---

## 📅 3. Lista de cobro del día
Pantalla principal del sistema.

Muestra:

- clientes que deben pagar hoy
- orden manual o por zona
- estado rápido del cliente

---

## 🧾 4. Historial simple por cliente
Vista tipo tarjeta:

- monto original
- total pagado
- saldo actual
- días de atraso
- historial de pagos

---

## 📊 5. Resumen financiero diario
Control básico del dinero:

- total cobrado hoy
- total prestado hoy
- efectivo disponible

---

## 🛑 6. FUNCIONAMIENTO SIN INTERNET (CRÍTICO — OBLIGATORIO)

El sistema debe funcionar sin conexión.

Todos los datos deben almacenarse localmente en el dispositivo.

Sin esto el sistema no es usable en campo.

Esto NO es opcional.

---

## 💾 7. Backup de información
Generar copia de seguridad manual para evitar pérdida de datos.

---

## 🔎 8. Búsqueda instantánea de clientes (MUY IMPORTANTE)

El cobrador debe encontrar cualquier cliente en segundos.

Buscar por nombre → resultado inmediato.

Con cientos de clientes esto es esencial para operar rápido.

---

# 🧠 Objetivo funcional del MVP

Digitalizar completamente el control manual del préstamo diario y eliminar el uso de tarjetas físicas.

Experiencia ultra simple para el cobrador.

---

# 🗺️ Roadmap de desarrollo

## Fase 1 — MVP funcional
- CRUD clientes
- registro de pagos
- resumen diario
- deploy servidor

VALIDAR USUARIOS REALES

---

## Fase 2 — mejoras operativas
- exportar datos
- recordatorios automáticos
- roles usuarios
- reportes

---

# 🧠 NOTA DE ARQUITECTURA — ¿CUÁNDO IMPLEMENTAR REDUX?

El MVP debe comenzar con estado simple (Context API o estado local).

Redux se introduce SOLO cuando el estado global se vuelve difícil de manejar.

## Señales claras de que necesitas Redux

Implementarlo cuando observemos:

✔ muchos componentes comparten el mismo estado  
✔ prop drilling profundo (props pasando por muchos niveles)  
✔ lógica de estado duplicada  
✔ dificultad para sincronizar datos entre pantallas  
✔ múltiples acciones modifican el mismo estado global  
✔ debugging del estado se vuelve confuso  

## Momento ideal dentro del desarrollo

1. primero construyes funcionalidades del MVP
2. validas flujos reales de uso
3. detectas complejidad del estado
4. refactorizas a Redux

Nunca antes.

---

# 🎯 Regla práctica

Si podemos explicar el flujo de estado fácilmente → no necesitamos Redux.

Si ya no podemos explicarlo claramente → es momento de Redux.

---

# 🧭 Estrategia técnica recomendada

Inicio:
Estado local + Context

Crecimiento del producto:
Migración progresiva a Redux Toolkit

---

# 🏁 Objetivo final del MVP

Validar que los prestamistas adopten el sistema como reemplazo real del tarjetón físico.

Si eso ocurre, el producto tiene mercado.


# 🚀 Próximas Misiones (Post-MVP)

Estas mejoras se implementarán después de validar el MVP con usuarios reales.

---

# 🗄️ 1. Diagrama ER (Modelo de Datos Real)

Modelo base del dominio financiero del sistema de cobranzas.

```mermaid
erDiagram

    USER ||--o{ CLIENT : owns
    CLIENT ||--o{ LOAN : has
    LOAN ||--o{ PAYMENT : receives

    USER {
        long id
        string name
        string email
        string password
        timestamp created_at
    }

    CLIENT {
        long id
        long user_id
        string name
        string phone
        string address
        string photo_url
        timestamp created_at
    }

    LOAN {
        long id
        long client_id
        decimal principal_amount
        decimal daily_payment_amount
        decimal total_amount_to_collect
        decimal remaining_balance
        date start_date
        date expected_end_date
        string status
        timestamp created_at
    }

    PAYMENT {
        long id
        long loan_id
        decimal amount
        date payment_date
        boolean paid
        string notes
        timestamp created_at
    }

## 💸 2. Flujo Financiero del Sistema
```

![Flujo financiero](https://i.ibb.co/LdcC9H91/mermaid-diagram.png)

## 🧠 3. Estructura Redux Toolkit (Cuando el sistema escale)

web/src/store/
│
├── index.ts              # configuración store global
│
├── slices/
│   ├── clientsSlice.ts
│   ├── loansSlice.ts
│   ├── paymentsSlice.ts
│   └── authSlice.ts
│
├── selectors/
│   ├── clientSelectors.ts
│   ├── loanSelectors.ts
│   └── paymentSelectors.ts
│
└── hooks.ts              # useAppDispatch / useAppSelector



### 🗺️ Mapa de Equivalencias
| Node.js (Bootcamp Style) | Spring Boot (Standard) | Descripción |
| :--- | :--- | :--- |
| **Routes** (`index.js`) | `@RequestMapping` | Define los puntos de entrada (Endpoints). |
| **Handlers** (`activityHandler.js`) | **Controllers** (`@RestController`) | Recibe la Request, extrae datos y envía la Response. |
| **Controllers** (`activityController.js`) | **Services** (`@Service`) | Contiene la lógica de negocio y reglas. |
| **Sequelize Methods** (`Activity.findAll`) | **Repositories** (`interface`) | Métodos automáticos para consultas a la DB. |
| **Models** (`Country.js`) | **Entities** (`@Entity`) | Definición de las tablas de la base de datos. |

---

### 🔄 Traducción de Lógica (Sequelize a Spring Boot)

Si en Node hacías esto:
```javascript
// Node + Sequelize
const getCountryDetail = async (id) => {
  return await Country.findByPk(id, { include: Activity });
};
```

En Spring Boot se traduce a:
```java
// Java + Spring Data JPA
public Country getCountryDetail(String id) {
    return countryRepository.findById(id).orElse(null);
    // (Las relaciones se cargan automáticamente con @ManyToMany en la Entidad)
}
```

---

### 📂 Estructura del Proyecto
```text
server/src/main/java/com/cobranzasapi/saas/
├── controllers/    # Equivalente a Handlers (HTTP Entry)
├── services/       # Equivalente a Controllers (Business Logic)
├── repositories/   # Equivalente a la conexión/métodos de DB
└── models/         # Equivalente a los modelos de Sequelize
```

---

### Frontend 

<img src="https://i.ibb.co/Rkg6126Q/atomic-designx.png" alt="atomic-designx">

---

### 🔄 Comparación de Enrutamiento (Routing)

A diferencia de Express, las rutas en Spring Boot viven dentro de los **Controllers**. No existe un archivo `routes.js` centralizado.

**En Node.js (Express):**
```javascript
// routes/authRouter.js
router.post("/register", registerHandler); 
// server.js
server.use("/api/auth", authRouter); 
```

**En Spring Boot (Java):**
```java
// Las rutas se definen con anotaciones en la carpeta controllers/
@RestController
@RequestMapping("/api/auth") 
public class AuthController {
    @PostMapping("/register") 
    public ResponseEntity<?> registerHandler(@RequestBody User user) { ... }
}
```

---

---


## 🐧 Arch Linux Setup

### 🛠️ Instalación inicial  
Si es la primera vez que se inicia el repositorio, instala las dependencias base:

```bash
sudo pacman -S maven jdk21-openjdk postgresql
```

### 📋 Configuración del `pom.xml` (Cambio a PostgreSQL)
El proyecto viene configurado para MySQL por defecto. Para usar PostgreSQL, se debe modificar el archivo `pom.xml` en la raíz del server:

1. **Eliminar** la dependencia de MySQL (`mysql-connector-j`).
2. **Agregar** la dependencia de PostgreSQL:

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### 📦 Limpiar y descargar librerías
Después de modificar el `pom.xml`, es necesario limpiar el proyecto y forzar la descarga del nuevo driver:

```bash
JAVA_HOME=/usr/lib/jvm/java-21-openjdk mvn clean install -DskipTests
```

### 🚀 Levantar el servidor
En la carpeta `server`, lanza el proyecto con Java 21 (vía **fish**):

```fish
JAVA_HOME=/usr/lib/jvm/java-21-openjdk mvn spring-boot:run
```

---

### ☕ Gestión de versiones de Java
Ver las versiones instaladas:
```bash
archlinux-java status
```
Cambiar versión global:
```bash
sudo archlinux-java set java-21-openjdk
```

---

### 🗄️ Configuración de Postgres en Arch

1. **Entrar a la consola de Postgres (sin sudo):**
   ```bash
   psql -h localhost -U postgres
   ```

2. **Crear la base de datos:**
   ```sql
   CREATE DATABASE cobranzas;
   ```

3. **Configurar `application.properties`:**
   Asegúrate de que `src/main/resources/application.properties` coincida con tu base de datos local:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/cobranzas
   spring.datasource.username=postgres
   spring.datasource.password=root
   spring.datasource.driver-class-name=org.postgresql.Driver
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
   ```

  # Los Handlers y por qué Java no los usa?


 **En Node.js:**

    Handler: Es el "Recepcionista". Su única función es recibir el req, sacar el id o el body, y llamar al Controller. También decide si manda un res.status(200) o un res.status(400).

    Controller: Es el "Cocinero". Solo hace la lógica de la base de datos. No sabe nada de req ni res.

¿Por qué se hace así en Node? Para que si algún día quieres cambiar de Express a otra cosa, tu lógica (Controller) no esté "ensuciada" con cosas de HTTP (res.status).
En Java (Spring Boot):

Java elimina la carpeta handlers porque el @RestController ya hace el trabajo del recepcionista automáticamente mediante anotaciones.

Comparación:
| Tarea del Recepcionista (Handler) | Cómo lo haces en Node (Express) | Cómo lo hace Java (Spring Boot) |
| :--- | :--- | :--- |
| **Sacar el body** | `const { email } = req.body` | `@RequestBody User user` |
| **Sacar un ID** | `const { id } = req.params` | `@PathVariable Long id` |
| **Enviar Status** | `res.status(201).json(...)` | `return new ResponseEntity<>(..., HttpStatus.CREATED)` |

Conclusión: En Java, el Controller ES el Handler. Es el punto de entrada. Por eso la lógica de base de datos se mueve a una nueva capa llamada Service.

La cadena de mando en Java es:
Cliente -> Controller (Handler) -> Service (Lógica) -> Repository (DB).