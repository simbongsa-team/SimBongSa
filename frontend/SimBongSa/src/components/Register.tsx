import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, CheckSquare, Square } from "lucide-react";
import Header from "./header/header";

type RegisterProps = {
  setCurrentScreen: (screen: { type: string }) => void;
};

export default function SignUpForm({ setCurrentScreen }: RegisterProps) {
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [availableTime, setAvailableTime] = useState<string[]>([]);
  const [location, setLocation] = useState('');

  // 폼 데이터 상태를 하나의 객체로 관리
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });


  // 비밀번호 표시 여부 상태를 별도의 객체로 관리
  const [passwordVisibility, setPasswordVisibility] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });
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

  // 입력 변경을 처리하는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  // 약관 동의 체크박스 변경을 처리하는 함수
  const handleAgreementChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      agreed: !prevData.agreed,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!formData.agreed) {
      alert("이용약관에 동의해주세요.");
      return;
    }

    // TODO: 실제 회원가입 로직 구현 (API 호출 등)
    console.log(formData);
    // 성공 시 로그인 화면으로 전환
    
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-orange-500">심봉사</h1>
            <p className="text-gray-600 mt-2">회원가입하고 맞춤 봉사를 추천받으세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이름 입력 필드 */}
            <div className="flex flew-wrap border border-gray-300 rounded-lg ">
              <User className=" flex text-gray-400 items-center justify-center mt-3"  />
              <input
                type="text"
                name="name"
                placeholder="이름"
                value={formData.name}
                onChange={handleInputChange}
                className="flex-2 pl-10 pr-4 py-3 border-none border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            {/* 이메일 입력 필드 */}
            <div className="flex flew-wrap border border-gray-300 rounded-lg ">
              <Mail className="flex text-gray-400 items-center justify-center mt-3" />
              <input
                type="email"
                name="email"
                placeholder="이메일"
                value={formData.email}
                onChange={handleInputChange}
                className="flex-2 ml-2 pr-4 py-3 border-none border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            {/* 비밀번호 입력 필드 */}
            <div className="flex flew-wrap border border-gray-300 rounded-lg ">
              <Lock className="flex text-gray-400 items-center justify-center mt-3" />
              <input
                type={passwordVisibility.showPassword ? "text" : "password"}
                name="password"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleInputChange}
                className="flex-2 ml-2 pl-10 pr-4 py-3 border-none border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisibility(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                className="right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {passwordVisibility.showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {/* 비밀번호 확인 필드 */}
            <div className="flex flew-wrap border border-gray-300 rounded-lg ">
              <Lock className="flex text-gray-400 items-center justify-center mt-3" />
              <input
                type={passwordVisibility.showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="비밀번호 확인"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="flex-2 ml-2 pl-10 pr-4 py-3 border-none border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisibility(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
                className="right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {passwordVisibility.showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {/* 이용약관 동의 */}
            <div className="flex items-center">
              <button type="button" onClick={handleAgreementChange} className="flex items-center text-gray-600">
                  {formData.agreed ? <CheckSquare className="w-5 h-5 mr-2 text-orange-500" /> : <Square className="w-5 h-5 mr-2 text-gray-400" />}
                  <span>이용약관에 동의합니다.</span>
              </button>
            </div>

            <button type="submit" onClick={() => setCurrentScreen({ type: 'userdetail' })} className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              다음
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            이미 계정이 있으신가요?{" "}
            <button onClick={() => setCurrentScreen({ type: 'login' })} className="font-semibold text-orange-500 hover:underline">
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>

  );
}
