import { motion } from 'motion/react';
import { Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 w-full h-[80px] bg-[#0a0e27]/80 backdrop-blur-md border-b border-[#334155] z-50 flex items-center justify-between px-6 md:px-12">
      <Link to="/" className="text-[#f8fafc] font-bold text-xl tracking-tight">
        CASCADING APIS
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {[
          { name: 'Home', path: '/' },
          { name: 'Demos', path: isHome ? '#demos' : '/#demos' },
          { name: 'Chain Builder', path: '/chain-builder' },
          { name: 'Methodology', path: '/methodology' },
          { name: 'About', path: '/about' }
        ].map((link) => {
          const isExternal = link.path.startsWith('/#') || link.path.startsWith('#');
          return isExternal ? (
            <a
              key={link.name}
              href={link.path}
              className="text-[#94a3b8] text-base hover:text-white transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3b82f6] transition-all duration-300 group-hover:w-full" />
            </a>
          ) : (
            <Link
              key={link.name}
              to={link.path}
              className="text-[#94a3b8] text-base hover:text-white transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3b82f6] transition-all duration-300 group-hover:w-full" />
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-6">
        <button className="text-[#94a3b8] hover:text-[#3b82f6] transition-colors">
          <Moon size={24} />
        </button>
      </div>
    </nav>
  );
};
