/**
 * Noche de Espantos 2D - Motor JavaScript con Canvas HTML5 (Funcionalidad Intacta)
 */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreElement = document.getElementById('score');
const audioBtn = document.getElementById('audioBtn');
const audioIcon = document.getElementById('audioIcon');
const audioStatus = document.getElementById('audioStatus');
const resetBtn = document.getElementById('resetBtn');
const bgMusic = document.getElementById('bgMusic');

const rulesCollapse = document.getElementById('rulesCollapse');
const toggleText = document.querySelector('[data-bs-target="#rulesCollapse"] span:nth-child(2)');

rulesCollapse.addEventListener('show.bs.collapse', () => {
    if (toggleText) toggleText.textContent = 'Ocultar Instrucciones';
});
rulesCollapse.addEventListener('hide.bs.collapse', () => {
    if (toggleText) toggleText.textContent = 'Mostrar Instrucciones';
});

let score = 0;
const totalObjects = 25;
let objects = [];
let explosions = [];

// Carga de la imagen de fondo JPG desde la carpeta /assets
const bgImage = new Image();
bgImage.src = 'assets/fondo.jpg';

// URLs de imágenes PNG de entidades (Carpeta /assets)
const entityTypes = [
    { name: 'Calabaza', url: 'assets/calabaza.png' },
    { name: 'Fantasma', url: 'assets/fantasma.png' },
    { name: 'Calavera', url: 'assets/calabera.jpg' },
    { name: 'Murciélago', url: 'assets/vampiro.png' },
    { name: 'Zombi', url: 'assets/zombie.png' }
];

// Precargar imágenes PNG de entidades
const loadedImages = entityTypes.map(item => {
    const img = new Image();
    img.src = item.url;
    return img;
});

// Tipos de movimiento: 0=Arriba, 1=Abajo, 2=Diagonal, 3=Circular
class SpookyObject {
    constructor() {
        this.radius = 34;
        this.resetPosition();
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
        if (Math.abs(this.vx) < 0.8) this.vx = this.vx < 0 ? -1 : 1;
        if (Math.abs(this.vy) < 0.8) this.vy = this.vy < 0 ? -1 : 1;
        
        this.speed = 1.5 + Math.random() * 1.8;
        this.moveType = Math.floor(Math.random() * 4);
        this.typeIndex = Math.floor(Math.random() * entityTypes.length);
        this.angle = Math.random() * Math.PI * 2;
        this.centerX = this.x;
        this.centerY = this.y;
    }

    resetPosition() {
        this.x = Math.random() * (canvas.width - 140) + 70;
        this.y = Math.random() * (canvas.height - 180) + 70;
        this.centerX = this.x;
        this.centerY = this.y;
    }

    update() {
        if (this.moveType === 0) {
            this.y -= this.speed;
            if (this.y - this.radius <= 0) {
                this.y = this.radius;
                this.moveType = 1;
            }
        } else if (this.moveType === 1) {
            this.y += this.speed;
            if (this.y + this.radius >= canvas.height - 25) {
                this.y = canvas.height - 25 - this.radius;
                this.moveType = 0;
            }
        } else if (this.moveType === 2) {
            this.x += this.vx * (this.speed * 0.7);
            this.y += this.vy * (this.speed * 0.7);

            if (this.x - this.radius <= 0) {
                this.x = this.radius;
                this.vx *= -1;
            } else if (this.x + this.radius >= canvas.width) {
                this.x = canvas.width - this.radius;
                this.vx *= -1;
            }

            if (this.y - this.radius <= 0) {
                this.y = this.radius;
                this.vy *= -1;
            } else if (this.y + this.radius >= canvas.height - 25) {
                this.y = canvas.height - 25 - this.radius;
                this.vy *= -1;
            }
        } else if (this.moveType === 3) {
            this.angle += 0.025 * (this.speed * 0.5);
            this.centerX += this.vx * 0.5;
            this.centerY += this.vy * 0.3;

            if (this.centerX < 80 || this.centerX > canvas.width - 80) this.vx *= -1;
            if (this.centerY < 80 || this.centerY > canvas.height - 100) this.vy *= -1;

            this.x = this.centerX + Math.cos(this.angle) * 55;
            this.y = this.centerY + Math.sin(this.angle) * 55;
        }
    }

    draw() {
        const img = loadedImages[this.typeIndex];
        ctx.save();
        ctx.shadowColor = 'rgba(255, 165, 0, 0.5)';
        ctx.shadowBlur = 15;
        if (img.complete && img.naturalWidth !== 0) {
            ctx.drawImage(img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        } else {
            ctx.fillStyle = '#ff7700';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}

// Inicializar 25 objetos
for (let i = 0; i < totalObjects; i++) {
    objects.push(new SpookyObject());
}

function triggerCollisionEffect(x, y) {
    explosions.push({ x, y, radius: 12, alpha: 1 });
}

function checkCollisions() {
    for (let i = 0; i < objects.length; i++) {
        for (let j = i + 1; j < objects.length; j++) {
            let dx = objects[j].x - objects[i].x;
            let dy = objects[j].y - objects[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let minDist = objects[i].radius + objects[j].radius;

            if (distance < minDist) {
                triggerCollisionEffect((objects[i].x + objects[j].x) / 2, (objects[i].y + objects[j].y) / 2);
                
                let tempVx = objects[i].vx;
                let tempVy = objects[i].vy;
                objects[i].vx = objects[j].vx;
                objects[i].vy = objects[j].vy;
                objects[j].vx = tempVx;
                objects[j].vy = tempVy;

                let tempSpeed = objects[i].speed;
                objects[i].speed = objects[j].speed;
                objects[j].speed = tempSpeed;

                objects[i].moveType = (objects[i].moveType + 1) % 4;
                objects[j].moveType = (objects[j].moveType + 1) % 4;
            }
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la imagen de fondo JPG (/assets/background.jpg)
    if (bgImage.complete && bgImage.naturalWidth !== 0) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    objects.forEach(obj => {
        obj.update();
        obj.draw();
    });

    checkCollisions();

    explosions.forEach((exp, index) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(exp.x, exp.y, exp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 69, 0, ${exp.alpha})`;
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.restore();

        exp.radius += 1.8;
        exp.alpha -= 0.04;
        if (exp.alpha <= 0) {
            explosions.splice(index, 1);
        }
    });

    requestAnimationFrame(gameLoop);
}

// Click para eliminar elemento y reaparecer aleatoriamente manteniendo los 25 objetos
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let i = 0; i < objects.length; i++) {
        let dx = objects[i].x - mouseX;
        let dy = objects[i].y - mouseY;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < objects[i].radius + 10) {
            score++;
            scoreElement.textContent = score;
            objects[i].resetPosition();
            objects[i].typeIndex = Math.floor(Math.random() * entityTypes.length);
            triggerCollisionEffect(mouseX, mouseY);
            break;
        }
    }
});

resetBtn.addEventListener('click', () => {
    score = 0;
    scoreElement.textContent = score;
});

// Control del Reproductor de Audio MP3
let isAudioPlaying = false;

audioBtn.addEventListener('click', () => {
    isAudioPlaying = !isAudioPlaying;
    if (isAudioPlaying) {
        bgMusic.play().catch(e => console.log("Reproducción bloqueada por el navegador:", e));
        audioIcon.textContent = '🔊';
        audioStatus.textContent = 'ON';
        audioBtn.classList.replace('btn-outline-warning', 'btn-warning');
        audioBtn.classList.add('text-dark', 'fw-bold');
    } else {
        bgMusic.pause();
        audioIcon.textContent = '🔇';
        audioStatus.textContent = 'OFF';
        audioBtn.classList.replace('btn-warning', 'btn-outline-warning');
        audioBtn.classList.remove('text-dark', 'fw-bold');
    }
});

gameLoop();