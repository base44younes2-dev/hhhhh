import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer, faCode, faDatabase, faGlobe, faShieldHalved, faHardDrive, faSave,
  faCopy, faTriangleExclamation, faCircleCheck, faDownload,
  faLock, faClock, faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { IconBadge, Panel, Pill, toFa } from "@/components/yguard/ui";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { SYS_INFO_TABS, SYS_INFO, STORAGE_INFO, BACKUP_INFO } from "@/lib/diagnosticsData";

const tabIconMap = { faCode, faServer, faDatabase, faGlobe, faShieldHalved };

const tip = { background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 };
const axis = { fontSize: 11, fill: "oklch(var(--muted-foreground))" };

export default function SystemInfo() {
  const [tab, setTab] = useState("wordpress");

  const copyAll = () => {
    const data = SYS_INFO[tab] || [];
    const text = data.map((f) => `${f.label}: ${f.value}`).join("\n");
    toast.success("اطلاعات سیستم کپی شد");
  };

  const downloadInfo = () => toast.success("دانلود اطلاعات شروع شد");

  return (
    <div className="space-y-5" dir="rtl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconBadge icon={faServer} className="h-11 w-11" />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">اطلاعات سیستم</h1>
            <p className="text-[13px] text-muted-foreground">مشاهده اطلاعات WordPress، سرور، PHP، دیتابیس و YGuard</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={copyAll} className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-[13px] font-medium hover:bg-muted">
            <FontAwesomeIcon icon={faCopy} className="text-xs" /> کپی اطلاعات سیستم
          </button>
          <button onClick={downloadInfo} className="flex h-9 items-center gap-2 rounded-lg bg-brand px-3 text-[13px] font-semibold text-primary-foreground shadow-glow hover:opacity-90">
            <FontAwesomeIcon icon={faDownload} className="text-xs" /> دانلود اطلاعات
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-2 shadow-card">
        {SYS_INFO_TABS.map((t) => {
          const Icon = tabIconMap[t.icon] || faServer;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className={cn("flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-[12px] font-medium transition-colors", tab === t.id ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted")}>
              <FontAwesomeIcon icon={Icon} className="text-[11px]" /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <Panel title={SYS_INFO_TABS.find((t) => t.id === tab)?.label}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(SYS_INFO[tab] || []).map((f, i) => (
            <div key={i} className="rounded-lg border border-border bg-muted/40 p-3">
              <div className="text-[11px] text-muted-foreground">{f.label}</div>
              <div className="mt-1 text-[13px] font-semibold" dir={f.ltr ? "ltr" : "rtl"} style={f.ltr ? { textAlign: "right" } : undefined}>{f.value}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Storage / Disk */}
      <Panel title="فضای ذخیره‌سازی">
        <div className="space-y-5">
          {/* Overview */}
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-border bg-muted/40 p-3 text-center">
              <div className="text-[11px] text-muted-foreground">Total Disk</div>
              <div className="mt-1 text-xl font-extrabold" dir="ltr">{STORAGE_INFO.total} GB</div>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-3 text-center">
              <div className="text-[11px] text-muted-foreground">Used</div>
              <div className="mt-1 text-xl font-extrabold text-warning" dir="ltr">{STORAGE_INFO.used} GB</div>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-3 text-center">
              <div className="text-[11px] text-muted-foreground">Free</div>
              <div className="mt-1 text-xl font-extrabold text-success" dir="ltr">{STORAGE_INFO.free} GB</div>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-3 text-center">
              <div className="text-[11px] text-muted-foreground">Usage %</div>
              <div className={cn("mt-1 text-xl font-extrabold", STORAGE_INFO.usagePercent >= 90 ? "text-destructive" : "text-warning")} dir="ltr">{toFa(STORAGE_INFO.usagePercent)}%</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="mb-1.5 flex items-center justify-between text-[12px]">
              <span className="text-muted-foreground">مصرف فضای دیسک</span>
              <Pill tone={STORAGE_INFO.status === "warning" ? "warning" : "danger"}>
                {STORAGE_INFO.status === "warning" ? "هشدار" : "بحرانی"}
              </Pill>
            </div>
            <div className="h-3 rounded-full bg-muted">
              <div className={cn("h-full rounded-full", STORAGE_INFO.usagePercent >= 90 ? "bg-destructive" : "bg-warning")} style={{ width: `${STORAGE_INFO.usagePercent}%` }} />
            </div>
            <div className="mt-1.5 flex items-center gap-4 text-[11px] text-muted-foreground">
              <span><FontAwesomeIcon icon={faTriangleExclamation} className="text-warning" /> هشدار زیر {toFa(STORAGE_INFO.thresholds.warning)}%</span>
              <span><FontAwesomeIcon icon={faCircleXmark} className="text-destructive" /> بحرانی زیر {toFa(STORAGE_INFO.thresholds.critical)}%</span>
            </div>
          </div>

          {/* Breakdown */}
          <div>
            <h4 className="mb-2 text-[12px] font-bold">تفکیک مصرف</h4>
            <div className="space-y-2">
              {STORAGE_INFO.breakdown.map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="w-20 text-[12px] text-muted-foreground">{b.label}</span>
                  <div className="h-2 flex-1 rounded-full bg-muted">
                    <div className={cn("h-full rounded-full", b.tone === "success" ? "bg-success" : b.tone === "warning" ? "bg-warning" : b.tone === "danger" ? "bg-destructive" : b.tone === "info" ? "bg-info" : "bg-primary")} style={{ width: `${b.percent}%` }} />
                  </div>
                  <span className="w-20 text-left font-mono text-[11px] text-muted-foreground" dir="ltr">{b.size} ({toFa(b.percent)}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* History Chart */}
          <div>
            <h4 className="mb-2 text-[12px] font-bold">روند مصرف دیسک (۱۰ روز اخیر)</h4>
            <div className="h-40" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={STORAGE_INFO.history} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gDisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(var(--warning))" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="oklch(var(--warning))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" vertical={false} />
                  <XAxis dataKey="day" tick={axis} axisLine={false} tickLine={false} />
                  <YAxis tick={axis} axisLine={false} tickLine={false} domain={[50, 80]} />
                  <Tooltip contentStyle={tip} labelStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="used" stroke="oklch(var(--warning))" strokeWidth={2} fill="url(#gDisk)" name="GB استفاده‌شده" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Panel>

      {/* Backup Status */}
      <Panel title="وضعیت Backup">
        <div className="space-y-4">
          {/* Warning Banner */}
          <div className="flex items-center gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-[13px] text-warning">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <span>{BACKUP_INFO.message}</span>
          </div>

          {/* Info Grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { l: "آخرین Backup", v: BACKUP_INFO.lastBackup, icon: faClock },
              { l: "Backup Age", v: BACKUP_INFO.backupAge, icon: faClock },
              { l: "Backup Size", v: BACKUP_INFO.backupSize, icon: faHardDrive },
              { l: "Backup Type", v: BACKUP_INFO.backupType, icon: faSave },
              { l: "Destination", v: BACKUP_INFO.destination, icon: faServer },
              { l: "Status", v: BACKUP_INFO.statusLabel, icon: faTriangleExclamation, pill: true },
            ].map((f) => (
              <div key={f.l} className="rounded-lg border border-border bg-muted/40 p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <FontAwesomeIcon icon={f.icon} className="text-[10px]" /> {f.l}
                </div>
                {f.pill ? (
                  <div className="mt-1.5"><Pill tone="warning">{f.v}</Pill></div>
                ) : (
                  <div className="mt-1 text-[13px] font-semibold" dir="ltr" style={{ textAlign: "right" }}>{f.v}</div>
                )}
              </div>
            ))}
          </div>

          {/* Backup History Table */}
          <div>
            <h4 className="mb-2 text-[12px] font-bold">تاریخچه Backup</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead className="bg-muted/60 text-[11px] text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2.5 text-right font-semibold">Date</th>
                    <th className="px-3 py-2.5 text-right font-semibold">Type</th>
                    <th className="px-3 py-2.5 text-right font-semibold">Size</th>
                    <th className="px-3 py-2.5 text-right font-semibold">Destination</th>
                    <th className="px-3 py-2.5 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {BACKUP_INFO.history.map((b) => (
                    <tr key={b.id} className="hover:bg-muted/40">
                      <td className="px-3 py-3 text-muted-foreground">{b.date}</td>
                      <td className="px-3 py-3"><Pill tone="primary">{b.type}</Pill></td>
                      <td className="px-3 py-3 font-mono text-[12px]" dir="ltr">{b.size}</td>
                      <td className="px-3 py-3 text-muted-foreground" dir="ltr">{b.destination}</td>
                      <td className="px-3 py-3"><Pill tone={b.status === "success" ? "success" : b.status === "warning" ? "warning" : "danger"}>{b.statusLabel}</Pill></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
