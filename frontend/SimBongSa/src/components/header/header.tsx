import React from 'react'
import {Bell} from 'lucide-react'

export default function header() {
  return (
    <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-gray-900 logo">심봉사</h1>
          <div className="flex items-center gap-2">
            {/* <button onClick={onSearchClick} className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5" />
            </button> */}
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-5 h-5 "  />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {/* <button
              onClick={onProfileClick}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label={status === "authenticated" ? "프로필 열기" : "로그인"}
            >
              {status === "authenticated" ? (
               <User className="w-5 h-5" />
                 ) : (
                <span className="text-sm">마이페이지</span>
              )}
            </button> */}
          </div>
        </div>
      </div>
  )
}
