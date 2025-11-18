import { useState } from 'react';
import { UserProfile, VolunteerActivity } from '../types';
import { categories, mockActivities } from '../data/mockData';
import ActivityCard from './ActivityCard';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Bell, Search, Gift, Trophy, User } from 'lucide-react';
import SearchForm from './Searchform';

interface HomeScreenProps {
  user: UserProfile;
  onActivityClick: (activity: VolunteerActivity) => void;
  onCategoryClick: (categoryId: string) => void;
  onProfileClick: () => void;
  onSearchClick: () => void;

}

export default function HomeScreen({
  user,
  onActivityClick,
  onCategoryClick,
  onProfileClick,
  onSearchClick,
}: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get top recommendations sorted by match score
  const recommendedActivities = mockActivities
    .filter((a) => user.interests.includes(a.category))
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 5); // Get top 5 recommendations

  const currentLevel = user.level;
  const nextLevelHours = currentLevel === 1 ? 10 : currentLevel === 2 ? 30 : 100;
  const levelProgress = (user.totalHours / nextLevelHours) * 100;

  // Filter activities based on selected category
  const displayedActivities = selectedCategory
    ? mockActivities.filter((a) => a.category === selectedCategory)
    : mockActivities;

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null); // Deselect if clicking the same category
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-gray-900 logo">심봉사</h1>
          <div className="flex items-center gap-2">
            {/* <button onClick={onSearchClick} className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5" />
            </button> */}
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {/* <button
              onClick={onProfileClick}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label={status === "authenticated" ? "프로필 열기" : "로그인"}
            >
              {status === "authenticated" ? (
               <User className="w-5 h-5" />
                 ) : (
                <span className="text-sm">마이페이지</span>
              )}
            </button> */}
          </div>
        </div>
      </div>
       
      
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <SearchForm/>
        {/* Level & Points */}
        {/* <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-orange-500" />
              <span className="text-gray-600">레벨</span>
            </div>
            <div className="text-2xl mb-2">
              Lv.{user.level} {['🌱', '🌿', '🌳', '🌲'][user.level - 1]}
            </div>
            <Progress value={levelProgress} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">
              다음까지 {nextLevelHours - user.totalHours}시간
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-5 h-5 text-orange-500" />
              <span className="text-gray-600">EXP</span>
            </div>
            <div className="text-2xl mb-2">{user.points.toLocaleString()}P</div>
            다음까지 {nextLevelHours - user.totalHours}시간
          </div>
        </div> */}

        {/* Top Recommendation - Highlighted */}
        {recommendedActivities.length > 0 && (
          <div>
            <div className="mb-4">
              <h2 className="text-gray-900 mb-2">🎯 {user.name}님을 위한 최고의 추천</h2>
              <p className="text-sm text-gray-600">AI가 분석한 가장 적합한 봉사활동이에요</p>
            </div>
            
            {/* Hero Card for Top Recommendation */}
            <div className="mb-6">
              <ActivityCard
                activity={recommendedActivities[0]}
                onClick={() => onActivityClick(recommendedActivities[0])}
                showMatchScore
              />
            </div>
          </div>
        )}

        {/* Next Best Recommendations */}
        {recommendedActivities.length > 1 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">다른 추천 봉사</h3>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {recommendedActivities.slice(1, 5).map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onClick={() => onActivityClick(activity)}
                  size="compact"
                  showMatchScore
                />
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">카테고리별 둘러보기</h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-orange-600"
              >
                전체 보기
              </button>
            )}
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all min-w-[80px] ${
                  selectedCategory === cat.id
                    ? 'bg-orange-50 border-orange-500'
                    : 'bg-white border-gray-200 hover:border-orange-500'
                }`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm text-gray-900">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Activities or All Activities */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">
              {selectedCategory
                ? `${categories.find((c) => c.id === selectedCategory)?.name} 봉사 활동`
                : '전체 봉사 활동'}
            </h2>
            <span className="text-sm text-gray-600">
              {displayedActivities.length}개
            </span>
          </div>
          
          <div className="space-y-4">
            {displayedActivities.length > 0 ? (
              displayedActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onClick={() => onActivityClick(activity)}
                  showMatchScore={user.interests.includes(activity.category)}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <div className="text-6xl mb-4">
                  {categories.find((c) => c.id === selectedCategory)?.emoji}
                </div>
                <h3 className="text-gray-900 mb-2">아직 등록된 활동이 없어요</h3>
                <p className="text-gray-600">
                  곧 새로운 봉사활동이 추가될 예정입니다
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom padding for navigation */}
      <div className="h-20" />
    </div>
  );
}
