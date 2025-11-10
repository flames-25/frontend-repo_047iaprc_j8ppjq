import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 py-10 text-center text-white/70">
      <p>
        © {new Date().getFullYear()} Festival Fortune. Celebrate responsibly. Offers subject to terms.
      </p>
    </footer>
  );
};

export default Footer;
