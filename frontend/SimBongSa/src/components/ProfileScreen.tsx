import { UserProfile } from '../types';
import { badges, rewardItems, levelSystem } from '../data/mockData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  ChevronLeft,
  Settings,
  Trophy,
  Clock,
  Star,
  Gift,
  Calendar,
  Share2,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ProfileScreenProps {
  user: UserProfile;
  onBack: () => void;
}

export default function ProfileScreen({ user, onBack }: ProfileScreenProps) {
  const currentLevelInfo = levelSystem.find((l) => l.level === user.level);
  const nextLevelInfo = levelSystem.find((l) => l.level === user.level + 1);
  const progressToNextLevel = nextLevelInfo
    ? ((user.totalHours - currentLevelInfo!.minHours) /
        (nextLevelInfo.minHours - currentLevelInfo!.minHours)) *
      100
    : 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-gray-900">마이페이지</h2>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm text-4xl">
              😊
            </div>
            <div className="flex-1">
              <h2 className="mb-1">{user.name}님</h2>
              <p className="text-orange-100 text-sm mb-2">{user.location}</p>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={() => {}}
              >
                <Share2 className="w-4 h-4 mr-2" />
                프로필 공유
              </Button>
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{currentLevelInfo?.emoji}</span>
                <div>
                  <p className="text-sm text-orange-100">현재 레벨</p>
                  <p>
                    Lv.{user.level} {currentLevelInfo?.name}
                  </p>
                </div>
              </div>
              {nextLevelInfo && (
                <div className="text-right">
                  <p className="text-sm text-orange-100">다음 레벨</p>
                  <p className="text-sm">
                    {nextLevelInfo.minHours - user.totalHours}시간 남음
                  </p>
                </div>
              )}
            </div>
            <Progress value={progressToNextLevel} className="h-2 bg-white/20" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-200">
            <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl text-gray-900 mb-1">{user.totalHours}</p>
            <p className="text-sm text-gray-600">누적 시간</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-200">
            <Calendar className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl text-gray-900 mb-1">{user.completedActivities}</p>
            <p className="text-sm text-gray-600">완료한 봉사</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-200">
            <Trophy className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl text-gray-900 mb-1">{user.badges.length}</p>
            <p className="text-sm text-gray-600">획득 배지</p>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">획득한 배지</h3>
            <span className="text-sm text-gray-600">
              {user.badges.length} / {badges.length}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge) => {
              const isUnlocked = user.badges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl text-center transition-all ${
                    isUnlocked
                      ? 'bg-orange-50 border-2 border-orange-200'
                      : 'bg-gray-50 opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-2">{badge.emoji}</div>
                  <p className="text-xs text-gray-900">{badge.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity History */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
          <Tabs defaultValue="completed" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="completed">완료</TabsTrigger>
              <TabsTrigger value="upcoming">예정</TabsTrigger>
              <TabsTrigger value="saved">찜</TabsTrigger>
            </TabsList>
            
            <TabsContent value="completed" className="mt-4">
              <div className="space-y-3">
                {[1, 2, 3].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">유기견 산책 봉사</p>
                      <p className="text-sm text-gray-600">2025-10-15</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      <Star className="w-3 h-3 mr-1" />
                      5.0
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                  <div className="flex-1">
                    <p className="text-gray-900 mb-1">유기견 산책 봉사</p>
                    <p className="text-sm text-gray-600">2025-11-08 (D-3)</p>
                  </div>
                  <Badge className="bg-orange-500 text-white">예정</Badge>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="mt-4">
              <div className="text-center py-8 text-gray-600">
                <p>찜한 봉사활동이 없습니다</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">설정</h3>
          <div className="space-y-3">
            {[
              { label: '관심 분야 수정', icon: '🎯' },
              { label: '알림 설정', icon: '🔔' },
              { label: '위치 설정', icon: '📍' },
              { label: '앱 정보', icon: 'ℹ️' },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-gray-900">{item.label}</span>
                </div>
                <span className="text-gray-400">›</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
