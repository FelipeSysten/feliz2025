const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

// Cria partículas para simular fogos de artifício
class Particle {
    constructor(x, y, color, size) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.velocityX = Math.random() * 4 - 2;
        this.velocityY = Math.random() * 4 - 2;
        this.life = 100;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.life--;
        this.size *= 0.95; // Reduz o tamanho ao longo do tempo
    }
}

// Função para gerar fogos
function createFireworks(x, y) {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white'];
    for (let i = 0; i < 50; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, Math.random() * 5 + 2));
    }
}

// Loop principal de animação
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.life <= 0 || p.size <= 0.5) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

// Dispara fogos de artifício aleatórios
setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    createFireworks(x, y);
}, 800);

// Redimensiona o canvas ao alterar o tamanho da janela
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Inicia a animação
animate();
