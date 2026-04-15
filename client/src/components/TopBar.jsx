import { useNavigate, Link } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <header className="pointer-events-auto h-12 flex justify-center items-center gap-6 px-6 bg-surface-container-lowest/30 hover:bg-surface-container-lowest/60 backdrop-blur-md shadow-sm rounded-full border border-outline-variant/10 transition-colors text-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-medium group pr-4 border-r border-outline-variant/10"
        >
          <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back
        </button>

        <nav className="hidden md:flex items-center gap-6 px-4">
          <Link to="/about" className="text-on-surface-variant hover:text-on-surface hover:text-primary transition-colors font-medium tracking-tight">About Us</Link>
          <Link to="/features" className="text-on-surface-variant hover:text-on-surface hover:text-primary transition-colors font-medium tracking-tight">Features</Link>
          <Link to="/pricing" className="text-on-surface-variant hover:text-on-surface hover:text-primary transition-colors font-medium tracking-tight">Pricing</Link>
        </nav>
        
        <div className="flex items-center gap-4 pl-4 border-l border-outline-variant/10">
          <div className="relative group flex items-center cursor-pointer">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant hover:text-primary transition-colors">notifications</span>
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-primary rounded-full"></span>
          </div>
        </div>
      </header>
    </div>
  );
}
