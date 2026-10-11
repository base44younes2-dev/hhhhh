import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck, faStethoscope, faBolt, faClock, faGaugeHigh, faTriangleExclamation,
  faEye, faFilter, faMagnifyingGlass, faChevronLeft, faChevronRight, faCircleQuestion,
  faCode, faServer, faDatabase, faShieldHalved, faNetworkWired, faFileLines, faArrowUp, faArrowDown, faMinus, faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { IconBadge, Panel, Pill, StatCard, toFa } from "@/components/yguard/ui";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody,
} from "@/components/ui/drawer";
import { SCAN_KPIS, SCAN_HISTORY, SCAN_TYPES, TRIGGERED_BY, SCAN_DETAILS } from "@/lib/scanData";

const iconMap = { faListCheck, faStethoscope, faBolt, faClock, faGaugeHigh, faTriangleExclamation };
const catIconMap = { faCode, faServer, faDatabase, faShieldHalved, faNetworkWired, faFileLines, faBolt, faClock };

const PAGE_SIZE = 8;

export default function ScanHistory() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [fType, setFType] = useState("");
  const [fTrigger, setFTrigger] = useState("");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t); }, []);

  const filtered = useMemo(() => {
    let r = [...SCAN_HISTORY];
    if (fType) r = r.filter((s) => s.type === fType);
    if (fTrigger) r = r.filter((s) => s.triggeredBy === fTrigger);
    if (search) r = r.filter((s) => s.id.includes(search) || s.date.includes(search));
    return r;
  }, [fType, fTrigger, search]);

  useEffect(() => { setPage(1); }, [fType, fTrigger, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-5" dir="rtl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconBadge icon={faListCheck} className="h-11 w-11" />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">تاریخچه چکاپ‌ها</h1>
            <p className="text-[13px] text-muted-foreground">مشاهده نتایج چکاپ‌های قبلی و روند تغییر وضعیت سایت</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-[100px] animate-pulse rounded-xl bg-muted" />)
          : SCAN_KPIS.map((k) => <StatCard key={k.id} icon={iconMap[k.icon] || faListCheck} tone={k.tone} label={k.label} value={toFa(k.value)} />)}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-card">
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <FontAwesomeIcon icon={faFilter} className="text-xs" /> فیلتر:
        </div>
        <select value={fType} onChange={(e) => setFType(e.target.value)} className="h-8 rounded-lg border border-border bg-background px-2.5 text-[12px] font-medium outline-none focus:border-primary">
          <option value="">نوع چکاپ</option>
          {SCAN_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={fTrigger} onChange={(e) => setFTrigger(e.target.value)} className="h-8 rounded-lg border border-border bg-background px-2.5 text-[12px] font-medium outline-none focus:border-primary">
          <option value="">Triggered By</option>
          {TRIGGERED_BY.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <div className="relative flex-1 min-w-[160px]">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="جستجوی چکاپ..." className="h-8 w-full rounded-lg border border-border bg-background pr-9 pl-3 text-[12px] outline-none focus:border-primary" />
        </div>
      </div>

      {/* Table */}
      <Panel>
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <FontAwesomeIcon icon={faCircleQuestion} className="text-3xl text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">هیچ چکاپی یافت نشد</p>
          </div>
        ) : (
          <div className="-mx-5 -my-5 overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-muted/60 text-[11px] text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-right font-semibold">تاریخ</th>
                  <th className="px-4 py-2.5 text-right font-semibold">نوع چکاپ</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Duration</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Overall Score</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Health</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Security</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Performance</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Critical</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Warning</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Passed</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Triggered By</th>
                  <th className="px-4 py-2.5 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pageData.map((s) => (
                  <tr key={s.id} className="cursor-pointer hover:bg-muted/40" onClick={() => { setDrawerOpen(true); toast.info(`جزئیات ${s.id}`); }}>
                    <td className="px-4 py-3 text-muted-foreground">{s.date}</td>
                    <td className="px-4 py-3"><Pill tone={s.type === "Full Scan" ? "primary" : s.type === "Quick Scan" ? "success" : "info"}>{s.type}</Pill></td>
                    <td className="px-4 py-3 font-mono text-[12px] text-muted-foreground" dir="ltr">{s.duration}</td>
                    <td className="px-4 py-3 font-bold" dir="ltr">{toFa(s.overall)}</td>
                    <td className="px-4 py-3 text-success" dir="ltr">{toFa(s.health)}</td>
                    <td className="px-4 py-3 text-primary" dir="ltr">{toFa(s.security)}</td>
                    <td className="px-4 py-3 text-warning" dir="ltr">{toFa(s.performance)}</td>
                    <td className="px-4 py-3"><span className={cn("font-bold", s.critical > 0 ? "text-destructive" : "text-muted-foreground")} dir="ltr">{toFa(s.critical)}</span></td>
                    <td className="px-4 py-3"><span className={cn("font-bold", s.warning > 0 ? "text-warning" : "text-muted-foreground")} dir="ltr">{toFa(s.warning)}</span></td>
                    <td className="px-4 py-3 text-success" dir="ltr">{toFa(s.passed)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.triggeredBy}</td>
                    <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => setDrawerOpen(true)} className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted mx-auto">
                        <FontAwesomeIcon icon={faEye} className="text-xs" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-muted-foreground">
            نمایش {toFa((page - 1) * PAGE_SIZE + 1)}-{toFa(Math.min(page * PAGE_SIZE, filtered.length))} از {toFa(filtered.length)} چکاپ
          </span>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40">
              <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={cn("h-8 min-w-8 rounded-lg border px-2 text-[12px] font-medium", page === i + 1 ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:bg-muted")}>
                {toFa(i + 1)}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40">
              <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            </button>
          </div>
        </div>
      )}

      {/* Scan Details Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="left">
        <DrawerContent className="max-w-2xl">
          <DrawerHeader>
            <DrawerTitle className="text-base font-bold">جزئیات چکاپ — <span dir="ltr">{SCAN_DETAILS.id}</span></DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-5" dir="rtl">
              {/* Overview */}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {[
                  { l: "تاریخ", v: SCAN_DETAILS.date },
                  { l: "نوع", v: SCAN_DETAILS.type },
                  { l: "Duration", v: SCAN_DETAILS.duration, ltr: true },
                  { l: "Overall Score", v: toFa(SCAN_DETAILS.overall), tone: "text-success", ltr: true },
                  { l: "Health", v: toFa(SCAN_DETAILS.health), tone: "text-success", ltr: true },
                  { l: "Security", v: toFa(SCAN_DETAILS.security), tone: "text-primary", ltr: true },
                  { l: "Performance", v: toFa(SCAN_DETAILS.performance), tone: "text-warning", ltr: true },
                  { l: "Critical", v: toFa(SCAN_DETAILS.critical), tone: "text-destructive", ltr: true },
                  { l: "Passed", v: toFa(SCAN_DETAILS.passed), tone: "text-success", ltr: true },
                ].map((f) => (
                  <div key={f.l} className="rounded-lg border border-border bg-muted/40 p-3">
                    <div className="text-[11px] text-muted-foreground">{f.l}</div>
                    <div className={cn("mt-1 text-[13px] font-semibold", f.tone)} dir={f.ltr ? "ltr" : "rtl"} style={f.ltr ? { textAlign: "right" } : undefined}>{f.v}</div>
                  </div>
                ))}
              </div>

              {/* Changes from Previous */}
              <div>
                <h3 className="mb-2 text-[13px] font-bold">تغییرات نسبت به چکاپ قبلی</h3>
                <div className="space-y-1.5">
                  {SCAN_DETAILS.changesFromPrevious.map((c, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2 text-[12px]">
                      <span className="text-muted-foreground">{c.metric}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-muted-foreground" dir="ltr">{toFa(c.old)}</span>
                        <FontAwesomeIcon icon={faArrowLeft} className="text-[9px] text-muted-foreground" />
                        <span className="font-mono font-semibold" dir="ltr">{toFa(c.new)}</span>
                        <span className={cn("flex items-center gap-1 font-bold", c.status === "improved" ? "text-success" : c.status === "worse" ? "text-destructive" : "text-muted-foreground")}>
                          {c.status === "improved" ? <FontAwesomeIcon icon={faArrowUp} className="text-[9px]" /> : c.status === "worse" ? <FontAwesomeIcon icon={faArrowDown} className="text-[9px]" /> : <FontAwesomeIcon icon={faMinus} className="text-[9px]" />}
                          {c.diff > 0 ? "+" : ""}{toFa(c.diff)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="mb-2 text-[13px] font-bold">دسته‌بندی‌ها</h3>
                <div className="space-y-3">
                  {SCAN_DETAILS.categories.map((cat, i) => {
                    const CatIcon = catIconMap[cat.icon] || faListCheck;
                    return (
                      <div key={i} className="rounded-xl border border-border bg-muted/30 p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconBadge icon={CatIcon} tone="primary" className="h-8 w-8 text-[12px]" />
                            <span className="text-[13px] font-bold">{cat.name}</span>
                          </div>
                          <span className="text-lg font-extrabold text-primary" dir="ltr">{toFa(cat.score)}</span>
                        </div>
                        <div className="mt-2 space-y-1">
                          {cat.findings.map((f, j) => (
                            <div key={j} className="flex items-center justify-between rounded-lg bg-background px-2.5 py-1.5 text-[12px]">
                              <span className="text-muted-foreground">{f.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono" dir="ltr" style={{ textAlign: "right" }}>{f.value}</span>
                                <Pill tone={f.status === "success" ? "success" : f.status === "warning" ? "warning" : "danger"}>
                                  {f.status === "success" ? "سالم" : f.status === "warning" ? "هشدار" : "بحرانی"}
                                </Pill>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
