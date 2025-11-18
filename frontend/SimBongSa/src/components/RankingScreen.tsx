import { useState } from 'react';
import { RankingUser } from '../types';
import { rankingUsers, badges } from '../data/mockData';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Award, Medal } from 'lucide-react';

export default function RankingScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('all');
  
  // Mock current user ranking
  const currentUserRank = 42;
  const currentUserHours = 42;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Award className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-gray-600">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'same') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const RankingCard = ({ user, highlight = false }: { user: RankingUser; highlight?: boolean }) => (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition-all ${
        highlight ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Rank */}
        <div className="flex-shrink-0 w-12 text-center">
          {getRankIcon(user.rank)}
        </div>

        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
            user.rank <= 3
              ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
              : 'bg-gradient-to-br from-orange-400 to-orange-500'
          }`}
        >
          {user.avatar}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-gray-900 truncate">{user.name}</h3>
            <Badge variant="secondary" className="text-xs flex-shrink-0">
              Lv.{user.level}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-600">{user.totalHours}시간</span>
            {user.trend && getTrendIcon(user.trend)}
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-1 flex-shrink-0">
          {user.badges.slice(0, 3).map((badgeId) => {
            const badge = badges.find((b) => b.id === badgeId);
            return (
              <div
                key={badgeId}
                className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-lg"
                title={badge?.name}
              >
                {badge?.emoji}
              </div>
            );
          })}
          {user.badges.length > 3 && (
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-600">
              +{user.badges.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-8 h-8" />
            <h1>봉사 시간 랭킹</h1>
          </div>

          {/* Current User Rank */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 mb-1">내 순위</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">#{currentUserRank}</span>
                  <div>
                    <p className="text-sm">누적 시간</p>
                    <p className="text-xl">{currentUserHours}시간</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-orange-100 mb-1">다음 순위까지</p>
                <p className="text-2xl">8시간</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Period Tabs */}
        <Tabs value={selectedPeriod} onValueChange={(v) => setSelectedPeriod(v as any)}>
          <TabsList className="w-full grid grid-cols-3 bg-white">
            <TabsTrigger value="week">주간</TabsTrigger>
            <TabsTrigger value="month">월간</TabsTrigger>
            <TabsTrigger value="all">전체</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Top 3 Podium */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-6 text-center">🏆 명예의 전당 🏆</h3>
          
          <div className="flex items-end justify-center gap-4 mb-6">
            {/* 2nd Place */}
            {rankingUsers[1] && (
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-2">
                  {rankingUsers[1].avatar}
                </div>
                <div className="bg-gray-100 rounded-2xl p-4 pt-8 -mt-6">
                  <div className="text-3xl mb-2">🥈</div>
                  <p className="text-gray-900 mb-1">{rankingUsers[1].name}</p>
                  <p className="text-sm text-orange-600">{rankingUsers[1].totalHours}시간</p>
                </div>
              </div>
            )}

            {/* 1st Place */}
            {rankingUsers[0] && (
              <div className="flex-1 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-2 ring-4 ring-yellow-200">
                  {rankingUsers[0].avatar}
                </div>
                <div className="bg-gradient-to-b from-yellow-50 to-orange-50 rounded-2xl p-4 pt-10 -mt-8 border-2 border-yellow-300">
                  <div className="text-4xl mb-2">👑</div>
                  <p className="text-gray-900 mb-1">{rankingUsers[0].name}</p>
                  <p className="text-orange-600">{rankingUsers[0].totalHours}시간</p>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {rankingUsers[2] && (
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-2">
                  {rankingUsers[2].avatar}
                </div>
                <div className="bg-orange-100 rounded-2xl p-4 pt-8 -mt-6">
                  <div className="text-3xl mb-2">🥉</div>
                  <p className="text-gray-900 mb-1">{rankingUsers[2].name}</p>
                  <p className="text-sm text-orange-600">{rankingUsers[2].totalHours}시간</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full Rankings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">전체 순위</h3>
            <span className="text-sm text-gray-600">총 {rankingUsers.length}명</span>
          </div>

          <div className="space-y-3">
            {rankingUsers.map((user) => (
              <RankingCard key={user.rank} user={user} />
            ))}

            {/* Current User Position (if not in top 10) */}
            {currentUserRank > 10 && (
              <>
                <div className="text-center py-2 text-gray-600">
                  <span>...</span>
                </div>
                <RankingCard
                  user={{
                    rank: currentUserRank,
                    name: '김민수',
                    level: 3,
                    totalHours: currentUserHours,
                    avatar: '😊',
                    badges: ['animal_master', 'early_bird', 'environment_hero'],
                    trend: 'up',
                  }}
                  highlight
                />
              </>
            )}
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-gray-900 mb-4">📊 랭킹 통계</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">평균 봉사 시간</p>
              <p className="text-2xl text-gray-900">68시간</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">전체 참여자</p>
              <p className="text-2xl text-gray-900">1,247명</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">이번 주 신규</p>
              <p className="text-2xl text-gray-900">34명</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">누적 봉사 시간</p>
              <p className="text-2xl text-gray-900">84,792h</p>
            </div>
          </div>
        </div>

        {/* Motivation Card */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-gray-900 mb-2">계속 도전하세요!</h3>
            <p className="text-gray-600 mb-4">
              꾸준한 봉사가 순위를 높이는 비결입니다
            </p>
            <div className="flex gap-2 justify-center">
              <div className="bg-white px-4 py-2 rounded-full text-sm">
                💪 주간 목표 달성
              </div>
              <div className="bg-white px-4 py-2 rounded-full text-sm">
                🔥 연속 참여 중
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
