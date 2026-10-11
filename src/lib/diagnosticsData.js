// Mock data for Diagnostic Tools, System Info, Storage & Backup — all simulated.

export const DIAGNOSTIC_TOOLS = [
  { id: "rest-api", icon: "faPlug", title: "REST API Test", desc: "بررسی در دسترس بودن و پاسخ REST API وردپرس", status: "success", statusLabel: "موفق", lastTest: "۲ ساعت پیش" },
  { id: "loopback", icon: "faRotate", title: "Loopback Test", desc: "تست درخواست Loopback برای صحت عملکرد Cron", status: "success", statusLabel: "موفق", lastTest: "۲ ساعت پیش" },
  { id: "cron", icon: "faClock", title: "Cron Test", desc: "بررسی اجرای صحیح WP-Cron و وظایف زمان‌بندی‌شده", status: "warning", statusLabel: "هشدار", lastTest: "۲ ساعت پیش" },
  { id: "db-conn", icon: "faDatabase", title: "Database Connection Test", desc: "تست اتصال به پایگاه داده و سرعت پاسخ", status: "success", statusLabel: "موفق", lastTest: "۵ ساعت پیش" },
  { id: "dns", icon: "faNetworkWired", title: "DNS Test", desc: "بررسی رکوردهای DNS و زمان پاسخ", status: "success", statusLabel: "موفق", lastTest: "۱ ساعت پیش" },
  { id: "ssl", icon: "faLock", title: "SSL Test", desc: "بررسی گواهی SSL و زنجیره اعتبار", status: "success", statusLabel: "موفق", lastTest: "۱ ساعت پیش" },
  { id: "email", icon: "faEnvelope", title: "Email Test", desc: "ارسال ایمیل آزمایشی و بررسی SMTP", status: "warning", statusLabel: "هشدار", lastTest: "۳ ساعت پیش" },
  { id: "http", icon: "faGlobe", title: "HTTP Test", desc: "بررسی کدهای پاسخ HTTP و هدرها", status: "success", statusLabel: "موفق", lastTest: "۳۰ دقیقه پیش" },
  { id: "cache", icon: "faLayerGroup", title: "Cache Detection", desc: "شناسایی لایه‌های Cache فعال", status: "success", statusLabel: "موفق", lastTest: "۱ ساعت پیش" },
  { id: "php-info", icon: "faCode", title: "PHP Information", desc: "نمایش تنظیمات و ماژول‌های PHP", status: "success", statusLabel: "موفق", lastTest: "—" },
  { id: "sys-info", icon: "faServer", title: "System Information", desc: "اطلاعات سرور و سیستم‌عامل", status: "success", statusLabel: "موفق", lastTest: "—" },
  { id: "wp-config", icon: "faFileLines", title: "WordPress Configuration", desc: "بررسی تنظیمات wp-config.php", status: "success", statusLabel: "موفق", lastTest: "—" },
  { id: "ext-service", icon: "faCloud", title: "External Service Test", desc: "تست اتصال به سرویس‌های خارجی", status: "warning", statusLabel: "هشدار", lastTest: "۴ ساعت پیش" },
];

export const DIAGNOSTIC_RESULTS = {
  "rest-api": {
    status: "موفق", httpStatus: 200, responseTime: "118ms", endpoint: "/wp-json/", lastChecked: "اکنون",
    technical: "GET /wp-json/ → 200 OK · Content-Type: application/json · Body: 2.4KB · Server: nginx/1.24.0",
    result: "REST API با موفقیت پاسخ می‌دهد. تمام endpointهای اصلی در دسترس هستند.",
    recommendation: "هیچ اقدامی نیاز نیست. REST API به‌خوبی کار می‌کند.",
  },
  "loopback": {
    status: "موفق", httpStatus: 200, responseTime: "95ms", endpoint: "wp-cron.php (loopback)", lastChecked: "اکنون",
    technical: "Loopback request to wp-cron.php → 200 OK · Execution: 1.2s · No errors in error_log",
    result: "درخواست Loopback با موفقیت انجام شد. WP-Cron به‌درستی کار می‌کند.",
    recommendation: "هیچ اقدامی نیاز نیست.",
  },
  "cron": {
    status: "هشدار", httpStatus: 200, responseTime: "2.1s", endpoint: "wp-cron.php", lastChecked: "اکنون",
    technical: "wp-cron.php → 200 OK · Execution time: 2.1s · Missed tasks: 3 · Next run: delayed 5min",
    result: "WP-Cron با تأخیر اجرا می‌شود. ۳ وظیفه از دست رفته شناسایی شد.",
    recommendation: "غیرفعال‌سازی WP-Cron و استفاده از Server Cron با فاصله ۵ دقیقه توصیه می‌شود.",
  },
  "db-conn": {
    status: "موفق", httpStatus: "—", responseTime: "12ms", endpoint: "MySQL/MariaDB", lastChecked: "اکنون",
    technical: "Connection: mysql:host=localhost · Query: SELECT 1 → 0.012s · Tables: 42 · Size: 184MB",
    result: "اتصال به پایگاه داده برقرار است و سرعت پاسخ مناسب است.",
    recommendation: "هیچ اقدامی نیاز نیست.",
  },
  "dns": {
    status: "موفق", httpStatus: "—", responseTime: "18ms", endpoint: "example.com", lastChecked: "اکنون",
    technical: "A: 185.10.10.5 · TTL: 3600s · NS: ns1.cloudflare.com · Response: 18ms",
    result: "رکوردهای DNS به‌درستی تنظیم شده‌اند و زمان پاسخ مناسب است.",
    recommendation: "هیچ اقدامی نیاز نیست.",
  },
  "ssl": {
    status: "موفق", httpStatus: "—", responseTime: "—", endpoint: "example.com:443", lastChecked: "اکنون",
    technical: "Issuer: Let's Encrypt R3 · Protocol: TLS 1.3 · Cipher: TLS_AES_256_GCM_SHA384 · Expires: 2026-12-14",
    result: "گواهی SSL معتبر است و از پروتکل‌های امن استفاده می‌کند.",
    recommendation: "Auto-renewal فعال است. هیچ اقدامی نیاز نیست.",
  },
  "email": {
    status: "هشدار", httpStatus: "—", responseTime: "3.2s", endpoint: "SMTP: smtp.example.com:587", lastChecked: "اکنون",
    technical: "SMTP connect: OK · SPF: pass · DKIM: fail · DMARC: none · Send test: delayed 3.2s",
    result: "ارتباط SMTP برقرار است اما DKIM تنظیم نشده و ارسال تأخیر دارد.",
    recommendation: "تنظیم DKIM در رکوردهای DNS توصیه می‌شود. بررسی تنظیمات SMTP.",
  },
  "http": {
    status: "موفق", httpStatus: 200, responseTime: "412ms", endpoint: "https://example.com/", lastChecked: "اکنون",
    technical: "GET / → 200 OK · Server: nginx/1.24.0 · X-Cache: HIT · Content-Encoding: gzip",
    result: "صفحه اصلی با کد 200 پاسخ می‌دهد و Cache فعال است.",
    recommendation: "زمان پاسخ ۴۱۲ms قابل قبول است اما بهینه‌سازی توصیه می‌شود.",
  },
  "cache": {
    status: "موفق", httpStatus: "—", responseTime: "—", endpoint: "Page Cache", lastChecked: "اکنون",
    technical: "Page Cache: WP Rocket · Hit rate: 88% · Object Cache: Disabled · OPcache: Enabled",
    result: "Page Cache فعال است اما Object Cache غیرفعال است.",
    recommendation: "فعال‌سازی Object Cache (Redis/Memcached) برای بهبود عملکرد توصیه می‌شود.",
  },
  "php-info": {
    status: "موفق", httpStatus: "—", responseTime: "—", endpoint: "PHP Runtime", lastChecked: "اکنون",
    technical: "PHP 8.2.12 · memory_limit: 256MB · max_execution_time: 120 · OPcache: Enabled · Modules: 48 loaded",
    result: "PHP به‌درستی پیکربندی شده است.",
    recommendation: "هیچ اقدامی نیاز نیست.",
  },
  "sys-info": {
    status: "موفق", httpStatus: "—", responseTime: "—", endpoint: "Server", lastChecked: "اکنون",
    technical: "OS: Ubuntu 22.04 LTS · Kernel: 5.15.0 · CPU: 4 cores · RAM: 8GB · Disk: 80GB (85% used)",
    result: "سرور به‌درستی کار می‌کند اما فضای دیسک در حال پر شدن است.",
    recommendation: "بررسی و پاکسازی فایل‌های لاگ و موقت توصیه می‌شود.",
  },
  "wp-config": {
    status: "موفق", httpStatus: "—", responseTime: "—", endpoint: "wp-config.php", lastChecked: "اکنون",
    technical: "DB_HOST: localhost · DB_NAME: wordpress · table_prefix: wp_ · WP_DEBUG: false · AUTH_KEY: set",
    result: "فایل پیکربندی وردپرس به‌درستی تنظیم شده است.",
    recommendation: "هیچ اقدامی نیاز نیست.",
  },
  "ext-service": {
    status: "هشدار", httpStatus: 503, responseTime: "5.1s", endpoint: "api.paypal.com", lastChecked: "اکنون",
    technical: "GET https://api.paypal.com/v1/ → 503 Service Unavailable · Timeout: 5s · Retry: failed",
    result: "سرویس PayPal در حال حاضر در دسترس نیست.",
    recommendation: "بررسی وضعیت PayPal و تنظیم Retry منطقی توصیه می‌شود.",
  },
};

// ── System Information ──────────────────────────────────────
export const SYS_INFO_TABS = [
  { id: "wordpress", label: "WordPress", icon: "faCode" },
  { id: "server", label: "Server", icon: "faServer" },
  { id: "php", label: "PHP", icon: "faCode" },
  { id: "database", label: "Database", icon: "faDatabase" },
  { id: "browser", label: "Browser", icon: "faGlobe" },
  { id: "yguard", label: "YGuard", icon: "faShieldHalved" },
];

export const SYS_INFO = {
  wordpress: [
    { label: "WordPress Version", value: "6.6.2", ltr: true },
    { label: "Site URL", value: "https://example.com", ltr: true },
    { label: "Home URL", value: "https://example.com", ltr: true },
    { label: "Multisite", value: "غیرفعال" },
    { label: "Language", value: "fa_IR" },
    { label: "Timezone", value: "Asia/Tehran", ltr: true },
    { label: "Permalink Structure", value: "/%postname%/", ltr: true },
    { label: "Debug Mode", value: "غیرفعال" },
  ],
  server: [
    { label: "Web Server", value: "Nginx 1.24.0", ltr: true },
    { label: "Operating System", value: "Ubuntu 22.04 LTS", ltr: true },
    { label: "HTTPS", value: "فعال · TLS 1.3" },
    { label: "HTTP Version", value: "HTTP/2", ltr: true },
    { label: "Server Time", value: "۱۴۰۵/۰۷/۱۹ — ۱۵:۳۰" },
    { label: "Memory Limit", value: "512MB", ltr: true },
    { label: "Disk Space", value: "80GB Total · 68GB Used · 12GB Free", ltr: true },
  ],
  php: [
    { label: "PHP Version", value: "8.2.12", ltr: true },
    { label: "memory_limit", value: "256MB", ltr: true },
    { label: "max_execution_time", value: "120", ltr: true },
    { label: "upload_max_filesize", value: "64MB", ltr: true },
    { label: "post_max_size", value: "64MB", ltr: true },
    { label: "max_input_vars", value: "3000", ltr: true },
    { label: "OPcache", value: "فعال · 128MB", ltr: true },
  ],
  database: [
    { label: "Database Type", value: "MariaDB", ltr: true },
    { label: "Database Version", value: "10.11.6", ltr: true },
    { label: "Database Size", value: "184MB", ltr: true },
    { label: "Table Count", value: "42", ltr: true },
    { label: "Prefix", value: "wp_", ltr: true },
    { label: "Charset", value: "utf8mb4", ltr: true },
    { label: "Collation", value: "utf8mb4_unicode_ci", ltr: true },
  ],
  browser: [
    { label: "User Agent", value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", ltr: true },
    { label: "Platform", value: "Windows", ltr: true },
    { label: "Language", value: "fa-IR, en-US", ltr: true },
    { label: "Cookies", value: "فعال" },
    { label: "JavaScript", value: "فعال" },
    { label: "Screen Resolution", value: "1920×1080", ltr: true },
    { label: "Timezone Offset", value: "UTC+3:30", ltr: true },
  ],
  yguard: [
    { label: "YGuard Version", value: "1.0.0", ltr: true },
    { label: "Monitoring Mode", value: "Balanced" },
    { label: "Last Full Scan", value: "امروز ۱۵:۲۰" },
    { label: "Last Security Scan", value: "امروز ۰۹:۰۰" },
    { label: "Retention Settings", value: "Performance: 14d · Traffic: 30d · Security: 90d" },
    { label: "Current Theme", value: "Astra 4.5", ltr: true },
  ],
};

// ── Storage / Disk ──────────────────────────────────────────
export const STORAGE_INFO = {
  total: 80, used: 68, free: 12, usagePercent: 85,
  status: "warning",
  breakdown: [
    { label: "Uploads", size: "32 GB", percent: 47, tone: "primary" },
    { label: "Plugins", size: "8 GB", percent: 12, tone: "info" },
    { label: "Themes", size: "3 GB", percent: 4, tone: "success" },
    { label: "Database", size: "12 GB", percent: 18, tone: "warning" },
    { label: "Logs", size: "5 GB", percent: 7, tone: "danger" },
    { label: "Cache", size: "4 GB", percent: 6, tone: "info" },
    { label: "Other", size: "4 GB", percent: 6, tone: "primary" },
  ],
  history: [
    { day: "۱", used: 58 }, { day: "۲", used: 60 }, { day: "۳", used: 61 }, { day: "۴", used: 63 },
    { day: "۵", used: 63 }, { day: "۶", used: 65 }, { day: "۷", used: 66 }, { day: "۸", used: 67 },
    { day: "۹", used: 67 }, { day: "۱۰", used: 68 },
  ],
  thresholds: { warning: 85, critical: 90 },
};

// ── Backup Status ───────────────────────────────────────────
export const BACKUP_INFO = {
  lastBackup: "۹ روز قبل",
  backupAge: "9 days",
  backupSize: "1.2 GB",
  backupType: "Full Backup",
  destination: "Local + Cloud (S3)",
  status: "warning",
  statusLabel: "هشدار",
  message: "آخرین Backup شناسایی‌شده قدیمی است. توصیه می‌شود بکاپ جدید تهیه کنید.",
  history: [
    { id: 1, date: "۹ روز قبل", type: "Full Backup", size: "1.2 GB", destination: "Local + S3", status: "success", statusLabel: "موفق" },
    { id: 2, date: "۱۶ روز قبل", type: "Incremental", size: "180 MB", destination: "Local", status: "success", statusLabel: "موفق" },
    { id: 3, date: "۲۳ روز قبل", type: "Full Backup", size: "1.1 GB", destination: "S3", status: "success", statusLabel: "موفق" },
    { id: 4, date: "۳۰ روز قبل", type: "Database Only", size: "184 MB", destination: "Local", status: "warning", statusLabel: "ناقص" },
    { id: 5, date: "۳۷ روز قبل", type: "Full Backup", size: "1.0 GB", destination: "Local + S3", status: "success", statusLabel: "موفق" },
    { id: 6, date: "۴۴ روز قبل", type: "Incremental", size: "95 MB", destination: "Local", status: "danger", statusLabel: "ناموفق" },
  ],
};
