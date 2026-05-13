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

export const upsCalculatorZh: UpsCalculatorDict = {
  meta: { stepWord: "步骤", ofWord: "共" },
  section: {
    badge: "UPS 选型",
    titleBefore: "挑选合适的",
    titleHighlight: "UPS",
    subtitle: "输入负载功率，我们将为您推荐匹配的 UPS 容量与电池配置。",
  },
  wizardSteps: [
    { label: "负载与功率", hint: "估算接入负载" },
    { label: "UPS 拓扑", hint: "技术类型" },
    { label: "容量与后备时间", hint: "续航配置" },
    { label: "报告与联系", hint: "摘要与下一步" },
  ],
  step1: {
    title: "您是否已知接入 UPS 的总负载？",
    subtitle:
      '若已知总功率（瓦特），请选择「是」。否则从预设清单勾选设备，由我们为您汇总负载。',
    yesTitle: "是",
    yesSub: "我已知道总负载（瓦）",
    noTitle: "否",
    noSub: "帮我从设备清单估算",
    directWattLabel: "总负载（瓦）",
    pickDevicesHint: "从列表中选择计划在 UPS 上运行的设备，并加入表格。",
    category: "类别",
    deviceName: "设备",
    watt: "功率（W）",
    qty: "数量",
    addDevice: "+ 添加设备",
    remove: "移除",
    mobileTotal: "负载合计",
    footnote: "* 数值单位为瓦特，默认功率为所列设备的典型平均值。",
    nextStep: "下一步：UPS 类型",
    lineTotal: "行合计*",
    actions: "操作",
  },
  step2: {
    title: "选择 UPS 类型与目标后备时间",
    subtitle: "根据设备敏感度选择拓扑，再选择在电池供电下需要运行多久。",
    suitablePrefix: "典型用途：",
    backupLabel: "目标电池后备时间",
    back: "返回",
    calcUps: "计算选型",
  },
  step3: {
    title: "工程估算：UPS 与电池",
    subtitle:
      "估算已考虑功率因数与 25% 安全裕量；续航基于推荐的标准电池组。",
    statTotalLoad: "总负载",
    statMinVa: "最小 VA",
    statNominal: "推荐 UPS",
    statBackup: "估算后备",
    subWatts: "瓦特",
    subVa: "伏安",
    subNominal: "铭牌容量",
    subStdBattery: "标配电池",
    batteryTitle: "推荐电池组合",
    battCount: "电池数量：",
    battEach: "单节：",
    battTotal: "总储能：",
    battUnit: "节",
    promoTitle: "相关 UBETTER 产品",
    promoLarge: "在此功率等级，工商业储能与大功率 UBETTER UPS 往往更合适。",
    promoMid: "UBETTER 储能电站可同时满足 UPS 需求并作为完整备用能源枢纽。",
    promoSmall:
      "便携式 UBETTER 储能电源非常适合该负载——兼具 UPS 式备份与移动用电。",
    viewProducts: "查看 UBETTER 产品",
    back: "返回",
    viewReport: "查看并下载报告",
    calcError: "无法计算，请先完成步骤 1。",
  },
  step4: {
    title: "摘要报告与联系我们",
    subtitle:
      "可保存下方报告图片，或联系销售获取正式报价与现场工程方案。",
    reportTitle: "UPS 选型报告",
    reportTagline: "UBETTER Energy — 非正式规划摘要",
    suggestedUps: "推荐 UPS",
    rowTotalLoad: "总负载",
    rowUpsType: "UPS 类型",
    rowTarget: "目标后备",
    rowActual: "估算后备",
    rowBattery: "电池",
    rowWh: "电池总能量",
    deviceList: "负载清单：",
    downloadPng: "下载报告图片",
    restart: "重新开始",
  },
  panelCall: {
    hint: "您也可以直接致电，我们的团队将协助选择合适的 UPS。",
    button: "立即拨打",
  },
  time: { halfHour: "30 分钟", hourSuffix: "小时" },
  upsTypes: {
    online: {
      title: "在线式（双变换）",
      desc: "最高保护等级——输出完全隔离、洁净，切换时间为零。",
      suitable: "服务器、医疗、工业",
    },
    "line-interactive": {
      title: "互动式",
      desc: "具备稳压 AVR，市电中断时快速切换。",
      suitable: "电脑、网络设备、监控",
    },
    offline: {
      title: "后备式",
      desc: "市电断电时提供基础保护——简单经济。",
      suitable: "家庭办公、小型负载",
    },
  },
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

export function getUpsCalculator(locale: Locale): UpsCalculatorDict {
  if (locale === "fa") return upsCalculatorFa;
  if (locale === "zh") return upsCalculatorZh;
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
  const loc = locale === "fa" ? "fa-IR" : locale === "zh" ? "zh-CN" : "en-US";
  return `${t.meta.stepWord} ${n.toLocaleString(loc)} ${t.meta.ofWord} ${totalSteps.toLocaleString(loc)} · ${hint}`;
}

export function formatBackupDuration(h: number, locale: Locale, t: UpsCalculatorDict): string {
  if (h === 0.5) return t.time.halfHour;
  const loc = locale === "fa" ? "fa-IR" : locale === "zh" ? "zh-CN" : "en-US";
  if (locale === "en") {
    const n = h.toLocaleString(loc);
    if (h === 1) return "1 hour";
    return `${n} hours`;
  }
  return `${h.toLocaleString(loc)} ${t.time.hourSuffix}`;
}
