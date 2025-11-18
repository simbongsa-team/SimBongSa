import { useState } from 'react';
import { UserProfile, VolunteerActivity } from './types';
import Onboarding from './components/Onboarding';
import HomeScreen from './components/HomeScreen';
import ActivityDetail from './components/ActivityDetail';
import ProfileScreen from './components/ProfileScreen';
import CommunityScreen from './components/CommunityScreen';
import RankingScreen from './components/RankingScreen';
import BottomNav from './components/BottomNav';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import Login from './components/Login';
import Register from './components/Register';
import UserDetail from './components/UserDetail.tsx';

type AppScreen = 
  | { type: 'onboarding' }
  | { type: 'home' }
  | { type: 'detail'; activity: VolunteerActivity }
  | { type: 'profile' }
  | { type: 'community' }
  | { type: 'ranking' }
  | { type: 'login'}
  | { type: 'register'}
  | { type: 'userdetail'}

export default function App() {
  
  const [currentScreen, setCurrentScreen] = useState<AppScreen>({ type: 'onboarding' });
  const [activeTab, setActiveTab] = useState('home');
  

  const [user, setUser] = useState<UserProfile>({
    name: '이현준',
    level: 3,
    points: 1250,
    totalHours: 42,
    interests: ['animal', 'environment','health','culture','disabled','children','education'],
    availableTime: ['주말 오전', '주말 오후'],
    location: '광주광역시 광산구',
    badges: ['animal_master', 'early_bird', 'environment_hero'],
    completedActivities: 15,
  });

  const handleOnboardingComplete = (data: {
    interests: string[];
    availableTime: string[];
    location: string;
  }) => {
    setUser({
      ...user,
      interests: data.interests,
      availableTime: data.availableTime,
      location: data.location,
    });
    setCurrentScreen({ type: 'home' });
  };

  const handleActivityClick = (activity: VolunteerActivity) => {
    setCurrentScreen({ type: 'detail', activity });
  };

  const handleApply = () => {
    toast.success('신청이 완료되었습니다!', {
      description: '봉사 활동 시작 1일 전에 알림을 보내드릴게요.',
    });
    setCurrentScreen({ type: 'home' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentScreen({ type: 'home' });
    } else if (tab === 'profile') {
      setCurrentScreen({ type: 'profile' });
    } else if (tab === 'community') {
      setCurrentScreen({ type: 'community' });
    } else if (tab === 'ranking') {
      setCurrentScreen({ type: 'ranking' });
    }
  };

  if (currentScreen.type === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete}
       /*onBoarding에서 바로 로그인 화면*/setCurrentScreen={setCurrentScreen}/>;
    
  }

  if (currentScreen.type === 'detail') {
    return (
      <ActivityDetail
        activity={currentScreen.activity}
        onBack={() => setCurrentScreen({ type: 'home' })}
        onApply={handleApply}
      />
    );
  }

  if (currentScreen.type === 'profile') {
    return (
      <>
        <ProfileScreen user={user} onBack={() => setCurrentScreen({ type: 'home' })} />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </>
    );
  }

  if (currentScreen.type === 'community') {
    return (
      <>
        <CommunityScreen onPostClick={() => toast.info('게시글 상세 보기')} />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </>
    );
  }

  if (currentScreen.type === 'ranking') {
    return (
      <>
        <RankingScreen />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </>
    );
  }

if (currentScreen.type === 'login') {
  return (
     <Login
      setCurrentScreen={setCurrentScreen}/*로그인에서 화면 변경할떄 */
      onLoginSuccess={() => setCurrentScreen({ type: 'home' })}
      />
  );
}

  if (currentScreen.type === 'register') {
    return (
      <>
       <Register
       setCurrentScreen={setCurrentScreen}
       />
      </>
    );
  }

  if(currentScreen.type === 'userdetail'){
    return(
      <>
      <UserDetail
      setCurrentScreen={setCurrentScreen}/>
      </>
    )
  }
  return (
    <>
      <HomeScreen
        user={user}
        onActivityClick={handleActivityClick}
        onCategoryClick={() => {}} // Category filtering is now handled internally in HomeScreen
        onProfileClick={() => setCurrentScreen({ type: 'login' })}
        onSearchClick={() => toast.info('검색 기능 준비중입니다')}
      />
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      <Toaster position="top-center" />
    </>
  );
}
