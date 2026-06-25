# ============================================================
#  Café Aurora — Servidor web con Python (app.py)
#  Framework: Flask
#
#  ¿Qué hace este archivo?
#   1) Sirve la página web (index.html, styles.css, script.js)
#   2) Entrega el menú de productos en formato JSON  ->  /api/menu
#   3) Recibe los mensajes del formulario de contacto ->  /api/contacto
#
#  Cómo ejecutarlo:
#     pip install -r requirements.txt
#     python app.py
#  Luego abrir en el navegador:  http://127.0.0.1:5000
# ============================================================

from flask import Flask, jsonify, request, send_from_directory
from datetime import datetime

# static_folder="." y static_url_path="" hacen que Flask sirva
# index.html, styles.css y script.js desde esta misma carpeta.
app = Flask(__name__, static_folder=".", static_url_path="")


# ------------------------------------------------------------
#  Datos del menú (la "base de datos" del proyecto)
#  En un proyecto real esto vendría de una base de datos.
# ------------------------------------------------------------
MENU = [
    {"nombre": "Espresso",                 "descripcion": "Doble shot de nuestro tueste de la casa.",        "precio": 12, "categoria": "Café"},
    {"nombre": "Capuchino",                "descripcion": "Espresso con leche vaporizada y espuma cremosa.", "precio": 18, "categoria": "Café"},
    {"nombre": "Latte de vainilla",        "descripcion": "Suave, dulce y aromático. El favorito de la tarde.", "precio": 20, "categoria": "Café"},
    {"nombre": "Chocolate caliente",       "descripcion": "Cacao nacional con un toque de canela.",          "precio": 16, "categoria": "Bebidas"},
    {"nombre": "Croissant de mantequilla", "descripcion": "Horneado en casa cada mañana.",                   "precio": 10, "categoria": "Repostería"},
    {"nombre": "Cheesecake de maracuyá",   "descripcion": "Cremoso, ácido y muy fresco.",                    "precio": 22, "categoria": "Repostería"},
]

# Aquí se guardan los mensajes recibidos (solo mientras corre el servidor)
mensajes_recibidos = []


# ------------------------------------------------------------
#  Ruta principal: muestra la página web
# ------------------------------------------------------------
@app.route("/")
def inicio():
    return send_from_directory(".", "index.html")


# ------------------------------------------------------------
#  API: devuelve el menú en formato JSON
#  El JavaScript del navegador lee esta ruta para mostrar la carta.
# ------------------------------------------------------------
@app.route("/api/menu")
def obtener_menu():
    return jsonify(MENU)


# ------------------------------------------------------------
#  API: recibe el formulario de contacto
# ------------------------------------------------------------
@app.route("/api/contacto", methods=["POST"])
def recibir_contacto():
    datos = request.get_json(silent=True) or {}

    nombre  = (datos.get("nombre")  or "").strip()
    email   = (datos.get("email")   or "").strip()
    mensaje = (datos.get("mensaje") or "").strip()

    # Validación en el servidor
    if not nombre or not email or not mensaje:
        return jsonify({"mensaje": "Faltan datos. Completa todos los campos."}), 400

    if "@" not in email:
        return jsonify({"mensaje": "El correo no parece válido."}), 400

    # Guarda el mensaje con la fecha/hora actual
    mensajes_recibidos.append({
        "nombre":  nombre,
        "email":   email,
        "mensaje": mensaje,
        "fecha":   datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    })

    # Lo mostramos también en la consola para verlo al hacer pruebas
    print(f"Nuevo mensaje de {nombre} ({email}): {mensaje}")

    return jsonify({"mensaje": f"¡Gracias, {nombre}! Tu mensaje fue enviado."})


# ------------------------------------------------------------
#  Arranque del servidor
# ------------------------------------------------------------
if __name__ == "__main__":
    # debug=True recarga el servidor automáticamente al guardar cambios
    app.run(debug=True)
