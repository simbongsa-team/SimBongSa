export interface VolunteerActivity {
  id: string;
  title: string;
  organization: string;
  category: string;
  image: string;
  location: string;
  distance: number;
  duration: number;
  date: string;
  time: string;
  participants: {
    current: number;
    max: number;
  };
  points: number;
  rating: number;
  reviewCount: number;
  matchScore?: number;
  tags: string[];
  description: string;
  isUrgent?: boolean;
}

export interface UserProfile {
  name: string;
  level: number;
  points: number;
  totalHours: number;
  interests: string[];
  availableTime: string[];
  location: string;
  badges: string[];
  completedActivities: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  emoji: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: number;
  emoji: string;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    level: number;
    avatar: string;
    totalHours: number;
  };
  content: string;
  images?: string[];
  activity?: {
    title: string;
    category: string;
  };
  likes: number;
  comments: number;
  timestamp: string;
  type: 'story' | 'question' | 'review';
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    level: number;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

export interface RankingUser {
  rank: number;
  name: string;
  level: number;
  totalHours: number;
  avatar: string;
  badges: string[];
  trend?: 'up' | 'down' | 'same';
}
