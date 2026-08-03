import React, { useEffect, useState, useRef } from 'react';

export default function CursorTrail() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Spawn subtle glowing sparkles on mouse movement
      if (Math.random() < 0.4) {
        particlesRef.current.push({
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
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      // Spawn burst of particles on click
      for (let i = 0; i < 12; i++) {
        particlesRef.current.push({
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
    };

    const handleMouseUp = () => setIsClicking(false);

    // Detect hovering over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.color-card') ||
        target.closest('.skill-tag')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Canvas particle animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
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
          particlesRef.current.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Sparkle Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
      />

      {/* Smooth Cursor Outer Glowing Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 border-2 border-indigo-500 bg-indigo-500/15 backdrop-blur-[1px] scale-110 shadow-[0_0_20px_rgba(99,102,241,0.5)]'
            : isClicking
            ? 'w-8 h-8 -ml-4 -mt-4 border-2 border-emerald-500 bg-emerald-500/30 scale-90'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 border border-indigo-400/60 bg-indigo-500/10 shadow-[0_0_12px_rgba(99,102,241,0.3)]'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />

      {/* Cursor Center Core Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-indigo-600 shadow-[0_0_8px_#4f46e5] pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />
    </>
  );
}
