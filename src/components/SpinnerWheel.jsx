import React, { useMemo, useRef, useState } from 'react';

const defaultPrizes = [
  { label: '10% OFF', color: '#ef4444' },
  { label: 'Free Shipping', color: '#f59e0b' },
  { label: '15% OFF', color: '#10b981' },
  { label: 'Try Again', color: '#3b82f6' },
  { label: 'Buy 1 Get 1', color: '#8b5cf6' },
  { label: '25% OFF', color: '#ec4899' },
  { label: 'Mystery Gift', color: '#22c55e' },
  { label: '5% OFF', color: '#06b6d4' },
];

function drawWheel(ctx, size, items, rotation) {
  const radius = size / 2;
  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.translate(radius, radius);
  ctx.rotate(rotation);

  const arc = (2 * Math.PI) / items.length;
  items.forEach((item, i) => {
    const start = i * arc;
    const end = start + arc;

    // Slice
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();

    // Separator line
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(
      Math.cos(start) * radius,
      Math.sin(start) * radius
    );
    ctx.stroke();

    // Text
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.font = `${Math.max(12, radius / 10)}px ui-sans-serif, system-ui, -apple-system`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const angle = start + arc / 2;
    ctx.rotate(angle);
    ctx.translate(radius * 0.62, 0);
    ctx.rotate(Math.PI / 2);
    ctx.fillText(item.label, 0, 0);
    ctx.restore();
  });

  // Center circle
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.12, 0, 2 * Math.PI);
  ctx.fillStyle = '#111827';
  ctx.fill();

  ctx.restore();
}

const SpinnerWheel = ({ prizes = defaultPrizes, onStop }) => {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const size = 340;

  const items = useMemo(() => prizes, [prizes]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    drawWheel(ctx, size, items, rotation);
  }, [items, rotation]);

  const spin = () => {
    if (spinning) return;
    setResult(null);
    setSpinning(true);

    const spinRounds = 5 + Math.random() * 3; // 5-8 spins
    const arc = (2 * Math.PI) / items.length;

    // Pick target index randomly where the pointer will stop (top center)
    const targetIndex = Math.floor(Math.random() * items.length);
    const targetAngle = (3 * Math.PI) / 2 - targetIndex * arc; // pointer at -90deg (top)

    const finalRotation = spinRounds * 2 * Math.PI + targetAngle;

    const duration = 3800 + Math.random() * 800; // ms
    const start = performance.now();
    const initialRotation = rotation % (2 * Math.PI);

    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = initialRotation + eased * (finalRotation - initialRotation);
      setRotation(current);
      if (t < 1) requestAnimationFrame(step);
      else {
        setSpinning(false);
        const index = targetIndex;
        const prize = items[index];
        setResult(prize);
        onStop && onStop(prize, index);
      }
    }

    requestAnimationFrame(step);
  };

  return (
    <div id="spin" className="w-full flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="rounded-full shadow-2xl bg-gray-900"
        />
        {/* Pointer */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3"
          aria-hidden
        >
          <div className="h-10 w-10 rotate-180" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', background: '#f43f5e' }} />
        </div>
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="mt-6 inline-flex items-center rounded-full bg-red-500 px-8 py-3 text-white font-semibold shadow-lg ring-1 ring-white/10 transition hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {spinning ? 'Spinning…' : 'Spin the Wheel'}
      </button>

      {result && (
        <div className="mt-6 rounded-xl bg-white/5 p-4 text-center text-white ring-1 ring-white/10">
          <p className="text-sm uppercase tracking-widest text-white/70">You won</p>
          <p className="mt-1 text-2xl font-extrabold">{result.label}</p>
        </div>
      )}
    </div>
  );
};

export default SpinnerWheel;
