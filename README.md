# cobranzas

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
