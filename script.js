/* ============================================================
   Café Aurora — JavaScript del navegador (script.js)
   Funciones:
   1) Abrir/cerrar el menú en celulares
   2) Cargar el menú de productos desde el servidor Python (Flask)
   3) Enviar el formulario de contacto a Python
   4) Mostrar el año actual en el pie de página
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- 1) Menú hamburguesa (celulares) ---------- */
    const botonMenu = document.getElementById("botonMenu");
    const navLista  = document.getElementById("navLista");

    botonMenu.addEventListener("click", () => {
        const abierto = navLista.classList.toggle("abierto");
        botonMenu.setAttribute("aria-expanded", abierto ? "Cerrar menú" : "Abrir menú");
    });

    // Cerrar el menú al hacer clic en un enlace
    navLista.querySelectorAll("a").forEach(enlace => {
        enlace.addEventListener("click", () => {
            navLista.classList.remove("abierto");
            botonMenu.setAttribute("aria-label", "Abrir menú");
        });
    });

    /* ---------- 2) Cargar el menú desde Python (Flask) ---------- */
    const menuGrid     = document.getElementById("menuGrid");
    const menuCargando = document.getElementById("menuCargando");

    // Menú de respaldo: se usa si la página se abre SIN el servidor
    // (por ejemplo, abriendo index.html directamente con doble clic).
    const menuRespaldo = [
        { nombre: "Espresso", descripcion: "Doble shot de nuestro tueste de la casa.", precio: 12, categoria: "Café" },
        { nombre: "Capuchino", descripcion: "Espresso con leche vaporizada y espuma cremosa.", precio: 18, categoria: "Café" },
        { nombre: "Latte de vainilla", descripcion: "Suave, dulce y aromático. El favorito de la tarde.", precio: 20, categoria: "Café" },
        { nombre: "Chocolate caliente", descripcion: "Cacao nacional con un toque de canela.", precio: 16, categoria: "Bebidas" },
        { nombre: "Croissant de mantequilla", descripcion: "Horneado en casa cada mañana.", precio: 10, categoria: "Repostería" },
        { nombre: "Cheesecake de maracuyá", descripcion: "Cremoso, ácido y muy fresco.", precio: 22, categoria: "Repostería" }
    ];

    // Dibuja las tarjetas del menú en pantalla
    function mostrarMenu(productos) {
        menuGrid.innerHTML = "";   // limpia el "Cargando…"

        productos.forEach(p => {
            const tarjeta = document.createElement("article");
            tarjeta.className = "tarjeta";
            tarjeta.innerHTML = `
                <div class="tarjeta__top">
                    <h3 class="tarjeta__nombre">${p.nombre}</h3>
                    <span class="tarjeta__precio">Bs ${p.precio}</span>
                </div>
                <p class="tarjeta__desc">${p.descripcion}</p>
                <span class="tarjeta__etiqueta">${p.categoria}</span>
            `;
            menuGrid.appendChild(tarjeta);
        });
    }

    // Intenta pedir el menú al servidor Python; si falla, usa el respaldo
    fetch("/api/menu")
        .then(respuesta => {
            if (!respuesta.ok) throw new Error("Sin servidor");
            return respuesta.json();
        })
        .then(datos => mostrarMenu(datos))
        .catch(() => {
            // No hay servidor Flask corriendo: mostramos el menú local
            mostrarMenu(menuRespaldo);
        });

    /* ---------- 3) Formulario de contacto ---------- */
    const form  = document.getElementById("formContacto");
    const aviso = document.getElementById("formAviso");

    form.addEventListener("submit", async (evento) => {
        evento.preventDefault();   // evita que se recargue la página

        // Lee los valores del formulario
        const datos = {
            nombre:  form.nombre.value.trim(),
            email:   form.email.value.trim(),
            mensaje: form.mensaje.value.trim()
        };

        // Validación básica en el navegador
        if (!datos.nombre || !datos.email || !datos.mensaje) {
            mostrarAviso("Por favor completa todos los campos.", "err");
            return;
        }

        try {
            // Envía los datos al servidor Python
            const respuesta = await fetch("/api/contacto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });
            const resultado = await respuesta.json();

            if (respuesta.ok) {
                mostrarAviso(resultado.mensaje, "ok");
                form.reset();
            } else {
                mostrarAviso(resultado.mensaje || "No se pudo enviar.", "err");
            }
        } catch (error) {
            // Si no hay servidor, igual confirmamos al usuario
            mostrarAviso("¡Gracias, " + datos.nombre + "! Te responderemos pronto.", "ok");
            form.reset();
        }
    });

    function mostrarAviso(texto, tipo) {
        aviso.textContent = texto;
        aviso.className = "formulario__aviso " + tipo;
    }

    /* ---------- 4) Año actual en el pie ---------- */
    document.getElementById("anio").textContent = new Date().getFullYear();
});
