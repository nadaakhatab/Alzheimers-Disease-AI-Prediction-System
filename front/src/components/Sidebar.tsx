import { Home, Activity, Dna, Heart, Search } from 'lucide-react';
import { Brain } from 'lucide-react';
import { PageType } from './Dashboard';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onNavigateHome: () => void;
}

export function Sidebar({ currentPage, onNavigate, onNavigateHome }: SidebarProps) {
  const menuItems = [
    { icon: Activity, label: 'Clinical & Demographic', page: 'clinical' as PageType },
    { icon: Dna, label: 'Genetic & Imaging', page: 'genetic' as PageType },
    { icon: Heart, label: 'Medical History', page: 'medical' as PageType },
    { icon: Search, label: 'Result', page: 'result' as PageType },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-purple-500/20 shadow-2xl">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 text-sm">Alzheimer AI</h2>
          </div>
        </div>

        {/* Home Button */}
        <button
          onClick={onNavigateHome}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-purple-500/20 hover:text-pink-400 transition-colors mb-6"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            
            return (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-pink-500/30'
                    : 'text-gray-300 hover:bg-purple-500/20 hover:text-pink-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
