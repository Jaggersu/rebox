import { useState } from "react";
import ViBrandSection from "./ViBrandSection";

/* ════════════════════════════════════════════════
   BRAND TOKENS
════════════════════════════════════════════════ */
const C = {
  cyberGreen:   "#39FF14",
  shopeeOrange: "#EE4D2D",
  warmWhite:    "#FFF4E0",
};

const NAV_TABS = ["蝦皮專案提案", "內部營運後台"];

/* ════════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════════ */
function Navbar({ active, setActive }: { active: string, setActive: (tab: string) => void }) {
  return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950 border-b border-gray-800 h-[88px] flex items-center justify-between px-6">
      <img src="/logo.png" alt="RE:BOX Logo" className="h-[40px]" />
      <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
        {NAV_TABS.map(t => (
          <button key={t} onClick={() => setActive(t)}
            className={`px-4 py-2 rounded-md text-sm transition-all ${
              active === t 
                ? "font-bold text-gray-900" 
                : "font-medium text-gray-400"
            }`}
            style={{ background: active === t ? C.cyberGreen : "transparent" }}>
            {t}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ════════════════════════════════════════════════
   SHARED UI PRIMITIVES
════════════════════════════════════════════════ */
function Card({ children, accent, className = "" }: { children: React.ReactNode, accent?: string, className?: string }) {
  return (
    <div className={`bg-gray-900 rounded-2xl border overflow-hidden ${className}`}
         style={{ borderColor: accent ? `${accent}44` : '#1f2937' }}>
      {children}
    </div>
  );
}

function CardHead({ icon, title, sub, accent = C.cyberGreen, badge }: { icon: string, title: string, sub?: string, accent?: string, badge?: string }) {
  return (
    <div className="p-4 border-b border-gray-800 flex items-start gap-2.5">
      <span className="text-lg leading-none mt-0.5">{icon}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-sm">{title}</span>
          {badge && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${accent}22`, color: accent }}>{badge}</span>}
        </div>
        {sub && <div className="text-gray-500 text-xs mt-0.5">{sub}</div>}
      </div>
      <span className="w-2 h-2 rounded-full mt-1 flex-shrink-0 animate-pulse" style={{ background: accent }} />
    </div>
  );
}

function Kpi({ label, val, sub, col }: { label: string, val: string, sub?: string, col?: string }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <div className="text-gray-500 text-xs mb-1">{label}</div>
      <div className="font-black text-lg leading-tight" style={{ color: col || C.cyberGreen }}>{val}</div>
      {sub && <div className="text-gray-600 text-xs mt-1">{sub}</div>}
    </div>
  );
}

function Row({ label, val, note, highlight }: { label: string, val: string, note?: string, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-800/50">
      <span className={`text-sm ${highlight ? `font-bold text-[${C.cyberGreen}]` : 'text-gray-400'}`}>{label}</span>
      <div className="text-right">
        <span className={`text-sm ${highlight ? `font-bold text-[${C.cyberGreen}]` : 'text-gray-200 font-medium'}`}>{val}</span>
        {note && <div className="text-gray-600 text-xs">{note}</div>}
      </div>
    </div>
  );
}

function ProgressBar({ pct, from = C.shopeeOrange, to = C.cyberGreen }: { pct: number, from?: string, to?: string }) {
  return (
    <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${from},${to})` }} />
    </div>
  );
}

function MiniBar({ pct, warn, inv }: { pct: number, warn?: boolean, inv?: boolean }) {
  const col = (warn && !inv) ? "#EF4444" : (warn && inv) ? "#EF4444" : C.cyberGreen;
  const effective = inv ? (100 - pct) : pct;
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-14 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${effective}%`, background: col }} />
      </div>
      <span className="text-xs font-mono font-bold" style={{ color: col }}>{pct}%</span>
    </div>
  );
}

function WarnTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 text-xs font-bold">
      ⚠ {label}
    </span>
  );
}

function GreenTag({ label }: { label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold`} style={{ background: `${C.cyberGreen}22`, color: C.cyberGreen }}>
      ✓ {label}
    </span>
  );
}

/* ════════════════════════════════════════════════
   DASHBOARD BLOCKS
════════════════════════════════════════════════ */

function Block1_ROI() {
  const currentMonth = 1;
  const targetLow = 8, targetHigh = 10;
  const pct = Math.round((currentMonth / targetHigh) * 100);

  return (
    <Card accent={C.cyberGreen}>
      <CardHead icon="📊" title="10 台 MVP 營運總覽與投報率 (ROI)" sub="桃園區初期測試機組・以 10 台計算" accent={C.cyberGreen} badge="第 1 個月" />
      <div className="p-4">

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <Kpi label="初期總投入 (CapEx)" val="NT$ 75–95 萬" sub="含改裝・金流模組・首批包材" col={C.warmWhite} />
          <Kpi label="預估單月總淨利" val="NT$ 100,000" sub="10 台合計・穩態運行後" col={C.cyberGreen} />
          <Kpi label="預估回本週期" val="8–10 個月" sub="以淨利每月 NT$10萬計" col={C.shopeeOrange} />
          <Kpi label="核心談判底線" val="零租金進駐" sub="以免費清運換空間" col={C.cyberGreen} />
        </div>

        <div className="mb-3">
          <div className="flex justify-between mb-1.5">
            <span className="text-gray-400 text-xs font-semibold">回本進度目標 (目前第 {currentMonth} 個月)</span>
            <span className="text-xs font-bold" style={{ color:C.shopeeOrange }}>進度 {pct}%</span>
          </div>
          <ProgressBar pct={pct} />
          <div className="flex justify-between mt-1.5">
            <span className="text-gray-600 text-xs">▲ 啟動</span>
            <span className="text-gray-600 text-xs">目標：第 {targetLow}–{targetHigh} 個月回本</span>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-3 mb-2">
          <div className="text-gray-500 text-xs font-bold mb-2 tracking-widest">▸ CAPEX 細項拆解（估算）</div>
          {[
            ["機台硬體・改裝工程 (×10)", "NT$ 40–60 萬"],
            ["金流模組・IoT 網卡・SIM", "NT$  8–12 萬"],
            ["首批包材庫存 (破壞袋・膠帶)", "NT$  5–8 萬"],
            ["品牌設計・安裝人力・雜支", "NT$  5–8 萬"],
            ["保留準備金 (緊急維修)", "NT$  8–10 萬"],
          ].map(([l, v]) => <Row key={l} label={l} val={v} />)}
        </div>

        <div className="rounded-lg p-3 text-xs leading-relaxed" style={{ background:`${C.cyberGreen}0d`, color: C.cyberGreen }}>
          ✦ 核心談判策略：以「免費紙箱清運服務」換取門市場地零租金，將 OpEx 最大固定成本歸零，讓淨利率結構性提升。
        </div>
      </div>
    </Card>
  );
}

function Block2_PnL() {
  return (
    <Card accent={C.shopeeOrange}>
      <CardHead icon="💰" title="單機單月損益模型 (P&L)" sub="以單台機器・桃園區均值計算" accent={C.shopeeOrange} />
      <div className="p-4">
        <div className="bg-slate-900 rounded-lg p-3 mb-3">
          <div className="text-xs font-bold mb-2 tracking-widest" style={{ color:C.cyberGreen }}>▸ 營收來源</div>
          <Row label="① 包材零售（破壞袋、膠帶）" val="≈ NT$ 8,000" note="毛利率 60%・高頻剛需" />
          <Row label="② 廢紙秤重・回收場變現"     val="≈ NT$ 2,500" note="純利 100%・無成本收入" />
          <Row label="③ 合計月營收估算"           val="≈ NT$ 10,500" highlight />
        </div>

        <div className="bg-slate-900 rounded-lg p-3 mb-3">
          <div className="text-xs font-bold mb-2 tracking-widest" style={{ color:C.shopeeOrange }}>▸ 營運成本 (OpEx)</div>
          <Row label="🚐 動態物流 (iRent Town Ace 短租)" val="≈ NT$ 400–600" note="按需派車・拒絕長租買車" />
          <Row label="💳 金流手續費 (2–3%)"             val="≈ NT$ 210–315" note="視交易量浮動" />
          <Row label="📡 IoT 網卡 SIM 費"               val="≈ NT$ 150"     note="固定月費・遠端監控" />
          <Row label="🖊️ 滾輪章耗材補充"               val="≈ NT$ 500"     note="個資亂碼章・定期補換" />
          <Row label="🏪 門市租金"                       val="NT$ 0"         note="零租金進駐談判底線" highlight />
          <Row label="⚡ 電費"                           val="NT$ 0"         note="由進駐門市承擔" highlight />
          <Row label="合計月 OpEx 估算"                  val="≈ NT$ 1,260–1,565" />
        </div>

        <div className="rounded-lg p-3" style={{ background:`${C.cyberGreen}12`, border:`1px solid ${C.cyberGreen}33` }}>
          <div className="text-xs font-bold mb-2 tracking-widest" style={{ color:C.cyberGreen }}>▸ 單機淨利</div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">單台月淨利預估</span>
            <span className="text-xl font-black" style={{ color:C.cyberGreen }}>NT$ 9,500 – 10,000</span>
          </div>
          <div className="flex justify-between items-center mt-1.5">
            <span className="text-gray-500 text-xs">10 台合計月淨利</span>
            <span className="text-base font-bold" style={{ color:C.warmWhite }}>≈ NT$ 100,000 / 月</span>
          </div>
          <div className="mt-2.5">
            <div className="flex justify-between mb-1">
              <span className="text-gray-500 text-xs">淨利率估算</span>
              <span className="text-xs font-bold" style={{ color:C.cyberGreen }}>~90%</span>
            </div>
            <ProgressBar pct={90} from={C.cyberGreen} to={C.cyberGreen} />
          </div>
        </div>
      </div>
    </Card>
  );
}

function Block3_SOP() {
  const roles = [
    {
      color: C.cyberGreen,
      icon: "🤝",
      role: "BD 提案端",
      duty: "業務開發・合作談判",
      sops: [
        { tag:"主打方案", text:"主打「方案A：一條龍標配（我方全包）」安撫門市加盟主，消除其管理顧慮。" },
        { tag:"進階拋出", text:"條件成熟時拋出「方案B：蝦皮逆物流協作」，以總部 ESG 數據對接作為換取籌碼。" },
        { tag:"談判底線", text:"堅守零租金進駐原則，以免費清運服務換取場地，確保成本結構健康。" },
      ],
    },
    {
      color: C.shopeeOrange,
      icon: "🚐",
      role: "營運供應端",
      duty: "補貨・清運・變現",
      sops: [
        { tag:"不天天巡點", text:"依 IoT 儀表板數據排程，庫存低於 20% 或回收槽 80% 滿載時才派車。" },
        { tag:"補貨順動作", text:"補貨時順手抽出壓縮廢紙箱，全程同車，無需額外清運排程。" },
        { tag:"回程直奔變現", text:"回程直奔合作回收廠過磅，廢紙板立即換現，完成完整閉環。" },
      ],
    },
    {
      color: C.warmWhite,
      icon: "⚙️",
      role: "技術硬體端",
      duty: "設備維護・連線保障",
      sops: [
        { tag:"單向防呆", text:"維持「單向純回收（無壓縮機）」機制，確保物理防呆邏輯不被繞過。" },
        { tag:"無現金連線", text:"確保電子支付模組連線穩定，定期檢核金流 API 與 IoT 網卡訊號。" },
        { tag:"工作台妥善率", text:"內凹檯面工具（安全割刀・滾輪章）定期巡檢，維持 100% 妥善率。" },
      ],
    },
  ];

  return (
    <Card accent="#6366f1">
      <CardHead icon="📋" title="內部團隊責任分工與 SOP" sub="三端協作・閉環設計" accent="#6366f1" />
      <div className="p-4 flex flex-col gap-3">
        {roles.map(r => (
          <div key={r.role} className="bg-slate-900 rounded-xl overflow-hidden">
            <div className="p-3 flex items-center gap-2.5 border-b border-gray-800" style={{ background:`${r.color}18`}}>
              <span className="text-base">{r.icon}</span>
              <div>
                <span className="font-bold text-sm" style={{ color:r.color }}>{r.role}</span>
                <span className="text-gray-500 text-xs ml-2">{r.duty}</span>
              </div>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {r.sops.map(s => (
                <div key={s.tag} className="flex gap-2 items-start">
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap mt-px flex-shrink-0" style={{ background:`${r.color}22`, color:r.color }}>{s.tag}</span>
                  <span className="text-gray-400 text-xs leading-relaxed">{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-slate-900 rounded-xl p-3">
          <div className="text-gray-500 text-xs font-bold mb-2 tracking-widest">▸ 方案架構對比</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label:"方案 A 一條龍標配", items:["設備・補貨・清運全包", "換取：零場地租金", "適合快速展點"], col:C.cyberGreen },
              { label:"方案 B ESG 逆物流", items:["蝦皮車順載廢紙板", "換取：ESG 數據報告", "適合總部 CSR 需求"], col:C.shopeeOrange },
            ].map(p => (
              <div key={p.label} className="bg-gray-800 rounded-lg p-3 border" style={{ borderColor: `${p.col}33` }}>
                <div className="text-xs font-bold mb-1.5" style={{ color:p.col }}>{p.label}</div>
                {p.items.map(it => (
                  <div key={it} className="text-gray-400 text-xs leading-loose">· {it}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

const STATIONS = [
  { id:"桃園 A1", name:"中壢智取站", online:true,  bag:82, tape:74, rev:2300, full:34 },
  { id:"桃園 A2", name:"桃園市區站", online:true,  bag:15, tape:61, rev:1980, full:87 },
  { id:"桃園 A3", name:"八德智取站", online:true,  bag:45, tape:18, rev:2750, full:51 },
  { id:"桃園 A4", name:"平鎮智取站", online:false, bag:0,  tape:0,  rev:0,   full:0  },
  { id:"桃園 A5", name:"龜山智取站", online:true,  bag:63, tape:55, rev:2100, full:78 },
];

function Block4_Monitor() {
  return (
    <Card accent="#f59e0b" className="col-span-1">
      <CardHead icon="📡" title="桃園區 MVP 實時監測" sub="5 站即時狀態 (IoT 模擬數據)" accent="#f59e0b" />
      <div className="p-4">

        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {[
            { label:"需派車補貨", count:2, col:"#EF4444" },
            { label:"回收槽接近滿載", count:2, col:C.shopeeOrange },
            { label:"設備離線", count:1, col:"#6b7280" },
            { label:"正常運行", count:2, col:C.cyberGreen },
          ].map(a => (
            <span key={a.label} className="text-xs px-2.5 py-1 rounded-full font-bold" style={{ background:a.col+"22", color:a.col }}>
              {a.label} ×{a.count}
            </span>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                {["站點", "狀態", "破壞袋庫存", "膠帶庫存", "昨日營收", "回收槽滿載"].map(h => (
                  <th key={h} className={`text-gray-500 font-semibold text-xs p-2 border-b border-gray-700 whitespace-nowrap ${h==="昨日營收" ? "text-right" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STATIONS.map((s, i) => {
                const bagWarn  = s.bag  < 20;
                const tapeWarn = s.tape < 20;
                const fullWarn = s.full > 80;
                return (
                  <tr key={s.id} className={`border-b border-gray-800/60 ${i%2===0 ? "" : "bg-slate-900/50"}`}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-white font-semibold text-xs">{s.id}</div>
                      <div className="text-gray-500 text-xs">{s.name}</div>
                    </td>
                    <td className="p-2">
                      {s.online
                        ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background:`${C.cyberGreen}22`, color:C.cyberGreen }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background:C.cyberGreen }} />連線
                          </span>
                        : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-400 text-xs font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />離線
                          </span>
                      }
                    </td>
                    <td className="p-2">
                      {s.online
                        ? <div className="flex flex-col gap-1">
                            <MiniBar pct={s.bag} warn={bagWarn} />
                            {bagWarn && <WarnTag label="低庫存" />}
                          </div>
                        : <span className="text-gray-700 text-xs">—</span>
                      }
                    </td>
                    <td className="p-2">
                      {s.online
                        ? <div className="flex flex-col gap-1">
                            <MiniBar pct={s.tape} warn={tapeWarn} />
                            {tapeWarn && <WarnTag label="低庫存" />}
                          </div>
                        : <span className="text-gray-700 text-xs">—</span>
                      }
                    </td>
                    <td className="p-2 text-right">
                      <span className="font-semibold" style={{ color: s.rev > 0 ? C.warmWhite : "#374151" }}>
                        {s.rev > 0 ? `NT$ ${s.rev.toLocaleString()}` : "—"}
                      </span>
                    </td>
                    <td className="p-2">
                      {s.online
                        ? <div className="flex flex-col gap-1">
                            <MiniBar pct={s.full} warn={fullWarn} inv />
                            {fullWarn && <WarnTag label="即將滿載" />}
                            {!fullWarn && s.full < 80 && <GreenTag label="正常" />}
                          </div>
                        : <span className="text-gray-700 text-xs">—</span>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-3 p-3 bg-slate-900 rounded-lg flex flex-wrap gap-x-4 gap-y-2">
          <span className="text-gray-500 text-xs font-bold">視覺防呆規則：</span>
          <span className="text-red-400 text-xs">⚠ 庫存 &lt;20% → 紅色警示・派車補貨</span>
          <span className="text-red-400 text-xs">⚠ 滿載 &gt;80% → 紅色警示・派車清運</span>
        </div>
      </div>
    </Card>
  );
}

/* ════════════════════════════════════════════════
   ADMIN DASHBOARD (logged in)
════════════════════════════════════════════════ */
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const now = new Date();
  const ts  = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")} ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;

  return (
    <div className="min-h-screen bg-gray-950">

      <div className="bg-gray-950 border-b border-gray-800 h-[88px] px-6 flex items-center justify-between flex-wrap gap-y-2">
        <div className="flex items-center gap-3">
          <span className="text-gray-700 text-sm">/ 內部管理系統</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-bold border" style={{ background:`${C.cyberGreen}18`, color:C.cyberGreen, borderColor:`${C.cyberGreen}33` }}>
            MVP 第 1 個月
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-gray-600 text-xs">模擬數據 · {ts}</span>
          <button onClick={onLogout}
            className="text-xs text-gray-500 border border-gray-700 bg-transparent rounded-lg px-3 py-1.5 hover:border-gray-500 transition">
            登出
          </button>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label:"部署總台數",    val:"10 台",        sub:"桃園 MVP 區",       col:C.cyberGreen  },
            { label:"上線中台數",    val:"4 台",         sub:"1 台離線・待復原",   col:C.cyberGreen  },
            { label:"今日合計營收",  val:"NT$ 11,130",   sub:"4 上線站加總",       col:C.warmWhite   },
            { label:"預估月回本",    val:"7–9 個月",     sub:"目標 8–10 個月",     col:C.shopeeOrange},
          ].map(k => (
            <div key={k.label} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="text-gray-500 text-xs mb-1">{k.label}</div>
              <div className="font-black text-lg leading-tight" style={{ color:k.col }}>{k.val}</div>
              <div className="text-gray-600 text-xs mt-1">{k.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <Block1_ROI />
          <Block2_PnL />
          <Block3_SOP />
          <Block4_Monitor />
        </div>

        <div className="mt-4 rounded-xl p-4 flex gap-2 items-start" style={{ border:"1px solid #92400e44", background:"#78350f0d" }}>
          <span className="text-amber-400 text-base flex-shrink-0">⚠️</span>
          <p className="text-gray-500 text-xs leading-relaxed m-0">
            本儀表板目前為<span className="font-bold text-amber-300">靜態 UI 原型展示</span>，所有數據均為模擬值。後續將移轉至 Windsurf 串接 Supabase Auth，實現正式 Google 身分驗證、IoT 即時數據串流，與 10 台 MVP 測試機之真實營運儀表板。
          </p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   ADMIN LOGIN PAGE
════════════════════════════════════════════════ */
function AdminPage() {
  const [authed,   setAuthed]   = useState(false);
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setAuthed(true); }, 1500);
  };

  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setAuthed(true); }, 1500);
  };

  if (authed) return <AdminDashboard onLogout={() => setAuthed(false)} />;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-7">
          <img src="/logo.png" alt="RE:BOX Logo" className="h-12 mx-auto" />
          <p className="text-gray-500 text-sm mt-2">內部管理系統</p>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <h2 className="text-white font-bold text-xl m-0 mb-1">歡迎回來</h2>
          <p className="text-gray-500 text-sm m-0 mb-6">登入以存取 RE:BOX 營運後台</p>

          <div className="mb-4">
            <label className="block text-gray-400 text-xs font-bold mb-1.5 tracking-widest">電子郵件</label>
            <input type="email" placeholder="admin@rebox.tw"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-cyber-green transition"
              style={{ '--cyber-green': C.cyberGreen } as React.CSSProperties} />
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 text-xs font-bold mb-1.5 tracking-widest">密碼</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-cyber-green transition"
              style={{ '--cyber-green': C.cyberGreen } as React.CSSProperties}/>
          </div>

          <button onClick={handleLogin} disabled={loading}
            className="w-full text-gray-900 font-bold border-none rounded-xl p-3 text-sm cursor-pointer mb-2.5 disabled:opacity-70"
            style={{ background:C.cyberGreen }}>
            {loading ? (
              <span className="flex items-center justify-center gap-2 text-gray-900">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                驗證中，進入儀表板…
              </span>
            ) : "登入後台"}
          </button>

          <div className="flex items-center gap-2.5 my-3.5">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-gray-600 text-xs">或</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          <button onClick={handleGoogle} disabled={loading}
            className="w-full bg-white text-gray-800 font-semibold border-none rounded-xl p-3 text-sm cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-70">
            {loading ? (
              <span className="flex items-center gap-2 text-gray-500">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                驗證中，進入儀表板…
              </span>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                使用 Google 帳號登入（模擬）
              </>
            )}
          </button>
        </div>

        <div className="mt-4 rounded-xl p-3 flex gap-2 items-start" style={{ border:"1px solid #78350f55", background:"#78350f0d" }}>
          <span className="text-amber-400 text-sm flex-shrink-0">⚠️</span>
          <p className="text-gray-500 text-xs leading-relaxed m-0">
            本區塊目前為<span className="font-bold text-amber-300">靜態 UI 原型展示</span>。後續將移轉至 Windsurf 串接 Supabase Auth，實現正式 Google 身分驗證與 10 台 MVP 測試機之真實數據儀表板。
          </p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   PROPOSAL PAGE
════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center py-20 px-12 bg-gray-950">
      <div className="max-w-4xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ border:`1px solid ${C.cyberGreen}40`, background:`${C.cyberGreen}0d` }}>
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:C.cyberGreen }} />
          <span className="text-sm font-medium" style={{ color:C.cyberGreen }}>ESG × 單向純回收 × 無人智取站</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-3.5">
          RE:BOX 智能循環機<br />
          <span style={{ color:C.cyberGreen }}>啟動無人店的綠色微循環</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-lg mb-2.5">零髒亂、真回收，為智取店量身打造的 ESG 智能寄取站。</p>
        <p className="text-sm mb-12" style={{ color:`${C.warmWhite}66` }}>2700K 暖白光 LED 照明 · 內凹防呆工作台 · 單向純回收機制</p>
        <div className="w-full aspect-video rounded-2xl bg-black border border-gray-800 relative">
          <img src="/hero.png" alt="RE:BOX AI 透視效果圖" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
          
          {/* 往下/外擴散的 2700K 暖白光 LED 裝飾線 */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 z-10" style={{ background:C.warmWhite, boxShadow:`0 10px 40px 12px ${C.warmWhite}44, 0 20px 80px 24px #ffcc6618` }} />
          
          {[[2,2,C.cyberGreen],[2,"auto",C.shopeeOrange],["auto",2,C.shopeeOrange],["auto","auto",C.cyberGreen]].map(([t,r,col],i)=>(
            <span key={i} className="absolute w-2 h-2 rounded-full" style={{ top:t, right:r, bottom: t === 'auto' ? 4 : undefined, left: r === 'auto' ? 2 : undefined, background:col, boxShadow:`0 0 8px ${col}` }} />
          ))}
        </div>
      </div>
    </section>
  );
}

const PAINS = [
  { icon:"📦", title:"紙箱爆滿佔空間", desc:"門市廢紙箱無處堆放，嚴重影響動線與品牌形象。" },
  { icon:"💸", title:"清運成本不透明", desc:"自行委外清運頻率高、費用模糊，難以管控。" },
  { icon:"😤", title:"個資外洩客訴多", desc:"拆箱區凌亂、面單隨意棄置，引發消費者隱私疑慮。" },
];
const SOLUTIONS = [
  { icon:"🔒", title:"單向純回收機制",  desc:"物理防呆設計，紙箱只進不出，不設共享或轉售功能，回收邏輯單純乾淨。" },
  { icon:"🖊️", title:"個資亂碼滾輪章", desc:"內凹工作台內建亂碼滾輪章，一滾即完成去個資，根除客訴來源。" },
  { icon:"📊", title:"ESG 減碳數據報告", desc:"即時產出精準回收數據，協助蝦皮達成永續揭露目標與 CSR 報告佐證。" },
];

function PainSolutionSection() {
  return (
    <section className="py-20 px-12 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-white font-black text-3xl mb-2">痛點與解法對比</h2>
          <p className="text-gray-500 text-base">現況問題一次解決，從源頭重新設計循環邏輯。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { items:PAINS,     accentCol:"#ef4444", label:"現況痛點", labelCol:"#f87171" },
            { items:SOLUTIONS, accentCol:C.cyberGreen, label:"RE:BOX 解法", labelCol:C.cyberGreen },
          ].map(col => (
            <div key={col.label} className="bg-gray-950 rounded-2xl p-6" style={{ border:`1px solid ${col.accentCol}33` }}>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-1.5 h-8 rounded-full block" style={{ background:col.accentCol }} />
                <h3 className="font-bold text-lg" style={{ color:col.labelCol }}>{col.label}</h3>
              </div>
              {col.items.map(it => (
                <div key={it.title} className="flex gap-3.5 items-start mb-4 last:mb-0">
                  <span className="text-2xl">{it.icon}</span>
                  <div>
                    <div className="font-semibold text-sm mb-1" style={{ color:col.labelCol }}>{it.title}</div>
                    <div className="text-gray-400 text-sm leading-relaxed">{it.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { tag:"硬體規格", title:"薄型 60cm 機身",       sub:"110V 隨插即用 · 極致坪效",              desc:"機身寬僅 60cm，110V 隨插即用，無需改建水電。任何智取站皆可部署，不擋動線。" },
  { tag:"防呆設計", title:"內凹式工作台 Alcove",   sub:"安全割刀 · 亂碼滾輪章 · 2700K 暖白光", desc:"深度內凹拆箱工作台配 2700K 暖白光 LED，內建伸縮安全割刀與個資亂碼滾輪章，一步去個資。" },
  { tag:"單向純回收", title:"無共享・無現金模組",  sub:"不賣紙箱 · 多元電子支付",               desc:"嚴格執行單向純回收邏輯，不設共享轉售功能，確保 ESG 數據乾淨。全程無現金操作。" },
];

function FeaturesSection() {
  return (
    <section className="py-20 px-12 bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-white font-black text-3xl mb-2">硬體與防呆亮點</h2>
          <p className="text-gray-500 text-base">每一個設計細節，都是為了讓站點零客訴、零管理成本。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background:`${C.cyberGreen}18` }}>
                <svg className="w-6 h-6" style={{ color:C.cyberGreen }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                </svg>
              </div>
              <span className="text-xs font-bold tracking-widest" style={{ color:C.cyberGreen }}>{f.tag}</span>
              <h3 className="text-white font-bold text-base my-1">{f.title}</h3>
              <p className="text-xs mb-2" style={{ color:`${C.warmWhite}55` }}>{f.sub}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnershipSection() {
  const plans = [
    { badge:"標配・方案 A", title:"一條龍標配版", sub:"設備・補貨・清運全包", emoji:"🚀", col:C.cyberGreen,
      items:[
        { t:"設備採購、安裝、維護由我方全包", hi:false },
        { t:"初期採 Town Ace 短租補貨車，靈活調度", hi:false },
        { t:"廢紙清運定時排程，店家零操心", hi:false },
        { t:"換取：免收機台場地租金", hi:true },
      ], note:"✦ 最適合快速展店、降低前期投入的合作夥伴" },
    { badge:"選配・方案 B", title:"ESG 逆物流選配版", sub:"蝦皮物流順載・零額外成本", emoji:"🌱", col:C.shopeeOrange,
      items:[
        { t:"蝦皮物流回程車順手帶回廢紙板", hi:false },
        { t:"整合既有物流路線，真正零額外成本", hi:false },
        { t:"免費提供精準 ESG 回收數據報告", hi:true },
        { t:"供蝦皮總部 ESG 揭露、CSR 報告使用", hi:true },
      ], note:"✦ 最適合重視 ESG 永續指標、需要碳排佐證數據的夥伴" },
  ];
  return (
    <section className="py-20 px-12 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-white font-black text-3xl mb-2">雙贏合作方案</h2>
          <p className="text-gray-500 text-base">一條龍標配 vs ESG 逆物流選配，靈活組合最適模式。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {plans.map(p => (
            <div key={p.title} className="bg-gray-950 rounded-2xl p-7 relative overflow-hidden" style={{ border:`1px solid ${p.col}44` }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full" style={{ background:`${p.col}09` }} />
              <div className="flex justify-between mb-4">
                <div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold" style={{ background:`${p.col}22`, color:p.col }}>{p.badge}</span>
                  <h3 className="text-white font-black text-xl my-2">{p.title}</h3>
                  <p className="text-gray-500 text-xs">{p.sub}</p>
                </div>
                <span className="text-3xl">{p.emoji}</span>
              </div>
              <div className="mb-4">
                {p.items.map((it,i) => (
                  <div key={i} className="flex gap-2.5 items-start mb-2.5">
                    <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-px"
                      style={{ background: it.hi ? p.col : "#1f2937", color: it.hi ? (p.col===C.cyberGreen?"#111":"#fff") : p.col }}>
                      {it.hi ? "✓" : "·"}
                    </span>
                    <span className={`text-sm ${it.hi ? 'font-semibold' : 'text-gray-300'}`} style={{ color: it.hi ? p.col : undefined }}>{it.t}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg p-3 text-xs" style={{ background:`${p.col}12`, color:p.col }}>{p.note}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="px-7 py-3 font-bold border-none rounded-xl text-base cursor-pointer" style={{ background:C.cyberGreen, color:"#111" }}>立即洽談合作</button>
          <button className="px-7 py-3 bg-transparent text-gray-400 font-medium border border-gray-700 rounded-xl text-base cursor-pointer hover:border-gray-500 transition">下載完整提案 PDF</button>
        </div>
      </div>
    </section>
  );
}

function ProposalPage() {
  return (
    <div>
      <HeroSection />
      <ViBrandSection />
      <PainSolutionSection />
      <FeaturesSection />
      <PartnershipSection />
      <footer className="bg-gray-950 border-t border-gray-800 p-7 text-center text-gray-600 text-sm">
        © 2025 RE:BOX 智能綠色寄取循環站 · 保留一切權利
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════════════
   APP ROOT
════════════════════════════════════════════════ */
export default function App() {
  const [activeTab, setActiveTab] = useState("蝦皮專案提案");
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar active={activeTab} setActive={setActiveTab} />
      <div className="pt-[88px]">
        {activeTab === "蝦皮專案提案" ? <ProposalPage /> : <AdminPage />}
      </div>
    </div>
  );
}
