# ☕ Café Aurora — Página web

Proyecto de la **Actividad #2**: desarrollo de una página web interactiva con
**HTML, CSS, JavaScript y Python (Flask)**, usando **GitHub** para el control de versiones.

---

## 👤 Integrante

> ✏️ **Reemplaza estos datos por los tuyos:**

- **Nombre:** _(tu nombre completo aquí)_
- **Materia / Curso:** _(nombre de la materia)_
- **Docente:** _(nombre del docente)_
- **Fecha:** _(fecha de entrega)_

> Nota: este trabajo se realizó de forma individual, cumpliendo los tres roles
> del equipo (Líder, Colaborador 1 y Colaborador 2).

---

## 📝 Descripción del proyecto

**Café Aurora** es el sitio web de una cafetería de especialidad. La página muestra:

- Un **encabezado** con menú de navegación, logo y sección de bienvenida (rol Líder).
- Un **cuerpo** con la carta de productos y una sección informativa (rol Colaborador 1).
- Un **pie de página** con contacto, redes sociales y formulario (rol Colaborador 2).

La carta de productos se carga desde el servidor **Python (Flask)**, y el formulario
de contacto envía los datos al mismo servidor.

---

## 🛠️ Tecnologías usadas

| Tecnología | Para qué se usó                                  |
|------------|--------------------------------------------------|
| HTML       | Estructura de la página (`index.html`)           |
| CSS        | Estilos y diseño responsivo (`styles.css`)       |
| JavaScript | Interactividad del navegador (`script.js`)       |
| Python     | Servidor web y datos (`app.py` con Flask)        |
| GitHub     | Repositorio y control de versiones               |

---

## 📁 Estructura del proyecto

```
proyecto-cafeteria/
├── index.html        # Estructura: encabezado, cuerpo y pie
├── styles.css        # Estilos
├── script.js         # Funcionalidad del navegador
├── app.py            # Servidor Flask (Python)
├── requirements.txt  # Dependencias de Python
├── .gitignore        # Archivos que Git debe ignorar
└── README.md         # Este archivo
```

---

## ▶️ Cómo ejecutar el proyecto

### Opción A — Con el servidor Python (recomendada)

1. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
2. Inicia el servidor:
   ```bash
   python app.py
   ```
3. Abre en el navegador:
   ```
   http://127.0.0.1:5000
   ```

### Opción B — Sin servidor

También puedes abrir `index.html` haciendo doble clic. La página funciona igual,
solo que el menú se carga desde una copia local (no desde Python).

---

## 🌿 Flujo de trabajo en Git (evidencia para la actividad)

Como el trabajo es individual, se simularon los tres roles con tres ramas.
Estos son los comandos usados:

### Fase 1 y 2 — Repositorio y estructura inicial
```bash
git init
git add .
git commit -m "Se agrego la estructura inicial del proyecto"
git branch -M main
git remote add origin https://github.com/USUARIO/proyecto-cafeteria.git
git push -u origin main
```

### Fase 3 — Crear las ramas de cada rol
```bash
git checkout -b feature/ENCABEZADO     # Rol Líder
git checkout -b feature/CUERPO         # Rol Colaborador 1
git checkout -b feature/PIE-PAGINA     # Rol Colaborador 2
```

### Fase 4 y 5 — Desarrollo y commits (ejemplos)
```bash
git add index.html styles.css
git commit -m "Se agrego el menu de navegacion y el logo"
git commit -m "Se modifico el diseño de las tarjetas del menu"
git commit -m "Alineacion de botones del formulario"
```

### Fase 6 — Subir ramas y crear Pull Requests
```bash
git push origin feature/ENCABEZADO
git push origin feature/CUERPO
git push origin feature/PIE-PAGINA
```
Luego, en GitHub: crear un **Pull Request** de cada rama hacia `main`,
revisar el código, resolver conflictos si los hay, y hacer **merge**.

---

## ✅ Checklist de entrega

- [ ] Repositorio creado en GitHub con `README.md`
- [ ] Estructura base subida a la rama `main`
- [ ] Ramas creadas: `feature/ENCABEZADO`, `feature/CUERPO`, `feature/PIE-PAGINA`
- [ ] Commits claros y específicos en cada rama
- [ ] Pull Requests creados y aprobados (merge a `main`)
- [ ] El proyecto funciona correctamente
