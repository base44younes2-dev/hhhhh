// Mock data for Settings page — all simulated.

export const SETTINGS_TABS = [
  { id: "general", label: "عمومی", icon: "faGear" },
  { id: "monitoring", label: "مانیتورینگ", icon: "faHeartPulse" },
  { id: "performance", label: "Performance", icon: "faBolt" },
  { id: "security", label: "امنیت", icon: "faShieldHalved" },
  { id: "traffic", label: "ترافیک", icon: "faChartLine" },
  { id: "alerts", label: "هشدارها", icon: "faBell" },
  { id: "notifications", label: "اعلان‌ها", icon: "faPaperPlane" },
  { id: "retention", label: "ذخیره‌سازی داده", icon: "faDatabase" },
  { id: "advanced", label: "پیشرفته", icon: "faScrewdriverWrench" },
  { id: "about", label: "درباره", icon: "faCircleInfo" },
];

export const MONITORING_MODES = [
  { id: "light", label: "Light", desc: "حداقل منابع · فقط بررسی‌های حیاتی · مناسب سایت‌های کوچک", icon: "faFeather", tone: "success" },
  { id: "balanced", label: "Balanced", desc: "تعادل بین دقت و منابع · توصیه‌شده برای اکثر سایت‌ها", icon: "faScaleBalanced", tone: "primary" },
  { id: "deep", label: "Deep", desc: "بررسی جامع و عمیق · منابع بیشتر · برای سایت‌های حساس", icon: "faMicroscope", tone: "info" },
];

export const MONITORING_INTERVALS = [
  { id: "critical-urls", label: "Critical URLs", options: ["1 min", "2 min", "5 min", "10 min"], default: "1 min" },
  { id: "normal-urls", label: "Normal URLs", options: ["5 min", "10 min", "15 min", "30 min"], default: "5 min" },
  { id: "security", label: "Security", options: ["1 hour", "6 hours", "12 hours", "24 hours"], default: "6 hours" },
  { id: "external", label: "External Services", options: ["5 min", "10 min", "30 min", "1 hour"], default: "10 min" },
  { id: "ssl", label: "SSL", options: ["Daily", "Weekly", "Monthly"], default: "Daily" },
  { id: "dns", label: "DNS", options: ["5 min", "10 min", "30 min", "1 hour"], default: "10 min" },
  { id: "cron", label: "Cron", options: ["5 min", "10 min", "15 min", "30 min"], default: "5 min" },
  { id: "integrity", label: "File Integrity", options: ["1 hour", "6 hours", "12 hours", "24 hours"], default: "12 hours" },
];

export const RETENTION_ITEMS = [
  { id: "traffic", label: "Traffic Data", default: 30, unit: "days" },
  { id: "security", label: "Security Events", default: 90, unit: "days" },
  { id: "performance", label: "Performance Data", default: 14, unit: "days" },
  { id: "http", label: "HTTP History", default: 30, unit: "days" },
  { id: "sms", label: "SMS Logs", default: 90, unit: "days" },
  { id: "scan", label: "Scan History", default: 180, unit: "days" },
  { id: "change", label: "Change History", default: 180, unit: "days" },
  { id: "integrity", label: "File Integrity History", default: 90, unit: "days" },
];

export const DASHBOARD_WIDGETS = [
  { id: "overall-health", label: "Overall Health", icon: "faHeartPulse", enabled: true, size: "medium" },
  { id: "security-score", label: "Security Score", icon: "faShieldHalved", enabled: true, size: "medium" },
  { id: "performance", label: "Performance", icon: "faBolt", enabled: true, size: "medium" },
  { id: "uptime", label: "Uptime", icon: "faChartLine", enabled: true, size: "small" },
  { id: "http-status", label: "HTTP Status", icon: "faGlobe", enabled: true, size: "small" },
  { id: "traffic", label: "Traffic", icon: "faChartLine", enabled: false, size: "large" },
  { id: "plugin-impact", label: "Plugin Impact", icon: "faPlug", enabled: true, size: "medium" },
  { id: "recent-alerts", label: "Recent Alerts", icon: "faBell", enabled: true, size: "large" },
  { id: "cron", label: "Cron", icon: "faClock", enabled: false, size: "small" },
  { id: "database", label: "Database", icon: "faDatabase", enabled: true, size: "medium" },
  { id: "ssl", label: "SSL", icon: "faLock", enabled: true, size: "small" },
  { id: "external", label: "External Services", icon: "faCloud", enabled: false, size: "medium" },
  { id: "storage", label: "Storage", icon: "faHardDrive", enabled: false, size: "small" },
  { id: "backup", label: "Backup", icon: "faSave", enabled: false, size: "small" },
];

export const WIDGET_SIZES = [
  { id: "small", label: "Small" },
  { id: "medium", label: "Medium" },
  { id: "large", label: "Large" },
];

export const CHANGELOG_SECTIONS = [
  {
    section: "Dashboard", icon: "faGauge",
    items: ["نمایش امتیاز کلی سایت با نمودار دایره‌ای", "خلاصه هشدارهای فعال", "نمودار ترافیک و زمان پاسخ", "اجزای سایت و وضعیت سلامت"],
  },
  {
    section: "Health Monitoring", icon: "faHeartPulse",
    items: ["بررسی نسخه وردپرس و PHP", "وضعیت REST API و WP-Cron", "بررسی پایگاه داده و حجم جداول", "تست ایمیل و SPF/DKIM"],
  },
  {
    section: "Performance", icon: "faBolt",
    items: ["اندازه‌گیری Core Web Vitals", "تحلیل تاثیر افزونه‌ها", "کوئری‌های کند دیتابیس", "نمودار Deep Profiling"],
  },
  {
    section: "Page Monitoring", icon: "faFileLines",
    items: ["پایش ۲۴۷ صفحات سایت", "صفحات حیاتی با اولویت بالا", "شناسایی صفحات کند و دارای خطا", "نمودار وضعیت HTTP"],
  },
  {
    section: "Security", icon: "faShieldHalved",
    items: ["مرکز امنیت با امتیازبندی", "بررسی Security Headers", "یکپارچگی فایل‌های هسته", "شناسایی آسیب‌پذیری‌ها"],
  },
  {
    section: "Alerts", icon: "faBell",
    items: ["مرکز هشدارها با فیلتر و جستجو", "Visual Rule Builder", "قوانین هشدار آماده", "Snooze و تأیید هشدار"],
  },
  {
    section: "SMS", icon: "faPaperPlane",
    items: ["ادغام ملی پیامک", "انتخاب هوشمند نوع هشدار", "مدیریت گیرندگان", "تاریخچه ارسال و وضعیت"],
  },
  {
    section: "Reports", icon: "faFileExport",
    items: ["گزارش‌های آماده و سفارشی", "Report Builder بصری", "گزارش‌های دوره‌ای زمان‌بندی‌شده", "پیش‌نمایش گزارش قابل چاپ"],
  },
  {
    section: "Settings", icon: "faGear",
    items: ["تنظیمات چندزبانه و RTL", "حالت‌های مانیتورینگ Light/Balanced/Deep", "کنترل Retention داده‌ها", "Export/Import تنظیمات"],
  },
];

export const HELP_CARDS = [
  { id: "getting-started", icon: "faRocket", title: "شروع کار", desc: "راه‌اندازی اولیه و پیکربندی YGuard", links: ["نصب و فعال‌سازی", "پیکربندی اولیه", "اتصال ملی پیامک", "اولین اسکن"] },
  { id: "monitoring", icon: "faHeartPulse", title: "مانیتورینگ", desc: "پایش سلامت و عملکرد سایت", links: ["حالت‌های مانیتورینگ", "تنظیم بازه‌ها", "صفحات حیاتی", "سرویس‌های خارجی"] },
  { id: "performance", icon: "faBolt", title: "Performance", desc: "بهینه‌سازی و تحلیل عملکرد", links: ["Core Web Vitals", "تاثیر افزونه‌ها", "Deep Profiling", "کوئری‌های کند"] },
  { id: "security", icon: "faShieldHalved", title: "امنیت", desc: "محافظت از سایت در برابر تهدیدها", links: ["Security Headers", "یکپارچگی فایل", "آسیب‌پذیری‌ها", "Brute Force"] },
  { id: "alerts", icon: "faBell", title: "هشدارها", desc: "پیکربندی هشدارها و اعلان‌ها", links: ["قوانین هشدار", "Visual Builder", "Snooze و Cooldown", "کانال‌های اطلاع‌رسانی"] },
  { id: "sms", icon: "faPaperPlane", title: "ملی پیامک", desc: "ارسال پیامک هشدارها", links: ["اتصال ملی پیامک", "انتخاب نوع هشدار", "مدیریت گیرندگان", "تاریخچه ارسال"] },
  { id: "reports", icon: "faFileExport", title: "گزارش‌ها", desc: "ساخت و مدیریت گزارش‌ها", links: ["گزارش‌های آماده", "گزارش سفارشی", "گزارش دوره‌ای", "پیش‌نمایش و خروجی"] },
  { id: "settings", icon: "faGear", title: "تنظیمات", desc: "پیکربندی کامل YGuard", links: ["تنظیمات عمومی", "Retention داده", "Export/Import", "Danger Zone"] },
];

export const FAQ_ITEMS = [
  { q: "آیا YGuard با همه قالب‌ها سازگار است؟", a: "بله، YGuard با تمام قالب‌های استاندارد وردپرس سازگار است." },
  { q: "آیا برای استفاده از YGuard نیاز به دانش فنی دارم؟", a: "خیر، رابط کاربری YGuard به‌گونه‌ای طراحی شده که همه کاربران بتوانند از آن استفاده کنند." },
  { q: "آیا YGuard روی عملکرد سایت تاثیر می‌گذارد؟", a: "تاثیر YGuard بر عملکرد بسیار کم است و در حالت Light تقریباً ناچیز است." },
  { q: "آیا داده‌های سایت من ذخیره یا ارسال می‌شود؟", a: "خیر، تمام داده‌ها به‌صورت محلی در سایت شما پردازش و ذخیره می‌شوند." },
  { q: "چگونه می‌توانم پیامک هشدار دریافت کنم؟", a: "با اتصال حساب ملی پیامک در بخش کانال‌های اطلاع‌رسانی، می‌توانید پیامک هشدار دریافت کنید." },
];
