import type { Locale } from "@/i18n/config";

export type WarrantyPageCopy = {
  breadcrumbHome: string;
  breadcrumbServices: string;
  breadcrumbCurrent: string;
  title: string;
  subtitle: string;
  sectionDevice: string;
  sectionContact: string;
  fields: {
    warrantyCode: string;
    warrantyCodePlaceholder: string;
    serialNumber: string;
    serialNumberPlaceholder: string;
    installationDate: string;
    installationDatePlaceholder: string;
    deviceModel: string;
    deviceModelPlaceholder: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    address: string;
    addressPlaceholder: string;
    notes: string;
    notesPlaceholder: string;
  };
  submit: string;
  successTitle: string;
  successBody: string;
  backHome: string;
  errors: {
    warrantyCode: string;
    fullName: string;
    phone: string;
    email: string;
  };
};

export const warrantyPageCopy: Record<Locale, WarrantyPageCopy> = {
  fa: {
    breadcrumbHome: "صفحه اصلی",
    breadcrumbServices: "خدمات و گارانتی",
    breadcrumbCurrent: "ثبت کد گارانتی",
    title: "ثبت کد گارانتی دستگاه",
    subtitle:
      "شماره سریال درج شده روی محصول را وارد کنید، پس از بررسی، وضعیت گارانتی شما تأیید می‌شود.",
    sectionDevice: "اطلاعات دستگاه",
    sectionContact: "اطلاعات تماس",
    fields: {
      warrantyCode: "شماره سریال دستگاه",
      warrantyCodePlaceholder: "مثال: UB-2026-XXXX-XXXX",
      serialNumber: "تاریخ فاکتور دستگاه",
      serialNumberPlaceholder: "مثال: ۱۴۰۳/۰۳/۱۵",
      installationDate: "تاریخ نصب دستگاه",
      installationDatePlaceholder: "مثال: ۱۴۰۳/۰۴/۰۱",
      deviceModel: "مدل دستگاه",
      deviceModelPlaceholder: "مثال: UB Power 5000",
      fullName: "نام و نام خانوادگی",
      fullNamePlaceholder: "مثال: علی محمدی",
      phone: "شماره تماس",
      phonePlaceholder: "مثال: ۰۹۱۲۰۰۰۰۰۰۰",
      email: "ایمیل",
      emailPlaceholder: "example@email.com",
      address: "آدرس شما",
      addressPlaceholder: "تهران ، خیابان ولیعصر ، کوچه معتمدی ، پلاک ۱۲",
      notes: "توضیحات (اختیاری)",
      notesPlaceholder: "انتقادات و پیشنهادات",
    },
    submit: "ثبت کد گارانتی",
    successTitle: "کد گارانتی ثبت شد",
    successBody:
      "درخواست شما دریافت شد. تیم پشتیبانی پس از بررسی کد، نتیجه را از طریق تماس یا ایمیل اعلام می‌کند.",
    backHome: "بازگشت به صفحه اصلی",
    errors: {
      warrantyCode: "کد گارانتی الزامی است",
      fullName: "نام الزامی است",
      phone: "شماره تماس الزامی است",
      email: "ایمیل نامعتبر است",
    },
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbServices: "Services & Warranty",
    breadcrumbCurrent: "Warranty registration",
    title: "Submit your device warranty code",
    subtitle:
      "Enter the warranty code printed on your product or packaging. We will verify your coverage after review.",
    sectionDevice: "Device information",
    sectionContact: "Contact information",
    fields: {
      warrantyCode: "Warranty code",
      warrantyCodePlaceholder: "e.g. UB-2026-XXXX-XXXX",
      serialNumber: "Invoice date",
      serialNumberPlaceholder: "e.g. 2024-06-15",
      installationDate: "Installation date",
      installationDatePlaceholder: "e.g. 2024-07-01",
      deviceModel: "Device model",
      deviceModelPlaceholder: "e.g. UB Power 5000",
      fullName: "Full name",
      fullNamePlaceholder: "e.g. John Smith",
      phone: "Phone number",
      phonePlaceholder: "e.g. +1 555 000 0000",
      email: "Email",
      emailPlaceholder: "example@email.com",
      address: "Your address",
      addressPlaceholder: "e.g. 123 Main St, City",
      notes: "Notes (optional)",
      notesPlaceholder: "Model, purchase date, or other details",
    },
    submit: "Submit warranty code",
    successTitle: "Warranty code submitted",
    successBody:
      "We received your request. Our support team will verify the code and contact you with the result.",
    backHome: "Back to home",
    errors: {
      warrantyCode: "Warranty code is required",
      fullName: "Name is required",
      phone: "Phone number is required",
      email: "Invalid email address",
    },
  },
  zh: {
    breadcrumbHome: "首页",
    breadcrumbServices: "服务与保修",
    breadcrumbCurrent: "保修码登记",
    title: "提交设备保修码",
    subtitle: "请输入产品或包装上的保修码，我们将在审核后确认您的保修状态。",
    sectionDevice: "设备信息",
    sectionContact: "联系信息",
    fields: {
      warrantyCode: "保修码",
      warrantyCodePlaceholder: "例如：UB-2026-XXXX-XXXX",
      serialNumber: "发票日期",
      serialNumberPlaceholder: "例如：2024-06-15",
      installationDate: "安装日期",
      installationDatePlaceholder: "例如：2024-07-01",
      deviceModel: "设备型号",
      deviceModelPlaceholder: "例如：UB Power 5000",
      fullName: "姓名",
      fullNamePlaceholder: "例如：张三",
      phone: "电话",
      phonePlaceholder: "例如：+86 138 0000 0000",
      email: "电子邮箱",
      emailPlaceholder: "example@email.com",
      address: "您的地址",
      addressPlaceholder: "例如：北京市朝阳区某某路123号",
      notes: "备注（选填）",
      notesPlaceholder: "型号、购买日期或其他说明",
    },
    submit: "提交保修码",
    successTitle: "保修码已提交",
    successBody: "我们已收到您的申请，客服团队将在核实后通过电话或邮件告知结果。",
    backHome: "返回首页",
    errors: {
      warrantyCode: "请填写保修码",
      fullName: "请填写姓名",
      phone: "请填写电话",
      email: "邮箱格式不正确",
    },
  },
  de: {
    breadcrumbHome: "Startseite",
    breadcrumbServices: "Service & Garantie",
    breadcrumbCurrent: "Garantiecode",
    title: "Geräte-Garantiecode einreichen",
    subtitle:
      "Geben Sie den auf dem Produkt oder in der Verpackung angegebenen Garantiecode ein. Nach Prüfung bestätigen wir Ihren Garantiestatus.",
    sectionDevice: "Geräteinformationen",
    sectionContact: "Kontaktdaten",
    fields: {
      warrantyCode: "Garantiecode",
      warrantyCodePlaceholder: "z. B. UB-2026-XXXX-XXXX",
      serialNumber: "Rechnungsdatum",
      serialNumberPlaceholder: "z. B. 2024-06-15",
      installationDate: "Installationsdatum",
      installationDatePlaceholder: "z. B. 2024-07-01",
      deviceModel: "Gerätemodell",
      deviceModelPlaceholder: "z. B. UB Power 5000",
      fullName: "Vollständiger Name",
      fullNamePlaceholder: "z. B. Max Mustermann",
      phone: "Telefonnummer",
      phonePlaceholder: "z. B. +49 170 000 0000",
      email: "E-Mail",
      emailPlaceholder: "example@email.com",
      address: "Ihre Adresse",
      addressPlaceholder: "z. B. Musterstraße 12, Berlin",
      notes: "Anmerkungen (optional)",
      notesPlaceholder: "Modell, Kaufdatum oder weitere Details",
    },
    submit: "Garantiecode einreichen",
    successTitle: "Garantiecode eingereicht",
    successBody:
      "Wir haben Ihre Anfrage erhalten. Unser Support-Team prüft den Code und meldet sich mit dem Ergebnis.",
    backHome: "Zur Startseite",
    errors: {
      warrantyCode: "Garantiecode ist erforderlich",
      fullName: "Name ist erforderlich",
      phone: "Telefonnummer ist erforderlich",
      email: "Ungültige E-Mail-Adresse",
    },
  },
};
