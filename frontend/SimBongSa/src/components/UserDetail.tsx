import React from 'react'
import { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { categories } from '../data/mockData';

interface OnUserDetailProps {
  onComplete: (data: {
    interests: string[];
    availableTime: string[];
    location: string;
  }) => void;
    setCurrentScreen: (screen: { type: string }) => void;

}
export default function UserDetail({setCurrentScreen,onComplete}: OnUserDetailProps) {
    const [step, setStep] = useState(0);
    const [interests, setInterests] = useState<string[]>([]);
    const [availableTime, setAvailableTime] = useState<string[]>([]);
    const [location, setLocation] = useState('');

    const setupStep = step;

    const toggleInterest = (id: string) => {
    if (interests.includes(id)) {
      setInterests(interests.filter((i) => i !== id));
    } else if (interests.length < 3) {
      setInterests([...interests, id]);
    }
  };

  const toggleTime = (time: string) => {
    if (availableTime.includes(time)) {
      setAvailableTime(availableTime.filter((t) => t !== time));
    } else {
      setAvailableTime([...availableTime, time]);
    }
  };

  const handleNext = () => {
    if (step  === 2) {
      onComplete({ interests, availableTime, location });
     
    } else {
      setStep(step + 1);
    }
}
  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      <div className="mb-8">
        <Progress value={((setupStep + 1) / 3) * 100} className="h-2" />
        <p className="text-gray-600 text-sm mt-2">{setupStep + 1} / 3</p>
      </div>

      {setupStep === 0 && (
        <div className="flex-1">
          <h2 className="text-gray-900 mb-2">관심 있는 분야를 선택해주세요</h2>
          <p className="text-gray-600 mb-6">최대 3개까지 선택 가능합니다</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => toggleInterest(cat.id)}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  interests.includes(cat.id)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-2">{cat.emoji}</div>
                <div className="text-gray-900">{cat.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {setupStep === 1 && (
        <div className="flex-1">
          <h2 className="text-gray-900 mb-2">언제 활동할 수 있나요?</h2>
          <p className="text-gray-600 mb-6">편한 시간대를 선택해주세요</p>
          
          <div className="space-y-3 mb-8">
            {['주중 오전', '주중 오후', '주중 저녁', '주말 오전', '주말 오후', '시간 자유'].map(
              (time) => (
                <button
                  key={time}
                  onClick={() => toggleTime(time)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    availableTime.includes(time)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">{time}</span>
                    {availableTime.includes(time) && <span>✓</span>}
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      )}

      {setupStep === 2 && (
        <div className="flex-1">
          <h2 className="text-gray-900 mb-2">활동 지역을 설정해주세요</h2>
          <p className="text-gray-600 mb-6">현재 위치를 기준으로 추천해드립니다</p>
          
          <div className="bg-gray-100 p-6 rounded-2xl mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📍</span>
              <div className="flex-1">
                <input
                  type="text"
                  // value={location}
                  value="광주광역시 북구 용봉동"
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-gray-900"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white rounded-lg text-sm">현재 위치</button>
              <button className="px-4 py-2 bg-white rounded-lg text-sm">직접 입력</button>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-sm text-blue-900">
              💡 반경 <strong>5km 이내</strong>의 봉사활동을 우선 추천드립니다
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3 pt-6 border-t">
        <Button
            onClick={setupStep === 2 ? () => setCurrentScreen({type : 'login'}) : handleNext}
            size="lg"
            className="w-full bg-orange-500 hover:bg-orange-600"
            disabled={
            (setupStep === 0 && interests.length === 0) ||
            (setupStep === 1 && availableTime.length === 0)
             }
        >
          {setupStep === 2 ? '시작하기' : '다음'}
          
        </Button>
        <Button /*onClick={handleSkip}*/ variant="ghost" size="lg" className="w-full">
          나중에 설정하기
        </Button>
      </div>
    </div>
    );
  }
