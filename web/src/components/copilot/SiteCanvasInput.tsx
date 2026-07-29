"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { Point } from "@/lib/compliance";
import { polygonArea } from "@/lib/compliance";

const SCALE_PX_PER_METER = 8;
const CANVAS_SIZE = 420;

interface Props {
  polygon: Point[];
  onChange: (polygon: Point[]) => void;
}

/** رابط ورود دستی شکل زمین — بخشی از issue #17 (Site Input) */
export function SiteCanvasInput({ polygon, onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<Point | null>(null);

  const toMeters = useCallback((px: number, py: number): Point => {
    const originX = CANVAS_SIZE / 2;
    const originY = CANVAS_SIZE / 2;
    return {
      x: Number(((px - originX) / SCALE_PX_PER_METER).toFixed(1)),
      y: Number(((originY - py) / SCALE_PX_PER_METER).toFixed(1)),
    };
  }, []);

  const toPixels = useCallback((pt: Point) => {
    const originX = CANVAS_SIZE / 2;
    const originY = CANVAS_SIZE / 2;
    return {
      px: originX + pt.x * SCALE_PX_PER_METER,
      py: originY - pt.y * SCALE_PX_PER_METER,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // grid (هر خط = ۵ متر)
    ctx.strokeStyle = "rgba(34,34,34,0.08)";
    ctx.lineWidth = 1;
    const gridStep = SCALE_PX_PER_METER * 5;
    for (let x = 0; x <= CANVAS_SIZE; x += gridStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= CANVAS_SIZE; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_SIZE, y);
      ctx.stroke();
    }

    // polygon
    if (polygon.length > 0) {
      ctx.beginPath();
      const first = toPixels(polygon[0]);
      ctx.moveTo(first.px, first.py);
      for (const pt of polygon.slice(1)) {
        const { px, py } = toPixels(pt);
        ctx.lineTo(px, py);
      }
      if (polygon.length > 2) ctx.closePath();
      ctx.fillStyle = "rgba(109,133,152,0.18)";
      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 2;
      if (polygon.length > 2) ctx.fill();
      ctx.stroke();

      // vertices
      polygon.forEach((pt) => {
        const { px, py } = toPixels(pt);
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#222222";
        ctx.fill();
      });
    }

    // preview line to hover point
    if (hover && polygon.length > 0) {
      const last = toPixels(polygon[polygon.length - 1]);
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(last.px, last.py);
      ctx.lineTo(hover.x * SCALE_PX_PER_METER + CANVAS_SIZE / 2, CANVAS_SIZE / 2 - hover.y * SCALE_PX_PER_METER);
      ctx.strokeStyle = "rgba(34,34,34,0.4)";
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [polygon, hover, toPixels]);

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    onChange([...polygon, toMeters(px, py)]);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    setHover(toMeters(e.clientX - rect.left, e.clientY - rect.top));
  }

  function undoLast() {
    onChange(polygon.slice(0, -1));
  }

  function reset() {
    onChange([]);
  }

  function loadSample() {
    // نمونه ۳۰۰ متری (۱۲×۲۵) — مطابق مثال کاربردی رایج پهنه R122
    onChange([
      { x: -6, y: -12.5 },
      { x: 6, y: -12.5 },
      { x: 6, y: 12.5 },
      { x: -6, y: 12.5 },
    ]);
  }

  function updatePoint(index: number, axis: "x" | "y", value: string) {
    const num = Number(value);
    if (Number.isNaN(num)) return;
    const next = polygon.map((p, i) => (i === index ? { ...p, [axis]: num } : p));
    onChange(next);
  }

  function removePoint(index: number) {
    onChange(polygon.filter((_, i) => i !== index));
  }

  const areaSqm = polygonArea(polygon);

  return (
    <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
      <div>
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          className="cursor-crosshair border border-charcoal/20 bg-warm-white"
        />
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <button type="button" onClick={undoLast} className="border border-charcoal/30 px-3 py-1.5 font-bold hover:bg-charcoal hover:text-warm-white">
            حذف آخرین نقطه
          </button>
          <button type="button" onClick={reset} className="border border-charcoal/30 px-3 py-1.5 font-bold hover:bg-charcoal hover:text-warm-white">
            پاک کردن
          </button>
          <button type="button" onClick={loadSample} className="border border-accent-bronze/60 bg-material-glass/10 px-3 py-1.5 font-bold hover:bg-material-glass hover:text-warm-white">
            بارگذاری زمین نمونه (۳۰۰ متر)
          </button>
        </div>
        <p className="mt-2 text-xs text-charcoal/50">
          روی بوم کلیک کنید تا رأس‌های زمین (به ترتیب) اضافه شوند. هر خط شبکه = ۵ متر.
        </p>
      </div>

      <div>
        <div className="mb-3 border border-charcoal/15 bg-material-sand/40 px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-widest text-charcoal/50">مساحت محاسبه‌شده</span>
          <p className="font-display text-2xl font-black text-charcoal">
            {areaSqm > 0 ? `${areaSqm.toFixed(1)} متر مربع` : "—"}
          </p>
        </div>

        {polygon.length > 0 && (
          <div className="max-h-56 overflow-y-auto border border-charcoal/10">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-charcoal/10 bg-material-sand/50 text-charcoal/60">
                  <th className="px-2 py-2 text-right font-bold">#</th>
                  <th className="px-2 py-2 text-right font-bold">X (متر)</th>
                  <th className="px-2 py-2 text-right font-bold">Y (متر)</th>
                  <th className="px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {polygon.map((pt, i) => (
                  <tr key={i} className="border-b border-charcoal/5">
                    <td className="px-2 py-1.5">{i + 1}</td>
                    <td className="px-2 py-1.5">
                      <input
                        type="number"
                        value={pt.x}
                        onChange={(e) => updatePoint(i, "x", e.target.value)}
                        className="w-16 border border-charcoal/15 bg-warm-white px-1 py-0.5"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="number"
                        value={pt.y}
                        onChange={(e) => updatePoint(i, "y", e.target.value)}
                        className="w-16 border border-charcoal/15 bg-warm-white px-1 py-0.5"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <button type="button" onClick={() => removePoint(i)} className="text-charcoal/40 hover:text-red-500">
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
