import { useState } from 'react';
import { RankingUser } from '../types';
import { rankingUsers, badges } from '../data/mockData';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Bell, Search, Gift, Trophy, User, Mail, Lock, Eye, EyeOff  } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Header from './header/header';
import React from 'react'

  const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const KakaoIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="KakaoTalk">
  <rect x="0" y="0" width="128" height="128" rx="28" fill="#FEE500"/>
  <path d="M64 34c-20 0-36 12.9-36 28.8 0 8.6 4.8 16.3 12.6 21.5L37 97l18.6-11.2c2.7.5 5.5.8 8.4.8 20 0 36-12.9 36-28.8S84 34 64 34z" fill="#3C1E1E"/>
</svg>
);


type LoginProps = {
  setCurrentScreen: (screen: { type: string }) => void;
  onLoginSuccess: () => void;
};

function Login({ setCurrentScreen, onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 로그인 로직 구현 (API 호출 등)
    console.log({ email, password });
    onLoginSuccess(); // 로그인 성공 시 홈 화면으로 이동
  };


  return (
    <>
      <div className="bg-white border-b sticky top-0 z-10">
      <Header/>
    </div>
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-gray-50 rounded-2xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">심봉사</h1>
          <p className="mt-2 text-sm text-gray-600">로그인하고 봉사활동을 시작해보세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flew-wrap border border-gray-300 rounded-lg">
            <Mail className="flex text-gray-400 items-center justify-center mt-3" />
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-2 ml-2 pl-10 pr-4 py-3 border-none border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div className="flex flew-wrap border border-gray-300 rounded-lg">
            <Lock className="flex text-gray-400 items-center justify-center mt-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-2 ml-2 pl-10 pr-4 py-3 border-none border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 text-white bg-orange-500 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            로그인
          </button>

          <div className="text-center">
            <a href="#" className="text-sm text-gray-600 hover:underline">
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button aria-label="Google로 로그인" className="p-2 border border-gray-200 rounded-full hover:bg-gray-50">
            <GoogleIcon />
          </button>
          <button aria-label="카카오로 로그인" className="p-2 border border-gray-200 rounded-full hover:bg-gray-50">
             <KakaoIcon />
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?{" "}
            <button
                     onClick={() => setCurrentScreen({ type: 'register' })}
                    className="font-semibold text-orange-500 hover:underline"
                >
              회원가입
              </button>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login