import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/M2rj0DQ6tP7dSzSz/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlays that don't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Spin the Festival Fortune
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-white/80">
          Celebrate with exclusive offers! Spin the wheel and see what reward destiny brings today.
        </p>
        <div className="mt-8">
          <a
            href="#spin"
            className="inline-flex items-center rounded-full bg-red-500 px-6 py-3 text-sm font-semibold shadow-lg ring-1 ring-white/10 transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Play Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
