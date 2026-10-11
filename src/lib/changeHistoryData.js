// Mock data for Change History — all simulated.

export const CHANGE_EVENTS = [
  "Plugin Installed", "Plugin Activated", "Plugin Deactivated", "Plugin Updated",
  "Theme Installed", "Theme Changed", "WordPress Updated",
  "Administrator Added", "Administrator Removed",
  "Password Changed", "Email Changed", "Role Changed",
  "Settings Changed", "Permalink Changed", "DNS Changed", "SSL Changed",
  "YGuard Settings Changed", "Alert Rule Changed", "SMS Settings Changed",
];

export const CHANGE_COMPONENTS = ["Plugin", "Theme", "WordPress", "User", "Settings", "DNS", "SSL", "YGuard", "Alert", "SMS"];
export const RISK_LEVELS = ["low", "medium", "high", "critical"];

export const CHANGE_HISTORY = [
  { id: 1, time: "امروز ۱۴:۳۲", user: "Younes Gohari", role: "Administrator", event: "Plugin Updated", component: "Plugin", oldValue: "Elementor 3.23", newValue: "Elementor 3.24", ip: "192.168.1.10", risk: "low" },
  { id: 2, time: "امروز ۱۲:۱۵", user: "System", role: "System", event: "WordPress Updated", component: "WordPress", oldValue: "6.6.1", newValue: "6.6.2", ip: "—", risk: "low" },
  { id: 3, time: "امروز ۱۰:۳۰", user: "سارا محمدی", role: "Editor", event: "Plugin Activated", component: "Plugin", oldValue: "—", newValue: "WP Rocket 3.16", ip: "91.98.44.12", risk: "medium" },
  { id: 4, time: "دیروز ۱۸:۴۵", user: "Younes Gohari", role: "Administrator", event: "Settings Changed", component: "Settings", oldValue: "Permalink: /%postname%/", newValue: "Permalink: /%category%/%postname%/", ip: "192.168.1.10", risk: "medium" },
  { id: 5, time: "دیروز ۱۵:۲۰", user: "System", role: "System", event: "SSL Changed", component: "SSL", oldValue: "Let's Encrypt R3 (exp 2026-09-15)", newValue: "Let's Encrypt R3 (exp 2026-12-14)", ip: "—", risk: "low" },
  { id: 6, time: "دیروز ۰۹:۰۰", user: "System", role: "System", event: "Plugin Updated", component: "Plugin", oldValue: "Contact Form 7 5.7", newValue: "Contact Form 7 5.7.1", ip: "—", risk: "low" },
  { id: 7, time: "۲ روز قبل ۱۶:۱۰", user: "Younes Gohari", role: "Administrator", event: "Administrator Added", component: "User", oldValue: "—", newValue: "ali@example.com (Administrator)", ip: "192.168.1.10", risk: "high" },
  { id: 8, time: "۲ روز قبل ۱۴:۳۰", user: "Younes Gohari", role: "Administrator", event: "Alert Rule Changed", component: "Alert", oldValue: "Threshold: 500 req/60s", newValue: "Threshold: 300 req/60s", ip: "192.168.1.10", risk: "medium" },
  { id: 9, time: "۳ روز قبل ۱۱:۰۰", user: "System", role: "System", event: "DNS Changed", component: "DNS", oldValue: "A: 185.10.10.1", newValue: "A: 185.10.10.5", ip: "—", risk: "high" },
  { id: 10, time: "۳ روز قبل ۰۸:۴۵", user: "سارا محمدی", role: "Editor", event: "Theme Changed", component: "Theme", oldValue: "Twenty Twenty-Four 1.0", newValue: "Astra 4.5", ip: "91.98.44.12", risk: "medium" },
  { id: 11, time: "۴ روز قبل ۱۹:۲۰", user: "Younes Gohari", role: "Administrator", event: "Password Changed", component: "User", oldValue: "—", newValue: "Password updated for admin@example.com", ip: "192.168.1.10", risk: "high" },
  { id: 12, time: "۴ روز قبل ۱۳:۰۰", user: "Younes Gohari", role: "Administrator", event: "YGuard Settings Changed", component: "YGuard", oldValue: "Monitoring: Light", newValue: "Monitoring: Balanced", ip: "192.168.1.10", risk: "low" },
  { id: 13, time: "۵ روز قبل ۱۰:۱۵", user: "System", role: "System", event: "Plugin Deactivated", component: "Plugin", oldValue: "Active: Akismet 5.3", newValue: "Inactive: Akismet 5.3", ip: "—", risk: "medium" },
  { id: 14, time: "۵ روز قبل ۰۹:۳۰", user: "Younes Gohari", role: "Administrator", event: "SMS Settings Changed", component: "SMS", oldValue: "Mode: Normal", newValue: "Mode: Pattern", ip: "192.168.1.10", risk: "low" },
  { id: 15, time: "۶ روز قبل ۱۵:۴۵", user: "Younes Gohari", role: "Administrator", event: "Email Changed", component: "User", oldValue: "admin@old.com", newValue: "admin@example.com", ip: "192.168.1.10", risk: "high" },
  { id: 16, time: "۶ روز قبل ۱۱:۲۰", user: "System", role: "System", event: "Plugin Installed", component: "Plugin", oldValue: "—", newValue: "Wordfence 7.11", ip: "—", risk: "medium" },
  { id: 17, time: "۷ روز قبل ۱۴:۰۰", user: "Younes Gohari", role: "Administrator", event: "Role Changed", component: "User", oldValue: "ali@example.com: Editor", newValue: "ali@example.com: Administrator", ip: "192.168.1.10", risk: "critical" },
  { id: 18, time: "۷ روز قبل ۰۸:۰۰", user: "System", role: "System", event: "Permalink Changed", component: "Settings", oldValue: "/?p=123", newValue: "/%postname%/", ip: "—", risk: "low" },
];

export const CHANGE_DETAIL = {
  event: "Plugin Updated",
  user: "Younes Gohari",
  role: "Administrator",
  ip: "192.168.1.10",
  date: "۱۴۰۵/۰۷/۱۹ — ۱۴:۳۲",
  component: "Plugin",
  oldValue: "Elementor 3.23",
  newValue: "Elementor 3.24",
  relatedAlert: "ALT-007 — Plugin update available",
  relatedScan: "SCAN-142 — Full Scan",
  risk: "low",
  notes: "بروزرسانی جزئی امنیتی. قبل از بروزرسانی بکاپ تهیه شد. هیچ اختلالی گزارش نشد.",
};
