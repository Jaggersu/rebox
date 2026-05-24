import React, { useState } from 'react';

export default function ViBrandSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full bg-[#1A1A1A] text-white font-sans">
      
      {/* 🟢 兩區交界處：Hero 下方與下個區塊的紅框交界線示意（做成細緻的半透明品牌橘色微光切線） */}
      <div className="w-full h-[1px] bg-[#EE4D2D]/20 relative z-30" />

      {/* 核心佈局容器 */}
      <div className="mx-auto max-w-4xl px-4 relative z-20">
        
        {/* 📦 VI 匣子本體：
          1. 未展開時：收納縮窄為 max-w-2xl，高度鎖死在 110px，只讓頂部的 Logo「露點頭」出來。
          2. 展開時：平滑擴展寬度為 max-w-4xl，高度完全往下抽開 (max-h-[1500px])。
        */}
        <div 
          className={`mx-auto bg-[#2B2B2B] rounded-t-xl border-t border-x border-white/10 shadow-2xl transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) overflow-hidden relative
            ${isOpen ? 'max-w-4xl mt-6' : 'max-w-2xl mt-0'}`}
          style={{ 
            // 透過變動 max-height 來達成極具物理拉伸感的「往下抽開信件」特效
            maxHeight: isOpen ? '1500px' : '90px'
          }}
        >
          {/* 匣子未展開時的底部漸層遮罩：
            當區塊藏在匣裡時，底部有一層平滑的黑色漸層，讓文案隱約露出，創造「藏鞘」的精緻層次。
          */}
          {!isOpen && (
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#2B2B2B] via-[#2B2B2B]/80 to-transparent z-10 pointer-events-none" />
          )}

          {/* 露頭區塊：無論開合都固定置頂，展示完美雙正圓發光 Logo */}
          <div className="p-6 pb-2 flex flex-col items-center justify-center bg-[#2B2B2B]">
            
            {/* 純血 Logo：替換為實體圖片，並保留一點發光質感 */}
            <img 
              src="/logo.png" 
              alt="RE:BOX Logo" 
              className="h-10 drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] select-none" 
            />
            
            {/* 稍微露出的引言頭部（客戶路過時會看到這一行溫暖導引） */}
            <p className="text-xs text-gray-400 mt-5 text-center max-w-md font-light tracking-wide opacity-80">
              運用科技與體貼的設計細節，為門市空間提供優雅的綠色延伸
            </p>
          </div>

          {/* 📬 匣子內藏的完整信件內容：點擊按鈕後才會順暢現形 */}
          <div className="px-8 pb-10 pt-4 space-y-8 text-gray-300 font-light tracking-wide text-sm sm:text-base border-t border-white/5">
            
            {/* 核心理念 */}
            <div className="border-l-2 border-[#39FF14] pl-4 py-1.5 bg-white/5 rounded-r">
              <span className="font-medium text-white block mb-1 text-base">品牌核心理念</span>
              RE:BOX 以溫和低調的消光深灰為基底，融合高對比的品牌發光線條，完美契合現代無人智取店的科技感，共同打造更友善、潔淨的互動體驗。
            </div>

            {/* 區塊 1 */}
            <div className="space-y-3">
              <h4 className="text-white font-medium flex items-center gap-2 text-base">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EE4D2D]" />
                1. 品牌標準字體與「溫暖冒號」
              </h4>
              <div className="pl-3 space-y-2 text-gray-400 leading-relaxed text-sm">
                <p>
                  <strong className="text-white font-normal">● 字體外型：幾何無襯線粗體</strong> —— 
                  筆劃厚實飽滿、結構均衡。這份札實的線條，能與實體機身的金屬工藝完美呼應，在視覺上給人安心、穩固且值得信賴的直覺感受。
                </p>
                <p>
                  <strong className="text-white font-normal">● 靈魂細節：雙正圓發光冒號 ( : )</strong> —— 
                  設計的核心聚焦在兩個細緻的發光正圓形。這兩個圓點像是數據網絡間互通的溫暖微光，將前半段的循環科技「RE」，與後半段的實體包材「BOX」緊密串聯，在簡約中點綴出精緻的數位細節。
                </p>
              </div>
            </div>

            {/* 區塊 2 */}
            <div className="space-y-3">
              <h4 className="text-white font-medium flex items-center gap-2 text-base">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EE4D2D]" />
                2. 品牌標準色與跳色邏輯
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-3 pt-1">
                <div className="bg-[#1A1A1A] p-4 rounded border border-white/5">
                  <span className="text-[#39FF14] font-medium block mb-1 text-sm">🟢 Cyber Green</span>
                  <span className="text-xs text-gray-400 leading-relaxed block">
                    象徵綠色循環與貼心的科技導引。高飽和度的螢光綠在深色機身中扮演溫柔的指引角色，讓消費者在拆箱、處理隱私個資時，能直覺流暢地完成每一步動作。
                  </span>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded border border-white/5">
                  <span className="text-[#EE4D2D] font-medium block mb-1 text-sm">🟠 Shopee Orange</span>
                  <span className="text-xs text-gray-400 leading-relaxed block">
                    一致的色彩語彙，是我們對合作夥伴的致敬與商務誠意。這個橘色能完美融入門市的招牌氛圍，讓 RE:BOX 成為店內生態系最和諧、最亮眼的延伸組件。
                  </span>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded border border-white/5">
                  <span className="text-white font-medium block mb-1 text-sm">⚪ 2700K Warm White</span>
                  <span className="text-xs text-gray-400 leading-relaxed block">
                    網頁上帶有柔和的外發光，實體機台則採用 2700K 溫潤白光。我們希望為深夜進店寄取件的消費者，帶來一抹相伴的安心感與溫暖互動。
                  </span>
                </div>
              </div>
            </div>

            {/* 區塊 3 */}
            <div className="space-y-2">
              <h4 className="text-white font-medium flex items-center gap-2 text-base">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EE4D2D]" />
                3. 機身本體塗裝
              </h4>
              <p className="text-gray-400 pl-3 leading-relaxed text-sm">
                全機體採用抗刮、防指紋的<span className="text-white font-normal">消光金屬鐵灰</span>烤漆。低調且具質感的微沙粒底漆，能優雅地收納、包容門市日常運作中的繁雜視覺，讓精緻的發光 Logo 更具質感，達到相互輝映的視覺層次。
              </p>
            </div>
            
          </div>
        </div>

        {/* 🟢 螢光綠色標準色按鈕（抽屜拉環） */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-28px] z-30">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg bg-[#39FF14] text-[#1A1A1A] flex flex-col items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.6)] hover:bg-[#39FF14]/90 transition-all duration-300 focus:outline-none px-5 py-2"
            aria-label="拉開品牌識別匣"
          >
            <span className="text-[13px] font-bold tracking-widest leading-none mb-1.5 antialiased">VI識別</span>
            {/* 點擊後箭頭會滑順旋轉 180 度 */}
            <svg 
              className={`w-4 h-4 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

      </div>

    </div>
  );
}
