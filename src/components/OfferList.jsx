import React from 'react';

const OfferList = () => {
  const perks = [
    {
      title: 'Festival Specials',
      desc: 'Limited-time rewards curated for the season. Spin daily to unlock savings.'
    },
    {
      title: 'Fair & Random',
      desc: 'Every spin is unique with transparent odds across all segments.'
    },
    {
      title: 'Instant Redemption',
      desc: 'Apply your reward at checkout immediately—no waiting, no hassle.'
    }
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">Why you will love this</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {perks.map((p) => (
          <div key={p.title} className="rounded-2xl bg-white/5 p-6 text-white ring-1 ring-white/10">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-white/70">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfferList;
