import type { Locale } from "@/i18n/config";
import { localeNumTag } from "@/i18n/locale-ui";
import type { UpsCategoryId } from "@/i18n/ups-device-data";

export type UpsTypeId = "all-in-one-lv" | "separate-lv" | "hv" | "commercial-hv";

/** All UI + device/category labels for the home-page energy-storage wizard */
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
    statInverter: string;
    statNominal: string;
    statBackup: string;
    subWatts: string;
    subInverter: string;
    subNominal: string;
    subSelectedBackup: string;
    capacityTitle: string;
    capacityNote: string;
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
    rowInverter: string;
    rowCapacity: string;
    deviceList: string;
    downloadPng: string;
    restart: string;
  };
  panelCall: { hint: string; button: string; phones: string[] };
  time: { hourSuffix: string };
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

const DEVICE_KEYS_ZH: Record<string, string> = {
  fridge: "冰箱",
  fridge_freezer: "冰箱 / 冷柜",
  tv: "电视机",
  evap_cooler: "蒸发式冷风机",
  ac: "空调",
  fan: "风扇",
  washer: "洗衣机",
  dishwasher: "洗碗机",
  vacuum: "吸尘器",
  water_heater: "电热水器",
  electric_stove: "电炉",
  microwave: "微波炉",
  oven_toaster: "烤箱 / 吐司机",
  kettle: "电水壶",
  tea_maker: "煮茶器",
  printer: "打印机",
  iron: "电熨斗",
  hair_dryer: "吹风机",
  led_bulb: "LED 灯泡",
  fluorescent: "荧光灯",
  halogen: "卤素灯",
  emergency_lamp: "应急灯",
  led_flood: "LED 投光灯",
  pc_desktop: "台式电脑",
  laptop: "笔记本电脑",
  monitor_24: '24 寸显示器',
  monitor_27: '27 寸显示器',
  rack_server: "机架服务器",
  workstation: "工作站",
  laser_printer: "激光打印机",
  inkjet_printer: "喷墨打印机",
  modem_router: "光猫 / 家用路由器",
  switch_8: "8 口交换机",
  switch_24: "24 口交换机",
  access_point: "无线接入点",
  nas: "网络存储 NAS",
  firewall: "防火墙",
  voip_phone: "IP 电话",
  pbx: "程控交换机 PBX",
  cctv_cam: "监控摄像头",
  dvr: "硬盘录像机 DVR",
  nvr: "网络录像机 NVR",
  access_control: "门禁系统",
  ventilator: "呼吸机",
  oxygen_concentrator: "制氧机",
  cpap: "CPAP 呼吸机",
  patient_monitor: "病人监护仪",
};

const DEVICE_KEYS_DE: Record<string, string> = { ...DEVICE_KEYS_EN };

const ESS_TYPES_EN: UpsCalculatorDict["upsTypes"] = {
  "all-in-one-lv": {
    title: "ALL-in-ONE low-voltage (LV) ESS",
    desc: "Integrated inverter (3–11 kW) and lithium battery (3–15 kWh). Modern smart design for apartments, villas, and offices.",
    suitable: "Light residential & office",
  },
  "separate-lv": {
    title: "Split low-voltage (LV) ESS",
    desc: "Separate inverter (3–12 kW) and lithium battery (3–30 kWh). Ideal for apartments, villas, and offices.",
    suitable: "Flexible home & office",
  },
  hv: {
    title: "High-voltage (HV) ESS",
    desc: "Inverter (10–60 kW) and lithium battery (10–120 kWh). For higher loads such as large stores, clinics, and residential complexes.",
    suitable: "Medium–high consumption",
  },
  "commercial-hv": {
    title: "Commercial high-voltage (HV) ESS",
    desc: "Inverter (120–2500 kW) and lithium battery (120–5000 kWh). For hospitals, banks, and factories.",
    suitable: "Large commercial & industrial",
  },
};

const ESS_TYPES_FA: UpsCalculatorDict["upsTypes"] = {
  "all-in-one-lv": {
    title: "ذخیره ساز انرژی ALL in ONE ولتاژ پایین LV",
    desc: "با اینورتر (سانورتر) 3 تا 11 کیلووات و باتری لیتیومی از 3 تا 15 کیلووات ساعت، طراحی مدرن و هوشمند و مناسب برای آپارتمان، ویلا و دفاتر کاری",
    suitable: "پروژه‌های سبک خانگی و اداری",
  },
  "separate-lv": {
    title: "ذخیره ساز انرژی منفصل ولتاژ پایین LV",
    desc: "با اینورتر (سانورتر) 3 تا 12 کیلووات و باتری لیتیومی از 3 تا 30 کیلووات ساعت، مناسب برای آپارتمان، ویلا و دفاتر کاری",
    suitable: "خانگی و اداری انعطاف‌پذیر",
  },
  hv: {
    title: "ذخیره ساز انرژی ولتاژ بالا HV",
    desc: "با اینورتر( سانورتر) از 10 تا 60 کیلووات و باتری لیتیومی از 10 تا 120 کیلووات ساعت، مناسب برای توان مصرفی بالاتر همچون فروشگاه های بزرگ و کلینیک های پزشکی و مجتمع های مسکونی",
    suitable: "مصرف متوسط تا بالا",
  },
  "commercial-hv": {
    title: "ذخیره ساز انرژی تجاری ولتاژ بالا HV",
    desc: "با اینورتر (سانورتر) از 120 تا 2500 کیلووات و باتری لیتیومی از 120 تا 5000 کیلووات مناسب برای بیمارستان ها، بانکها و کارخانه ها",
    suitable: "تجاری و صنعتی بزرگ",
  },
};

const ESS_TYPES_ZH: UpsCalculatorDict["upsTypes"] = {
  "all-in-one-lv": {
    title: "低压一体化 ALL-in-ONE 储能",
    desc: "逆变器 3–11 kW，锂电 3–15 kWh，现代智能设计，适合公寓、别墅与办公室。",
    suitable: "轻型家用与办公",
  },
  "separate-lv": {
    title: "低压分体式储能",
    desc: "逆变器 3–12 kW，锂电 3–30 kWh，适合公寓、别墅与办公室。",
    suitable: "灵活家用与办公",
  },
  hv: {
    title: "高压储能 HV",
    desc: "逆变器 10–60 kW，锂电 10–120 kWh，适合大型商店、诊所与住宅综合体等高负载场景。",
    suitable: "中高负载",
  },
  "commercial-hv": {
    title: "商业高压储能 HV",
    desc: "逆变器 120–2500 kW，锂电 120–5000 kWh，适合医院、银行与工厂。",
    suitable: "大型工商业",
  },
};

const ESS_TYPES_DE: UpsCalculatorDict["upsTypes"] = {
  "all-in-one-lv": {
    title: "ALL-in-ONE Niederspannungs-Energiespeicher (LV)",
    desc: "Wechselrichter 3–11 kW und Lithiumbatterie 3–15 kWh. Moderne Smart-Lösung für Wohnungen, Villen und Büros.",
    suitable: "Leichte Wohn- & Büroprojekte",
  },
  "separate-lv": {
    title: "Getrennter Niederspannungs-Energiespeicher (LV)",
    desc: "Wechselrichter 3–12 kW und Lithiumbatterie 3–30 kWh. Für Wohnungen, Villen und Büros.",
    suitable: "Flexibles Wohnen & Büro",
  },
  hv: {
    title: "Hochspannungs-Energiespeicher (HV)",
    desc: "Wechselrichter 10–60 kW und Lithiumbatterie 10–120 kWh. Für höhere Lasten wie große Geschäfte, Kliniken und Wohnanlagen.",
    suitable: "Mittlere bis hohe Last",
  },
  "commercial-hv": {
    title: "Gewerblicher Hochspannungs-Energiespeicher (HV)",
    desc: "Wechselrichter 120–2500 kW und Lithiumbatterie 120–5000 kWh. Für Krankenhäuser, Banken und Fabriken.",
    suitable: "Großgewerbe & Industrie",
  },
};

const SALES_PHONES = ["09333401555", "09333402555", "09333403555", "02188547867"];

export const upsCalculatorFa: UpsCalculatorDict = {
  meta: { stepWord: "مرحله", ofWord: "از" },
  section: {
    badge: "ماشین‌حساب آنلاین ذخیره‌ساز انرژی",
    titleBefore: "ذخیره‌ساز انرژی هوشمند",
    titleHighlight: "مناسب رو انتخاب کن",
    subtitle:
      "توان مصرفی تجهیزات خود را وارد کنید تا ذخیره‌ساز انرژی و اینورتر (سانورتر) مناسب برای شما پیشنهاد شود",
  },
  wizardSteps: [
    { label: "تعیین توان مصرفی", hint: "برآورد بار متصل" },
    { label: "انتخاب نوع ذخیره‌ساز", hint: "نوع سیستم ESS" },
    { label: "محاسبه ظرفیت", hint: "اینورتر و زمان پشتیبان" },
    { label: "گزارش و تماس", hint: "خلاصه و ارتباط" },
  ],
  step1: {
    title: "آیا توان کل بار مورد نظر برای اتصال به ذخیره‌ساز انرژی را می‌دانید؟",
    subtitle:
      "در صورت دانستن مقدار توان کلی تجهیزات خود، گزینه «بله» را انتخاب کنید؛ در غیر این صورت با فهرست دستگاه‌ها توان را برآورد می‌کنیم.",
    yesTitle: "بله",
    yesSub: "توان کل تجهیزاتم را می‌دانم",
    noTitle: "خیر",
    noSub: "نیاز به کمک برای محاسبه دارم",
    directWattLabel: "توان کل تجهیزات (وات)",
    pickDevicesHint:
      "تجهیزات مورد نظر خود برای اتصال به ذخیره‌ساز انرژی را از لیست موجود انتخاب و اضافه نمایید:",
    category: "دسته‌بندی",
    deviceName: "نام دستگاه",
    watt: "توان (W)",
    qty: "تعداد",
    addDevice: "+ اضافه کردن دستگاه",
    remove: "حذف",
    mobileTotal: "جمع کل توان",
    footnote:
      "*: واحدها به [وات] می‌باشد. توان‌های پیش‌فرض، متوسط توان مصرفی دستگاه‌های موجود در لیست می‌باشد.",
    nextStep: "مرحله بعد: انتخاب نوع ذخیره‌ساز انرژی",
    lineTotal: "جمع بار*",
    actions: "عملیات",
  },
  step2: {
    title: "نوع ذخیره‌ساز انرژی و زمان پشتیبان را مشخص کنید",
    subtitle:
      "بر اساس نوع پروژه و توان مصرفی، سیستم مناسب را انتخاب کنید؛ سپس زمان مورد نیاز برای کار روی باتری را تعیین نمایید.",
    suitablePrefix: "مناسب:",
    backupLabel: "زمان پشتیبان‌گیری",
    back: "مرحله قبل",
    calcUps: "محاسبه ذخیره‌ساز انرژی",
  },
  step3: {
    title: "نتیجه پیشنهادی ذخیره‌ساز انرژی",
    subtitle:
      "ذخیره‌ساز انرژی پیشنهادی شامل اینورتر (سانورتر) با ظرفیت ولت‌آمپر (VA) برابر با بار متصل ضربدر ۱٫۲۵ است. ظرفیت باتری بر اساس توان اینورتر و زمان پشتیبان انتخاب‌شده محاسبه می‌شود.",
    statTotalLoad: "توان کل بار",
    statInverter: "توان اینورتر پیشنهادی",
    statNominal: "ذخیره‌ساز پیشنهادی",
    statBackup: "زمان پشتیبان‌گیری",
    subWatts: "وات",
    subInverter: "× ۱٫۲۵ بار درخواستی",
    subNominal: "اینورتر + باتری",
    subSelectedBackup: "انتخاب شما",
    capacityTitle: "ظرفیت پیشنهادی",
    capacityNote: "توان اینورتر × زمان پشتیبان",
    promoTitle: "محصولات مرتبط یوبتر انرژی",
    promoLarge:
      "برای این سطح از توان، راهکارهای ذخیره‌سازی انرژی تجاری و صنعتی UBETTER پیشنهاد می‌شود.",
    promoMid:
      "ذخیره‌سازهای انرژی ولتاژ بالا UBETTER برای این سطح از توان گزینه مناسبی هستند.",
    promoSmall:
      "ذخیره‌سازهای ALL-in-ONE و منفصل ولتاژ پایین UBETTER برای این سطح از توان ایده‌آل‌اند.",
    viewProducts: "مشاهده محصولات UBETTER",
    back: "مرحله قبل",
    viewReport: "مشاهده و دانلود گزارش",
    calcError: "خطا در محاسبه. لطفاً مرحله اول را تکمیل کنید.",
  },
  step4: {
    title: "گزارش خلاصه و مسیر ارتباط با مهندسی یوبتر",
    subtitle:
      "می‌توانید تصویر گزارش را ذخیره کنید یا برای پیش‌فاکتور و مشاوره دقیق‌تر با تیم ما در تماس باشید.",
    reportTitle: "گزارش محاسبه ذخیره‌ساز انرژی",
    reportTagline: "UBETTER Energy — یوبتر انرژی · سند غیررسمی راهنما",
    suggestedUps: "ذخیره‌ساز انرژی پیشنهادی",
    rowTotalLoad: "توان کل بار",
    rowUpsType: "نوع ذخیره‌ساز",
    rowTarget: "زمان پشتیبان",
    rowInverter: "توان اینورتر (×۱٫۲۵، VA)",
    rowCapacity: "ظرفیت باتری",
    deviceList: "لیست تجهیزات:",
    downloadPng: "دانلود تصویر گزارش",
    restart: "شروع مجدد محاسبه",
  },
  panelCall: {
    hint: "یا به‌سادگی با ما تماس بگیرید؛ برای مشاوره تخصصی و انتخاب ذخیره‌ساز انرژی راهنمایی‌تان می‌کنیم. شماره:",
    button: "تماس تلفنی",
    phones: SALES_PHONES,
  },
  time: { hourSuffix: "ساعت" },
  upsTypes: ESS_TYPES_FA,
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

export const upsCalculatorEn: UpsCalculatorDict = {
  meta: { stepWord: "Step", ofWord: "of" },
  section: {
    badge: "Online energy-storage calculator",
    titleBefore: "Choose the right",
    titleHighlight: "smart energy storage",
    subtitle:
      "Enter your load so we can recommend a matching energy storage system and inverter for your needs.",
  },
  wizardSteps: [
    { label: "Load & power", hint: "Estimate connected load" },
    { label: "ESS type", hint: "System category" },
    { label: "Sizing", hint: "Inverter & backup time" },
    { label: "Report & contact", hint: "Summary & next steps" },
  ],
  step1: {
    title: "Do you know the total load to connect to the energy storage system?",
    subtitle:
      'If you already know total watts, choose "Yes". Otherwise, build a list from our presets and we will sum the load for you.',
    yesTitle: "Yes",
    yesSub: "I know my total load in watts",
    noTitle: "No",
    noSub: "Help me estimate from a device list",
    directWattLabel: "Total load (watts)",
    pickDevicesHint:
      "Choose devices you plan to run on the energy storage system from the list, then add them to the table.",
    category: "Category",
    deviceName: "Device",
    watt: "Power (W)",
    qty: "Qty",
    addDevice: "+ Add device",
    remove: "Remove",
    mobileTotal: "Total load",
    footnote:
      "* All values are in watts. Default powers are typical averages for the listed equipment.",
    nextStep: "Next: ESS type",
    lineTotal: "Line total*",
    actions: "Actions",
  },
  step2: {
    title: "Choose the energy storage type and backup time",
    subtitle:
      "Pick the system that matches your project, then select how long you need to run on battery.",
    suitablePrefix: "Typical use:",
    backupLabel: "Backup time",
    back: "Back",
    calcUps: "Calculate sizing",
  },
  step3: {
    title: "Suggested energy storage sizing",
    subtitle:
      "The suggested system includes an inverter rated at 1.25× your connected load (VA). Battery capacity = inverter power × selected backup time.",
    statTotalLoad: "Total load",
    statInverter: "Suggested inverter",
    statNominal: "Suggested ESS",
    statBackup: "Backup time",
    subWatts: "Watts",
    subInverter: "1.25× requested load",
    subNominal: "Inverter + battery",
    subSelectedBackup: "Your selection",
    capacityTitle: "Suggested capacity",
    capacityNote: "Inverter power × backup time",
    promoTitle: "Related UBETTER products",
    promoLarge:
      "For this power class, commercial and industrial UBETTER energy storage systems are often the right fit.",
    promoMid: "UBETTER high-voltage ESS tiers are a strong match at this load level.",
    promoSmall:
      "UBETTER low-voltage ALL-in-ONE and split ESS systems are ideal at this load level.",
    viewProducts: "View UBETTER products",
    back: "Back",
    viewReport: "View & download report",
    calcError: "Could not calculate. Please complete step 1.",
  },
  step4: {
    title: "Summary report & how to reach our team",
    subtitle:
      "Save the report image below, or contact sales for a formal quote and site-specific engineering.",
    reportTitle: "Energy storage sizing report",
    reportTagline: "UBETTER Energy — informal planning summary",
    suggestedUps: "Suggested ESS",
    rowTotalLoad: "Total load",
    rowUpsType: "ESS type",
    rowTarget: "Backup time",
    rowInverter: "Inverter (×1.25, VA)",
    rowCapacity: "Battery capacity",
    deviceList: "Load list:",
    downloadPng: "Download report image",
    restart: "Start over",
  },
  panelCall: {
    hint: "Or simply call us — our team can help you choose the right energy storage system.",
    button: "Call now",
    phones: SALES_PHONES,
  },
  time: { hourSuffix: "hours" },
  upsTypes: ESS_TYPES_EN,
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

export const upsCalculatorZh: UpsCalculatorDict = {
  meta: { stepWord: "步骤", ofWord: "共" },
  section: {
    badge: "在线储能计算器",
    titleBefore: "选择适合的",
    titleHighlight: "智能储能系统",
    subtitle: "输入负载功率，我们将为您推荐匹配的储能系统与逆变器。",
  },
  wizardSteps: [
    { label: "负载与功率", hint: "估算接入负载" },
    { label: "储能类型", hint: "系统类别" },
    { label: "容量估算", hint: "逆变器与后备时间" },
    { label: "报告与联系", hint: "摘要与下一步" },
  ],
  step1: {
    title: "您是否已知接入储能系统的总负载？",
    subtitle:
      "若已知总功率（瓦特），请选择「是」。否则从预设清单勾选设备，由我们为您汇总负载。",
    yesTitle: "是",
    yesSub: "我已知道总负载（瓦）",
    noTitle: "否",
    noSub: "帮我从设备清单估算",
    directWattLabel: "总负载（瓦）",
    pickDevicesHint: "从列表中选择计划在储能系统上运行的设备，并加入表格。",
    category: "类别",
    deviceName: "设备",
    watt: "功率（W）",
    qty: "数量",
    addDevice: "+ 添加设备",
    remove: "移除",
    mobileTotal: "负载合计",
    footnote: "* 数值单位为瓦特，默认功率为所列设备的典型平均值。",
    nextStep: "下一步：储能类型",
    lineTotal: "行合计*",
    actions: "操作",
  },
  step2: {
    title: "选择储能类型与后备时间",
    subtitle: "根据项目类型选择系统，再选择在电池供电下需要运行多久。",
    suitablePrefix: "典型用途：",
    backupLabel: "后备时间",
    back: "返回",
    calcUps: "计算选型",
  },
  step3: {
    title: "推荐储能配置",
    subtitle:
      "推荐系统逆变器容量为请求负载的 1.25 倍。电池容量 = 逆变器功率 × 所选后备时间。",
    statTotalLoad: "总负载",
    statInverter: "推荐逆变器",
    statNominal: "推荐储能",
    statBackup: "后备时间",
    subWatts: "瓦特",
    subInverter: "1.25× 请求负载",
    subNominal: "逆变器 + 电池",
    subSelectedBackup: "您的选择",
    capacityTitle: "推荐容量",
    capacityNote: "逆变器功率 × 后备时间",
    promoTitle: "相关 UBETTER 产品",
    promoLarge: "在此功率等级，工商业 UBETTER 储能系统往往更合适。",
    promoMid: "UBETTER 高压储能非常适合该负载等级。",
    promoSmall: "UBETTER 低压一体化与分体式储能非常适合该负载等级。",
    viewProducts: "查看 UBETTER 产品",
    back: "返回",
    viewReport: "查看并下载报告",
    calcError: "无法计算，请先完成步骤 1。",
  },
  step4: {
    title: "摘要报告与联系我们",
    subtitle: "可保存下方报告图片，或联系销售获取正式报价与现场工程方案。",
    reportTitle: "储能选型报告",
    reportTagline: "UBETTER Energy — 非正式规划摘要",
    suggestedUps: "推荐储能",
    rowTotalLoad: "总负载",
    rowUpsType: "储能类型",
    rowTarget: "后备时间",
    rowInverter: "逆变器（×1.25，VA）",
    rowCapacity: "电池容量",
    deviceList: "负载清单：",
    downloadPng: "下载报告图片",
    restart: "重新开始",
  },
  panelCall: {
    hint: "您也可以直接致电，我们的团队将协助选择合适的储能系统。",
    button: "立即拨打",
    phones: SALES_PHONES,
  },
  time: { hourSuffix: "小时" },
  upsTypes: ESS_TYPES_ZH,
  categories: {
    home: "家用",
    lighting: "照明",
    computer_it: "计算机与 IT",
    network: "网络与通信",
    security: "安防",
    medical: "医疗",
  },
  devices: DEVICE_KEYS_ZH,
};

export const upsCalculatorDe: UpsCalculatorDict = {
  meta: { stepWord: "Schritt", ofWord: "von" },
  section: {
    badge: "Online-Energiespeicher-Rechner",
    titleBefore: "Wählen Sie den passenden",
    titleHighlight: "intelligenten Energiespeicher",
    subtitle:
      "Geben Sie Ihre Last ein — wir empfehlen ein passendes Energiespeichersystem und Wechselrichter.",
  },
  wizardSteps: [
    { label: "Last & Leistung", hint: "Angeschlossene Last schätzen" },
    { label: "ESS-Typ", hint: "Systemkategorie" },
    { label: "Dimensionierung", hint: "Wechselrichter & Backup" },
    { label: "Bericht & Kontakt", hint: "Zusammenfassung" },
  ],
  step1: {
    title: "Kennen Sie die Gesamtlast für den Anschluss an den Energiespeicher?",
    subtitle:
      'Wenn Sie die Gesamtleistung in Watt kennen, wählen Sie „Ja“. Andernfalls erstellen wir die Summe aus der Geräteliste.',
    yesTitle: "Ja",
    yesSub: "Ich kenne meine Gesamtlast in Watt",
    noTitle: "Nein",
    noSub: "Helfen Sie mir bei der Schätzung",
    directWattLabel: "Gesamtlast (Watt)",
    pickDevicesHint:
      "Wählen Sie Geräte aus der Liste, die am Energiespeicher betrieben werden sollen.",
    category: "Kategorie",
    deviceName: "Gerät",
    watt: "Leistung (W)",
    qty: "Anz.",
    addDevice: "+ Gerät hinzufügen",
    remove: "Entfernen",
    mobileTotal: "Gesamtlast",
    footnote:
      "* Alle Werte in Watt. Standardwerte sind typische Durchschnittsleistungen.",
    nextStep: "Weiter: ESS-Typ",
    lineTotal: "Zeilensumme*",
    actions: "Aktionen",
  },
  step2: {
    title: "Energiespeichertyp und Backup-Zeit wählen",
    subtitle:
      "Wählen Sie das passende System und wie lange Sie im Batteriebetrieb versorgt sein möchten.",
    suitablePrefix: "Typisch:",
    backupLabel: "Backup-Zeit",
    back: "Zurück",
    calcUps: "Berechnen",
  },
  step3: {
    title: "Empfohlene Energiespeicher-Dimensionierung",
    subtitle:
      "Empfohlener Wechselrichter: 1,25× Ihre angeforderte Last. Batteriekapazität = Wechselrichterleistung × gewählte Backup-Zeit.",
    statTotalLoad: "Gesamtlast",
    statInverter: "Empfohlener Wechselrichter",
    statNominal: "Empfohlenes ESS",
    statBackup: "Backup-Zeit",
    subWatts: "Watt",
    subInverter: "1,25× angeforderte Last",
    subNominal: "Wechselrichter + Batterie",
    subSelectedBackup: "Ihre Auswahl",
    capacityTitle: "Empfohlene Kapazität",
    capacityNote: "Wechselrichterleistung × Backup-Zeit",
    promoTitle: "Passende UBETTER-Produkte",
    promoLarge:
      "Für diese Leistungsklasse eignen sich gewerbliche und industrielle UBETTER-Systeme.",
    promoMid: "UBETTER Hochspannungs-ESS ist für diese Last oft ideal.",
    promoSmall: "UBETTER Niederspannungs ALL-in-ONE und getrennte Systeme passen hier gut.",
    viewProducts: "UBETTER-Produkte ansehen",
    back: "Zurück",
    viewReport: "Bericht ansehen & herunterladen",
    calcError: "Berechnung fehlgeschlagen. Bitte Schritt 1 abschließen.",
  },
  step4: {
    title: "Zusammenfassung & Kontakt",
    subtitle:
      "Speichern Sie das Berichtsbild oder kontaktieren Sie unser Team für ein Angebot.",
    reportTitle: "Energiespeicher-Bericht",
    reportTagline: "UBETTER Energy — informelle Planungsübersicht",
    suggestedUps: "Empfohlenes ESS",
    rowTotalLoad: "Gesamtlast",
    rowUpsType: "ESS-Typ",
    rowTarget: "Backup-Zeit",
    rowInverter: "Wechselrichter (×1,25, VA)",
    rowCapacity: "Batteriekapazität",
    deviceList: "Lastliste:",
    downloadPng: "Berichtsbild herunterladen",
    restart: "Neu starten",
  },
  panelCall: {
    hint: "Oder rufen Sie uns an — wir beraten Sie bei der Auswahl des richtigen Energiespeichers.",
    button: "Jetzt anrufen",
    phones: SALES_PHONES,
  },
  time: { hourSuffix: "Stunden" },
  upsTypes: ESS_TYPES_DE,
  categories: {
    home: "Wohnbereich",
    lighting: "Beleuchtung",
    computer_it: "Computer & IT",
    network: "Netzwerk & Telekom",
    security: "Sicherheit",
    medical: "Medizin",
  },
  devices: DEVICE_KEYS_DE,
};

export function getUpsCalculator(locale: Locale): UpsCalculatorDict {
  if (locale === "fa") return upsCalculatorFa;
  if (locale === "zh") return upsCalculatorZh;
  if (locale === "de") return upsCalculatorDe;
  return upsCalculatorEn;
}

export function formatStepMeta(
  locale: Locale,
  t: UpsCalculatorDict,
  stepIndex: number,
  totalSteps: number,
  hint: string
): string {
  const n = stepIndex + 1;
  const loc = localeNumTag(locale);
  return `${t.meta.stepWord} ${n.toLocaleString(loc)} ${t.meta.ofWord} ${totalSteps.toLocaleString(loc)} · ${hint}`;
}

export function formatBackupDuration(h: number, locale: Locale, t: UpsCalculatorDict): string {
  const loc = localeNumTag(locale);
  if (locale === "en" || locale === "de") {
    const n = h.toLocaleString(loc);
    if (h === 1) return locale === "de" ? "1 Stunde" : "1 hour";
    return `${n} ${t.time.hourSuffix}`;
  }
  return `${h.toLocaleString(loc)} ${t.time.hourSuffix}`;
}
