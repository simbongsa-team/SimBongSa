import { useState } from 'react';
import { CommunityPost } from '../types';
import { communityPosts } from '../data/mockData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Heart, MessageCircle, Share2, Send, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CommunityScreenProps {
  onPostClick?: (post: CommunityPost) => void;
}

export default function CommunityScreen({ onPostClick }: CommunityScreenProps) {
  const [posts, setPosts] = useState(communityPosts);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      toast.error('내용을 입력해주세요');
      return;
    }

    const newPost: CommunityPost = {
      id: `new-${Date.now()}`,
      author: {
        name: '김민수',
        level: 3,
        avatar: '😊',
        totalHours: 42,
      },
      content: newPostContent,
      likes: 0,
      comments: 0,
      timestamp: '방금 전',
      type: 'story',
      isLiked: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowCreatePost(false);
    toast.success('게시글이 작성되었습니다!');
  };

  const filterByType = (type?: string) => {
    if (!type) return posts;
    return posts.filter((post) => post.type === type);
  };

  const PostCard = ({ post }: { post: CommunityPost }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
      {/* Author Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
            {post.author.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">{post.author.name}</span>
              <Badge variant="secondary" className="text-xs">
                Lv.{post.author.level}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{post.author.totalHours}시간</span>
              <span>·</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>
        {post.type === 'question' && (
          <Badge className="bg-blue-100 text-blue-700">질문</Badge>
        )}
        {post.type === 'review' && (
          <Badge className="bg-green-100 text-green-700">후기</Badge>
        )}
      </div>

      {/* Activity Tag */}
      {post.activity && (
        <div className="mb-3">
          <Badge variant="outline" className="text-orange-600 border-orange-300">
            📍 {post.activity.title}
          </Badge>
        </div>
      )}

      {/* Content */}
      <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div
          className={`grid gap-2 mb-4 ${
            post.images.length === 1
              ? 'grid-cols-1'
              : post.images.length === 2
              ? 'grid-cols-2'
              : 'grid-cols-2'
          }`}
        >
          {post.images.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt=""
              className="w-full h-48 object-cover rounded-xl"
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 pt-4 border-t">
        <button
          onClick={() => handleLike(post.id)}
          className={`flex items-center gap-2 transition-colors ${
            post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-red-500' : ''}`} />
          <span>{post.likes}</span>
        </button>
        <button
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
          onClick={() => onPostClick?.(post)}
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  if (showCreatePost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setShowCreatePost(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-gray-900">새 게시글</h2>
            <Button
              onClick={handleCreatePost}
              className="bg-orange-500 hover:bg-orange-600"
            >
              게시
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <Textarea
              placeholder="봉사 활동 경험을 공유해주세요..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="min-h-[200px] text-base resize-none border-none focus-visible:ring-0 p-0"
            />
            
            <div className="flex items-center gap-2 mt-4 pt-4 border-t">
              <Button variant="outline" size="sm">
                <ImageIcon className="w-4 h-4 mr-2" />
                사진 추가
              </Button>
              <Button variant="outline" size="sm">
                📍 활동 태그
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-gray-900">커뮤니티</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Create Post Button */}
        <button
          onClick={() => setShowCreatePost(true)}
          className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-xl">
              😊
            </div>
            <p className="text-gray-600">봉사 활동 경험을 공유해주세요...</p>
          </div>
        </button>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-4 bg-white">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="story">일상</TabsTrigger>
            <TabsTrigger value="question">질문</TabsTrigger>
            <TabsTrigger value="review">후기</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6 space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="story" className="mt-6 space-y-4">
            {filterByType('story').map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="question" className="mt-6 space-y-4">
            {filterByType('question').map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="review" className="mt-6 space-y-4">
            {filterByType('review').map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Popular Topics */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">인기 주제 🔥</h3>
          <div className="space-y-3">
            {[
              { topic: '처음 봉사 시작하는 방법', count: 24 },
              { topic: '주말에만 가능한 봉사', count: 18 },
              { topic: '유기견 봉사 후기', count: 15 },
              { topic: '플로깅 모임', count: 12 },
            ].map((item, idx) => (
              <button
                key={idx}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900">{item.topic}</span>
                <span className="text-sm text-gray-600">{item.count}개</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
