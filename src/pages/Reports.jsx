import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport, faClockRotateLeft, faClock, faTriangleExclamation, faEye, faPrint, faArrowLeft,
  faWandMagicSparkles, faPlus, faCheck, faPaperPlane, faShieldHalved, faGlobe, faHeartPulse,
  faBolt, faChartLine, faCircleExclamation, faDatabase, faPlug, faBell, faSave,
} from "@fortawesome/free-solid-svg-icons";
import { IconBadge, Panel, Pill, StatCard, toFa } from "@/components/yguard/ui";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  REPORT_KPIS, REPORT_PRESETS, CUSTOM_REPORT_SECTIONS, DATE_RANGES, REPORT_FORMATS,
  REPORT_PREVIEW, PERIODIC_REPORTS, FREQUENCIES, WEEK_DAYS,
} from "@/lib/reportsData";

const presetIconMap = { faGlobe, faHeartPulse, faShieldHalved, faBolt, faChartLine, faCircleExclamation, faDatabase, faPlug, faBell, faClockRotateLeft };

export default function Reports() {
  const [tab, setTab] = useState("presets");
  const [showPreview, setShowPreview] = useState(false);
  const [reportTitle, setReportTitle] = useState("گزارش کامل سایت");
  const [reportDesc, setReportDesc] = useState("");
  const [dateRange, setDateRange] = useState("7d");
  const [selectedSections, setSelectedSections] = useState(["خلاصه Dashboard", "سلامت سایت", "Performance", "Security"]);
  const [format, setFormat] = useState("PDF");
  const [showCharts, setShowCharts] = useState(true);
  const [showTech, setShowTech] = useState(true);
  const [showRecs, setShowRecs] = useState(true);
  const [showTimeline, setShowTimeline] = useState(true);
  const [showResolved, setShowResolved] = useState(false);

  const toggleSection = (s) => {
    setSelectedSections((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const exportAction = (type, title) => toast.success(`${type} از «${title}» آماده شد`);

  if (showPreview) return <ReportPreview onBack={() => setShowPreview(false)} />;

  return (
    <div className="space-y-5" dir="rtl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconBadge icon={faFileExport} className="h-11 w-11" />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">گزارش‌ها</h1>
            <p className="text-[13px] text-muted-foreground">گزارش جامع سلامت، امنیت، عملکرد و وضعیت سایت</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {REPORT_KPIS.map((k) => {
          const iconMap = { faFileExport, faClockRotateLeft, faClock, faTriangleExclamation };
          return <StatCard key={k.id} icon={iconMap[k.icon] || faFileExport} tone={k.tone} label={k.label} value={typeof k.value === "number" ? toFa(k.value) : k.value} />;
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-2 shadow-card">
        {[
          { id: "presets", label: "گزارش‌های آماده" },
          { id: "custom", label: "ساخت گزارش سفارشی" },
          { id: "periodic", label: "گزارش‌های دوره‌ای" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cn("whitespace-nowrap rounded-lg px-3 py-2 text-[12px] font-medium transition-colors", tab === t.id ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted")}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Report Presets */}
      {tab === "presets" && (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {REPORT_PRESETS.map((r) => {
            const Icon = presetIconMap[r.icon] || faFileExport;
            return (
              <div key={r.id} className="flex flex-col rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-start justify-between">
                  <IconBadge icon={Icon} tone={r.tone} className="h-10 w-10" />
                  <Pill tone={r.status === "ready" ? "success" : "warning"}>{r.status === "ready" ? "آماده" : "نیازمند بروزرسانی"}</Pill>
                </div>
                <h3 className="mt-3 text-[14px] font-bold">{r.title}</h3>
                <p className="mt-1 text-[12px] text-muted-foreground">{r.desc}</p>
                <div className="mt-3 text-[11px] text-muted-foreground">
                  <FontAwesomeIcon icon={faClock} className="ml-1" /> آخرین تولید: {r.lastGenerated}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {r.sections.map((s) => <span key={s} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{s}</span>)}
                </div>
                <div className="mt-3 flex items-center gap-1.5 border-t border-border pt-3">
                  <button onClick={() => { setShowPreview(true); }} className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand px-2 text-[12px] font-semibold text-primary-foreground hover:opacity-90">
                    <FontAwesomeIcon icon={faEye} className="text-[11px]" /> مشاهده
                  </button>
                  <button onClick={() => exportAction("PDF", r.title)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted" title="PDF">
                    <FontAwesomeIcon icon={faFileExport} className="text-[11px]" />
                  </button>
                  <button onClick={() => exportAction("CSV", r.title)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted" title="CSV">
                    <span className="text-[9px] font-bold">CSV</span>
                  </button>
                  <button onClick={() => exportAction("Print", r.title)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted" title="Print">
                    <FontAwesomeIcon icon={faPrint} className="text-[11px]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Custom Report Builder */}
      {tab === "custom" && (
        <div className="space-y-4">
          <Panel title="ساخت گزارش سفارشی" action={<Pill tone="primary">{toFa(selectedSections.length)} بخش انتخاب‌شده</Pill>}>
            <div className="space-y-5">
              {/* Fields */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold">عنوان گزارش</label>
                  <input value={reportTitle} onChange={(e) => setReportTitle(e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary" placeholder="عنوان گزارش..." />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold">توضیحات</label>
                  <input value={reportDesc} onChange={(e) => setReportDesc(e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary" placeholder="توضیحات گزارش..." />
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">Date Range</label>
                <div className="flex flex-wrap gap-1.5">
                  {DATE_RANGES.map((d) => (
                    <button key={d.id} onClick={() => setDateRange(d.id)} className={cn("rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors", dateRange === d.id ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:bg-muted")}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sections */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">بخش‌های گزارش</label>
                <div className="flex flex-wrap gap-1.5">
                  {CUSTOM_REPORT_SECTIONS.map((s) => {
                    const active = selectedSections.includes(s);
                    return (
                      <button key={s} onClick={() => toggleSection(s)} className={cn("flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors", active ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:bg-muted")}>
                        {active && <FontAwesomeIcon icon={faCheck} className="text-[10px]" />}
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Format */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold">Format</label>
                <div className="flex flex-wrap gap-1.5">
                  {REPORT_FORMATS.map((f) => (
                    <button key={f} onClick={() => setFormat(f)} className={cn("rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors", format === f ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:bg-muted")}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "نمایش نمودارها", val: showCharts, set: setShowCharts },
                  { label: "نمایش جزئیات فنی", val: showTech, set: setShowTech },
                  { label: "نمایش پیشنهادها", val: showRecs, set: setShowRecs },
                  { label: "نمایش Timeline", val: showTimeline, set: setShowTimeline },
                  { label: "نمایش هشدارهای حل‌شده", val: showResolved, set: setShowResolved },
                ].map((opt) => (
                  <div key={opt.label} className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2.5">
                    <span className="text-[12px] font-medium">{opt.label}</span>
                    <Switch checked={opt.val} onCheckedChange={opt.set} />
                  </div>
                ))}
              </div>

              {/* Preview Button */}
              <button onClick={() => setShowPreview(true)} className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 text-[13px] font-semibold text-primary-foreground shadow-glow hover:opacity-90">
                <FontAwesomeIcon icon={faWandMagicSparkles} className="text-xs" /> پیش‌نمایش گزارش
              </button>
            </div>
          </Panel>
        </div>
      )}

      {/* Periodic Reports */}
      {tab === "periodic" && <PeriodicReports />}
    </div>
  );
}

// ── Report Preview ──────────────────────────────────────────
function ReportPreview({ onBack }) {
  const { title, generatedDate, version, scores, sections } = REPORT_PREVIEW;
  const scoreIcon = { success: "text-success", warning: "text-warning", danger: "text-destructive", primary: "text-primary", info: "text-info" };

  return (
    <div className="space-y-5" dir="rtl">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={onBack} className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-[13px] font-medium hover:bg-muted">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" /> بازگشت
        </button>
        <div className="flex gap-2">
          <button onClick={() => toast.success("PDF آماده شد")} className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-[13px] font-medium hover:bg-muted">
            <FontAwesomeIcon icon={faPrint} className="text-xs" /> Print
          </button>
          <button onClick={() => toast.success("PDF آماده شد")} className="flex h-9 items-center gap-2 rounded-lg bg-brand px-3 text-[13px] font-semibold text-primary-foreground hover:opacity-90">
            <FontAwesomeIcon icon={faFileExport} className="text-xs" /> PDF
          </button>
          <button onClick={() => toast.success("CSV آماده شد")} className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-[13px] font-medium hover:bg-muted">
            <span className="text-[10px] font-bold">CSV</span>
          </button>
        </div>
      </div>

      {/* Printable Report */}
      <div className="rounded-xl border border-border bg-card p-8 shadow-card">
        {/* Report Header */}
        <div className="flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-primary-foreground shadow-glow">
              <FontAwesomeIcon icon={faShieldHalved} className="text-lg" />
            </div>
            <div>
              <div className="text-xl font-extrabold" dir="ltr">YGuard</div>
              <div className="text-[12px] text-muted-foreground" dir="ltr">example.com</div>
            </div>
          </div>
          <div className="text-left">
            <div className="text-[15px] font-bold">{title}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">تاریخ تولید: {generatedDate}</div>
            <div className="text-[11px] text-muted-foreground">نسخه: <span dir="ltr">{version}</span></div>
          </div>
        </div>

        {/* Scores */}
        <div className="grid gap-3 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {scores.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-muted/40 p-3 text-center">
              <div className={cn("text-2xl font-extrabold", scoreIcon[s.tone])} dir="ltr">{typeof s.value === "number" ? toFa(s.value) : s.value}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((sec, i) => (
            <div key={i} className="border-t border-border pt-4">
              <h3 className="mb-3 text-[14px] font-bold text-primary">{sec.title}</h3>
              {sec.content ? (
                <p className="text-[13px] leading-relaxed text-muted-foreground">{sec.content}</p>
              ) : (
                <table className="w-full text-[13px]">
                  <tbody className="divide-y divide-border">
                    {sec.items.map((item, j) => (
                      <tr key={j}>
                        <td className="py-2.5 text-muted-foreground">{item.label}</td>
                        <td className="py-2.5 text-left font-medium" dir="ltr" style={{ textAlign: "left" }}>{item.value || "—"}</td>
                        <td className="py-2.5 text-left" style={{ textAlign: "left" }}>
                          <Pill tone={item.status === "success" ? "success" : item.status === "warning" ? "warning" : item.status === "danger" ? "danger" : "info"}>
                            {item.status === "success" ? "سالم" : item.status === "warning" ? "هشدار" : item.status === "danger" ? "بحرانی" : "اطلاع"}
                          </Pill>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-border pt-4 text-center text-[11px] text-muted-foreground">
          <span dir="ltr">YGuard v1.0.0</span> — ساخته شده توسط <span className="font-semibold" dir="ltr">Younes Gohari</span>
        </div>
      </div>
    </div>
  );
}

// ── Periodic Reports ────────────────────────────────────────
function PeriodicReports() {
  const [reports, setReports] = useState(PERIODIC_REPORTS);
  const [showForm, setShowForm] = useState(false);
  const [freq, setFreq] = useState("weekly");
  const [time, setTime] = useState("08:00");
  const [weekDay, setWeekDay] = useState("یکشنبه");
  const [monthDay, setMonthDay] = useState(1);
  const [onlyIssues, setOnlyIssues] = useState(false);
  const [always, setAlways] = useState(true);
  const [attachPdf, setAttachPdf] = useState(true);
  const [summary, setSummary] = useState(true);
  const [critical, setCritical] = useState(true);
  const [recs, setRecs] = useState(true);

  const addReport = () => {
    const newReport = {
      id: Date.now(), name: "گزارش جدید", frequency: FREQUENCIES.find((f) => f.id === freq)?.label || "هفتگی",
      day: freq === "weekly" ? weekDay : freq === "monthly" ? monthDay : undefined, time,
      format: "PDF", recipients: [], lastSent: "—", status: "active",
      options: { onlyIssues, always, attachPdf, summary, critical, recommendations: recs },
    };
    setReports([...reports, newReport]);
    setShowForm(false);
    toast.success("گزارش دوره‌ای جدید ایجاد شد");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-bold">گزارش دوره‌ای</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex h-9 items-center gap-2 rounded-lg bg-brand px-3 text-[13px] font-semibold text-primary-foreground shadow-glow hover:opacity-90">
          <FontAwesomeIcon icon={faPlus} className="text-xs" /> افزودن گزارش دوره‌ای
        </button>
      </div>

      {showForm && (
        <Panel title="گزارش دوره‌ای جدید" action={<button onClick={() => setShowForm(false)} className="text-[12px] text-muted-foreground hover:text-foreground">انصراف</button>}>
          <div className="space-y-4">
            {/* Frequency */}
            <div>
              <label className="mb-2 block text-[12px] font-semibold">Frequency</label>
              <div className="flex flex-wrap gap-1.5">
                {FREQUENCIES.map((f) => (
                  <button key={f.id} onClick={() => setFreq(f.id)} className={cn("rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors", freq === f.id ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:bg-muted")}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time & Day */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold">زمان ارسال</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 font-mono text-[13px] outline-none focus:border-primary" dir="ltr" />
              </div>
              {freq === "weekly" && (
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold">روز هفته</label>
                  <select value={weekDay} onChange={(e) => setWeekDay(e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary">
                    {WEEK_DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              )}
              {freq === "monthly" && (
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold">روز ماه</label>
                  <select value={monthDay} onChange={(e) => setMonthDay(Number(e.target.value))} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary">
                    {Array.from({ length: 31 }, (_, i) => <option key={i} value={i + 1}>{toFa(i + 1)}</option>)}
                  </select>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "ارسال فقط در صورت وجود مشکل", val: onlyIssues, set: setOnlyIssues },
                { label: "همیشه ارسال شود", val: always, set: setAlways },
                { label: "ضمیمه PDF", val: attachPdf, set: setAttachPdf },
                { label: "خلاصه در Email", val: summary, set: setSummary },
                { label: "Include Critical Alerts", val: critical, set: setCritical },
                { label: "Include Recommendations", val: recs, set: setRecs },
              ].map((opt) => (
                <div key={opt.label} className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2.5">
                  <span className="text-[12px] font-medium">{opt.label}</span>
                  <Switch checked={opt.val} onCheckedChange={opt.set} />
                </div>
              ))}
            </div>

            <button onClick={addReport} className="flex h-9 items-center gap-2 rounded-lg bg-brand px-4 text-[13px] font-semibold text-primary-foreground hover:opacity-90">
              <FontAwesomeIcon icon={faSave} className="text-xs" /> ذخیره گزارش دوره‌ای
            </button>
          </div>
        </Panel>
      )}

      {/* Existing Periodic Reports */}
      <div className="space-y-3">
        {reports.map((r) => (
          <div key={r.id} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-[14px] font-bold">{r.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
                  <Pill tone="primary">{r.frequency}</Pill>
                  {r.day && <span>روز: {typeof r.day === "number" ? toFa(r.day) : r.day}</span>}
                  <span>·</span>
                  <span dir="ltr">{r.time}</span>
                  <span>·</span>
                  <span>آخرین ارسال: {r.lastSent}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Pill tone="success">فعال</Pill>
                <button onClick={() => toast.success("گزارش ویرایش شد")} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted">
                  <FontAwesomeIcon icon={faWandMagicSparkles} className="text-xs" />
                </button>
              </div>
            </div>

            {/* Recipients */}
            <div className="mt-3 border-t border-border pt-3">
              <div className="mb-2 text-[11px] font-semibold text-muted-foreground">گیرندگان</div>
              <div className="flex flex-wrap gap-2">
                {r.recipients.map((rec) => (
                  <div key={rec.id} className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-[12px]">
                    <FontAwesomeIcon icon={faPaperPlane} className="text-[10px] text-muted-foreground" />
                    <span className="font-medium">{rec.name}</span>
                    <span className="text-muted-foreground" dir="ltr">{rec.email}</span>
                    <Pill tone={rec.status === "active" ? "success" : "warning"}>{rec.status === "active" ? "فعال" : "غیرفعال"}</Pill>
                  </div>
                ))}
                <button onClick={() => toast("فرم افزودن گیرنده باز شد")} className="flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-[12px] text-muted-foreground hover:bg-muted">
                  <FontAwesomeIcon icon={faPlus} className="text-[10px]" /> افزودن گیرنده
                </button>
              </div>
            </div>

            {/* Options Summary */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {r.options.onlyIssues && <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">فقط مشکلات</span>}
              {r.options.always && <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">همیشه</span>}
              {r.options.attachPdf && <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">PDF</span>}
              {r.options.summary && <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">خلاصه</span>}
              {r.options.critical && <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">Critical</span>}
              {r.options.recommendations && <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">پیشنهادها</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
