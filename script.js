document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Canvas Particle Sparkle & Cursor System ---
  const canvas = document.getElementById('sparkle-canvas');
  const cursorRing = document.getElementById('cursor-ring');
  const cursorDot = document.getElementById('cursor-dot');
  
  if (canvas && cursorRing && cursorDot) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let position = { x: -100, y: -100 };
    let isHovered = false;
    let isClicking = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse movement
    window.addEventListener('mousemove', (e) => {
      position.x = e.clientX;
      position.y = e.clientY;

      // Update dot & ring positions using translate3d
      cursorDot.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      cursorRing.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;

      // 40% chance of spawning movement sparkle
      if (Math.random() < 0.4) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 5 + 2,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5 - 0.8,
          color: ['#818cf8', '#a7f3d0', '#fbcfe8', '#cbd5e1', '#c084fc'][Math.floor(Math.random() * 5)],
          alpha: 1,
          decay: Math.random() * 0.03 + 0.015
        });
      }
    });

    // Mouse down / up burst
    window.addEventListener('mousedown', (e) => {
      isClicking = true;
      cursorRing.classList.add('is-clicking');

      for (let i = 0; i < 12; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 6 + 3,
          speedX: (Math.random() - 0.5) * 4,
          speedY: (Math.random() - 0.5) * 4,
          color: ['#6366f1', '#10b981', '#ec4899', '#f59e0b'][Math.floor(Math.random() * 4)],
          alpha: 1,
          decay: 0.02
        });
      }
    });

    window.addEventListener('mouseup', () => {
      isClicking = false;
      cursorRing.classList.remove('is-clicking');
    });

    // Mouse over interactive elements
    window.addEventListener('mouseover', (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.color-card') ||
        target.closest('.skill-tag')
      ) {
        isHovered = true;
        cursorRing.classList.add('is-hovered');
      } else {
        isHovered = false;
        cursorRing.classList.remove('is-hovered');
      }
    });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(render);
    };
    render();
  }

  // --- 2. Project Category Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Active state on buttons
      filterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'shadow-sm');
        b.classList.add('text-slate-600', 'hover:bg-slate-100');
      });
      btn.classList.remove('text-slate-600', 'hover:bg-slate-100');
      btn.classList.add('bg-indigo-600', 'text-white', 'shadow-sm');

      // Filter project cards
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'ALL' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 3. Resume Download Trigger with Confetti ---
  const downloadBtns = document.querySelectorAll('.download-resume-btn');
  
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Trigger canvas confetti if available
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      const btnSpan = btn.querySelector('.btn-text');
      const origText = btnSpan ? btnSpan.textContent : '';
      if (btnSpan) btnSpan.textContent = 'Downloading...';

      setTimeout(() => {
        const link = document.createElement('a');
        link.href = './public/Bhavya_Sai_Resume_Cognizant.pdf';
        link.download = 'Bhavya_Sai_Resume_Cognizant.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (btnSpan) btnSpan.textContent = origText;
      }, 400);
    });
  });
});
