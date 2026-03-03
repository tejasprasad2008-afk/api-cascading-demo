

export const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0e27] border-t border-[#334155] py-12 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-8">
        <div className="flex gap-8 text-[#94a3b8] text-base">
          {['Google Scholar', 'GitHub', 'SSRN'].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-white hover:underline transition-all"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="text-[#64748b] text-sm text-center">
          © 2026 Tejas Prasad | Research Publication
        </div>
      </div>
    </footer>
  );
};
