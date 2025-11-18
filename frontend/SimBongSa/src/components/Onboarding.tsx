import { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { categories } from '../data/mockData';

interface OnboardingProps {
  onComplete: (data: {
    interests: string[];
    availableTime: string[];
    location: string;
  }) => void;
    setCurrentScreen: (screen: { type: string }) => void;

}

const slides = [
  {
    title: '1분 만에 나에게 딱 맞는 봉사 찾기',
    description: 'AI가 당신의 관심사와 시간에 맞는 봉사활동을 추천해드립니다',
    emoji: '⚡',
  },
  {
    title: 'AI가 분석한 맞춤 활동 추천',
    description: '복잡한 검색은 그만! 맞춤형 추천으로 빠르게 매칭하세요',
    emoji: '🤖',
  },
  {
    title: '포인트 쌓고 혜택 받기',
    description: '봉사하면서 포인트를 모아 다양한 리워드를 받아보세요',
    emoji: '🎁',
  },
];

export default function Onboarding({setCurrentScreen ,onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [availableTime, setAvailableTime] = useState<string[]>([]);
  const [location, setLocation] = useState('');

  const isSlidePhase = step < slides.length;

  const handleNext = () => {
    if (step + 1 === slides.length) {
      // onComplete({ interests, availableTime, location });
      setCurrentScreen({type: 'register'});
    } else {
      setStep(step + 1);
    }
  };
// 스킵 시 설정되는 값
  const handleSkip = () => {
    onComplete({ interests: ['animal'], availableTime: ['주말'], location: '광주광역시 광산구' });
  };

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

  if (isSlidePhase) {
    const currentSlide = slides[step];
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center justify-center p-6">
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
        >
          건너뛰기
        </button>
        
        <div className="text-center max-w-md">
          <div className="text-8xl mb-8 animate-bounce">{currentSlide.emoji}</div>
          <h1 className="text-gray-900 mb-4">{currentSlide.title}</h1>
          <p className="text-gray-600 mb-12">{currentSlide.description}</p>
          
          <div className="flex gap-2 justify-center mb-8">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === step ? 'w-8 bg-orange-500' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <Button onClick={handleNext} size="lg" className="w-full bg-orange-500 hover:bg-orange-600">
            {step === slides.length - 1 ? '시작하기' : '다음'}
          </Button>
        </div>
      </div>
    );
  }

  // const setupStep = step - slides.length;

  // return (
  //   <div className="min-h-screen bg-white flex flex-col p-6">
  //     <div className="mb-8">
  //       <Progress value={((setupStep + 1) / 3) * 100} className="h-2" />
  //       <p className="text-gray-600 text-sm mt-2">{setupStep + 1} / 3</p>
  //     </div>

  //     {setupStep === 0 && (
  //       <div className="flex-1">
  //         <h2 className="text-gray-900 mb-2">관심 있는 분야를 선택해주세요</h2>
  //         <p className="text-gray-600 mb-6">최대 3개까지 선택 가능합니다</p>
          
  //         <div className="grid grid-cols-2 gap-4 mb-8">
  //           {categories.map((cat) => (
  //             <button
  //               key={cat.id}
  //               onClick={() => toggleInterest(cat.id)}
  //               className={`p-6 rounded-2xl border-2 transition-all ${
  //                 interests.includes(cat.id)
  //                   ? 'border-orange-500 bg-orange-50'
  //                   : 'border-gray-200 hover:border-gray-300'
  //               }`}
  //             >
  //               <div className="text-4xl mb-2">{cat.emoji}</div>
  //               <div className="text-gray-900">{cat.name}</div>
  //             </button>
  //           ))}
  //         </div>
  //       </div>
  //     )}

  //     {setupStep === 1 && (
  //       <div className="flex-1">
  //         <h2 className="text-gray-900 mb-2">언제 활동할 수 있나요?</h2>
  //         <p className="text-gray-600 mb-6">편한 시간대를 선택해주세요</p>
          
  //         <div className="space-y-3 mb-8">
  //           {['주중 오전', '주중 오후', '주중 저녁', '주말 오전', '주말 오후', '시간 자유'].map(
  //             (time) => (
  //               <button
  //                 key={time}
  //                 onClick={() => toggleTime(time)}
  //                 className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
  //                   availableTime.includes(time)
  //                     ? 'border-orange-500 bg-orange-50'
  //                     : 'border-gray-200 hover:border-gray-300'
  //                 }`}
  //               >
  //                 <div className="flex items-center justify-between">
  //                   <span className="text-gray-900">{time}</span>
  //                   {availableTime.includes(time) && <span>✓</span>}
  //                 </div>
  //               </button>
  //             )
  //           )}
  //         </div>
  //       </div>
  //     )}

  //     {setupStep === 2 && (
  //       <div className="flex-1">
  //         <h2 className="text-gray-900 mb-2">활동 지역을 설정해주세요</h2>
  //         <p className="text-gray-600 mb-6">현재 위치를 기준으로 추천해드립니다</p>
          
  //         <div className="bg-gray-100 p-6 rounded-2xl mb-6">
  //           <div className="flex items-center gap-3 mb-4">
  //             <span className="text-2xl">📍</span>
  //             <div className="flex-1">
  //               <input
  //                 type="text"
  //                 value={location}
  //                 onChange={(e) => setLocation(e.target.value)}
  //                 className="w-full bg-transparent border-none outline-none text-gray-900"
  //               />
  //             </div>
  //           </div>
  //           <div className="flex gap-2">
  //             <button className="px-4 py-2 bg-white rounded-lg text-sm">현재 위치</button>
  //             <button className="px-4 py-2 bg-white rounded-lg text-sm">직접 입력</button>
  //           </div>
  //         </div>

  //         <div className="bg-blue-50 p-4 rounded-xl">
  //           <p className="text-sm text-blue-900">
  //             💡 반경 <strong>5km 이내</strong>의 봉사활동을 우선 추천드립니다
  //           </p>
  //         </div>
  //       </div>
  //     )}

  //     <div className="space-y-3 pt-6 border-t">
  //       <Button
  //         onClick={handleNext}
  //         size="lg"
  //         className="w-full bg-orange-500 hover:bg-orange-600"
  //         disabled={
  //           (setupStep === 0 && interests.length === 0) ||
  //           (setupStep === 1 && availableTime.length === 0)
  //         }
  //       >
  //         {setupStep === 2 ? '시작하기' : '다음'}
  //       </Button>
  //       <Button onClick={handleSkip} variant="ghost" size="lg" className="w-full">
  //         나중에 설정하기
  //       </Button>
  //     </div>
  //   </div>
  // );
}
