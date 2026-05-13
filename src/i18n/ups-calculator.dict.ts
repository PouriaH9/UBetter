import type { Locale } from "@/i18n/config";
import type { UpsCategoryId } from "@/i18n/ups-device-data";

export type UpsTypeId = "online" | "line-interactive" | "offline";

/** All UI + device/category labels for the home-page UPS wizard */
export type UpsCalculatorDict = {
  meta: { stepWord: string; ofWord: string };
  section: { badge: string; titleBefore: string; titleHighlight: string; subtitle: string };
  wizardSteps: { label: string; hint: string }[];
  step1: {
    title: string;
    subtitle: string;
    yesTitle: string;
    yesSub: string;
    noTitle: string;
    noSub: string;
    directWattLabel: string;
    pickDevicesHint: string;
    category: string;
    deviceName: string;
    watt: string;
    qty: string;
    addDevice: string;
    remove: string;
    mobileTotal: string;
    footnote: string;
    nextStep: string;
    lineTotal: string;
    actions: string;
  };
  step2: {
    title: string;
    subtitle: string;
    suitablePrefix: string;
    backupLabel: string;
    back: string;
    calcUps: string;
  };
  step3: {
    title: string;
    subtitle: string;
    statTotalLoad: string;
    statMinVa: string;
    statNominal: string;
    statBackup: string;
    subWatts: string;
    subVa: string;
    subNominal: string;
    subStdBattery: string;
    batteryTitle: string;
    battCount: string;
    battEach: string;
    battTotal: string;
    battUnit: string;
    promoTitle: string;
    promoLarge: string;
    promoMid: string;
    promoSmall: string;
    viewProducts: string;
    back: string;
    viewReport: string;
    calcError: string;
  };
  step4: {
    title: string;
    subtitle: string;
    reportTitle: string;
    reportTagline: string;
    suggestedUps: string;
    rowTotalLoad: string;
    rowUpsType: string;
    rowTarget: string;
    rowActual: string;
    rowBattery: string;
    rowWh: string;
    deviceList: string;
    downloadPng: string;
    restart: string;
  };
  /** CTA row under the wizard (tel: dial) */
  panelCall: { hint: string; button: string };
  time: { halfHour: string; hourSuffix: string };
  upsTypes: Record<UpsTypeId, { title: string; desc: string; suitable: string }>;
  categories: Record<UpsCategoryId, string>;
  devices: Record<string, string>;
};

const DEVICE_KEYS_EN: Record<string, string> = {
  fridge: "Refrigerator",
  fridge_freezer: "Fridge / freezer",
  tv: "Television",
  evap_cooler: "Evaporative cooler",
  ac: "Air conditioner",
  fan: "Fan",
  washer: "Washing machine",
  dishwasher: "Dishwasher",
  vacuum: "Vacuum cleaner",
  water_heater: "Electric water heater",
  electric_stove: "Electric stove",
  microwave: "Microwave",
  oven_toaster: "Oven / toaster",
  kettle: "Electric kettle",
  tea_maker: "Tea maker",
  printer: "Printer",
  iron: "Iron",
  hair_dryer: "Hair dryer",
  led_bulb: "LED bulb",
  fluorescent: "Fluorescent lamp",
  halogen: "Halogen lamp",
  emergency_lamp: "Emergency light",
  led_flood: "LED floodlight",
  pc_desktop: "Desktop PC",
  laptop: "Laptop",
  monitor_24: '24" monitor',
  monitor_27: '27" monitor',
  rack_server: "Rack server",
  workstation: "Workstation",
  laser_printer: "Laser printer",
  inkjet_printer: "Inkjet printer",
  modem_router: "Modem / home router",
  switch_8: "8-port switch",
  switch_24: "24-port switch",
  access_point: "Access point",
  nas: "NAS",
  firewall: "Firewall",
  voip_phone: "IP phone",
  pbx: "PBX",
  cctv_cam: "CCTV camera",
  dvr: "DVR",
  nvr: "NVR",
  access_control: "Access control",
  ventilator: "Ventilator",
  oxygen_concentrator: "Oxygen concentrator",
  cpap: "CPAP",
  patient_monitor: "Patient monitor",
};

const DEVICE_KEYS_FA: Record<string, string> = {
  fridge: "یخچال",
  fridge_freezer: "یخچال فریزر",
  tv: "تلویزیون",
  evap_cooler: "کولر آبی",
  ac: "کولر گازی",
  fan: "پنکه",
  washer: "ماشین لباسشویی",
  dishwasher: "ماشین ظرفشویی",
  vacuum: "جاروبرقی",
  water_heater: "آبگرمکن برقی",
  electric_stove: "اجاق برقی",
  microwave: "مایکروفر",
  oven_toaster: "آون توستر",
  kettle: "کتری برقی",
  tea_maker: "چایساز",
  printer: "پرینتر",
  iron: "اتو",
  hair_dryer: "سشوار",
  led_bulb: "لامپ LED",
  fluorescent: "لامپ فلورسنت",
  halogen: "لامپ هالوژن",
  emergency_lamp: "چراغ اضطراری",
  led_flood: "پروژکتور LED",
  pc_desktop: "کامپیوتر شخصی (دسکتاپ)",
  laptop: "لپ‌تاپ",
  monitor_24: "مانیتور ۲۴ اینچ",
  monitor_27: "مانیتور ۲۷ اینچ",
  rack_server: "سرور رک‌مونت",
  workstation: "ورک‌استیشن",
  laser_printer: "پرینتر لیزری",
  inkjet_printer: "پرینتر جوهری",
  modem_router: "مودم / روتر خانگی",
  switch_8: "سوئیچ ۸ پورت",
  switch_24: "سوئیچ ۲۴ پورت",
  access_point: "اکسس پوینت",
  nas: "سرور NAS",
  firewall: "فایروال",
  voip_phone: "تلفن IP",
  pbx: "سانترال (PBX)",
  cctv_cam: "دوربین مداربسته",
  dvr: "دستگاه DVR",
  nvr: "دستگاه NVR",
  access_control: "کنترل دسترسی",
  ventilator: "دستگاه تنفس مصنوعی",
  oxygen_concentrator: "اکسیژن‌ساز",
  cpap: "دستگاه CPAP",
  patient_monitor: "مانیتور پزشکی",
};

export const upsCalculatorEn: UpsCalculatorDict = {
  meta: { stepWord: "Step", ofWord: "of" },
  section: {
    badge: "UPS selection",
    titleBefore: "Pick the right",
    titleHighlight: "UPS",
    subtitle:
      "Enter your load so we can recommend a matching UPS size and battery configuration.",
  },
  wizardSteps: [
    { label: "Load & power", hint: "Estimate connected load" },
    { label: "UPS topology", hint: "Technology type" },
    { label: "Sizing & runtime", hint: "Capacity & backup time" },
    { label: "Report & contact", hint: "Summary & next steps" },
  ],
  step1: {
    title: "Do you know the total load to connect to the UPS?",
    subtitle:
      'If you already know total watts, choose "Yes". Otherwise, build a list from our presets and we will sum the load for you.',
    yesTitle: "Yes",
    yesSub: "I know my total load in watts",
    noTitle: "No",
    noSub: "Help me estimate from a device list",
    directWattLabel: "Total load (watts)",
    pickDevicesHint:
      "Choose devices you plan to run on the UPS from the list, then add them to the table.",
    category: "Category",
    deviceName: "Device",
    watt: "Power (W)",
    qty: "Qty",
    addDevice: "+ Add device",
    remove: "Remove",
    mobileTotal: "Total load",
    footnote:
      "* All values are in watts. Default powers are typical averages for the listed equipment.",
    nextStep: "Next: UPS type",
    lineTotal: "Line total*",
    actions: "Actions",
  },
  step2: {
    title: "Choose the UPS type and target backup time",
    subtitle:
      "Pick the topology that matches equipment sensitivity, then select how long you need to run on battery.",
    suitablePrefix: "Typical use:",
    backupLabel: "Target backup time on battery",
    back: "Back",
    calcUps: "Calculate sizing",
  },
  step3: {
    title: "Engineering sizing: UPS & battery",
    subtitle:
      "Estimates use power factor and a 25% safety margin. Runtime assumes the suggested standard battery blocks.",
    statTotalLoad: "Total load",
    statMinVa: "Minimum VA",
    statNominal: "Suggested UPS",
    statBackup: "Estimated backup",
    subWatts: "Watts",
    subVa: "Volt-amps",
    subNominal: "Nameplate",
    subStdBattery: "With standard battery",
    batteryTitle: "Suggested battery layout",
    battCount: "Batteries:",
    battEach: "Each cell:",
    battTotal: "Total stored:",
    battUnit: "units",
    promoTitle: "Related UBETTER products",
    promoLarge:
      "For this power class, industrial energy-storage and large-format UBETTER UPS tiers are often the right fit.",
    promoMid:
      "UBETTER power stations can cover this UPS need while also acting as a full backup energy hub.",
    promoSmall:
      "Portable UBETTER power stations are a strong match at this load — flexible UPS-style backup plus mobile energy.",
    viewProducts: "View UBETTER products",
    back: "Back",
    viewReport: "View & download report",
    calcError: "Could not calculate. Please complete step 1.",
  },
  step4: {
    title: "Summary report & how to reach our team",
    subtitle:
      "Save the report image below, or contact sales for a formal quote and site-specific engineering.",
    reportTitle: "UPS sizing report",
    reportTagline: "UBETTER Energy — informal planning summary",
    suggestedUps: "Suggested UPS",
    rowTotalLoad: "Total load",
    rowUpsType: "UPS type",
    rowTarget: "Target backup",
    rowActual: "Estimated backup",
    rowBattery: "Battery",
    rowWh: "Total battery energy",
    deviceList: "Load list:",
    downloadPng: "Download report image",
    restart: "Start over",
  },
  panelCall: {
    hint: "Or simply call us — our team can help you choose the right UPS.",
    button: "Call now",
  },
  time: { halfHour: "30 min", hourSuffix: "hours" },
  upsTypes: {
    online: {
      title: "Online (double-conversion)",
      desc: "Maximum protection — fully isolated, clean output and zero transfer time.",
      suitable: "Servers, medical, industrial",
    },
    "line-interactive": {
      title: "Line-interactive",
      desc: "Strong protection with AVR and fast switchover when mains fails.",
      suitable: "PC, network gear, CCTV",
    },
    offline: {
      title: "Offline (standby)",
      desc: "Basic protection when power drops — simple and cost-effective.",
      suitable: "Home office, small office loads",
    },
  },
  categories: {
    home: "Residential",
    lighting: "Lighting",
    computer_it: "Computer & IT",
    network: "Network & telecom",
    security: "Security",
    medical: "Medical",
  },
  devices: DEVICE_KEYS_EN,
};

export const upsCalculatorFa: UpsCalculatorDict = {
  meta: { stepWord: "مرحله", ofWord: "از" },
  section: {
    badge: "انتخاب یوپی‌اس",
    titleBefore: "یو پی اس",
    titleHighlight: "مناسب رو انتخاب کن!",
    subtitle:
      "توان مصرفی تجهیزات خود را وارد کنید تا یوپی‌اس و باتری مناسب برای شما پیشنهاد شود",
  },
  wizardSteps: [
    { label: "تعیین توان مصرفی", hint: "برآورد بار متصل" },
    { label: "انتخاب نوع یوپی‌اس", hint: "نوع فناوری UPS" },
    { label: "محاسبه یوپی‌اس و باتری", hint: "ظرفیت و زمان پشتیبان" },
    { label: "پرینت گزارش و تماس", hint: "خلاصه و ارتباط" },
  ],
  step1: {
    title: "آیا توان کل بار مورد نظر برای اتصال به UPS را می‌دانید؟",
    subtitle:
      "در صورت دانستن مقدار توان کلی تجهیزات خود، گزینه «بله» را انتخاب کنید؛ در غیر این صورت با فهرست دستگاه‌ها توان را برآورد می‌کنیم.",
    yesTitle: "بله",
    yesSub: "توان کل تجهیزاتم را می‌دانم",
    noTitle: "خیر",
    noSub: "نیاز به کمک برای محاسبه دارم",
    directWattLabel: "توان کل تجهیزات (وات)",
    pickDevicesHint:
      "تجهیزات مورد نظر خود برای اتصال به یوپی‌اس را از لیست موجود انتخاب و اضافه نمایید:",
    category: "دسته‌بندی",
    deviceName: "نام دستگاه",
    watt: "توان (W)",
    qty: "تعداد",
    addDevice: "+ اضافه کردن دستگاه",
    remove: "حذف",
    mobileTotal: "جمع کل توان",
    footnote:
      "*: واحدها به [وات] می‌باشد. توان‌های پیش‌فرض، متوسط توان مصرفی دستگاه‌های موجود در لیست می‌باشد.",
    nextStep: "مرحله بعد: انتخاب نوع یوپی‌اس",
    lineTotal: "جمع بار*",
    actions: "عملیات",
  },
  step2: {
    title: "نوع یوپی‌اس و زمان پشتیبان را مشخص کنید",
    subtitle:
      "بر اساس نوع تجهیزات و حساسیت بار، فناوری مناسب را انتخاب کنید؛ سپس زمان مورد نیاز برای کار روی باتری را تعیین نمایید.",
    suitablePrefix: "مناسب:",
    backupLabel: "زمان پشتیبان‌گیری مورد نیاز",
    back: "مرحله قبل",
    calcUps: "محاسبه یوپی‌اس",
  },
  step3: {
    title: "نتیجه مهندسی ظرفیت یوپی‌اس و باتری",
    subtitle:
      "این پیشنهاد بر اساس بار وارد شده، ضریب توان و حاشیه امن ۲۵٪ محاسبه شده است؛ زمان پشتیبان با فرض باتری استاندارد تخمین زده می‌شود.",
    statTotalLoad: "توان کل بار",
    statMinVa: "حداقل ظرفیت نیاز",
    statNominal: "یوپی‌اس پیشنهادی",
    statBackup: "زمان پشتیبان‌گیری",
    subWatts: "وات",
    subVa: "ولت آمپر",
    subNominal: "ظرفیت اسمی",
    subStdBattery: "با باتری استاندارد",
    batteryTitle: "پیکربندی باتری پیشنهادی",
    battCount: "تعداد باتری:",
    battEach: "ظرفیت هر باتری:",
    battTotal: "ظرفیت کل:",
    battUnit: "عدد",
    promoTitle: "محصولات مرتبط یوبتر انرژی",
    promoLarge:
      "برای این سطح از توان، راهکارهای ذخیره‌سازی انرژی صنعتی و سیستم‌های UPS مقیاس بزرگ UBETTER پیشنهاد می‌شود.",
    promoMid:
      "سیستم‌های پاور استیشن UBETTER می‌توانند نیاز یوپی‌اس شما را پوشش دهند و علاوه بر آن، منبع انرژی پشتیبان کامل فراهم آورند.",
    promoSmall:
      "پاور استیشن‌های قابل‌حمل UBETTER برای این سطح از توان گزینه مناسبی هستند — هم UPS و هم منبع انرژی همه‌کاره.",
    viewProducts: "مشاهده محصولات UBETTER",
    back: "مرحله قبل",
    viewReport: "مشاهده و دانلود گزارش",
    calcError: "خطا در محاسبه. لطفاً مرحله اول را تکمیل کنید.",
  },
  step4: {
    title: "گزارش خلاصه و مسیر ارتباط با مهندسی یوبتر",
    subtitle:
      "می‌توانید تصویر گزارش را ذخیره کنید یا برای پیش‌فاکتور و مشاوره دقیق‌تر با تیم ما در تماس باشید.",
    reportTitle: "گزارش محاسبه یوپی‌اس",
    reportTagline: "UBETTER Energy — یوبتر انرژی · سند غیررسمی راهنما",
    suggestedUps: "یوپی‌اس پیشنهادی",
    rowTotalLoad: "توان کل بار",
    rowUpsType: "نوع یوپی‌اس",
    rowTarget: "زمان هدف",
    rowActual: "زمان واقعی",
    rowBattery: "باتری پیشنهادی",
    rowWh: "ظرفیت کل باتری",
    deviceList: "لیست تجهیزات:",
    downloadPng: "دانلود تصویر گزارش",
    restart: "شروع مجدد محاسبه",
  },
  panelCall: {
    hint: "یا به‌سادگی با ما تماس بگیرید؛ برای انتخاب یوپی‌اس راهنمایی‌تان می‌کنیم.",
    button: "تماس تلفنی",
  },
  time: { halfHour: "نیم ساعت", hourSuffix: "ساعت" },
  upsTypes: {
    online: {
      title: "آنلاین (دوگانه تبدیل)",
      desc: "بالاترین سطح محافظت. برق ورودی کاملاً ایزوله و تمیز. زمان سوئیچ صفر.",
      suitable: "سرور، تجهیزات پزشکی، صنعتی",
    },
    "line-interactive": {
      title: "لاین اینتراکتیو",
      desc: "محافظت خوب با تنظیم خودکار ولتاژ (AVR). سوئیچ سریع در هنگام قطع برق.",
      suitable: "کامپیوتر، شبکه، دوربین مداربسته",
    },
    offline: {
      title: "آف‌لاین (استند بای)",
      desc: "محافظت پایه در برابر قطع برق. ساده و مقرون‌به‌صرفه.",
      suitable: "کامپیوتر خانگی، تجهیزات اداری",
    },
  },
  categories: {
    home: "خانگی",
    lighting: "روشنایی",
    computer_it: "کامپیوتر و IT",
    network: "شبکه و مخابرات",
    security: "امنیت و نظارت",
    medical: "پزشکی",
  },
  devices: DEVICE_KEYS_FA,
};

export function getUpsCalculator(locale: Locale): UpsCalculatorDict {
  return locale === "fa" ? upsCalculatorFa : upsCalculatorEn;
}

export function formatStepMeta(
  locale: Locale,
  t: UpsCalculatorDict,
  stepIndex: number,
  totalSteps: number,
  hint: string
): string {
  const n = stepIndex + 1;
  const loc = locale === "fa" ? "fa-IR" : "en-US";
  return `${t.meta.stepWord} ${n.toLocaleString(loc)} ${t.meta.ofWord} ${totalSteps.toLocaleString(loc)} · ${hint}`;
}

export function formatBackupDuration(h: number, locale: Locale, t: UpsCalculatorDict): string {
  if (h === 0.5) return t.time.halfHour;
  const loc = locale === "fa" ? "fa-IR" : "en-US";
  if (locale === "en") {
    const n = h.toLocaleString(loc);
    if (h === 1) return "1 hour";
    return `${n} hours`;
  }
  return `${h.toLocaleString(loc)} ${t.time.hourSuffix}`;
}
