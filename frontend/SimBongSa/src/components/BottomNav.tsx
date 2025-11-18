import { Home, Users, Trophy, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'community', label: '커뮤니티', icon: Users },
    { id: 'ranking', label: '랭킹', icon: Trophy },
    { id: 'profile', label: '마이', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-20 shadow-lg">
      <div className="max-w-2xl mx-auto px-2">
        <div className="grid grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 py-3 transition-colors ${
                  isActive ? 'text-orange-500' : 'text-gray-600'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
