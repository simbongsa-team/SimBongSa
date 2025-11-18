import React from 'react'
import {Search} from 'lucide-react'
export default function Searchform() {
  return (
        <div className="mb-6">
          <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all text-left">
            <div className="flex flex-wrap gap-2 p-3">
                <div className="inline-flex items-center justify-center">
                    <Search/></div>
                <input type="text" placeholder="검색어를 입력해주세요..."className="flex-2 border-none border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
            </div>
                      
          </div>
        </div>
            
          
  )
}
