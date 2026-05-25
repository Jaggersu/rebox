import { useState } from 'react';

/* ═══════════════════════════════════════════════════════════
   TYPE DEFINITIONS
═══════════════════════════════════════════════════════════ */

interface MachineStatus {
  machine_id: string;
  status: 'online' | 'offline';
  bag_inventory: number;      // 破壞袋庫存 %
  tape_inventory: number;     // 環保膠帶庫存 %
  yesterday_revenue: number;    // 昨日營業額 TWD
  bin_fill_rate: number;      // 回收槽滿載度 %
}

/* ═══════════════════════════════════════════════════════════
   MOCK DATA - 模擬 10 台桃園測試機資料
   TODO: 未來替換為 Supabase client fetch
═══════════════════════════════════════════════════════════ */

const MOCK_MACHINES: MachineStatus[] = [
  { machine_id: 'TAOYUAN_A01', status: 'online', bag_inventory: 65, tape_inventory: 45, yesterday_revenue: 2450, bin_fill_rate: 35 },
  { machine_id: 'TAOYUAN_A02', status: 'online', bag_inventory: 18, tape_inventory: 72, yesterday_revenue: 1890, bin_fill_rate: 62 },
  { machine_id: 'TAOYUAN_A03', status: 'online', bag_inventory: 82, tape_inventory: 15, yesterday_revenue: 3120, bin_fill_rate: 28 },
  { machine_id: 'TAOYUAN_A04', status: 'offline', bag_inventory: 45, tape_inventory: 38, yesterday_revenue: 0, bin_fill_rate: 0 },
  { machine_id: 'TAOYUAN_A05', status: 'online', bag_inventory: 55, tape_inventory: 88, yesterday_revenue: 2780, bin_fill_rate: 85 },
  { machine_id: 'TAOYUAN_A06', status: 'online', bag_inventory: 92, tape_inventory: 25, yesterday_revenue: 1950, bin_fill_rate: 42 },
  { machine_id: 'TAOYUAN_A07', status: 'online', bag_inventory: 30, tape_inventory: 12, yesterday_revenue: 2240, bin_fill_rate: 55 },
  { machine_id: 'TAOYUAN_A08', status: 'online', bag_inventory: 78, tape_inventory: 92, yesterday_revenue: 3560, bin_fill_rate: 22 },
  { machine_id: 'TAOYUAN_A09', status: 'online', bag_inventory: 42, tape_inventory: 68, yesterday_revenue: 2100, bin_fill_rate: 91 },
  { machine_id: 'TAOYUAN_A10', status: 'offline', bag_inventory: 25, tape_inventory: 35, yesterday_revenue: 0, bin_fill_rate: 0 },
];

/* ═══════════════════════════════════════════════════════════
   SOP DATA
═══════════════════════════════════════════════════════════ */

const SOP_DATA = [
  {
    id: 'tech',
    title: '技術端',
    icon: '🔧',
    color: '#39FF14',
    responsibilities: [
      '硬體改裝廠對接',
      '內凹檯面與物理防呆槽開模',
      'IoT 後台與 Supabase 數據對接'
    ]
  },
  {
    id: 'ops',
    title: '營運端',
    icon: '📦',
    color: '#EE4D2D',
    responsibilities: [
      '上游包材廠供應鏈管理',
      'IoT 後台庫存監控',
      '動態補貨與清運路線規劃',
      '機台清潔維護'
    ]
  },
  {
    id: 'bd',
    title: 'BD 談判端',
    icon: '🤝',
    color: '#3B82F6',
    responsibilities: [
      '蝦皮總部高層對接',
      '方案 A/B 談判',
      '免租金場地爭取'
    ]
  }
];

/* ═══════════════════════════════════════════════════════════
   COMPONENT: Alert Banner (頁頭提示條)
═══════════════════════════════════════════════════════════ */

function AlertBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* 左側：鎖定圖標 + 文字 */}
          <div className="flex items-center gap-3">
            <span className="text-lg">🔒</span>
            <span className="text-sm sm:text-base text-slate-300">
              內部限制存取：
              <span className="text-white font-medium">合夥人監測後台</span>
              <span className="text-slate-500 ml-2">(暫免驗證環境)</span>
            </span>
          </div>
          
          {/* 右側：Live 指示燈 */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#39FF14]"></span>
            </span>
            <span className="text-xs sm:text-sm text-[#39FF14] font-medium">Live 模擬中</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT: Financial Blueprint - 專業財務精算區塊
═══════════════════════════════════════════════════════════ */

// 營收來源數據
const REVENUE_STREAMS = [
  {
    id: 'packaging',
    name: '軟包材零售',
    subtitle: '高毛利主動收入',
    icon: '📦',
    dailyCustomers: 8,
    avgOrderValue: 50,
    marginRate: 0.60,
    monthlyRevenue: 12000,
    monthlyProfit: 7200,
    formula: '8人 × $50 × 30天',
    products: ['大/中/小破壞袋', '環保膠帶', '寄件急救包']
  },
  {
    id: 'recycling',
    name: '廢紙逆物流變現',
    subtitle: '綠色被動收入',
    icon: '♻️',
    dailyKg: 15,
    pricePerKg: 5,
    marginRate: 1.00,
    monthlyRevenue: 2250,
    monthlyProfit: 2250,
    formula: '15kg × $5/kg × 30天',
    note: '單向純回收，零進貨成本'
  },
  {
    id: 'advertising',
    name: '螢幕 DOOH 廣告',
    subtitle: '通路附加收入',
    icon: '📺',
    monthlyRevenue: 4250,
    marginRate: 0.48,
    monthlyProfit: 2000,
    formula: '機體多媒體螢幕輪播版位',
    note: '在地商家/蝦皮賣家廣告投放'
  }
];

// CapEx 詳細預算
const CAPEX_BREAKDOWN = [
  { category: '機體硬體與改裝廠開模', amount: 450000, items: ['薄型化金屬烤漆機身', '中段內凹挖空檯面', '物理防呆狹長入口槽'], percent: 52.9 },
  { category: '核心功能模組', amount: 200000, items: ['多元無現金支付刷卡機', '自動回捲伸縮鋼索', '安全割箱刀與滾輪章'], percent: 23.5 },
  { category: '系統整合與外觀視覺', amount: 120000, items: ['4G IoT 監測控制板', '2700K 溫潤白光 LED 燈條', '全機防水車貼噴墨'], percent: 14.1 },
  { category: '營運週轉與初期備品', amount: 80000, items: ['首批軟包材進貨', '耗損墨水與刀片準備金'], percent: 9.5 }
];

// OpEx 每月營運
const OPEX_MONTHLY = [
  { item: '銷貨成本 (COGS)', amount: 4200, unit: '包材進貨 35% 比例', note: '零售額 $12,000 × 35%' },
  { item: '4G IoT 網卡費', amount: 1500, unit: '$150/台 × 10台', note: '固定通訊規費' },
  { item: '維護與折舊準備金', amount: 5000, unit: '$500/台 × 10台', note: '單機耗材與維護' },
  { item: '物流清運成本', amount: 0, unit: 'iRent 短租按日計費', note: '變動成本，無固定開銷', highlight: true }
];

// 五年擴張計劃
const FIVE_YEAR_PLAN = [
  { year: '第一年', machines: 10, phase: 'MVP 驗證期', netProfit: 1100000, marginRate: 0.61, notes: '桃園區驗證單機 8~10 月回本模型' },
  { year: '第二年', machines: 50, phase: '規模經濟期', netProfit: 7500000, marginRate: 0.68, notes: '包材成本下降 10%，物流路線優化' },
  { year: '第三年', machines: 120, phase: '區域壟斷期', netProfit: 20000000, marginRate: 0.72, notes: 'DOOH 廣告矩陣效應形成' },
  { year: '第四年', machines: 200, phase: '通路壟斷期', netProfit: 38000000, marginRate: 0.75, notes: '廣告版位價值翻倍，高壁壘確立' },
  { year: '第五年', machines: 300, phase: 'SaaS + IoT 王國', netProfit: 65000000, marginRate: 0.78, notes: '全台佈局完成，品牌溢價最大化' }
];

function FinancialDashboard() {
  const totalMonthlyRevenue = REVENUE_STREAMS.reduce((sum, s) => sum + s.monthlyRevenue, 0);
  const totalMonthlyProfit = REVENUE_STREAMS.reduce((sum, s) => sum + s.monthlyProfit, 0);
  const totalCapex = CAPEX_BREAKDOWN.reduce((sum, c) => sum + c.amount, 0);
  const totalOpex = OPEX_MONTHLY.reduce((sum, o) => sum + o.amount, 0);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 標題區 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              財務損益與投資報酬分析
            </h2>
          </div>
          <p className="text-slate-400 ml-12">Financial & P&L Blueprint • 10 台 MVP 桃園測試機基準數據</p>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            1. 單機營收來源拆解 (Revenue Streams Formula)
        ═══════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800/50">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#39FF14]">01.</span>
              單機營收來源拆解
              <span className="text-sm font-normal text-slate-400 ml-2">Revenue Streams Formula</span>
            </h3>
          </div>
          
          <div className="p-6">
            {/* 總計列 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-4 text-center">
                <p className="text-slate-400 text-sm mb-1">單機月營收</p>
                <p className="text-3xl font-black text-white">${totalMonthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-4 text-center">
                <p className="text-slate-400 text-sm mb-1">單機月毛利</p>
                <p className="text-3xl font-black text-[#39FF14]">${totalMonthlyProfit.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-4 text-center">
                <p className="text-slate-400 text-sm mb-1">毛利率</p>
                <p className="text-3xl font-black text-emerald-400">{((totalMonthlyProfit/totalMonthlyRevenue)*100).toFixed(1)}%</p>
              </div>
            </div>

            {/* 詳細表格 */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">收入來源</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">計算公式</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-400">月營收</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-400">毛利率</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-400 text-[#39FF14]">月毛利</th>
                  </tr>
                </thead>
                <tbody>
                  {REVENUE_STREAMS.map((stream) => (
                    <tr key={stream.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{stream.icon}</span>
                          <div>
                            <p className="font-medium text-white">{stream.name}</p>
                            <p className="text-xs text-slate-500">{stream.subtitle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-400">
                        <p>{stream.formula}</p>
                        {stream.products && (
                          <p className="text-xs text-slate-600 mt-1">{stream.products.join('、')}</p>
                        )}
                        {stream.note && <p className="text-xs text-[#39FF14] mt-1">{stream.note}</p>}
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-white">
                        ${stream.monthlyRevenue.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`${stream.marginRate >= 0.8 ? 'text-[#39FF14]' : 'text-slate-300'}`}>
                          {(stream.marginRate * 100).toFixed(0)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-bold text-[#39FF14]">${stream.monthlyProfit.toLocaleString()}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            2. CapEx 建置預算 + 3. OpEx 每月營運 (雙欄)
        ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* CapEx Breakdown */}
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800/50">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-[#39FF14]">02.</span>
                MVP 建置預算 (CapEx)
                <span className="text-2xl font-black text-[#39FF14] ml-auto">${totalCapex.toLocaleString()}</span>
              </h3>
              <p className="text-sm text-slate-400 mt-1">10 台測試機初期總投入 • 單機平均 $85,000</p>
            </div>
            <div className="p-6 space-y-4">
              {CAPEX_BREAKDOWN.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white font-medium">{item.category}</span>
                    <span className="text-sm text-[#39FF14] font-bold">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#39FF14] to-emerald-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.items.map((sub, i) => (
                      <span key={i} className="text-xs text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OpEx Monthly */}
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800/50">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-[#EE4D2D]">03.</span>
                每月營運損益 (OpEx)
                <span className="text-2xl font-black text-[#EE4D2D] ml-auto">${totalOpex.toLocaleString()}</span>
              </h3>
              <p className="text-sm text-slate-400 mt-1">10 台機器月度開銷結構 • 輕資產營運優勢</p>
            </div>
            <div className="p-6">
              <table className="w-full">
                <tbody>
                  {OPEX_MONTHLY.map((item, idx) => (
                    <tr key={idx} className="border-b border-slate-800/50 last:border-0">
                      <td className="py-3 text-sm text-white">{item.item}</td>
                      <td className="py-3 text-xs text-slate-500">{item.unit}</td>
                      <td className={`py-3 text-right font-bold ${item.highlight ? 'text-[#39FF14]' : 'text-white'}`}>
                        {item.amount === 0 ? item.note : `$${item.amount.toLocaleString()}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 p-3 rounded-lg bg-[#39FF14]/5 border border-[#39FF14]/20">
                <p className="text-sm text-[#39FF14]">
                  <span className="font-bold">🚚 物流成本優化：</span>
                  採用「iRent 短租 Toyota Town Ace 廂型車」按日/按需計費，物流與補貨成本完全變動化，大幅降低固定開銷壓力。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            4. 五年投資報酬與擴張分析
        ═══════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800/50">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">04.</span>
              五年投資報酬與擴張分析
              <span className="text-sm font-normal text-slate-400 ml-2">5-Year ROI & Scalability</span>
            </h3>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">年度</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">機台數</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">階段</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-400">年度淨利</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-400">淨利率</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">關鍵里程碑</th>
                </tr>
              </thead>
              <tbody>
                {FIVE_YEAR_PLAN.map((year, idx) => (
                  <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-bold text-white">{year.year}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-[#39FF14] font-bold">
                        {year.machines}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-white border border-slate-700">
                        {year.phase}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-bold text-[#39FF14]">${(year.netProfit / 10000).toFixed(0)}萬</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-emerald-400">{(year.marginRate * 100).toFixed(0)}%</span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-400">
                      {year.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-slate-800 bg-slate-900/30">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-slate-400 text-sm">五年總淨利預估</p>
                <p className="text-3xl font-black text-[#39FF14]">$131,500,000+</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm">最終規模</p>
                <p className="text-2xl font-bold text-white">300 台 • 全台通路矩陣</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT: SOP Assignment Panel
═══════════════════════════════════════════════════════════ */

function SOPPanel() {
  const [activeTab, setActiveTab] = useState('tech');

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 標題 */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            🎯 SOP 責任分工
          </h2>
          <p className="text-slate-400">三端協作，確保專案順利推進</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SOP_DATA.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-black'
                  : 'text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800'
              }`}
              style={{
                background: activeTab === tab.id ? tab.color : undefined,
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* 內容面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SOP_DATA.map((dept) => (
            <div
              key={dept.id}
              className={`rounded-2xl p-6 transition-all duration-300 ${
                activeTab === dept.id
                  ? 'bg-slate-800/80 border-2 scale-[1.02] shadow-2xl'
                  : 'bg-slate-900/30 border border-slate-800 opacity-60'
              }`}
              style={{
                borderColor: activeTab === dept.id ? dept.color : undefined,
                boxShadow: activeTab === dept.id ? `0 0 30px ${dept.color}20` : undefined
              }}
              onClick={() => setActiveTab(dept.id)}
            >
              <div className="flex items-center gap-3 mb-5">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${dept.color}20` }}
                >
                  {dept.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{dept.title}</h3>
                  <div 
                    className="w-full h-0.5 mt-1 rounded-full"
                    style={{ background: dept.color }}
                  />
                </div>
              </div>
              
              <ul className="space-y-3">
                {dept.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span 
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: dept.color }}
                    />
                    <span className="text-slate-300 text-sm leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT: Machine Monitoring Grid
═══════════════════════════════════════════════════════════ */

function StatusDot({ status }: { status: 'online' | 'offline' }) {
  return (
    <span 
      className={`inline-flex w-2.5 h-2.5 rounded-full ${
        status === 'online' ? 'bg-[#39FF14]' : 'bg-slate-500'
      }`}
      title={status === 'online' ? '在線' : '離線'}
    />
  );
}

function InventoryBar({ 
  value, 
  label,
  isWarning 
}: { 
  value: number; 
  label: string;
  isWarning: boolean;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className={isWarning ? 'text-red-500 font-bold' : 'text-slate-300'}>
          {value}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${
            isWarning ? 'bg-red-500' : 'bg-[#39FF14]'
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function MachineMonitoring() {
  // TODO: 未來替換為 Supabase 即時訂閱
  const [machines] = useState<MachineStatus[]>(MOCK_MACHINES);
  const [lastUpdate] = useState(new Date());

  /*
  // TODO: 正式環境啟用 Supabase 訂閱
  useEffect(() => {
    const fetchMachines = async () => {
      const { data, error } = await supabase
        .from('machines')
        .select('*')
        .order('machine_id', { ascending: true });
      
      if (data) {
        setMachines(data);
        setLastUpdate(new Date());
      }
    };

    // 初始載入
    fetchMachines();

    // 即時訂閱
    const subscription = supabase
      .channel('machines_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'machines' }, fetchMachines)
      .subscribe();

    // 每 30 秒輪詢備援
    const interval = setInterval(fetchMachines, 30000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);
  */

  // 統計數據
  const stats = {
    online: machines.filter(m => m.status === 'online').length,
    offline: machines.filter(m => m.status === 'offline').length,
    lowBag: machines.filter(m => m.bag_inventory < 20).length,
    lowTape: machines.filter(m => m.tape_inventory < 20).length,
    highBin: machines.filter(m => m.bin_fill_rate > 80).length,
    totalRevenue: machines.reduce((sum, m) => sum + m.yesterday_revenue, 0)
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 標題與統計 */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                📡 機器即時監測
              </h2>
              <p className="text-slate-400">桃園測試機群 ({machines.length} 台) • 最後更新: {lastUpdate.toLocaleTimeString()}</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300">
                昨日總營收: <span className="text-[#39FF14] font-bold">${stats.totalRevenue.toLocaleString()}</span>
              </span>
            </div>
          </div>
          
          {/* 快速統計 */}
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1.5 rounded-full text-xs bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20">
              🟢 在線: {stats.online}
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs bg-slate-800 text-slate-400 border border-slate-700">
              ⚫ 離線: {stats.offline}
            </span>
            {stats.lowBag > 0 && (
              <span className="px-3 py-1.5 rounded-full text-xs bg-red-500/10 text-red-500 border border-red-500/20 animate-pulse">
                🚨 破壞袋低庫存: {stats.lowBag} 台
              </span>
            )}
            {stats.lowTape > 0 && (
              <span className="px-3 py-1.5 rounded-full text-xs bg-red-500/10 text-red-500 border border-red-500/20 animate-pulse">
                🚨 膠帶低庫存: {stats.lowTape} 台
              </span>
            )}
            {stats.highBin > 0 && (
              <span className="px-3 py-1.5 rounded-full text-xs bg-red-500/10 text-red-500 border border-red-500/20 animate-pulse">
                🚨 回收槽滿載: {stats.highBin} 台
              </span>
            )}
          </div>
        </div>

        {/* 機器卡片網格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {machines.map((machine) => {
            const isLowBag = machine.bag_inventory < 20;
            const isLowTape = machine.tape_inventory < 20;
            const isHighBin = machine.bin_fill_rate > 80;
            const hasWarning = isLowBag || isLowTape || isHighBin;

            return (
              <div 
                key={machine.machine_id}
                className={`relative rounded-xl p-4 transition-all duration-300 ${
                  hasWarning 
                    ? 'bg-slate-800/80 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]' 
                    : 'bg-slate-900/50 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* 機器 ID 與狀態 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <StatusDot status={machine.status} />
                    <span className="text-sm font-bold text-white font-mono">
                      {machine.machine_id}
                    </span>
                  </div>
                  {hasWarning && (
                    <span className="text-red-500 text-xs">⚠️</span>
                  )}
                </div>

                {/* 庫存與狀態條 */}
                <div className="space-y-3 mb-4">
                  <InventoryBar 
                    value={machine.bag_inventory} 
                    label="破壞袋"
                    isWarning={isLowBag}
                  />
                  <InventoryBar 
                    value={machine.tape_inventory} 
                    label="環保膠帶"
                    isWarning={isLowTape}
                  />
                  <InventoryBar 
                    value={machine.bin_fill_rate} 
                    label="回收槽滿載度"
                    isWarning={isHighBin}
                  />
                </div>

                {/* 昨日營收 */}
                <div className="pt-3 border-t border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">昨日營收</span>
                    <span className={`text-sm font-bold ${
                      machine.yesterday_revenue > 0 ? 'text-[#39FF14]' : 'text-slate-500'
                    }`}>
                      {machine.yesterday_revenue > 0 
                        ? `$${machine.yesterday_revenue.toLocaleString()}` 
                        : '—'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════════════════════════ */

export default function InternalDashboard() {
  // 暫免登入驗證 - 直接渲染完整頁面
  // TODO: 正式環境啟用 Auth Guard
  /*
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  */

  return (
    <div className="min-h-screen bg-slate-950">
      {/* 頁頭提示條 */}
      <AlertBanner />
      
      {/* 主要內容 */}
      <main className="pb-12">
        {/* 頁面標題 */}
        <div className="py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
              <span className="text-[#39FF14]">RE:BOX</span> 內部營運後台
            </h1>
            <p className="text-slate-400">合夥人儀表板 Dashboard • MVP 桃園測試機群監測</p>
          </div>
        </div>

        {/* 財務分析 */}
        <FinancialDashboard />
        
        {/* 分隔線 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-slate-800"></div>
        </div>

        {/* SOP 分工 */}
        <SOPPanel />
        
        {/* 分隔線 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-slate-800"></div>
        </div>

        {/* 機器監測 */}
        <MachineMonitoring />
      </main>

      {/* 頁尾 */}
      <footer className="py-6 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>RE:BOX Internal Dashboard • 僅限授權人員存取</p>
          <p className="mt-1 text-xs text-slate-600">
            暫免驗證環境 • 數據僅供內部評估使用
          </p>
        </div>
      </footer>
    </div>
  );
}
