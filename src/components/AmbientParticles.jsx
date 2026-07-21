import React, { useEffect, useRef } from 'react';

export default function AmbientParticles({ soundscapeMode = 'default' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle Generation based on Soundscape Mode
    let particles = [];
    const count = soundscapeMode === 'rain' ? 120 : soundscapeMode === 'space' ? 150 : 50;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        vx: soundscapeMode === 'rain' ? (Math.random() - 0.5) * 0.5 : (Math.random() - 0.5) * 0.4,
        vy: soundscapeMode === 'rain' ? Math.random() * 8 + 6 : soundscapeMode === 'forest' ? Math.random() * 0.8 + 0.3 : (Math.random() - 0.5) * 0.4,
        length: Math.random() * 18 + 8, // for rain streaks
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (soundscapeMode === 'rain') {
          // RAIN VISUAL EFFECT: Falling rain streaks
          ctx.beginPath();
          ctx.strokeStyle = `rgba(147, 197, 253, ${p.alpha})`; // Soft blue rain
          ctx.lineWidth = 1.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 2, p.y + p.length);
          ctx.stroke();

          // Move down
          p.y += p.vy;
          p.x += p.vx;
          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * width;
          }
        } else if (soundscapeMode === 'forest') {
          // FOREST STREAM VISUAL EFFECT: Floating Green Leaves & Pollen
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = `rgba(134, 239, 172, ${p.alpha})`; // Sage green
          
          // Leaf shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.5, p.radius, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          p.y += p.vy;
          p.x += Math.sin(p.y * 0.02) * 0.5;
          p.rotation += p.rotSpeed;

          if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * width;
          }
        } else if (soundscapeMode === 'space') {
          // DEEP SPACE VISUAL EFFECT: Twinkling Cosmic Stars
          p.alpha += p.twinkleSpeed;
          if (p.alpha > 0.9 || p.alpha < 0.2) p.twinkleSpeed = -p.twinkleSpeed;

          ctx.beginPath();
          ctx.fillStyle = `rgba(216, 180, 254, ${Math.abs(p.alpha)})`; // Lavender star glow
          ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // DEFAULT SUNSET WARMLIGHT PARTICLES
          ctx.beginPath();
          ctx.fillStyle = `rgba(251, 146, 60, ${p.alpha * 0.4})`; // Soft peach glow
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx = -p.vx;
          if (p.y < 0 || p.y > height) p.vy = -p.vy;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [soundscapeMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
}
