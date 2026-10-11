// Mock data for Scan History, Scan Details & Compare Scans — all simulated.

export const SCAN_KPIS = [
  { id: "total", icon: "faListCheck", tone: "primary", label: "کل چکاپ‌ها", value: 142 },
  { id: "full", icon: "faStethoscope", tone: "info", label: "چکاپ کامل", value: 38 },
  { id: "quick", icon: "faBolt", tone: "success", label: "چکاپ سریع", value: 89 },
  { id: "scheduled", icon: "faClock", tone: "warning", label: "چکاپ زمان‌بندی‌شده", value: 15 },
  { id: "avg", icon: "faGaugeHigh", tone: "primary", label: "میانگین امتیاز", value: 91 },
  { id: "critical", icon: "faTriangleExclamation", tone: "danger", label: "Critical Issues Found", value: 5 },
];

export const SCAN_HISTORY = [
  { id: "SCAN-142", date: "امروز ۱۵:۲۰", type: "Full Scan", duration: "4m 12s", overall: 92, health: 96, security: 89, performance: 82, critical: 2, warning: 5, passed: 47, triggeredBy: "Administrator" },
  { id: "SCAN-141", date: "امروز ۰۹:۰۰", type: "Scheduled Scan", duration: "3m 45s", overall: 91, health: 95, security: 88, performance: 81, critical: 2, warning: 6, passed: 46, triggeredBy: "Scheduled" },
  { id: "SCAN-140", date: "دیروز ۱۵:۳۰", type: "Quick Scan", duration: "1m 20s", overall: 90, health: 94, security: 87, performance: 80, critical: 3, warning: 4, passed: 45, triggeredBy: "Administrator" },
  { id: "SCAN-139", date: "دیروز ۰۳:۰۰", type: "Scheduled Scan", duration: "3m 58s", overall: 95, health: 97, security: 92, performance: 85, critical: 0, warning: 3, passed: 49, triggeredBy: "Scheduled" },
  { id: "SCAN-138", date: "۲ روز قبل ۱۴:۱۰", type: "Full Scan", duration: "4m 30s", overall: 88, health: 93, security: 85, performance: 78, critical: 4, warning: 7, passed: 43, triggeredBy: "Manual" },
  { id: "SCAN-137", date: "۲ روز قبل ۰۹:۰۰", type: "Scheduled Scan", duration: "3m 32s", overall: 93, health: 96, security: 90, performance: 84, critical: 1, warning: 4, passed: 48, triggeredBy: "Scheduled" },
  { id: "SCAN-136", date: "۳ روز قبل ۱۶:۴۵", type: "Quick Scan", duration: "1m 15s", overall: 89, health: 94, security: 86, performance: 79, critical: 3, warning: 5, passed: 44, triggeredBy: "Administrator" },
  { id: "SCAN-135", date: "۳ روز قبل ۰۳:۰۰", type: "Scheduled Scan", duration: "3m 40s", overall: 94, health: 97, security: 91, performance: 85, critical: 1, warning: 3, passed: 49, triggeredBy: "Scheduled" },
  { id: "SCAN-134", date: "۴ روز قبل ۱۱:۲۰", type: "Full Scan", duration: "4m 55s", overall: 87, health: 92, security: 84, performance: 76, critical: 5, warning: 8, passed: 42, triggeredBy: "System" },
  { id: "SCAN-133", date: "۵ روز قبل ۰۳:۰۰", type: "Scheduled Scan", duration: "3m 28s", overall: 92, health: 95, security: 89, performance: 83, critical: 2, warning: 4, passed: 47, triggeredBy: "Scheduled" },
  { id: "SCAN-132", date: "۶ روز قبل ۱۴:۰۰", type: "Quick Scan", duration: "1m 10s", overall: 91, health: 95, security: 88, performance: 82, critical: 2, warning: 5, passed: 46, triggeredBy: "Manual" },
  { id: "SCAN-131", date: "۷ روز قبل ۰۳:۰۰", type: "Scheduled Scan", duration: "3m 35s", overall: 90, health: 94, security: 87, performance: 80, critical: 3, warning: 5, passed: 45, triggeredBy: "Scheduled" },
];

export const SCAN_TYPES = ["Full Scan", "Quick Scan", "Scheduled Scan"];
export const TRIGGERED_BY = ["Administrator", "Scheduled", "Manual", "System"];

export const SCAN_DETAILS = {
  id: "SCAN-142",
  date: "۱۴۰۵/۰۷/۱۹ — ۱۵:۲۰",
  type: "Full Scan",
  duration: "4m 12s",
  overall: 92,
  health: 96,
  security: 89,
  performance: 82,
  critical: 2,
  warnings: 5,
  passed: 47,
  changesFromPrevious: [
    { metric: "Overall Score", old: 91, new: 92, diff: +1, status: "improved" },
    { metric: "Health Score", old: 95, new: 96, diff: +1, status: "improved" },
    { metric: "Security Score", old: 88, new: 89, diff: +1, status: "improved" },
    { metric: "Performance Score", old: 81, new: 82, diff: +1, status: "improved" },
    { metric: "Critical Issues", old: 2, new: 2, diff: 0, status: "unchanged" },
    { metric: "Warnings", old: 6, new: 5, diff: -1, status: "improved" },
  ],
  categories: [
    {
      name: "WordPress", icon: "faCode", score: 96,
      findings: [
        { label: "WordPress Version", value: "6.6.2", status: "success" },
        { label: "Debug Mode", value: "غیرفعال", status: "success" },
        { label: "REST API", value: "در دسترس · 120ms", status: "success" },
        { label: "WP-Cron", value: "۲ ساعت تأخیر", status: "danger" },
      ],
    },
    {
      name: "Server", icon: "faServer", score: 94,
      findings: [
        { label: "Web Server", value: "Nginx 1.24.0", status: "success" },
        { label: "OS", value: "Ubuntu 22.04 LTS", status: "success" },
        { label: "Memory Limit", value: "512MB", status: "success" },
        { label: "Disk Free", value: "12GB (15%)", status: "warning" },
      ],
    },
    {
      name: "PHP", icon: "faCode", score: 95,
      findings: [
        { label: "PHP Version", value: "8.2.12", status: "success" },
        { label: "memory_limit", value: "256MB", status: "success" },
        { label: "max_execution_time", value: "120s", status: "success" },
        { label: "OPcache", value: "فعال", status: "success" },
      ],
    },
    {
      name: "Database", icon: "faDatabase", score: 85,
      findings: [
        { label: "Database Type", value: "MariaDB 10.11", status: "success" },
        { label: "Database Size", value: "184MB", status: "success" },
        { label: "Slow Queries", value: "3", status: "warning" },
        { label: "Autoload Size", value: "2.1MB", status: "danger" },
      ],
    },
    {
      name: "Performance", icon: "faBolt", score: 82,
      findings: [
        { label: "Avg Response Time", value: "412ms", status: "warning" },
        { label: "TTFB", value: "380ms", status: "warning" },
        { label: "LCP", value: "2.1s", status: "warning" },
        { label: "Page Cache", value: "Hit rate 88%", status: "success" },
      ],
    },
    {
      name: "Pages", icon: "faFileLines", score: 88,
      findings: [
        { label: "Pages Monitored", value: "247", status: "success" },
        { label: "Pages with Errors", value: "3", status: "danger" },
        { label: "Slow Pages", value: "7", status: "warning" },
        { label: "5xx Errors", value: "2", status: "danger" },
      ],
    },
    {
      name: "Security", icon: "faShieldHalved", score: 89,
      findings: [
        { label: "Security Headers", value: "Grade B", status: "warning" },
        { label: "Failed Logins (24h)", value: "12", status: "warning" },
        { label: "Vulnerabilities", value: "2", status: "danger" },
        { label: "File Integrity", value: "بدون تغییر", status: "success" },
      ],
    },
    {
      name: "Infrastructure", icon: "faNetworkWired", score: 93,
      findings: [
        { label: "SSL", value: "64 روز تا انقضا", status: "success" },
        { label: "DNS", value: "Cloudflare · 18ms", status: "success" },
        { label: "Email", value: "SPF ✓ · DKIM ✗", status: "warning" },
        { label: "Cache", value: "Page Cache فعال", status: "success" },
      ],
    },
  ],
};

export const COMPARE_SUMMARY = [
  { metric: "Overall Score", a: 89, b: 94, status: "improved" },
  { metric: "Health", a: 93, b: 96, status: "improved" },
  { metric: "Security", a: 85, b: 91, status: "improved" },
  { metric: "Performance", a: 78, b: 84, status: "improved" },
  { metric: "Database", a: 80, b: 88, status: "improved" },
  { metric: "Page Errors", a: 5, b: 3, status: "improved" },
  { metric: "5xx Errors", a: 7, b: 2, status: "improved" },
  { metric: "Slow Pages", a: 12, b: 7, status: "improved" },
  { metric: "Plugin Impact", a: 3, b: 2, status: "improved" },
  { metric: "Vulnerabilities", a: 1, b: 2, status: "worse" },
  { metric: "Alerts", a: 15, b: 18, status: "worse" },
  { metric: "Cron Problems", a: 1, b: 1, status: "unchanged" },
];

export const COMPARE_VISUAL_CARDS = [
  { id: "resolved", icon: "faCircleCheck", tone: "success", label: "مشکلات حل‌شده", value: 8 },
  { id: "new", icon: "faCircleExclamation", tone: "danger", label: "مشکلات جدید", value: 3 },
  { id: "improved", icon: "faArrowUp", tone: "success", label: "بهبودها", value: 6 },
  { id: "regressed", icon: "faArrowDown", tone: "warning", label: "پسرفت‌ها", value: 2 },
];

export const COMPARE_SCANS = SCAN_HISTORY.slice(0, 8).map((s) => ({
  id: s.id, label: `${s.id} · ${s.date} · ${s.type} · ${s.overall}`,
}));
