import { useState } from "react";

export default function ViBrandSection() {
  const [isOpen, setIsOpen] = useState(false);

  // 品牌色彩系統
  const colors = [
    {
      name: 'Cyber Green',
      hex: '#39FF14',
      desc: '綠色循環的視覺指引',
      usage: 'UI 主色・互動提示'
    },
    {
      name: 'Shopee Orange',
      hex: '#EE4D2D',
      desc: '品牌識別的色彩連結',
      usage: '合作象徵・品牌共鳴'
    },
    {
      name: 'Warm White',
      hex: '#FFF4E0',
      desc: '2700K 溫潤陪伴光',
      usage: '照明設計・溫度感知'
    }
  ];

  return (
    <div className="relative w-full bg-[#0d0d0d] text-white font-sans overflow-hidden">
      {/* 頂部發光線條 */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/40 to-transparent" />

      {/* 主要內容容器 */}
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        
        {/* 區塊標題 */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#39FF14]/10 text-[#39FF14] text-sm font-medium mb-4">
            Brand Identity
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            品牌識別系統
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            以科技感為基底，創造溫暖而有記憶點的視覺體驗
          </p>
        </div>

        {/* 核心理念卡片 */}
        <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-10 mb-10 md:mb-16 border border-white/10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#39FF14]/20 flex items-center justify-center">
                <span className="text-3xl md:text-4xl">💡</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                設計哲學
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                RE:BOX 以溫和低調的消光深灰為基底，融合高對比的品牌發光線條。
                雙正圓發光冒號是靈魂細節，象徵數據網絡間互通的溫暖微光。
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-full bg-white/5 text-gray-400 text-sm">
                  幾何無襯線字體
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 text-gray-400 text-sm">
                  高對比配色
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 text-gray-400 text-sm">
                  消光金屬質感
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 色彩系統 - 大色塊展示 */}
        <div className="mb-10 md:mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 text-center">
            色彩系統
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {colors.map((color) => (
              <div 
                key={color.name}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* 大色塊 */}
                <div 
                  className="h-32 md:h-40 w-full relative"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* 光澤效果 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                </div>
                {/* 色塊資訊 */}
                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg md:text-xl font-bold text-white">
                      {color.name}
                    </h4>
                    <span 
                      className="text-xs md:text-sm font-mono px-2 py-1 rounded bg-white/10"
                      style={{ color: color.hex }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base mb-2">
                    {color.desc}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {color.usage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 字體與機身規格 - 摺疊區塊 */}
        <div className="bg-white/[0.03] rounded-2xl border border-white/10 overflow-hidden">
          {/* 摺疊按鈕 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#39FF14]/20 flex items-center justify-center">
                <span className="text-2xl">📐</span>
              </div>
              <div className="text-left">
                <h3 className="text-lg md:text-xl font-bold text-white">字體與機身規格</h3>
                <p className="text-gray-500 text-sm md:text-base">查看更多技術細節</p>
              </div>
            </div>
            <svg 
              className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* 摺疊內容 */}
          <div 
            className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="p-5 md:p-6 pt-0 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-6">
                {/* 字體規格 */}
                <div className="space-y-4">
                  <h4 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                    字體系統
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white/[0.03] rounded-xl p-4">
                      <p className="text-2xl md:text-3xl font-black text-white mb-2">RE:BOX</p>
                      <p className="text-gray-500 text-sm">幾何無襯線粗體 · 厚重飽滿</p>
                    </div>
                    <p className="text-gray-400 text-base leading-relaxed">
                      筆劃厚實飽滿、結構均衡，與實體機身的金屬工藝完美呼應，給人安心穩固的信賴感。
                    </p>
                  </div>
                </div>

                {/* 機身規格 */}
                <div className="space-y-4">
                  <h4 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EE4D2D]" />
                    機身塗裝
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white/[0.03] rounded-xl p-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-[#4A4A4A] border border-white/10" />
                      <div>
                        <p className="text-white font-medium">消光金屬鐵灰</p>
                        <p className="text-gray-500 text-sm">抗刮防指紋烤漆</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-base leading-relaxed">
                      微沙粒底漆質感，優雅收納門市日常繁雜視覺，讓發光 Logo 相互輝映。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 底部發光線條 */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />
    </div>
  );
}
