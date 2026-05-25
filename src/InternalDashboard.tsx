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
   FINANCIAL DATA
═══════════════════════════════════════════════════════════ */

const FINANCIAL_DATA = {
  capex: {
    total: 850000,
    unitAvg: 85000,
    breakdown: ['機體改裝', '多元支付模組', '車貼與初期備品']
  },
  opex: {
    packagingRatio: '30-40%',
    iotFee: 150,
    depreciationReserve: 500,
    logistics: 'iRent 短租 Toyota Town Ace 廂型車'
  },
  roi: {
    unitMonthlyProfit: 11450,
    totalMonthlyProfit: 114500,
    paybackPeriod: '8~10 個月',
    condition: '蝦皮免收場地租金與基礎電費前提下'
  }
};

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
   COMPONENT: Financial Dashboard
═══════════════════════════════════════════════════════════ */

function FinancialDashboard() {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 標題 */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            💰 營運財務分析
          </h2>
          <p className="text-slate-400">10 台 MVP 桃園測試機基準數據</p>
        </div>

        {/* 三欄財務卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* CapEx 卡片 */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800 p-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#39FF14]/50 to-transparent"></div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏗️</span>
              <h3 className="text-lg font-bold text-white">CapEx 初期建置</h3>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-black text-[#39FF14]">
                ${FINANCIAL_DATA.capex.total.toLocaleString()}
              </span>
              <span className="text-slate-400 text-sm ml-2">總投入額</span>
            </div>
            <p className="text-slate-400 text-sm mb-3">
              單機平均約 <span className="text-white font-medium">${FINANCIAL_DATA.capex.unitAvg.toLocaleString()}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {FINANCIAL_DATA.capex.breakdown.map((item) => (
                <span 
                  key={item}
                  className="px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* OpEx 卡片 */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800 p-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#EE4D2D]/50 to-transparent"></div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📊</span>
              <h3 className="text-lg font-bold text-white">OpEx 每月營運</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">包材進貨成本</span>
                <span className="text-[#EE4D2D] font-medium">售價 {FINANCIAL_DATA.opex.packagingRatio}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">4G IoT 網卡費</span>
                <span className="text-white font-medium">單機 ${FINANCIAL_DATA.opex.iotFee}/月</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">折舊與準備金</span>
                <span className="text-white font-medium">單機 ${FINANCIAL_DATA.opex.depreciationReserve}/月</span>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-xs text-slate-400">
                物流採用「<span className="text-[#39FF14]">{FINANCIAL_DATA.opex.logistics}</span>」按需補貨清運
              </p>
            </div>
          </div>

          {/* ROI 卡片 */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800 p-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-[#39FF14]"></div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <h3 className="text-lg font-bold text-white">ROI & 回本週期</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-slate-400 text-xs mb-1">單機月淨利</p>
                <p className="text-2xl font-bold text-[#39FF14]">
                  ${FINANCIAL_DATA.roi.unitMonthlyProfit.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">10台月淨利</p>
                <p className="text-2xl font-bold text-emerald-400">
                  ${FINANCIAL_DATA.roi.totalMonthlyProfit.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20">
              <p className="text-emerald-400 font-bold text-lg mb-1">
                回本週期 {FINANCIAL_DATA.roi.paybackPeriod}
              </p>
              <p className="text-slate-400 text-xs">
                在 {FINANCIAL_DATA.roi.condition} 下達成
              </p>
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
