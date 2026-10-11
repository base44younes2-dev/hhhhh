import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft, faFilter, faMagnifyingGlass, faEye, faChevronLeft, faChevronRight,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { IconBadge, Panel, Pill, toFa } from "@/components/yguard/ui";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody,
} from "@/components/ui/drawer";
import { CHANGE_HISTORY, CHANGE_EVENTS, CHANGE_COMPONENTS, RISK_LEVELS, CHANGE_DETAIL } from "@/lib/changeHistoryData";

const riskTone = { low: "success", medium: "warning", high: "info", critical: "danger" };
const riskLabel = { low: "کم", medium: "متوسط", high: "بالا", critical: "بحرانی" };

const PAGE_SIZE = 10;

export default function ChangeHistory() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [fUser, setFUser] = useState("");
  const [fEvent, setFEvent] = useState("");
  const [fComponent, setFComponent] = useState("");
  const [fRisk, setFRisk] = useState("");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t); }, []);

  const users = useMemo(() => [...new Set(CHANGE_HISTORY.map((c) => c.user))], []);

  const filtered = useMemo(() => {
    let r = [...CHANGE_HISTORY];
    if (fUser) r = r.filter((c) => c.user === fUser);
    if (fEvent) r = r.filter((c) => c.event === fEvent);
    if (fComponent) r = r.filter((c) => c.component === fComponent);
    if (fRisk) r = r.filter((c) => c.risk === fRisk);
    if (search) r = r.filter((c) => c.event.includes(search) || c.user.includes(search) || c.oldValue.includes(search) || c.newValue.includes(search));
    return r;
  }, [fUser, fEvent, fComponent, fRisk, search]);

  useEffect(() => { setPage(1); }, [fUser, fEvent, fComponent, fRisk, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-5" dir="rtl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconBadge icon={faClockRotateLeft} className="h-11 w-11" />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">تاریخچه تغییرات سایت</h1>
            <p className="text-[13px] text-muted-foreground">ثبت تغییرات مهم WordPress، افزونه‌ها، کاربران و تنظیمات</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-card">
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <FontAwesomeIcon icon={faFilter} className="text-xs" /> فیلتر:
        </div>
        <select value={fUser} onChange={(e) => setFUser(e.target.value)} className="h-8 rounded-lg border border-border bg-background px-2.5 text-[12px] font-medium outline-none focus:border-primary">
          <option value="">کاربر</option>
          {users.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
        <select value={fEvent} onChange={(e) => setFEvent(e.target.value)} className="h-8 rounded-lg border border-border bg-background px-2.5 text-[12px] font-medium outline-none focus:border-primary">
          <option value="">رویداد</option>
          {CHANGE_EVENTS.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
        <select value={fComponent} onChange={(e) => setFComponent(e.target.value)} className="h-8 rounded-lg border border-border bg-background px-2.5 text-[12px] font-medium outline-none focus:border-primary">
          <option value="">Component</option>
          {CHANGE_COMPONENTS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={fRisk} onChange={(e) => setFRisk(e.target.value)} className="h-8 rounded-lg border border-border bg-background px-2.5 text-[12px] font-medium outline-none focus:border-primary">
          <option value="">Risk</option>
          {RISK_LEVELS.map((r) => <option key={r} value={r}>{riskLabel[r]}</option>)}
        </select>
        <div className="relative flex-1 min-w-[160px]">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="جستجو..." className="h-8 w-full rounded-lg border border-border bg-background pr-9 pl-3 text-[12px] outline-none focus:border-primary" />
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
            <p className="text-sm font-medium text-muted-foreground">هیچ تغییری یافت نشد</p>
          </div>
        ) : (
          <div className="-mx-5 -my-5 overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-muted/60 text-[11px] text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-right font-semibold">زمان</th>
                  <th className="px-4 py-2.5 text-right font-semibold">کاربر</th>
                  <th className="px-4 py-2.5 text-right font-semibold">رویداد</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Component</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Old Value</th>
                  <th className="px-4 py-2.5 text-right font-semibold">New Value</th>
                  <th className="px-4 py-2.5 text-right font-semibold">IP</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Risk</th>
                  <th className="px-4 py-2.5 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pageData.map((c) => (
                  <tr key={c.id} className="cursor-pointer hover:bg-muted/40" onClick={() => setDrawerOpen(true)}>
                    <td className="px-4 py-3 text-muted-foreground">{c.time}</td>
                    <td className="px-4 py-3 font-medium">{c.user}</td>
                    <td className="px-4 py-3"><Pill tone="primary">{c.event}</Pill></td>
                    <td className="px-4 py-3 text-muted-foreground">{c.component}</td>
                    <td className="px-4 py-3 font-mono text-[12px] text-muted-foreground" dir="ltr" style={{ textAlign: "right" }}>{c.oldValue}</td>
                    <td className="px-4 py-3 font-mono text-[12px] font-semibold" dir="ltr" style={{ textAlign: "right" }}>{c.newValue}</td>
                    <td className="px-4 py-3 font-mono text-[12px] text-muted-foreground" dir="ltr">{c.ip}</td>
                    <td className="px-4 py-3"><Pill tone={riskTone[c.risk]}>{riskLabel[c.risk]}</Pill></td>
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
            نمایش {toFa((page - 1) * PAGE_SIZE + 1)}-{toFa(Math.min(page * PAGE_SIZE, filtered.length))} از {toFa(filtered.length)} تغییر
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

      {/* Change Details Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="left">
        <DrawerContent className="max-w-xl">
          <DrawerHeader>
            <DrawerTitle className="text-base font-bold">جزئیات تغییر</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-4" dir="rtl">
              {[
                { l: "رویداد", v: CHANGE_DETAIL.event },
                { l: "کاربر", v: CHANGE_DETAIL.user },
                { l: "نقش", v: CHANGE_DETAIL.role },
                { l: "IP", v: CHANGE_DETAIL.ip, ltr: true },
                { l: "تاریخ", v: CHANGE_DETAIL.date },
                { l: "Component", v: CHANGE_DETAIL.component },
                { l: "Old Value", v: CHANGE_DETAIL.oldValue, ltr: true },
                { l: "New Value", v: CHANGE_DETAIL.newValue, ltr: true },
                { l: "هشدار مرتبط", v: CHANGE_DETAIL.relatedAlert },
                { l: "چکاپ مرتبط", v: CHANGE_DETAIL.relatedScan },
              ].map((f) => (
                <div key={f.l} className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-[13px]">
                  <span className="text-muted-foreground">{f.l}</span>
                  <span className="font-medium" dir={f.ltr ? "ltr" : "rtl"} style={f.ltr ? { textAlign: "right" } : undefined}>{f.v}</span>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-[13px]">
                <span className="text-muted-foreground">Risk</span>
                <Pill tone={riskTone[CHANGE_DETAIL.risk]}>{riskLabel[CHANGE_DETAIL.risk]}</Pill>
              </div>
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <div className="mb-1 text-[11px] font-semibold text-muted-foreground">یادداشت</div>
                <p className="text-[13px] leading-relaxed">{CHANGE_DETAIL.notes}</p>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
