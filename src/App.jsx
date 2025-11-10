import React from 'react';
import Hero from './components/Hero';
import SpinnerWheel from './components/SpinnerWheel';
import OfferList from './components/OfferList';
import Footer from './components/Footer';

function App() {
  const handleStop = (prize) => {
    // You could send this to a backend later if needed
    console.log('User won:', prize);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <Hero />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Try your luck</h2>
          <p className="mt-3 text-white/70">One spin per visitor. Your reward will appear where the pointer stops.</p>
        </div>

        <div className="mt-10 flex items-center justify-center">
          <SpinnerWheel onStop={handleStop} />
        </div>
      </main>

      <OfferList />
      <Footer />
    </div>
  );
}

export default App;
