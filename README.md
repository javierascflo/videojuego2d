# 🎃 Noche de Espantos 2D - Bosque Encantado & Día de Muertos

Un videojuego interactivo desarrollado en **HTML5 Canvas**, **CSS3 (Bootstrap 5)** y **JavaScript Vanilla**, centrado en la simulación de físicas bidimensionales, interactividad mediante eventos del mouse y reproducción de elementos multimedia (imágenes PNG/JPG y audio MP3).

---

## 📄 Contexto

El proyecto nace en el marco del desarrollo de aplicaciones web interactivas utilizando estándares web modernos sin dependencias de motores de juego pesados (como Phaser o Unity). La temática se inspira en las festividades de **Halloween y Día de Muertos**, ambientando la experiencia en un bosque encantado habitado por 25 entidades espectrales en constante movimiento.

### Información del Creador
* **Desarrollador:** Javier Alessandro Ascencio
* **Número de Control:** `2026-ESP-01`
* **Proyecto:** Desarrollo Web Canvas HTML5

---

## 🎯 Objetivo

Diseñar e implementar una experiencia web interactiva en 2D que cumpla con los siguientes objetivos técnicos y operacionales:
1. **Renderizado dinámico:** Manipular el lienzo de HTML5 (`<canvas>`) a una resolución nativa de `1280x720` píxeles para mantener 25 objetos activos en pantalla de manera fluida.
2. **Algoritmos de movimiento:** Implementar 4 patrones dinámicos de movimiento (vertical ascendente/descendente, diagonal rebotante y trayectoria circular en espiral).
3. **Detección de colisiones:** Calcular física de choque por distancia euclidiana entre objetos circulares, ejecutando transferencias de momento y efectos visuales de impacto.
4. **Interactividad:** Permitir al usuario interactuar mediante clics del puntero para desintegrar entidades, incrementando un contador de puntuación global y regenerando las entidades en ubicaciones aleatorias.
5. **Integración multimedia:** Cargar fondos en formato JPG, imágenes vectoriales/PNG con transparencias y audio ambiental `.mp3` controlado por el usuario.

---

## 💡 Justificación

El uso de **HTML5 Canvas** junto con **JavaScript Vanilla** demuestra la capacidad del navegador web para ejecutar renderizado gráfico a 60 FPS sin necesidad de bibliotecas de terceros.

* **Estructura modular y limpia:** Separación estricta de responsabilidades en tres archivos (`index.html`, `styles.css` y `script.js`), facilidades para el mantenimiento y control de versiones con Git.
* **Interfaz sobria y accesible:** Un diseño con estética oscura (*Dark Theme*) que enfatiza el área de juego y proporciona botones de control claros para el audio y las instrucciones.
* **Compatibilidad:** Implementación de Bootstrap 5 para garantizar adaptabilidad (*responsiveness*) en la maquetación externa del contenedor del lienzo.

---

## 🎮 Operación del Videojuego

### 🛠️ Requisitos e Instalación
Para ejecutar el juego localmente o en un servidor web:
1. Clona el repositorio o descarga la carpeta del proyecto.
2. Verifica que la estructura de carpetas y archivos contenga los recursos necesarios:
   ```text
   noche-espantos-2d/
   │
   ├── index.html
   ├── styles.css
   ├── script.js
   └── assets/
       ├── background.jpg
       ├── background.mp3
       ├── pumpkin.png
       ├── ghost.png
       ├── skull.png
       ├── bat.png
       └── zombie.png
   ```
3. Abre el archivo `index.html` en cualquier navegador web moderno (Chrome, Firefox, Edge, Safari).

### 🕹️ Instrucciones de Juego
* **Música Ambiental:** Haz clic en el botón **Música MP3** en la barra superior para activar o pausar la pista sonora ambiental (`assets/background.mp3`).
* **Atrapar Espantos:** Mueve el puntero del mouse sobre el lienzo y haz clic izquierdo sobre cualquiera de los espíritus u objetos flotantes. Al acertar:
  * El objeto se desintegrará con un efecto de onda expansiva.
  * Se incrementará en `+1` la puntuación en la barra superior.
  * La entidad reaparecerá de forma inmediata en una posición aleatoria para mantener la constante de 25 objetos activos.
* **Reiniciar Conteo:** Haz clic en **🔄 Reiniciar Conteo** para restablecer la puntuación a cero sin recargar la página.
* **Instrucciones Integradas:** Usa el botón **ℹ️ Mostrar Instrucciones** para desplegar el panel con las reglas e información técnica de funcionamiento.

---

## 📝 Conclusiones

1. **Rendimiento e Interactividad Web:** La implementación del bucle principal con `requestAnimationFrame()` garantiza un renderizado fluido y constante, permitiendo calcular trayectorias, colisiones y efectos visuales en tiempo real sin ralentizar el navegador.
2. **Abstracción mediante POO en JS:** La utilización de la clase `SpookyObject` permitió gestionar de forma limpia el estado, posición, tipo de movimiento y lógica de dibujado individual de cada uno de los 25 elementos en pantalla.
3. **Control y Experiencia de Usuario:** La incorporación del reproductor de audio MP3 independiente le otorga al usuario control total sobre la ambientación sonora, solucionando las políticas de *autoplay* de los navegadores actuales.
4. **Diseño Visual Sobrio:** La reestructuración de la interfaz hacia una paleta cromática basada en tonos negros y dorados/naranjas neón logra un aspecto profesional, manteniendo la concentración del usuario sobre el Canvas.
