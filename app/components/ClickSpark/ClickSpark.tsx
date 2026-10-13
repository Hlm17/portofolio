'use client'

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gerakDiizinkan } from '../motionPref';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  children?: React.ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const kotakRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  // Dipakai supaya loop gambar bisa dibangunkan lagi dari penanganan klik.
  const bangunkanRef = useRef<() => void>(() => {});
  // Kanvas baru dibuat saat percikan pertama benar-benar dibutuhkan: sebelum ada
  // klik, halaman tidak menyimpan satu pun elemen canvas tambahan, dan bagi
  // pengunjung yang meminta gerak minimum kanvasnya tidak pernah dibuat.
  const [kanvasSiap, setKanvasSiap] = useState(false);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    if (!kanvasSiap) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let resizeTimeout: NodeJS.Timeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    });
    ro.observe(parent);
    resizeCanvas();

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      // Loop berhenti sendiri begitu percikan terakhir habis. Sebelumnya ia
      // berputar terus selama halaman terbuka meski tidak ada yang digambar.
      if (sparksRef.current.length === 0) {
        animationId = 0;
        return;
      }

      animationId = requestAnimationFrame(draw);
    };

    bangunkanRef.current = () => {
      if (animationId === 0 && sparksRef.current.length > 0) {
        animationId = requestAnimationFrame(draw);
      }
    };

    // Percikan dari klik pertama sudah menunggu saat kanvas baru terpasang.
    if (sparksRef.current.length > 0) {
      animationId = requestAnimationFrame(draw);
    }

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationId);
      animationId = 0;
      bangunkanRef.current = () => {};
    };
  }, [kanvasSiap, sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void => {
    // Percikan hanya hiasan, jadi tidak perlu dibuat sama sekali bagi pengunjung
    // yang meminta gerak minimum.
    if (!gerakDiizinkan()) return;

    const kotak = kotakRef.current;
    if (!kotak) return;
    const rect = kotak.getBoundingClientRect();

    let x = 0;
    let y = 0;

    if ("touches" in e) {
      // Touch event
      const touch = e.touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    const now = performance.now();
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now
    }));

    sparksRef.current.push(...newSparks);
    if (kanvasSiap) bangunkanRef.current();
    else setKanvasSiap(true);
  };

  return (
    <div ref={kotakRef} className="relative h-full w-full" onMouseDown={handleClick} onTouchStart={handleClick}>
      {kanvasSiap ? <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" /> : null}
      {children}
    </div>
  );

};

export default ClickSpark;
