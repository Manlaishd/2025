const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

// Canvas хэмжээ тохируулах
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particlesArray = [];

// Particle объект
class Particle {
  constructor(x, y, size, color, velocity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.velocity = velocity;
  }

  update() {
    this.y += this.velocity;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Particle үүсгэх
function createParticles() {
  particlesArray = [];
  const particleCount = window.innerWidth < 768 ? 100 : 150; // Утасанд бага ачаалал
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 3 + 1;
    const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
    const velocity = Math.random() * 2 + 0.5;
    particlesArray.push(new Particle(x, y, size, color, velocity));
  }
}

// Animation эхлүүлэх
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

// Мэндчилгээ гаргах
function showGreeting() {
  const greetingElement = document.getElementById("greeting");
  greetingElement.classList.remove("hidden");
  greetingElement.classList.add("visible");

  // 5 секундын дараа мэндчилгээ алга болгох
  setTimeout(() => {
    greetingElement.classList.remove("visible");
    greetingElement.classList.add("hidden");
  }, 5000);
}

// Button animation нэмэх
function startAnimation() {
  const yearElement = document.querySelector('.year');
  yearElement.style.animation = 'spin 2s infinite';

  const spinKeyframes = `
    @keyframes spin {
      0% {
        transform: scale(1) rotate(0deg);
      }
      100% {
        transform: scale(1.2) rotate(360deg);
      }
    }
  `;

  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(spinKeyframes, styleSheet.cssRules.length);

  // Мэндчилгээ харуулах
  showGreeting();
}

// Event listener
window.addEventListener("load", () => {
  createParticles();
  animateParticles();
});
