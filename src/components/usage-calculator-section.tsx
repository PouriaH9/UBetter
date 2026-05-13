"use client";

import { useState, useRef, Fragment } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toPng } from "html-to-image";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";
import { translations } from "@/i18n/translations";
import {
  UPS_DEVICE_CATEGORY_ORDER,
  UPS_DEVICES_BY_CATEGORY,
} from "@/i18n/ups-device-data";
import type { UpsCategoryId } from "@/i18n/ups-device-data";
import { formatBackupDuration, formatStepMeta } from "@/i18n/ups-calculator.dict";
import type { UpsCalculatorDict } from "@/i18n/ups-calculator.dict";
import calculatorHeroDesktop from "@/assets/CALCULATOR DESKTOP SIZE.png";
import calculatorHeroMobile from "@/assets/CALCULATOR MOBILE SIZE.png";

import type { ComponentType, SVGProps } from "react";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";
const easeOut = [0.22, 1, 0.36, 1] as const;

/** Sales line — `href` must be E.164 digits only after `tel:` */
const UPS_CALC_SALES_PHONE_TEL = "tel:+989120000000";
const UPS_CALC_SALES_PHONE_DISPLAY = "+98 912 000 0000";

type UPSType = "online" | "line-interactive" | "offline";

const UPS_TYPE_ORDER = ["online", "line-interactive", "offline"] as const;

function IconGauge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M4 15a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 11V7M12 11l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" />
    </svg>
  );
}
function IconUpsBox(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="5.5" y="6" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="11.5" r="2" fill="currentColor" />
      <path d="M8.5 18h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconCalc(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8h8M8 12h3M13 12h3M8 16h3M13 16h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function IconReport(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M7 3h8l4 4v14a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15 3v4h4M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconHelp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 9.5a3 3 0 0 1 5.2 2c0 2-3 2.5-3 4.5M12 17h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconBolt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M13 2 3 14h7l-1 8 11-12h-8l1-8Z" fill="currentColor" />
    </svg>
  );
}
function IconShieldZap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m12 8-2 4h4l-2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconWave(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M3 12c2.5-4 5.5-4 7.5 0s5 4 7.5 0 5.5-4 7.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 17c2.5-4 5.5-4 7.5 0s5 4 7.5 0 5.5-4 7.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}
function IconBattery(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 11v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}
function IconClock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconStack(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}
function IconCertificate(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 13.5 12 22l3.5-8.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function IconPhone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.63a2 2 0 0 1-.45 2.11L8.09 9.9a16 16 0 0 0 6 6l1.45-1.45a2 2 0 0 1 2.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const WIZARD_ICONS = [IconGauge, IconUpsBox, IconCalc, IconReport] as const;

const UPS_TYPE_ICONS: Record<UPSType, ComponentType<SVGProps<SVGSVGElement>>> = {
  online: IconShieldZap,
  "line-interactive": IconWave,
  offline: IconBolt,
};

const UPS_SIZES = [500, 650, 800, 1000, 1500, 2000, 3000, 5000, 6000, 10000, 15000, 20000];
const BACKUP_TIMES = [0.5, 1, 2, 3, 4, 6, 8];

function recommendUPS(totalW: number, upsType: UPSType) {
  const pf = upsType === "online" ? 0.9 : upsType === "line-interactive" ? 0.75 : 0.65;
  const requiredVA = Math.ceil((totalW / pf) * 1.25);
  const recVA = UPS_SIZES.find((s) => s >= requiredVA) ?? UPS_SIZES[UPS_SIZES.length - 1];

  let battQty = 1, battAh = 7;
  if      (recVA <= 800)   { battQty = 1;  battAh = 7;  }
  else if (recVA <= 1500)  { battQty = 1;  battAh = 9;  }
  else if (recVA <= 3000)  { battQty = 2;  battAh = 9;  }
  else if (recVA <= 6000)  { battQty = 4;  battAh = 9;  }
  else if (recVA <= 10000) { battQty = 8;  battAh = 9;  }
  else                     { battQty = 16; battAh = 9;  }

  return { requiredVA, recommendedVA: recVA, battQty, battAh };
}

function calcRuntime(totalW: number, battQty: number, battAh: number): number {
  return Math.min(Math.round((battQty * 12 * battAh * 0.85 * 60) / Math.max(totalW, 1)), 240);
}

/** Black / white only (with alpha) — calculator section, both themes. */
export function getCalcMonochrome(isDark: boolean) {
  if (isDark) {
    return {
      fg: "#ffffff",
      fgMuted: "rgba(255,255,255,0.72)",
      fgFaint: "rgba(255,255,255,0.5)",
      fgGhost: "rgba(255,255,255,0.32)",
      border: "rgba(255,255,255,0.2)",
      divider: "rgba(255,255,255,0.12)",
      inputBg: "rgba(255,255,255,0.07)",
      selectBg: "rgba(255,255,255,0.08)",
      chipIdle: "rgba(255,255,255,0.08)",
      tileIdle: "rgba(255,255,255,0.04)",
      chipActiveBg: "#ffffff",
      chipActiveFg: "#000000",
      btnBg: "#ffffff",
      btnFg: "#000000",
      subtleBg: "rgba(255,255,255,0.04)",
      totalRowBg: "rgba(255,255,255,0.12)",
      totalRowBorder: "rgba(255,255,255,0.45)",
      stepActiveBg: "#ffffff",
      stepActiveFg: "#000000",
      stepIdleBg: "rgba(255,255,255,0.12)",
      stepMuted: "rgba(255,255,255,0.4)",
      innerCardBg: "rgba(255,255,255,0.06)",
      innerCardBorder: "rgba(255,255,255,0.14)",
      promoBg: "rgba(255,255,255,0.08)",
      promoBorder: "rgba(255,255,255,0.2)",
      promoTitle: "#ffffff",
      ghostBg: "rgba(255,255,255,0.08)",
      ghostFg: "#ffffff",
      ghostBorder: "rgba(255,255,255,0.22)",
      h2Color: "#ffffff",
      h2SpanBg: "#ffffff",
      h2SpanFg: "#000000",
      subtitle: "rgba(255,255,255,0.88)",
      titleShadow: "0 2px 24px rgba(0,0,0,0.65)",
      subtitleShadow: "0 1px 16px rgba(0,0,0,0.35)",
      glassBg: "rgba(255,255,255,0.06)",
      glassBorder: "rgba(255,255,255,0.18)",
      glassShadow: "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.06), 0 8px 40px rgba(0,0,0,0.12)",
      sectionTopBorder: "rgba(255,255,255,0.08)",
    } as const;
  }
  return {
    fg: "#0a0a0a",
    fgMuted: "rgba(0,0,0,0.68)",
    fgFaint: "rgba(0,0,0,0.45)",
    fgGhost: "rgba(0,0,0,0.3)",
    border: "rgba(0,0,0,0.14)",
    divider: "rgba(0,0,0,0.1)",
    inputBg: "rgba(0,0,0,0.04)",
    selectBg: "#ffffff",
    chipIdle: "rgba(0,0,0,0.06)",
    tileIdle: "rgba(0,0,0,0.03)",
    chipActiveBg: "#0a0a0a",
    chipActiveFg: "#ffffff",
    btnBg: "#0a0a0a",
    btnFg: "#ffffff",
    subtleBg: "rgba(0,0,0,0.04)",
    totalRowBg: "rgba(0,0,0,0.08)",
    totalRowBorder: "rgba(0,0,0,0.32)",
    stepActiveBg: "#0a0a0a",
    stepActiveFg: "#ffffff",
    stepIdleBg: "rgba(0,0,0,0.08)",
    stepMuted: "rgba(0,0,0,0.38)",
    innerCardBg: "rgba(0,0,0,0.04)",
    innerCardBorder: "rgba(0,0,0,0.12)",
    promoBg: "rgba(0,0,0,0.05)",
    promoBorder: "rgba(0,0,0,0.14)",
    promoTitle: "#0a0a0a",
    ghostBg: "rgba(0,0,0,0.05)",
    ghostFg: "#0a0a0a",
      ghostBorder: "rgba(0,0,0,0.14)",
      h2Color: "#0a0a0a",
    h2SpanBg: "#0a0a0a",
    h2SpanFg: "#ffffff",
    subtitle: "rgba(0,0,0,0.72)",
    titleShadow: "0 2px 20px rgba(255,255,255,0.75)",
    subtitleShadow: "0 1px 12px rgba(255,255,255,0.45)",
    glassBg: "rgba(255,255,255,0.5)",
    glassBorder: "rgba(0,0,0,0.12)",
    glassShadow: "inset 0 1px 0 rgba(255,255,255,0.75), 0 8px 28px rgba(0,0,0,0.06)",
    sectionTopBorder: "rgba(0,0,0,0.08)",
  } as const;
}

export type CalcMonochrome = ReturnType<typeof getCalcMonochrome>;

// ═══════════════════════════════════════════════════════════════════════════════
// UPS Selector Wizard
// ═══════════════════════════════════════════════════════════════════════════════

interface UPSDeviceEntry {
  id:         string;
  categoryId: UpsCategoryId;
  deviceId:   string;
  watt:       number;
  qty:        number;
}

function StepIntro({
  M,
  locale,
  u,
  stepIndex,
  title,
  subtitle,
}: {
  M: CalcMonochrome;
  locale: Locale;
  u: UpsCalculatorDict;
  stepIndex: 0 | 1 | 2 | 3;
  title: string;
  subtitle: string;
}) {
  const Icon = WIZARD_ICONS[stepIndex];
  const ws = u.wizardSteps[stepIndex];
  const meta = formatStepMeta(locale, u, stepIndex, u.wizardSteps.length, ws.hint);
  return (
    <div className="flex gap-3 sm:gap-4 items-start mb-1">
      <div
        className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
        style={{ background: M.innerCardBg, border: `1px solid ${M.border}` }}
        aria-hidden
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: M.fg }} />
      </div>
      <div className="min-w-0 flex-1 text-start">
        <p className="text-[10px] font-bold tracking-[0.12em] mb-1" style={{ color: M.fgGhost }}>
          {meta}
        </p>
        <h3 className="text-[17px] sm:text-[18px] font-black mb-1.5 leading-snug" style={{ color: M.fg }}>
          {title}
        </h3>
        <p className="text-[12px] sm:text-[13px] leading-relaxed" style={{ color: M.fgMuted }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function UPSSelector({ M, locale }: { M: CalcMonochrome; locale: Locale }) {
  const u = translations[locale].upsCalculator;
  const nLoc = locale === "fa" ? "fa-IR" : "en-US";
  const [step, setStep]             = useState(1);
  const [knowLoad, setKnowLoad]     = useState<boolean | null>(null);
  const [directWatt, setDirectWatt] = useState(1000);
  const [devices, setDevices]       = useState<UPSDeviceEntry[]>([]);

  const firstCat = UPS_DEVICE_CATEGORY_ORDER[0];
  const firstDev = UPS_DEVICES_BY_CATEGORY[firstCat][0];
  const [selCategory, setSelCategory] = useState<UpsCategoryId>(firstCat);
  const [selDeviceId, setSelDeviceId] = useState(firstDev.id);
  const [selWatt,     setSelWatt]     = useState(firstDev.watt);
  const [selQty,      setSelQty]      = useState(1);

  const [upsType,        setUpsType]        = useState<UPSType>("line-interactive");
  const [targetHours,    setTargetHours]    = useState(1);

  const totalW  = knowLoad ? directWatt : devices.reduce((s, d) => s + d.watt * d.qty, 0);
  const rec     = totalW > 0 ? recommendUPS(totalW, upsType) : null;
  const runtime = rec ? calcRuntime(totalW, rec.battQty, rec.battAh) : 0;

  const reportCardRef = useRef<HTMLDivElement | null>(null);
  const EXPORT_PNG_CLASS = "ups-export-png-active";

  async function downloadReportImage() {
    const el = reportCardRef.current;
    if (!rec || !el) return;
    const w = Math.max(1, el.offsetWidth);
    const h = Math.max(1, el.offsetHeight);
    const maxCanvasSide = 8192;
    let pixelRatio = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 2);
    pixelRatio = Math.min(pixelRatio, maxCanvasSide / w, maxCanvasSide / h);
    if (!Number.isFinite(pixelRatio) || pixelRatio < 1) pixelRatio = 1;

    el.classList.add(EXPORT_PNG_CLASS);
    await (document.fonts?.ready ?? Promise.resolve());
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      });
    });
    try {
      const dataUrl = await toPng(el, {
        cacheBust: true,
        pixelRatio,
        backgroundColor: "#ffffff",
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "ubetter-ups-report.png";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error(e);
    } finally {
      el.classList.remove(EXPORT_PNG_CLASS);
    }
  }

  const inputBase = {
    background: M.inputBg,
    border: `1px solid ${M.border}`,
    color: M.fg,
  } as React.CSSProperties;

  const selectBase = {
    background: M.selectBg,
    border: `1px solid ${M.border}`,
    color: M.fg,
  } as React.CSSProperties;

  function addDevice() {
    setDevices((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        categoryId: selCategory,
        deviceId: selDeviceId,
        watt: selWatt,
        qty: selQty,
      },
    ]);
  }

  function changeCategory(cat: UpsCategoryId) {
    const first = UPS_DEVICES_BY_CATEGORY[cat][0];
    setSelCategory(cat);
    setSelDeviceId(first.id);
    setSelWatt(first.watt);
  }

  function changeDevice(deviceId: string) {
    const found = UPS_DEVICES_BY_CATEGORY[selCategory].find((d) => d.id === deviceId);
    if (found) {
      setSelDeviceId(found.id);
      setSelWatt(found.watt);
    }
  }

  function canAdvanceStep1() {
    if (knowLoad === null) return false;
    if (knowLoad) return directWatt > 0;
    return devices.length > 0;
  }

  // ── Step 1 ───────────────────────────────────────────────────────────────────
  const renderStep1 = (
    <div className="space-y-6">
      <StepIntro
        M={M}
        locale={locale}
        u={u}
        stepIndex={0}
        title={u.step1.title}
        subtitle={u.step1.subtitle}
      />

      {/* Yes / No choice */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {[
          { val: true as const,  title: u.step1.yesTitle, sub: u.step1.yesSub, Icon: IconCheck },
          { val: false as const, title: u.step1.noTitle, sub: u.step1.noSub, Icon: IconHelp },
        ].map((opt) => (
          <button
            key={String(opt.val)}
            type="button"
            onClick={() => setKnowLoad(opt.val)}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-start transition-all duration-200"
            style={{
              background: knowLoad === opt.val ? M.chipIdle : M.tileIdle,
              border: `2px solid ${knowLoad === opt.val ? M.fg : M.border}`,
            }}
          >
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: knowLoad === opt.val ? M.chipActiveBg : M.chipIdle,
                color: knowLoad === opt.val ? M.chipActiveFg : M.fg,
              }}
              aria-hidden
            >
              <opt.Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </span>
            <div className="flex flex-col gap-0.5 text-start min-w-0">
              <span className="text-[14px] font-bold" style={{ color: M.fg }}>{opt.title}</span>
              <span className="text-[11px] leading-snug" style={{ color: M.fgFaint }}>{opt.sub}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Direct wattage */}
      {knowLoad === true && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-2">
          <label className="block text-[12px] font-semibold text-start" style={{ color: M.fgFaint }}>{u.step1.directWattLabel}</label>
          <div className="relative w-48 max-w-full">
            <input
              type="number" min={1} value={directWatt}
              onChange={(e) => setDirectWatt(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-xl px-4 py-3 pe-10 text-[16px] font-bold focus:outline-none"
              style={inputBase}
            />
            <span className="absolute end-3 top-1/2 -translate-y-1/2 text-[12px] font-black" style={{ color: M.fg }}>W</span>
          </div>
        </motion.div>
      )}

      {/* Device selector */}
      {knowLoad === false && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
          <p className="text-[13px] text-start" style={{ color: M.fgMuted }}>
            {u.step1.pickDevicesHint}
          </p>

          {/* Add row */}
          <div className="flex flex-wrap gap-3 items-end">
            {/* Category */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-[130px]">
              <label className="text-[11px] font-semibold text-start" style={{ color: M.fgFaint }}>{u.step1.category}</label>
              <select
                value={selCategory}
                onChange={(e) => changeCategory(e.target.value as UpsCategoryId)}
                className="rounded-xl px-3 py-2.5 text-[13px] focus:outline-none w-full"
                style={selectBase}
              >
                {UPS_DEVICE_CATEGORY_ORDER.map((cat) => (
                  <option key={cat} value={cat}>{u.categories[cat]}</option>
                ))}
              </select>
            </div>

            {/* Device */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
              <label className="text-[11px] font-semibold text-start" style={{ color: M.fgFaint }}>{u.step1.deviceName}</label>
              <select
                value={selDeviceId}
                onChange={(e) => changeDevice(e.target.value)}
                className="rounded-xl px-3 py-2.5 text-[13px] focus:outline-none w-full"
                style={selectBase}
              >
                {UPS_DEVICES_BY_CATEGORY[selCategory].map((d) => (
                  <option key={d.id} value={d.id}>{u.devices[d.id]}</option>
                ))}
              </select>
            </div>

            {/* Wattage */}
            <div className="flex flex-col gap-1.5 w-[88px]">
              <label className="text-[11px] font-semibold text-start" style={{ color: M.fgFaint }}>{u.step1.watt}</label>
              <input
                type="number" min={1} value={selWatt}
                onChange={(e) => setSelWatt(Math.max(1, Number(e.target.value)))}
                className="rounded-xl px-3 py-2.5 text-[13px] font-bold focus:outline-none w-full"
                style={inputBase}
              />
            </div>

            {/* Qty */}
            <div className="flex flex-col gap-1.5 w-[72px]">
              <label className="text-[11px] font-semibold text-start" style={{ color: M.fgFaint }}>{u.step1.qty}</label>
              <input
                type="number" min={1} value={selQty}
                onChange={(e) => setSelQty(Math.max(1, Number(e.target.value)))}
                className="rounded-xl px-3 py-2.5 text-[13px] font-bold focus:outline-none w-full"
                style={inputBase}
              />
            </div>

            {/* Add button */}
            <button
              type="button"
              onClick={addDevice}
              className="px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 hover:scale-105 self-end"
              style={{ background: M.btnBg, color: M.btnFg }}
            >
              {u.step1.addDevice}
            </button>
          </div>

          {/* Device list */}
          {devices.length > 0 && (
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${M.border}` }}>

              {/* ── Mobile: card list (hidden on sm+) ── */}
              <div className="sm:hidden divide-y" style={{ borderColor: M.divider }}>
                {devices.map((d) => (
                  <div key={d.id} className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <div className="flex flex-col gap-0.5 min-w-0 text-start">
                      <span className="text-[13px] font-semibold truncate" style={{ color: M.fg }}>{u.devices[d.deviceId]}</span>
                      <span className="text-[11px]" style={{ color: M.fgFaint }}>{u.categories[d.categoryId]}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 text-[12px]">
                      <span style={{ color: M.fgMuted }}>{d.watt}W × {d.qty}</span>
                      <span className="font-bold" style={{ color: M.fg }}>{d.watt * d.qty}W</span>
                      <button
                        type="button"
                        onClick={() => setDevices((prev) => prev.filter((x) => x.id !== d.id))}
                        className="px-2 py-1 rounded-lg text-[11px] font-semibold transition-all hover:opacity-80"
                        style={{ background: M.tileIdle, color: M.fg, border: `1px solid ${M.border}` }}
                      >
                        {u.step1.remove}
                      </button>
                    </div>
                  </div>
                ))}
                {/* Mobile total row */}
                <div className="flex items-center justify-between px-3 py-2.5" style={{ background: M.totalRowBg }}>
                  <span className="text-[13px] font-bold text-start" style={{ color: M.fg }}>{u.step1.mobileTotal}</span>
                  <span className="text-[15px] font-black tabular-nums" style={{ color: M.fg }}>{totalW} W</span>
                </div>
              </div>

              {/* ── Desktop: scrollable table (hidden on mobile) ── */}
              <div className="hidden sm:block overflow-x-auto">
                <table
                  className="w-full text-[12px]"
                  style={{ fontFamily: locale === "fa" ? YK : "inherit", minWidth: "480px" }}
                >
                  <thead>
                    <tr style={{ background: M.subtleBg }}>
                      {[u.step1.category, u.step1.deviceName, `${u.step1.watt}*`, u.step1.qty, u.step1.lineTotal, u.step1.actions].map((h) => (
                        <th key={h} className="px-3 py-2.5 text-start font-semibold whitespace-nowrap" style={{ color: M.fgFaint }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map((d, i) => (
                      <tr
                        key={d.id}
                        style={{
                          borderTop: `1px solid ${M.divider}`,
                          background: i % 2 === 1 ? M.tileIdle : "transparent",
                        }}
                      >
                        <td className="px-3 py-2 whitespace-nowrap text-start" style={{ color: M.fgFaint }}>{u.categories[d.categoryId]}</td>
                        <td className="px-3 py-2 font-medium text-start" style={{ color: M.fg }}>{u.devices[d.deviceId]}</td>
                        <td className="px-3 py-2 tabular-nums text-start" style={{ color: M.fgMuted }}>{d.watt}</td>
                        <td className="px-3 py-2 tabular-nums text-start" style={{ color: M.fgMuted }}>{d.qty}</td>
                        <td className="px-3 py-2 tabular-nums font-bold text-start" style={{ color: M.fg }}>{d.watt * d.qty}</td>
                        <td className="px-3 py-2 text-start">
                          <button
                            type="button"
                            onClick={() => setDevices((prev) => prev.filter((x) => x.id !== d.id))}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all hover:opacity-80"
                            style={{ background: M.tileIdle, color: M.fg, border: `1px solid ${M.border}` }}
                          >
                            {u.step1.remove}
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: `2px solid ${M.totalRowBorder}`, background: M.totalRowBg }}>
                      <td colSpan={4} className="px-3 py-2.5 font-bold text-[13px] text-start" style={{ color: M.fg }}>{u.step1.mobileTotal}</td>
                      <td className="px-3 py-2.5 font-black tabular-nums text-[14px] text-start" style={{ color: M.fg }}>{totalW} W</td>
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="px-3 py-2 text-[10px] text-start" style={{ color: M.fgGhost }}>
                {u.step1.footnote}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Next */}
      {canAdvanceStep1() && (
        <div className="flex justify-start pt-2">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="px-8 py-3.5 rounded-xl font-bold text-[14px] transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
            style={{ background: M.btnBg, color: M.btnFg }}
          >
            {u.step1.nextStep}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={locale === "en" ? "scale-x-[-1]" : undefined} aria-hidden>
              <path d="M10 8H4M7 5L4 8l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );

  // ── Step 2 ───────────────────────────────────────────────────────────────────
  const renderStep2 = (
    <div className="space-y-6">
      <StepIntro
        M={M}
        locale={locale}
        u={u}
        stepIndex={1}
        title={u.step2.title}
        subtitle={u.step2.subtitle}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {UPS_TYPE_ORDER.map((tid) => {
          const tinfo = u.upsTypes[tid];
          const TypeIcon = UPS_TYPE_ICONS[tid];
          return (
            <button
              key={tid}
              type="button"
              onClick={() => setUpsType(tid)}
              className="flex flex-col gap-3 p-5 rounded-2xl text-start transition-all duration-200"
              style={{
                background: upsType === tid ? M.chipIdle : M.tileIdle,
                border: `2px solid ${upsType === tid ? M.fg : M.border}`,
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[15px] font-bold leading-tight text-start min-w-0 flex-1" style={{ color: M.fg }}>
                  {tinfo.title}
                </span>
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: upsType === tid ? M.stepActiveBg : M.innerCardBg,
                    border: `1px solid ${upsType === tid ? M.fg : M.border}`,
                  }}
                  aria-hidden
                >
                  <TypeIcon
                    className="w-[22px] h-[22px]"
                    style={{ color: upsType === tid ? M.stepActiveFg : M.fg }}
                  />
                </span>
              </div>
              <span className="text-[12px] leading-relaxed flex-1 text-start" style={{ color: M.fgMuted }}>{tinfo.desc}</span>
              <span
                className="text-[10px] px-2.5 py-1.5 rounded-full self-start flex items-center gap-1.5"
                style={{ background: M.chipIdle, color: M.fgMuted, border: `1px solid ${M.border}` }}
              >
                <IconStack className="w-3 h-3 flex-shrink-0 opacity-70" style={{ color: M.fg }} />
                {u.step2.suitablePrefix} {tinfo.suitable}
              </span>
            </button>
          );
        })}
      </div>

      {/* Backup time */}
      <div
        className="rounded-2xl p-4 sm:p-5"
        style={{ background: M.innerCardBg, border: `1px solid ${M.border}` }}
      >
        <div className="flex items-center gap-2.5 mb-3">
          <IconClock className="w-5 h-5 flex-shrink-0" style={{ color: M.fg }} aria-hidden />
          <label className="text-[13px] font-bold text-start" style={{ color: M.fg }}>
            {u.step2.backupLabel}
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          {BACKUP_TIMES.map((th) => (
            <button
              key={th}
              type="button"
              onClick={() => setTargetHours(th)}
              className="px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200"
              style={{
                background: targetHours === th ? M.btnBg : M.chipIdle,
                color: targetHours === th ? M.btnFg : M.fg,
                border: `1px solid ${M.border}`,
              }}
            >
              {formatBackupDuration(th, locale, u)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="px-6 py-3 rounded-xl font-medium text-[13px] transition-all"
          style={{ background: M.ghostBg, color: M.fgMuted }}
        >
          {u.step2.back}
        </button>
        <button
          type="button"
          onClick={() => setStep(3)}
          className="px-8 py-3 rounded-xl font-bold text-[14px] transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
          style={{ background: M.btnBg, color: M.btnFg }}
        >
          {u.step2.calcUps}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={locale === "en" ? "scale-x-[-1]" : undefined} aria-hidden>
            <path d="M10 8H4M7 5L4 8l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );

  // ── Step 3 ───────────────────────────────────────────────────────────────────
  const renderStep3 = rec ? (
    <div className="space-y-6">
      <StepIntro
        M={M}
        locale={locale}
        u={u}
        stepIndex={2}
        title={u.step3.title}
        subtitle={u.step3.subtitle}
      />

      {/* Result grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {(
          [
            {
              label: u.step3.statTotalLoad,
              value: `${totalW.toLocaleString(nLoc)} W`,
              sub: u.step3.subWatts,
              hl: false,
              Icon: IconBolt,
            },
            {
              label: u.step3.statMinVa,
              value: `${rec.requiredVA.toLocaleString(nLoc)} VA`,
              sub: u.step3.subVa,
              hl: false,
              Icon: IconStack,
            },
            {
              label: u.step3.statNominal,
              value: `${rec.recommendedVA.toLocaleString(nLoc)} VA`,
              sub: u.step3.subNominal,
              hl: true,
              Icon: IconCertificate,
            },
            {
              label: u.step3.statBackup,
              value: `~${(runtime / 60).toLocaleString(nLoc, { maximumFractionDigits: 1 })} ${locale === "en" ? "hrs" : u.time.hourSuffix}`,
              sub: u.step3.subStdBattery,
              hl: false,
              Icon: IconClock,
            },
          ] as const
        ).map((item) => {
          const StatIcon = item.Icon;
          return (
          <div
            key={item.label}
            className="rounded-2xl p-3.5 sm:p-4 text-center flex flex-col items-center"
            style={{
              background: item.hl ? M.chipIdle : M.tileIdle,
              border: `1px solid ${item.hl ? M.fg : M.border}`,
            }}
          >
            <StatIcon
              className="w-5 h-5 mb-2 opacity-90"
              style={{ color: item.hl ? M.fg : M.fgMuted }}
              aria-hidden
            />
            <div className="text-[9px] sm:text-[10px] mb-1.5 leading-tight" style={{ color: M.fgFaint }}>{item.label}</div>
            <div className="text-[15px] sm:text-[18px] font-black leading-tight" style={{ color: M.fg }}>{item.value}</div>
            <div className="text-[9px] sm:text-[10px] mt-1" style={{ color: M.fgGhost }}>{item.sub}</div>
          </div>
          );
        })}
      </div>

      {/* Battery info */}
      <div className="rounded-2xl p-5" style={{ background: M.innerCardBg, border: `1px solid ${M.border}` }}>
        <div className="flex items-center gap-2.5 mb-4">
          <IconBattery className="w-5 h-5 flex-shrink-0" style={{ color: M.fg }} aria-hidden />
          <h4 className="text-[14px] font-bold text-start" style={{ color: M.fg }}>{u.step3.batteryTitle}</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px] text-start">
          <div>
            <span style={{ color: M.fgFaint }}>{u.step3.battCount} </span>
            <span className="font-bold" style={{ color: M.fg }}>
              {rec.battQty.toLocaleString(nLoc)} {u.step3.battUnit}
            </span>
          </div>
          <div>
            <span style={{ color: M.fgFaint }}>{u.step3.battEach} </span>
            <span className="font-bold" style={{ color: M.fg }}>12V {rec.battAh}Ah</span>
          </div>
          <div>
            <span style={{ color: M.fgFaint }}>{u.step3.battTotal} </span>
            <span className="font-bold" style={{ color: M.fg }}>{(rec.battQty * 12 * rec.battAh).toLocaleString(nLoc)} Wh</span>
          </div>
        </div>
      </div>

      {/* UBETTER product hint */}
      <div className="rounded-2xl p-5" style={{ background: M.promoBg, border: `1px solid ${M.promoBorder}` }}>
        <div className="flex items-start gap-3 mb-2">
          <IconUpsBox className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: M.promoTitle }} aria-hidden />
          <h4 className="text-[14px] font-bold text-start" style={{ color: M.promoTitle }}>{u.step3.promoTitle}</h4>
        </div>
        <p className="text-[13px] mb-4 leading-relaxed text-start" style={{ color: M.fgMuted }}>
          {rec.recommendedVA >= 5000
            ? u.step3.promoLarge
            : rec.recommendedVA >= 2000
            ? u.step3.promoMid
            : u.step3.promoSmall}
        </p>
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px] transition-all duration-200 hover:scale-105"
          style={{ background: M.btnBg, color: M.btnFg }}
        >
          {u.step3.viewProducts}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={locale === "en" ? "scale-x-[-1]" : undefined} aria-hidden>
            <path d="M10 8H4M7 5L4 8l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="px-6 py-3 rounded-xl font-medium text-[13px] transition-all"
          style={{ background: M.ghostBg, color: M.fgMuted }}
        >
          {u.step3.back}
        </button>
        <button
          type="button"
          onClick={() => setStep(4)}
          className="px-8 py-3 rounded-xl font-bold text-[14px] transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
          style={{ background: M.btnBg, color: M.btnFg }}
        >
          {u.step3.viewReport}
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className={locale === "en" ? "scale-x-[-1]" : undefined} aria-hidden>
            <path d="M10 3v9M7 9l3 3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 14v1.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  ) : (
    <div className="py-12 px-2 text-start" style={{ color: M.fgFaint }}>{u.step3.calcError}</div>
  );

  // ── Step 4 ───────────────────────────────────────────────────────────────────
  const renderStep4 = (
    <div className="space-y-6">
      <StepIntro
        M={M}
        locale={locale}
        u={u}
        stepIndex={3}
        title={u.step4.title}
        subtitle={u.step4.subtitle}
      />

      {/* Report card */}
      {rec && (
        <div
          ref={reportCardRef}
          className="rounded-2xl p-6 space-y-4"
          style={{ background: M.innerCardBg, border: `1px solid ${M.border}` }}
        >
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div className="flex gap-3 items-start min-w-0">
              <div
                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: M.tileIdle, border: `1px solid ${M.border}` }}
                aria-hidden
              >
                <IconReport className="w-6 h-6" style={{ color: M.fg }} />
              </div>
              <div className="min-w-0 text-start">
                <h4 className="text-[16px] font-black leading-tight" style={{ color: M.fg }}>{u.step4.reportTitle}</h4>
                <p className="text-[12px] mt-1 flex items-center gap-1.5 flex-wrap text-start" style={{ color: M.fgFaint }}>
                  <IconCertificate className="w-3.5 h-3.5 flex-shrink-0 opacity-80" style={{ color: M.fgMuted }} aria-hidden />
                  {u.step4.reportTagline}
                </p>
              </div>
            </div>
            <div className="text-end ms-auto min-w-[120px]">
              <IconUpsBox className="w-8 h-8 flex-shrink-0 opacity-90 hidden sm:block ms-auto mb-1" style={{ color: M.fgMuted }} aria-hidden />
              <div>
                <div className="text-[26px] font-black tabular-nums" style={{ color: M.fg }}>{rec.recommendedVA.toLocaleString(nLoc)} VA</div>
                <div className="text-[11px]" style={{ color: M.fgFaint }}>{u.step4.suggestedUps}</div>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12px] pt-4 text-start"
            style={{ borderTop: `1px solid ${M.divider}` }}
          >
            {[
              [u.step4.rowTotalLoad,      `${totalW.toLocaleString(nLoc)} W`],
              [u.step4.rowUpsType,        u.upsTypes[upsType].title],
              [u.step4.rowTarget,         formatBackupDuration(targetHours, locale, u)],
              [u.step4.rowActual,         `~${(runtime / 60).toLocaleString(nLoc, { maximumFractionDigits: 1 })} ${locale === "en" ? "hrs" : u.time.hourSuffix}`],
              [u.step4.rowBattery,        `${rec.battQty.toLocaleString(nLoc)} × 12V ${rec.battAh}Ah`],
              [u.step4.rowWh,            `${(rec.battQty * 12 * rec.battAh).toLocaleString(nLoc)} Wh`],
            ].map(([label, val]) => (
              <Fragment key={String(label)}>
                <div style={{ color: M.fgFaint }}>{label}:</div>
                <div className="font-semibold text-start" style={{ color: M.fg }}>{val}</div>
              </Fragment>
            ))}
          </div>

          {devices.length > 0 && (
            <div style={{ borderTop: `1px solid ${M.divider}`, paddingTop: "0.75rem" }}>
              <p className="text-[12px] font-semibold mb-2 text-start" style={{ color: M.fgFaint }}>{u.step4.deviceList}</p>
              {devices.map((d) => (
                <div key={d.id} className="flex justify-between text-[12px] py-0.5 gap-2">
                  <span className="text-start min-w-0" style={{ color: M.fgMuted }}>{u.devices[d.deviceId]} × {d.qty.toLocaleString(nLoc)}</span>
                  <span className="tabular-nums flex-shrink-0" style={{ color: M.fg }}>{(d.watt * d.qty).toLocaleString(nLoc)} W</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Download report as PNG (same card as above) */}
      <button
        type="button"
        onClick={() => void downloadReportImage()}
        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-[13px] transition-all duration-200 hover:scale-105"
        style={{ background: M.btnBg, color: M.btnFg }}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M10 3v9M7 9l3 3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 14v1.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {u.step4.downloadPng}
      </button>

      {/* Restart */}
      <button
        type="button"
        onClick={() => { setStep(1); setKnowLoad(null); setDevices([]); }}
        className="text-[12px] underline underline-offset-2 text-start"
        style={{ color: M.fgGhost }}
      >
        {u.step4.restart}
      </button>
    </div>
  );

  const stepContent = [renderStep1, renderStep2, renderStep3, renderStep4];

  return (
    <div className="space-y-6">
      {/* Step progress bar */}
      <div className="ups-wizard-steps-scroll flex items-center gap-0 overflow-x-auto pb-2 -mx-1 px-1">
        {u.wizardSteps.map((ws, i) => {
          const StepIcon = WIZARD_ICONS[i];
          const idx     = i + 1;
          const done    = step > idx;
          const current = step === idx;
          return (
            <div key={ws.label} className="flex items-center flex-shrink-0">
              <button
                type="button"
                onClick={() => { if (done) setStep(idx); }}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all duration-200 ${done ? "cursor-pointer hover:opacity-95" : "cursor-default"}`}
                style={done || current ? { background: M.subtleBg } : undefined}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: done || current ? M.stepActiveBg : M.stepIdleBg,
                    color: done || current ? M.stepActiveFg : M.fgGhost,
                  }}
                >
                  {done ? (
                    <IconCheck className="w-3.5 h-3.5" strokeWidth={2.5} />
                  ) : current ? (
                    <StepIcon className="w-3.5 h-3.5" />
                  ) : (
                    <span className="text-[11px] font-black" style={{ color: "inherit" }}>{idx}</span>
                  )}
                </span>
                <span className="flex flex-col items-stretch text-start min-w-0">
                  <span
                    className="text-[12px] font-semibold whitespace-nowrap leading-tight"
                    style={{ color: current ? M.fg : done ? M.fgMuted : M.fgGhost }}
                  >
                    {ws.label}
                  </span>
                  <span className="text-[9px] font-medium whitespace-normal sm:whitespace-nowrap hidden sm:block mt-0.5" style={{ color: M.fgGhost }}>
                    {ws.hint}
                  </span>
                </span>
              </button>
              {i < u.wizardSteps.length - 1 && (
                <div
                  className="w-5 sm:w-8 h-px flex-shrink-0 mx-0.5 sm:mx-1 transition-all duration-300"
                  style={{ background: step > i + 1 ? M.fgMuted : M.divider }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: locale === "fa" ? 16 : -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: locale === "fa" ? -16 : 16 }}
          transition={{ duration: 0.28, ease: easeOut }}
        >
          {stepContent[step - 1]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORTED SECTION
// ═══════════════════════════════════════════════════════════════════════════════

export function UsageCalculatorSection({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const M = getCalcMonochrome(isDark);
  const C = isDark ? DARK_C : LIGHT_C;
  const t = translations[locale];
  const u = t.upsCalculator;

  return (
    <section
      dir={t.dir}
      lang={locale === "en" ? "en" : "fa"}
      className={`relative pt-8 pb-16 sm:pt-10 sm:pb-24 overflow-hidden ${locale === "en" ? "font-sans" : ""}`}
      style={{
        borderTop: `1px solid ${M.sectionTopBorder}`,
        fontFamily: locale === "fa" ? YK : undefined,
      }}
    >
      {/* Background — desktop / mobile art */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src={calculatorHeroDesktop}
          alt=""
          fill
          className="object-cover object-center hidden sm:block"
          sizes="100vw"
          quality={88}
          priority={false}
        />
        <Image
          src={calculatorHeroMobile}
          alt=""
          fill
          className="object-cover object-top sm:hidden"
          sizes="100vw"
          quality={88}
          priority={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.75) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, transparent 55%)"
              : "linear-gradient(to bottom, rgba(255,250,252,0.38) 0%, rgba(255,240,246,0.28) 50%, rgba(252,230,240,0.34) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10">

        {/* Section header — same glass treatment as products portfolio strip */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: easeOut }}
          className="text-center mb-8 sm:mb-9 max-w-3xl mx-auto w-full -mt-6 sm:-mt-6 md:-mt-1 lg:mt-4 xl:mt-6"
          style={{
            background: M.glassBg,
            backdropFilter: "blur(4px) saturate(120%)",
            WebkitBackdropFilter: "blur(4px) saturate(120%)",
            borderRadius: "20px",
            border: `1px solid ${M.glassBorder}`,
            boxShadow: M.glassShadow,
            padding: "20px 28px 22px",
          }}
        >
          <div className="flex flex-col items-center gap-4 sm:gap-5">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
              style={{
                background: "rgba(0,0,0,0.22)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: C.text1,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <IconUpsBox className="w-3.5 h-3.5 opacity-90 flex-shrink-0" style={{ color: C.text1 }} aria-hidden />
              <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: C.text1 }} />
              {u.section.badge}
            </div>
            <h2
              className="font-black leading-[1.08]"
              style={{
                color: M.h2Color,
                fontFamily: locale === "fa" ? YK : "inherit",
                fontSize: "clamp(20px, 2.85vw, 40px)",
                letterSpacing: "0",
                textShadow: M.titleShadow,
              }}
            >
              {u.section.titleBefore}{" "}
              <span
                style={{
                  color: M.h2SpanFg,
                  background: M.h2SpanBg,
                  padding: "1px 8px",
                  borderRadius: "8px",
                }}
              >
                {u.section.titleHighlight}
              </span>
            </h2>
            <p
              className="max-w-2xl mx-auto leading-snug"
              style={{
                color: M.subtitle,
                fontSize: "clamp(12px, 1.25vw, 15px)",
                textShadow: M.subtitleShadow,
              }}
            >
              {u.section.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Content — glass panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
          className="rounded-3xl p-6 sm:p-8 md:p-10"
          style={{
            background: M.glassBg,
            backdropFilter: "blur(4px) saturate(120%)",
            WebkitBackdropFilter: "blur(4px) saturate(120%)",
            border: `1px solid ${M.glassBorder}`,
            boxShadow: M.glassShadow,
          }}
        >
          <UPSSelector M={M} locale={locale} />
          <div
            className="mt-8 sm:mt-10 pt-6 sm:pt-7 flex flex-col items-center gap-3 text-center"
            style={{ borderTop: `1px solid ${M.divider}` }}
          >
            <p className="text-[13px] sm:text-[14px] max-w-md leading-relaxed px-1" style={{ color: M.fgMuted }}>
              {u.panelCall.hint}
            </p>
            <a
              href={UPS_CALC_SALES_PHONE_TEL}
              className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-6 py-3 rounded-xl font-bold text-[13px] sm:text-[14px] transition-all duration-200 hover:scale-[1.02]"
              style={{ background: M.btnBg, color: M.btnFg }}
              dir="ltr"
            >
              <IconPhone className="w-[18px] h-[18px] shrink-0" />
              <span style={{ fontFamily: locale === "fa" ? YK : "inherit" }}>{u.panelCall.button}</span>
              <span className="font-semibold tabular-nums text-[12px] sm:text-[13px] opacity-90">
                {UPS_CALC_SALES_PHONE_DISPLAY}
              </span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
