import React from 'react';
import { BookOpen, Globe, Compass, Sparkles, Search, Info } from 'lucide-react';

interface NavigationProps {
  currentView: 'documentary' | 'archive' | 'map' | 'countries' | 'constellation';
  onSelectView: (view: 'documentary' | 'archive' | 'map' | 'countries' | 'constellation') => void;
  onOpenSearch: () => void;
  onOpenAbout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onSelectView,
  onOpenSearch,
  onOpenAbout,
}) => {
  const navItems = [
    {
      id: 'documentary' as const,
      label: 'SHOWCASE',
      icon: Sparkles,
      action: () => onSelectView('documentary'),
    },
    {
      id: 'archive' as const,
      label: 'ARCHIVE',
      icon: BookOpen,
      action: () => onSelectView('archive'),
    },
    {
      id: 'map' as const,
      label: 'ATLAS',
      icon: Globe,
      action: () => onSelectView('map'),
    },
    {
      id: 'countries' as const,
      label: 'ORIGINS',
      icon: Compass,
      action: () => onSelectView('countries'),
    },
    {
      id: 'constellation' as const,
      label: 'CONSTELLATION',
      icon: Sparkles,
      action: () => onSelectView('constellation'),
    },
  ];

  return (
    <>
      {/* Desktop: Floating Left-Side Vertical Navigation Rail */}
      <aside
        id="desktop-side-nav"
        aria-label="Side Navigation"
        className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center py-6 px-3 bg-[#080808]/90 backdrop-blur-md rounded-full border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.8)] pointer-events-auto w-16"
      >
        <div className="flex flex-col items-center space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <div key={item.id} className="relative group flex flex-col items-center">
                <button
                  id={`nav-item-${item.id}`}
                  onClick={item.action}
                  aria-label={item.label}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                    isActive
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                      : 'text-[#8C8C87] hover:text-[#F5F5F0] hover:bg-white/5 hover:scale-105'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px] stroke-[1.5]" />
                </button>

                {/* Elegant tooltips with 150-250ms delay feeling */}
                <div className="absolute left-16 ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#121212] text-[#F5F5F2] text-[10px] font-mono tracking-wider rounded border border-white/5 shadow-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-300 whitespace-nowrap z-50">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Delicate divider */}
        <div className="w-6 h-[1px] bg-white/10 my-4" />

        {/* Secondary utility actions */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative group">
            <button
              id="side-nav-search-btn"
              onClick={onOpenSearch}
              aria-label="Search Collection"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#8C8C87] hover:text-[#F5F5F0] hover:bg-white/5 transition-all"
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
            </button>
            <div className="absolute left-16 ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#121212] text-[#F5F5F2] text-[10px] font-mono tracking-wider rounded border border-white/5 shadow-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-300 whitespace-nowrap z-50">
              SEARCH (/)
            </div>
          </div>

          <div className="relative group">
            <button
              id="side-nav-about-btn"
              onClick={onOpenAbout}
              aria-label="About Colophon"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#8C8C87] hover:text-[#F5F5F0] hover:bg-white/5 transition-all"
            >
              <Info className="w-4 h-4 stroke-[1.5]" />
            </button>
            <div className="absolute left-16 ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#121212] text-[#F5F5F2] text-[10px] font-mono tracking-wider rounded border border-white/5 shadow-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-300 whitespace-nowrap z-50">
              ABOUT
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile: Floating Bottom Navigation Bar */}
      <nav
        id="mobile-nav-bar"
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 px-4 py-2.5 bg-[#080808]/95 backdrop-blur-lg rounded-full border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] pointer-events-auto"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-item-${item.id}`}
              onClick={item.action}
              aria-label={item.label}
              className={`p-3 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                  : 'text-[#8C8C87] hover:text-[#F5F5F0]'
              }`}
            >
              <Icon className="w-[15px] h-[15px]" />
            </button>
          );
        })}
        <div className="w-[1px] h-4 bg-white/10" />
        <button
          id="mobile-nav-search-btn"
          onClick={onOpenSearch}
          aria-label="Search"
          className="p-3 rounded-full text-[#8C8C87] hover:text-[#F5F5F0]"
        >
          <Search className="w-[15px] h-[15px]" />
        </button>
      </nav>
    </>
  );
};
