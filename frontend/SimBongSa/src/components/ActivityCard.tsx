import { VolunteerActivity } from '../types';
import { Badge } from './ui/badge';
import { MapPin, Clock, Users, Star } from 'lucide-react';

interface ActivityCardProps {
  activity: VolunteerActivity;
  onClick: () => void;
  showMatchScore?: boolean;
  size?: 'default' | 'compact';
}

export default function ActivityCard({ activity, onClick, showMatchScore = false, size = 'default' }: ActivityCardProps) {
  if (size === 'compact') {
    return (
      <button
        onClick={onClick}
        className="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all"
      >
        <div className="relative">
          {/* <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-40 object-cover"
          /> */}
          {activity.isUrgent && (
            <div className="absolute top-3 left-3">
              {/* <Badge className="bg-red-500 text-white">⚡ 마감임박</Badge> */}
            </div>
          )}
          {showMatchScore && activity.matchScore && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-orange-500 text-white text-xs">
                {activity.matchScore}%
              </Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="text-sm text-gray-600 mb-1">{activity.organization}</div>
          <div className="text-gray-900 mb-2 line-clamp-2">{activity.title}</div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {activity.distance}km
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {activity.duration}시간
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all text-left"
    >
      <div className="relative">
        {/* <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-48 object-cover"
        /> */}
        {activity.isUrgent && (
          <div className="absolute top-3 left-3">
            {/* <Badge className="bg-red-500 text-white">⚡ 마감임박</Badge> */}
          </div>
        )}
        {showMatchScore && activity.matchScore && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-orange-500 text-white">
              {activity.matchScore}% 매칭
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="text-sm text-gray-600 mb-1">{activity.organization}</div>
            <h3 className="text-gray-900 mb-2">{activity.title}</h3>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{activity.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {activity.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{activity.distance}km</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{activity.duration}시간</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>
              {activity.participants.current}/{activity.participants.max}명
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-600">{activity.points}P</span>
          </div>
        </div>
      </div>
    </button>
  );
}
