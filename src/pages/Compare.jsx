import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeCompare, faArrowUp, faArrowDown, faMinus, faCircleCheck, faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { IconBadge, Panel, Pill, toFa } from "@/components/yguard/ui";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { COMPARE_SCANS, COMPARE_SUMMARY, COMPARE_VISUAL_CARDS } from "@/lib/scanData";

const statusMap = {
  improved: { label: "بهبود یافته", tone: "success", icon: faArrowUp },
  worse: { label: "بدتر شده", tone: "danger", icon: faArrowDown },
  unchanged: { label: "بدون تغییر", tone: "primary", icon: faMinus },
};

const visualIconMap = { faCircleCheck, faCircleExclamation, faArrowUp, faArrowDown };

export default function Compare() {
  const [scanA, setScanA] = useState(COMPARE_SCANS[2].id);
  const [scanB, setScanB] = useState(COMPARE_SCANS[0].id);
  const [filter, setFilter] = useState("all");

  const filteredSummary = filter === "all"
    ? COMPARE_SUMMARY
    : COMPARE_SUMMARY.filter((s) => s.status === filter);

  return (
    <div className="space-y-5" dir="rtl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconBadge icon={faCodeCompare} className="h-11 w-11" />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">مقایسه چکاپ‌ها</h1>
            <p className="text-[13px] text-muted-foreground">مقایسه دو چکاپ و نمایش تفاوت‌ها</p>
          </div>
        </div>
      </div>

      {/* Scan Selectors */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-[12px] font-bold text-primary-foreground">A</span>
            <span className="text-[13px] font-bold">Scan A</span>
          </div>
          <select value={scanA} onChange={(e) => setScanA(e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[12px] outline-none focus:border-primary">
            {COMPARE_SCANS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-info text-[12px] font-bold" style={{ color: "oklch(var(--info))" }}>B</span>
            <span className="text-[13px] font-bold">Scan B</span>
          </div>
          <select value={scanB} onChange={(e) => setScanB(e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[12px] outline-none focus:border-primary">
            {COMPARE_SCANS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Visual Diff Cards */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {COMPARE_VISUAL_CARDS.map((c) => {
          const Icon = visualIconMap[c.icon] || faCircleCheck;
          return (
            <button
              key={c.id}
              onClick={() => setFilter(filter === c.id ? "all" : c.id === "resolved" ? "improved" : c.id === "new" ? "worse" : c.id === "improved" ? "improved" : "worse")}
              className={cn(
                "rounded-xl border border-border bg-card p-4 text-right shadow-card transition-all hover:shadow-glow",
                (filter === c.id || (filter === "improved" && c.id === "resolved") || (filter === "worse" && c.id === "new")) && "ring-2 ring-primary"
              )}
            >
              <div className="flex items-center justify-between">
                <IconBadge icon={Icon} tone={c.tone} className="h-9 w-9" />
                <span className="text-2xl font-extrabold" dir="ltr">{toFa(c.value)}</span>
              </div>
              <div className="mt-2 text-[12px] text-muted-foreground">{c.label}</div>
            </button>
          );
        })}
      </div>

      {/* Filter Reset */}
      {filter !== "all" && (
        <button onClick={() => setFilter("all")} className="text-[12px] text-primary hover:underline">
          نمایش همه موارد ←
        </button>
      )}

      {/* Compare Table */}
      <Panel title="مقایسه متریک‌ها" action={<Pill tone="primary">{toFa(filteredSummary.length)} متریک</Pill>}>
        <div className="-mx-5 -my-5 overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-muted/60 text-[11px] text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-right font-semibold">Metric</th>
                <th className="px-4 py-2.5 text-right font-semibold">Scan A</th>
                <th className="px-4 py-2.5 text-right font-semibold">Scan B</th>
                <th className="px-4 py-2.5 text-right font-semibold">Difference</th>
                <th className="px-4 py-2.5 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSummary.map((row, i) => {
                const diff = row.b - row.a;
                const st = statusMap[row.status];
                return (
                  <tr key={i} className="hover:bg-muted/40">
                    <td className="px-4 py-3 font-medium">{row.metric}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground" dir="ltr">{toFa(row.a)}</td>
                    <td className="px-4 py-3 font-mono font-semibold" dir="ltr">{toFa(row.b)}</td>
                    <td className={cn("px-4 py-3 font-mono font-bold", diff > 0 ? "text-success" : diff < 0 ? "text-destructive" : "text-muted-foreground")} dir="ltr">
                      {diff > 0 ? "+" : ""}{toFa(diff)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold",
                        st.tone === "success" ? "bg-success/12 text-success" : st.tone === "danger" ? "bg-destructive/12 text-destructive" : "bg-primary-soft text-primary")}>
                        <FontAwesomeIcon icon={st.icon} className="text-[9px]" />
                        {st.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
