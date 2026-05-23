'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  opacity: number;
}

function createParticles(width: number, height: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.4 + 0.1,
    });
  }
  return particles;
}

export function ParticleCanvas(): JSX.Element | null {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const [supportsCanvas, setSupportsCanvas] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setSupportsCanvas(false);
      return;
    }

    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      if (particlesRef.current.length === 0) {
        particlesRef.current = createParticles(w, h, 60);
      }
    };

    resize();

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125,211,252,${p.opacity})`;
        ctx.fill();
      }
    };

    if (prefersReducedMotion) {
      draw();
      return;
    }

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;

      for (const p of particlesRef.current) {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > w) p.dx = -p.dx;
        if (p.y < 0 || p.y > h) p.dy = -p.dy;
      }

      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  if (!supportsCanvas) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
