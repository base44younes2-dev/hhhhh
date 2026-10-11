import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear, faHeartPulse, faBolt, faShieldHalved, faChartLine, faBell, faPaperPlane,
  faDatabase, faScrewdriverWrench, faCircleInfo, faSave, faDownload, faUpload,
  faTriangleExclamation, faFeather, faScaleBalanced, faMicroscope, faEnvelope,
  faComments, faTowerBroadcast, faFileExport, faCopy, faCheck, faList, faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { IconBadge, Panel, Pill, toFa } from "@/components/yguard/ui";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  SETTINGS_TABS, MONITORING_MODES, MONITORING_INTERVALS, RETENTION_ITEMS,
  DASHBOARD_WIDGETS, WIDGET_SIZES,
} from "@/lib/settingsData";

const tabIconMap = { faGear, faHeartPulse, faBolt, faShieldHalved, faChartLine, faBell, faPaperPlane, faDatabase, faScrewdriverWrench, faCircleInfo };

export default function Settings() {
  const [tab, setTab] = useState("general");
  const [confirmOpen, setConfirmOpen] = useState(null);
  const [confirmAction, setConfirmAction] = useState("");

  const openConfirm = (action) => { setConfirmAction(action); setConfirmOpen(true); };
  const doConfirm = () => { toast.success(confirmAction + " انجام شد"); setConfirmOpen(false); };

  return (
    <div className="space-y-5" dir="rtl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconBadge icon={faGear} className="h-11 w-11" />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">تنظیمات</h1>
            <p className="text-[13px] text-muted-foreground">پیکربندی کامل YGuard</p>
          </div>
        </div>
        <button onClick={() => toast.success("تنظیمات ذخیره شد")} className="flex h-9 items-center gap-2 rounded-lg bg-brand px-4 text-[13px] font-semibold text-primary-foreground shadow-glow hover:opacity-90">
          <FontAwesomeIcon icon={faSave} className="text-xs" /> ذخیره تنظیمات
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-2 shadow-card">
        {SETTINGS_TABS.map((t) => {
          const Icon = tabIconMap[t.icon] || faGear;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className={cn("flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-[12px] font-medium transition-colors", tab === t.id ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted")}>
              <FontAwesomeIcon icon={Icon} className="text-[11px]" /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {tab === "general" && <GeneralSettings />}
      {tab === "monitoring" && <MonitoringSettings />}
      {tab === "performance" && <PerformanceSettings />}
      {tab === "security" && <SecuritySettings />}
      {tab === "traffic" && <TrafficSettings />}
      {tab === "alerts" && <AlertSettings />}
      {tab === "notifications" && <NotificationSettings />}
      {tab === "retention" && <RetentionSettings />}
      {tab === "advanced" && <AdvancedSettings onConfirm={openConfirm} />}
      {tab === "about" && <AboutTab />}

      {/* Dashboard Customization Link */}
      {tab === "general" && <DashboardCustomization />}

      {/* Confirmation Dialog */}
      <Dialog open={!!confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold">
              <FontAwesomeIcon icon={faTriangleExclamation} className="text-destructive" />
              تایید اقدام
            </DialogTitle>
          </DialogHeader>
          <p className="text-[13px] text-muted-foreground">
            آیا از «{confirmAction}» مطمئن هستید؟ این اقدام ممکن است قابل بازگشت نباشد.
          </p>
          <DialogFooter className="flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmOpen(null)}>انصراف</Button>
            <Button variant="destructive" onClick={doConfirm}>تایید</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ── General Settings ────────────────────────────────────────
function GeneralSettings() {
  const [theme, setTheme] = useState("system");
  const [persianNum, setPersianNum] = useState(true);
  const [compact, setCompact] = useState(false);
  const [animations, setAnimations] = useState(true);

  return (
    <Panel title="تنظیمات عمومی">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold">Language</label>
            <Select defaultValue="fa">
              <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="fa">فارسی</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold">Timezone</label>
            <Select defaultValue="Asia/Tehran">
              <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Asia/Tehran">Asia/Tehran</SelectItem>
                <SelectItem value="UTC">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold">Date Format</label>
            <Select defaultValue="jalali">
              <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="jalali">شمسی (۱۴۰۵/۰۷/۱۹)</SelectItem>
                <SelectItem value="gregorian">میلادی (2026-10-11)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold">Default Dashboard Range</label>
            <Select defaultValue="24h">
              <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">۱ ساعت</SelectItem>
                <SelectItem value="24h">۲۴ ساعت</SelectItem>
                <SelectItem value="7d">۷ روز</SelectItem>
                <SelectItem value="30d">۳۰ روز</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Theme */}
        <div>
          <label className="mb-2 block text-[12px] font-semibold">Theme</label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "system", label: "System" },
              { id: "light", label: "Light" },
              { id: "dark", label: "Dark" },
            ].map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)} className={cn("rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors", theme === t.id ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:bg-muted")}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "نمایش اعداد فارسی", val: persianNum, set: setPersianNum },
            { label: "Compact Mode", val: compact, set: setCompact },
            { label: "Animations", val: animations, set: setAnimations },
          ].map((opt) => (
            <div key={opt.label} className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2.5">
              <span className="text-[12px] font-medium">{opt.label}</span>
              <Switch checked={opt.val} onCheckedChange={opt.set} />
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ── Monitoring Settings ──────────────────────────────────────
function MonitoringSettings() {
  const [mode, setMode] = useState("balanced");
  const modeIconMap = { faFeather, faScaleBalanced, faMicroscope };

  return (
    <div className="space-y-4">
      {/* Monitoring Mode */}
      <Panel title="حالت مانیتورینگ">
        <div className="grid gap-3 sm:grid-cols-3">
          {MONITORING_MODES.map((m) => {
            const Icon = modeIconMap[m.icon] || faHeartPulse;
            return (
              <button key={m.id} onClick={() => setMode(m.id)} className={cn("rounded-xl border p-4 text-right transition-all", mode === m.id ? "border-primary bg-primary-soft ring-2 ring-primary" : "border-border bg-card hover:bg-muted")}>
                <IconBadge icon={Icon} tone={m.tone} className="h-10 w-10" />
                <h3 className="mt-3 text-[14px] font-bold">{m.label}</h3>
                <p className="mt-1 text-[12px] text-muted-foreground">{m.desc}</p>
              </button>
            );
          })}
        </div>
      </Panel>

      {/* Intervals */}
      <Panel title="بازه‌های بررسی">
        <div className="grid gap-3 sm:grid-cols-2">
          {MONITORING_INTERVALS.map((int) => (
            <div key={int.id}>
              <label className="mb-1.5 block text-[12px] font-semibold">{int.label}</label>
              <Select defaultValue={int.default}>
                <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {int.options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ── Performance Settings ─────────────────────────────────────
function PerformanceSettings() {
  const [slowQuery, setSlowQuery] = useState("500");
  const [slowHttp, setSlowHttp] = useState("800");
  const [sampleRate, setSampleRate] = useState("100");
  const [profilingDur, setProfilingDur] = useState("60");
  const [retention, setRetention] = useState("14");

  return (
    <Panel title="تنظیمات Performance">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "Enable Performance Metrics", toggle: true, default: true },
            { label: "Enable Plugin Impact Monitoring", toggle: true, default: true },
            { label: "Enable External HTTP Monitoring", toggle: true, default: true },
          ].map((s) => (
            <ToggleRow key={s.label} label={s.label} defaultVal={s.default} />
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Slow Query Threshold (ms)" value={slowQuery} onChange={setSlowQuery} />
          <Field label="Slow HTTP Threshold (ms)" value={slowHttp} onChange={setSlowHttp} />
          <Field label="Sample Rate (%)" value={sampleRate} onChange={setSampleRate} />
          <Field label="Deep Profiling Default Duration (s)" value={profilingDur} onChange={setProfilingDur} />
          <Field label="History Retention (days)" value={retention} onChange={setRetention} />
        </div>
      </div>
    </Panel>
  );
}

// ── Security Settings ────────────────────────────────────────
function SecuritySettings() {
  return (
    <Panel title="تنظیمات امنیت">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          "Traffic Monitoring", "Login Monitoring", "File Integrity", "Vulnerability Alerts",
          "Security Headers", "WordPress Exposure Checks", "Brute Force Detection",
          "Request Flood Detection", "Suspicious URL Detection",
        ].map((s) => (
          <ToggleRow key={s} label={s} defaultVal={true} />
        ))}
      </div>
    </Panel>
  );
}

// ── Traffic Settings ─────────────────────────────────────────
function TrafficSettings() {
  const [ipSource, setIpSource] = useState("REMOTE_ADDR");
  return (
    <div className="space-y-4">
      <Panel title="Client IP Source">
        <div className="flex flex-wrap gap-1.5">
          {["REMOTE_ADDR", "Cloudflare", "Trusted Reverse Proxy", "Custom"].map((s) => (
            <button key={s} onClick={() => setIpSource(s)} className={cn("rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors", ipSource === s ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:bg-muted")}>
              {s}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label="Proxy IP" defaultValue="" placeholder="مثلاً 192.168.1.1" />
          <Field label="Header Name" defaultValue="" placeholder="X-Forwarded-For" />
          <ToggleRow label="Trust Proxy" defaultVal={false} />
        </div>
      </Panel>
      <Panel title="Quick Links">
        <div className="flex gap-2">
          <button onClick={() => toast("لیست مجاز باز شد")} className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-[13px] font-medium hover:bg-muted">
            <FontAwesomeIcon icon={faList} className="text-xs" /> Allow List
          </button>
          <button onClick={() => toast("لیست مسدود باز شد")} className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-[13px] font-medium hover:bg-muted">
            <FontAwesomeIcon icon={faList} className="text-xs" /> Block List
          </button>
        </div>
      </Panel>
    </div>
  );
}

// ── Alert Settings ───────────────────────────────────────────
function AlertSettings() {
  return (
    <Panel title="تنظیمات هشدار">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold">Default Severity</label>
            <Select defaultValue="medium">
              <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold">Default Cooldown</label>
            <Select defaultValue="20min">
              <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="5min">۵ دقیقه</SelectItem>
                <SelectItem value="10min">۱۰ دقیقه</SelectItem>
                <SelectItem value="20min">۲۰ دقیقه</SelectItem>
                <SelectItem value="30min">۳۰ دقیقه</SelectItem>
                <SelectItem value="1h">۱ ساعت</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold">Maximum Open Alerts</label>
            <Select defaultValue="100">
              <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="50">۵۰</SelectItem>
                <SelectItem value="100">۱۰۰</SelectItem>
                <SelectItem value="200">۲۰۰</SelectItem>
                <SelectItem value="500">۵۰۰</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold">Default Snooze Duration</label>
            <Select defaultValue="1h">
              <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="30m">۳۰ دقیقه</SelectItem>
                <SelectItem value="1h">۱ ساعت</SelectItem>
                <SelectItem value="6h">۶ ساعت</SelectItem>
                <SelectItem value="24h">۲۴ ساعت</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <ToggleRow label="Alert Grouping" defaultVal={true} />
          <ToggleRow label="Auto Resolve" defaultVal={true} />
          <ToggleRow label="Recovery Notification" defaultVal={true} />
          <ToggleRow label="Alert Deduplication" defaultVal={true} />
        </div>
      </div>
    </Panel>
  );
}

// ── Notification Settings ────────────────────────────────────
function NotificationSettings() {
  const channels = [
    { id: "sms", name: "SMS", icon: faPaperPlane, status: "متصل", tone: "success", config: "ملی پیامک" },
    { id: "email", name: "Email", icon: faEnvelope, status: "غیرفعال", tone: "warning", config: "SMTP" },
    { id: "telegram", name: "Telegram", icon: faComments, status: "به‌زودی", tone: "info", config: "Bot API" },
    { id: "webhook", name: "Webhook", icon: faTowerBroadcast, status: "غیرفعال", tone: "warning", config: "Custom HTTP" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {channels.map((c) => (
          <div key={c.id} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-start justify-between">
              <IconBadge icon={c.icon} tone={c.tone} className="h-10 w-10" />
              <Pill tone={c.tone}>{c.status}</Pill>
            </div>
            <h3 className="mt-3 text-[14px] font-bold">{c.name}</h3>
            <p className="mt-1 text-[12px] text-muted-foreground">{c.config}</p>
            <button onClick={() => toast(`تنظیمات ${c.name} باز شد`)} className="mt-3 flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-border text-[12px] font-medium hover:bg-muted">
              <FontAwesomeIcon icon={faSliders} className="text-[11px]" /> پیکربندی
            </button>
          </div>
        ))}
      </div>
      <Panel title="تنظیمات اعلان">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold">Default Channel</label>
            <Select defaultValue="sms">
              <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="webhook">Webhook</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold">Fallback Channel</label>
            <Select defaultValue="email">
              <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">هیچکدام</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ToggleRow label="Critical Alert Override" defaultVal={true} />
        </div>
      </Panel>
    </div>
  );
}

// ── Retention Settings ───────────────────────────────────────
function RetentionSettings() {
  const [retentions, setRetentions] = useState(
    Object.fromEntries(RETENTION_ITEMS.map((r) => [r.id, r.default]))
  );

  return (
    <div className="space-y-4">
      <Panel title="ذخیره‌سازی داده">
        <div className="space-y-3">
          {RETENTION_ITEMS.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2.5">
              <span className="text-[13px] font-medium">{r.label}</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={retentions[r.id]}
                  onChange={(e) => setRetentions((prev) => ({ ...prev, [r.id]: e.target.value }))}
                  className="h-8 w-20 rounded-lg border border-border bg-background px-2 text-center font-mono text-[12px] outline-none focus:border-primary"
                  dir="ltr"
                />
                <span className="text-[12px] text-muted-foreground">روز</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Estimated Storage Usage">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-soft">
            <FontAwesomeIcon icon={faDatabase} className="text-2xl text-primary" />
          </div>
          <div>
            <div className="text-2xl font-extrabold" dir="ltr">~2.4 GB</div>
            <div className="text-[12px] text-muted-foreground">تخمین فضای مصرفی بر اساس تنظیمات Retention</div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

// ── Advanced Settings ────────────────────────────────────────
function AdvancedSettings({ onConfirm }) {
  return (
    <div className="space-y-4">
      <Panel title="پیشرفته">
        <div className="space-y-3">
          <ToggleRow label="Debug Logging" defaultVal={false} />
          <ToggleRow label="Developer Mode" defaultVal={false} />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button onClick={() => toast.success("تنظیمات Export شد")} className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-[13px] font-medium hover:bg-muted">
            <FontAwesomeIcon icon={faDownload} className="text-xs" /> Export Configuration
          </button>
          <button onClick={() => toast("انتخاب فایل باز شد")} className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-[13px] font-medium hover:bg-muted">
            <FontAwesomeIcon icon={faUpload} className="text-xs" /> Import Configuration
          </button>
        </div>
      </Panel>

      {/* Config Export / Import */}
      <Panel title="Export / Import تنظیمات">
        <div className="space-y-3">
          <button onClick={() => toast.success("دانلود تنظیمات شروع شد")} className="flex h-9 items-center gap-2 rounded-lg bg-brand px-4 text-[13px] font-semibold text-primary-foreground hover:opacity-90">
            <FontAwesomeIcon icon={faDownload} className="text-xs" /> دانلود تنظیمات
          </button>
          <div className="rounded-lg border border-dashed border-border p-4 text-center">
            <FontAwesomeIcon icon={faUpload} className="text-2xl text-muted-foreground" />
            <p className="mt-2 text-[12px] text-muted-foreground">فایل تنظیمات را برای Import انتخاب کنید</p>
            <button onClick={() => toast("انتخاب فایل باز شد")} className="mt-2 rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium hover:bg-muted">انتخاب فایل</button>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold">Conflict Handling</label>
            <Select defaultValue="merge">
              <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="merge">ادغام</SelectItem>
                <SelectItem value="overwrite">جایگزینی کامل</SelectItem>
                <SelectItem value="skip">نادیده گرفتن تضادها</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Panel>

      {/* Danger Zone */}
      <Panel title="Danger Zone">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-warning/40 bg-warning/10 px-3 py-2.5">
            <span className="text-[13px] font-medium">Reset Settings</span>
            <button onClick={() => onConfirm("Reset Settings")} className="rounded-lg border border-warning px-3 py-1.5 text-[12px] font-semibold text-warning hover:bg-warning/20">Reset</button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-warning/40 bg-warning/10 px-3 py-2.5">
            <span className="text-[13px] font-medium">Reset Dashboard Layout</span>
            <button onClick={() => onConfirm("Reset Dashboard Layout")} className="rounded-lg border border-warning px-3 py-1.5 text-[12px] font-semibold text-warning hover:bg-warning/20">Reset</button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2.5">
            <span className="text-[13px] font-medium">Delete all YGuard data on uninstall</span>
            <button onClick={() => onConfirm("Delete all YGuard data")} className="rounded-lg bg-destructive px-3 py-1.5 text-[12px] font-semibold text-destructive-foreground hover:opacity-90">Delete</button>
          </div>
        </div>
      </Panel>
    </div>
  );
}

// ── About Tab ────────────────────────────────────────────────
function AboutTab() {
  return (
    <Panel title="درباره YGuard">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-primary-foreground shadow-glow">
            <FontAwesomeIcon icon={faShieldHalved} className="text-lg" />
          </div>
          <div>
            <div className="text-lg font-extrabold" dir="ltr">YGuard</div>
            <div className="text-[12px] text-muted-foreground">سیستم جامع مانیتورینگ، سلامت، عملکرد و امنیت وردپرس</div>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <InfoRow label="Version" value="1.0.0" ltr />
          <InfoRow label="Creator" value="Younes Gohari" ltr />
        </div>
        <div className="rounded-xl border border-primary/30 bg-primary-soft/30 p-4 text-center">
          <div className="text-[12px] text-muted-foreground">Designed & Developed by</div>
          <div className="mt-1 text-lg font-extrabold text-primary" dir="ltr">Younes Gohari</div>
        </div>
      </div>
    </Panel>
  );
}

// ── Dashboard Customization ─────────────────────────────────
function DashboardCustomization() {
  const [widgets, setWidgets] = useState(DASHBOARD_WIDGETS);

  const toggleWidget = (id) => {
    setWidgets((prev) => prev.map((w) => w.id === id ? { ...w, enabled: !w.enabled } : w));
  };

  const setSize = (id, size) => {
    setWidgets((prev) => prev.map((w) => w.id === id ? { ...w, size } : w));
  };

  const moveUp = (id) => {
    setWidgets((prev) => {
      const idx = prev.findIndex((w) => w.id === id);
      if (idx <= 0) return prev;
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  const moveDown = (id) => {
    setWidgets((prev) => {
      const idx = prev.findIndex((w) => w.id === id);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
      return next;
    });
  };

  return (
    <Panel title="شخصی‌سازی داشبورد" action={
      <div className="flex gap-2">
        <button onClick={() => { setWidgets(DASHBOARD_WIDGETS); toast.success("چیدمان بازنشانی شد"); }} className="flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-[12px] font-medium hover:bg-muted">Reset Layout</button>
        <button onClick={() => toast.success("چیدمان ذخیره شد")} className="flex h-8 items-center gap-1.5 rounded-lg bg-brand px-3 text-[12px] font-semibold text-primary-foreground hover:opacity-90">
          <FontAwesomeIcon icon={faSave} className="text-xs" /> Save Layout
        </button>
      </div>
    }>
      <div className="space-y-2">
        {widgets.map((w, i) => (
          <div key={w.id} className={cn("flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2.5", !w.enabled && "opacity-50")}>
            <div className="flex flex-col gap-0.5">
              <button onClick={() => moveUp(w.id)} disabled={i === 0} className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-muted disabled:opacity-30">
                <FontAwesomeIcon icon={faCheck} className="text-[8px] rotate-[-90deg]" />
              </button>
              <button onClick={() => moveDown(w.id)} disabled={i === widgets.length - 1} className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-muted disabled:opacity-30">
                <FontAwesomeIcon icon={faCheck} className="text-[8px] rotate-90deg]" />
              </button>
            </div>
            <span className="flex-1 text-[13px] font-medium">{w.label}</span>
            <div className="flex gap-1">
              {WIDGET_SIZES.map((s) => (
                <button key={s.id} onClick={() => setSize(w.id, s.id)} className={cn("rounded-md px-2 py-1 text-[10px] font-medium", w.size === s.id ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted")}>
                  {s.label}
                </button>
              ))}
            </div>
            <Switch checked={w.enabled} onCheckedChange={() => toggleWidget(w.id)} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ── Helper Components ───────────────────────────────────────
function ToggleRow({ label, defaultVal }) {
  const [val, setVal] = useState(defaultVal);
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2.5">
      <span className="text-[12px] font-medium">{label}</span>
      <Switch checked={val} onCheckedChange={setVal} />
    </div>
  );
}

function Field({ label, value, onChange, defaultValue, placeholder }) {
  const [val, setVal] = useState(value || defaultValue || "");
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-semibold">{label}</label>
      <input
        value={val}
        onChange={(e) => { setVal(e.target.value); onChange?.(e.target.value); }}
        placeholder={placeholder}
        className="h-9 w-full rounded-lg border border-border bg-background px-3 font-mono text-[13px] outline-none focus:border-primary"
        dir="ltr"
      />
    </div>
  );
}

function InfoRow({ label, value, ltr }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-3">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="mt-1 text-[13px] font-semibold" dir={ltr ? "ltr" : "rtl"} style={ltr ? { textAlign: "right" } : undefined}>{value}</div>
    </div>
  );
}
