import { VolunteerActivity } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  MapPin,
  Clock,
  Users,
  Star,
  Calendar,
  Heart,
  Share2,
  ChevronLeft,
} from 'lucide-react';

interface ActivityDetailProps {
  activity: VolunteerActivity;
  onBack: () => void;
  onApply: () => void;
}

export default function ActivityDetail({ activity, onBack, onApply }: ActivityDetailProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative">
        {/* <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-80 object-cover"
        /> */}
        {activity.isUrgent && (
          <div className="absolute top-6 left-6">
            <Badge className="bg-red-500 text-white text-base px-4 py-2">
              ⚡ 긴급 모집
            </Badge>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Match Score */}
        {activity.matchScore && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎯</div>
              <div className="flex-1">
                <h3 className="text-orange-900 mb-1">
                  {activity.matchScore}% 매칭도
                </h3>
                <p className="text-sm text-orange-700">
                  관심분야 일치 · 거리 가까움 · 시간대 적합
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Title & Organization */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-600">{activity.organization}</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">
                {activity.rating} ({activity.reviewCount})
              </span>
            </div>
          </div>
          <h1 className="text-gray-900 mb-4">{activity.title}</h1>
          
          <div className="flex flex-wrap gap-2">
            {activity.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Key Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Calendar className="w-5 h-5" />
              <span>날짜</span>
            </div>
            <p className="text-gray-900">
              {activity.date}
              <br />
              {activity.time}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Clock className="w-5 h-5" />
              <span>소요시간</span>
            </div>
            <p className="text-gray-900">{activity.duration}시간</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPin className="w-5 h-5" />
              <span>위치</span>
            </div>
            <p className="text-gray-900">
              {activity.location}
              <br />
              <span className="text-sm text-gray-600">{activity.distance}km</span>
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Users className="w-5 h-5" />
              <span>모집인원</span>
            </div>
            <p className="text-gray-900">
              {activity.participants.current} / {activity.participants.max}명
            </p>
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-5 mb-6">
          <h3 className="text-gray-900 mb-3">받을 수 있는 혜택</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎁</span>
              <div>
                <p className="text-orange-600">{activity.points} 포인트</p>
                <p className="text-sm text-gray-600">봉사 완료 시 적립</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">1365 시간 인정</p>
              <p className="text-orange-600">{activity.duration}시간</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3">활동 내용</h3>
          <p className="text-gray-600 leading-relaxed">{activity.description}</p>
        </div>

        {/* Map Preview */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3">위치 안내</h3>
          <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">{activity.location}</p>
              <Button variant="outline" size="sm" className="mt-3">
                지도에서 보기
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Preview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-900">참여자 후기</h3>
            <button className="text-sm text-gray-600">모두 보기</button>
          </div>
          
          <div className="space-y-3">
            {[
              {
                name: '김OO',
                rating: 5,
                comment: '정말 보람찬 활동이었습니다! 다음에도 꼭 참여하고 싶어요.',
                date: '2주 전',
              },
              {
                name: '이OO',
                rating: 5,
                comment: '처음이라 걱정했는데 친절하게 안내해주셔서 감사했습니다.',
                date: '1개월 전',
              },
            ].map((review, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">{review.name}</span>
                    <div className="flex items-center">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom spacing for fixed button */}
        <div className="h-24" />
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="w-16"
            onClick={() => {}}
          >
            <Heart className="w-5 h-5" />
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            onClick={onApply}
          >
            신청하기
          </Button>
        </div>
      </div>
    </div>
  );
}
