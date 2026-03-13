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
