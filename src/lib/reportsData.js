// Mock data for Reports page — all values simulated, no backend logic.

export const REPORT_KPIS = [
  { id: "generated", icon: "faFileExport", tone: "primary", label: "گزارش‌های تولیدشده", value: 28 },
  { id: "periodic", icon: "faClockRotateLeft", tone: "info", label: "گزارش‌های دوره‌ای فعال", value: 3 },
  { id: "last", icon: "faClock", tone: "success", label: "آخرین گزارش", value: "۲ ساعت پیش" },
  { id: "critical", icon: "faTriangleExclamation", tone: "danger", label: "مشکلات بحرانی گزارش‌شده", value: 5 },
];

export const REPORT_PRESETS = [
  {
    id: "full-site", icon: "faGlobe", tone: "primary",
    title: "گزارش کامل سایت", desc: "گزارش جامع شامل همه بخش‌های سلامت، امنیت و عملکرد",
    lastGenerated: "۲ ساعت پیش", sections: ["سلامت", "امنیت", "Performance", "Database", "Pages", "Uptime", "Alerts"], status: "ready",
  },
  {
    id: "health", icon: "faHeartPulse", tone: "success",
    title: "گزارش سلامت", desc: "وضعیت سلامت هسته وردپرس، PHP و سرور",
    lastGenerated: "۵ ساعت پیش", sections: ["WordPress", "PHP", "Server", "Database"], status: "ready",
  },
  {
    id: "security", icon: "faShieldHalved", tone: "danger",
    title: "گزارش امنیت", desc: "بررسی جامع امنیت، آسیب‌پذیری‌ها و حملات",
    lastGenerated: "۱ روز پیش", sections: ["Security", "Attacks", "Login", "File Integrity", "Vulnerabilities"], status: "ready",
  },
  {
    id: "performance", icon: "faBolt", tone: "warning",
    title: "گزارش Performance", desc: "تحلیل عملکرد، Core Web Vitals و تاثیر افزونه‌ها",
    lastGenerated: "۳ ساعت پیش", sections: ["Performance", "Plugin Impact", "Pages", "Database"], status: "ready",
  },
  {
    id: "uptime", icon: "faChartLine", tone: "info",
    title: "گزارش Uptime", desc: "درصد در دسترس بودن و زمان قطعی‌ها",
    lastGenerated: "۶ ساعت پیش", sections: ["Uptime", "HTTP Errors", "Response Time"], status: "ready",
  },
  {
    id: "http-errors", icon: "faCircleExclamation", tone: "danger",
    title: "گزارش HTTP Errors", desc: "خطاهای 4xx و 5xx و صفحات دارای مشکل",
    lastGenerated: "۸ ساعت پیش", sections: ["HTTP Errors", "Pages", "Slow Pages"], status: "stale",
  },
  {
    id: "database", icon: "faDatabase", tone: "primary",
    title: "گزارش Database", desc: "حجم جداول، کوئری‌های کند و بهینه‌سازی",
    lastGenerated: "۱ روز پیش", sections: ["Database", "Slow Queries", "Tables"], status: "ready",
  },
  {
    id: "plugins", icon: "faPlug", tone: "warning",
    title: "گزارش افزونه‌ها", desc: "تاثیر افزونه‌ها بر عملکرد و امنیت",
    lastGenerated: "۲ روز پیش", sections: ["Plugin Impact", "Vulnerabilities", "Updates"], status: "stale",
  },
  {
    id: "alerts", icon: "faBell", tone: "danger",
    title: "گزارش هشدارها", desc: "خلاصه هشدارهای فعال و حل‌شده",
    lastGenerated: "۴ ساعت پیش", sections: ["Alerts", "Resolved", "Critical"], status: "ready",
  },
  {
    id: "changes", icon: "faClockRotateLeft", tone: "info",
    title: "گزارش تغییرات سایت", desc: "تغییرات افزونه‌ها، قالب، کاربران و تنظیمات",
    lastGenerated: "۱۲ ساعت پیش", sections: ["Change History", "Plugin Changes", "Settings"], status: "ready",
  },
];

export const CUSTOM_REPORT_SECTIONS = [
  "خلاصه Dashboard", "سلامت سایت", "Performance", "Plugin Impact", "Database",
  "Pages", "Uptime", "Security", "Traffic", "Attacks",
  "Login Security", "File Integrity", "Vulnerabilities", "Alerts", "Cron",
  "SSL", "DNS", "External Services", "Change History",
];

export const DATE_RANGES = [
  { id: "today", label: "امروز" },
  { id: "24h", label: "۲۴ ساعت" },
  { id: "7d", label: "۷ روز" },
  { id: "30d", label: "۳۰ روز" },
  { id: "90d", label: "۹۰ روز" },
  { id: "custom", label: "بازه سفارشی" },
];

export const REPORT_FORMATS = ["PDF", "CSV", "HTML", "Print"];

export const REPORT_PREVIEW = {
  title: "گزارش کامل سایت",
  generatedDate: "۱۴۰۵/۰۷/۱۹ — ۱۵:۳۰",
  version: "1.0.0",
  scores: [
    { label: "Overall Score", value: 92, tone: "success" },
    { label: "Health Score", value: 96, tone: "success" },
    { label: "Security Score", value: 89, tone: "primary" },
    { label: "Performance Score", value: 82, tone: "warning" },
    { label: "Uptime", value: "99.9%", tone: "success" },
    { label: "Critical Issues", value: 2, tone: "danger" },
    { label: "Warnings", value: 5, tone: "warning" },
    { label: "Passed Checks", value: 47, tone: "success" },
  ],
  sections: [
    {
      title: "Executive Summary",
      content: "سایت example.com در وضعیت خوبی قرار دارد. امتیاز کلی ۹۲ از ۱۰۰ است. ۲ مورد بحرانی و ۵ هشدار نیازمند توجه وجود دارد. عملکرد سایت قابل قبول است اما بهینه‌سازی پایگاه داده توصیه می‌شود.",
    },
    {
      title: "Health",
      items: [
        { label: "WordPress Version", value: "6.6.2", status: "success" },
        { label: "PHP Version", value: "8.2.12", status: "success" },
        { label: "Database", value: "MariaDB 10.11 · 184MB", status: "success" },
        { label: "WP-Cron", value: "۲ ساعت تأخیر", status: "danger" },
        { label: "REST API", value: "۱۲۰ms", status: "success" },
      ],
    },
    {
      title: "Performance",
      items: [
        { label: "Avg Response Time", value: "412ms", status: "warning" },
        { label: "TTFB", value: "380ms", status: "warning" },
        { label: "Largest Contentful Paint", value: "2.1s", status: "warning" },
        { label: "Cumulative Layout Shift", value: "0.04", status: "success" },
        { label: "Page Cache Hit Rate", value: "88%", status: "success" },
      ],
    },
    {
      title: "Security",
      items: [
        { label: "Security Headers Grade", value: "B", status: "warning" },
        { label: "Failed Logins (24h)", value: "12", status: "warning" },
        { label: "Blocked IPs", value: "3", status: "success" },
        { label: "Vulnerabilities", value: "2", status: "danger" },
        { label: "File Integrity", value: "بدون تغییر مشکوک", status: "success" },
      ],
    },
    {
      title: "Database",
      items: [
        { label: "Database Size", value: "184MB", status: "success" },
        { label: "Largest Table", value: "wp_postmeta (42MB)", status: "warning" },
        { label: "Slow Queries", value: "3", status: "warning" },
        { label: "Autoload Size", value: "2.1MB", status: "danger" },
      ],
    },
    {
      title: "Pages",
      items: [
        { label: "Total Pages Monitored", value: "247", status: "success" },
        { label: "Pages with Errors", value: "3", status: "danger" },
        { label: "Slow Pages (>2s)", value: "7", status: "warning" },
        { label: "5xx Errors", value: "2", status: "danger" },
      ],
    },
    {
      title: "Alerts",
      items: [
        { label: "Open Alerts", value: "18", status: "warning" },
        { label: "Critical", value: "3", status: "danger" },
        { label: "Resolved (24h)", value: "12", status: "success" },
      ],
    },
    {
      title: "Recommendations",
      items: [
        { label: "غیرفعال‌سازی WP-Cron و استفاده از Server Cron", status: "warning" },
        { label: "پاکسازی Autoload در wp_options", status: "danger" },
        { label: "فعال‌سازی Object Cache (Redis/Memcached)", status: "info" },
        { label: "بروزرسانی افزونه‌های آسیب‌پذیر", status: "danger" },
        { label: "افزودن Security Headers مفقود", status: "warning" },
      ],
    },
  ],
};

export const PERIODIC_REPORTS = [
  {
    id: 1, name: "گزارش هفتگی امنیت", frequency: "هفتگی", day: "یکشنبه", time: "08:00",
    format: "PDF", recipients: [
      { id: 1, name: "مدیر سایت", email: "admin@example.com", status: "active" },
      { id: 2, name: "مدیر فنی", email: "tech@example.com", status: "active" },
    ],
    options: { onlyIssues: false, always: true, attachPdf: true, summary: true, critical: true, recommendations: true },
    lastSent: "۲ روز پیش", status: "active",
  },
  {
    id: 2, name: "گزارش روزانه عملکرد", frequency: "روزانه", time: "06:00",
    format: "PDF", recipients: [
      { id: 1, name: "مدیر سایت", email: "admin@example.com", status: "active" },
    ],
    options: { onlyIssues: false, always: true, attachPdf: true, summary: true, critical: false, recommendations: true },
    lastSent: "امروز ۰۶:۰۰", status: "active",
  },
  {
    id: 3, name: "گزارش ماهانه جامع", frequency: "ماهانه", day: 1, time: "09:00",
    format: "PDF", recipients: [
      { id: 1, name: "مدیر سایت", email: "admin@example.com", status: "active" },
      { id: 3, name: "مدیرعامل", email: "ceo@example.com", status: "active" },
    ],
    options: { onlyIssues: false, always: true, attachPdf: true, summary: true, critical: true, recommendations: true },
    lastSent: "۱۲ روز پیش", status: "active",
  },
];

export const FREQUENCIES = [
  { id: "daily", label: "روزانه" },
  { id: "weekly", label: "هفتگی" },
  { id: "monthly", label: "ماهانه" },
  { id: "custom", label: "Custom" },
];

export const WEEK_DAYS = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
