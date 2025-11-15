# Better English Translation 📖

Una aplicación web simple e intuitiva para traducir texto del español al inglés de manera formal, elegante y natural.

## 🌟 Características

- **Interfaz Simple e Intuitiva**: Diseño limpio y fácil de usar
- **Traducción Formal**: Convierte texto español a inglés formal y elegante
- **Lenguaje Natural**: Usa sinónimos apropiados y expresiones naturales
- **Profesional**: Ideal para documentos, correos formales y comunicación profesional
- **Copia Rápida**: Botón para copiar la traducción al portapapeles
- **Responsive**: Funciona perfectamente en dispositivos móviles y escritorio

## 🚀 Cómo Usar

1. Abre el archivo `index.html` en tu navegador web
2. Escribe o pega tu texto en español en el área de entrada
3. Haz clic en el botón "Traducir"
4. La traducción formal en inglés aparecerá en el área de salida
5. Usa el botón "Copiar" para copiar la traducción al portapapeles

### Atajos de Teclado

- **Ctrl/Cmd + Enter**: Traducir texto
- **Ctrl/Cmd + K**: Limpiar campos

## 🛠️ Tecnologías

- HTML5
- CSS3 (Diseño moderno y responsive)
- JavaScript (Vanilla JS, sin dependencias)
- APIs de traducción:
  - LibreTranslate (código abierto)
  - MyMemory Translation API (alternativa)

## 📦 Instalación

### Opción 1: Uso Local

1. Clona o descarga este repositorio
2. Abre `index.html` en tu navegador web
3. ¡Listo! La aplicación está lista para usar

### Opción 2: Servidor Web

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Luego abre http://localhost:8000 en tu navegador
```

## 🌐 Uso en Línea

Puedes alojar esta aplicación en cualquier servicio de hosting estático como:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## 📝 Ejemplo de Uso

**Entrada (Español):**
```
Hola, necesito ayuda con este problema. ¿Puedes darme una mano?
```

**Salida (Inglés Formal):**
```
Hello, I require assistance with this issue. Could you provide me with support?
```

## 🎨 Personalización

Puedes personalizar los colores y estilos editando el archivo `styles.css`. Las variables CSS están definidas en `:root` para fácil modificación:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    /* ... más variables */
}
```

## 🔧 Configuración de API

La aplicación utiliza APIs de traducción gratuitas. Si necesitas mayor capacidad o características adicionales, puedes:

1. Registrarte para obtener una API key en servicios como:
   - Google Cloud Translation API
   - DeepL API
   - Microsoft Azure Translator

2. Modificar el archivo `script.js` para incluir tu API key

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Better English Translation © 2025

## 🐛 Reportar Problemas

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en GitHub.

---

**Nota**: Esta aplicación requiere conexión a internet para las traducciones, ya que utiliza APIs de traducción en línea.