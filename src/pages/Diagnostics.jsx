import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScrewdriverWrench, faPlug, faRotate, faClock, faDatabase, faNetworkWired,
  faLock, faEnvelope, faGlobe, faLayerGroup, faCode, faServer, faFileLines, faCloud,
  faPlay, faCircleCheck, faTriangleExclamation, faCircleXmark, faCopy, faXmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { IconBadge, Panel, Pill, toFa } from "@/components/yguard/ui";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { DIAGNOSTIC_TOOLS, DIAGNOSTIC_RESULTS } from "@/lib/diagnosticsData";

const toolIconMap = { faPlug, faRotate, faClock, faDatabase, faNetworkWired, faLock, faEnvelope, faGlobe, faLayerGroup, faCode, faServer, faFileLines, faCloud };

const statusTone = { success: "success", warning: "warning", danger: "danger" };
const statusIcon = { success: faCircleCheck, warning: faTriangleExclamation, danger: faCircleXmark };

export default function Diagnostics() {
  const [testing, setTesting] = useState(null);
  const [result, setResult] = useState(null);
  const [resultOpen, setResultOpen] = useState(false);

  const runTest = (toolId) => {
    setTesting(toolId);
    setTimeout(() => {
      setTesting(null);
      setResult({ toolId, ...DIAGNOSTIC_RESULTS[toolId] });
      setResultOpen(true);
      toast.success("تست انجام شد");
    }, 1500);
  };

  const copyResult = () => {
    if (!result) return;
    toast.success("نتیجه کپی شد");
  };

  return (
    <div className="space-y-5" dir="rtl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconBadge icon={faScrewdriverWrench} className="h-11 w-11" />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">ابزارهای تشخیصی</h1>
            <p className="text-[13px] text-muted-foreground">تست سریع بخش‌های مهم سایت و زیرساخت</p>
          </div>
        </div>
      </div>

      {/* Tool Cards */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {DIAGNOSTIC_TOOLS.map((tool) => {
          const Icon = toolIconMap[tool.icon] || faScrewdriverWrench;
          const SIcon = statusIcon[tool.status] || faCircleCheck;
          const isTesting = testing === tool.id;
          return (
            <div key={tool.id} className="flex flex-col rounded-xl border border-border bg-card p-4 shadow-card">
              <div className="flex items-start justify-between">
                <IconBadge icon={Icon} tone={statusTone[tool.status] || "primary"} className="h-10 w-10" />
                <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold",
                  tool.status === "success" ? "bg-success/12 text-success" : tool.status === "warning" ? "bg-warning/15 text-warning" : "bg-destructive/12 text-destructive")}>
                  <FontAwesomeIcon icon={SIcon} className="text-[9px]" />
                  {tool.statusLabel}
                </span>
              </div>
              <h3 className="mt-3 text-[14px] font-bold" dir="ltr" style={{ textAlign: "right" }}>{tool.title}</h3>
              <p className="mt-1 flex-1 text-[12px] text-muted-foreground">{tool.desc}</p>
              <div className="mt-3 text-[11px] text-muted-foreground">
                <FontAwesomeIcon icon={faClock} className="ml-1" /> آخرین تست: {tool.lastTest}
              </div>
              <button
                onClick={() => runTest(tool.id)}
                disabled={isTesting}
                className="mt-3 flex h-9 items-center justify-center gap-2 rounded-lg bg-brand px-3 text-[12px] font-semibold text-primary-foreground shadow-glow transition-opacity hover:opacity-90 disabled:opacity-70"
              >
                <FontAwesomeIcon icon={isTesting ? faSpinner : faPlay} className={cn("text-xs", isTesting && "animate-spin")} />
                {isTesting ? "در حال تست..." : "Run Test"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Result Modal */}
      <Dialog open={resultOpen} onOpenChange={setResultOpen}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold">
              {result && (
                <>
                  <IconBadge icon={toolIconMap[DIAGNOSTIC_TOOLS.find((t) => t.id === result.toolId)?.icon] || faScrewdriverWrench} tone={statusTone[result.status] || "primary"} className="h-8 w-8" />
                  {DIAGNOSTIC_TOOLS.find((t) => t.id === result.toolId)?.title}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {result && (
            <div className="space-y-4">
              {/* Status Info */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { l: "Status", v: result.status, tone: statusTone[result.status] },
                  { l: "HTTP Status", v: result.httpStatus, ltr: true },
                  { l: "Response Time", v: result.responseTime, ltr: true },
                  { l: "Endpoint", v: result.endpoint, ltr: true },
                  { l: "Last Checked", v: result.lastChecked },
                ].map((f) => (
                  <div key={f.l} className="rounded-lg border border-border bg-muted/40 p-2.5">
                    <div className="text-[11px] text-muted-foreground">{f.l}</div>
                    {f.tone ? (
                      <Pill tone={f.tone}>{f.v}</Pill>
                    ) : (
                      <div className="mt-1 text-[13px] font-semibold" dir={f.ltr ? "ltr" : "rtl"} style={f.ltr ? { textAlign: "right" } : undefined}>{f.v}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Technical Details */}
              <div>
                <h4 className="mb-1.5 text-[12px] font-bold">Technical Details</h4>
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <pre className="font-mono text-[11px] leading-relaxed text-muted-foreground whitespace-pre-wrap" dir="ltr" style={{ textAlign: "left" }}>{result.technical}</pre>
                </div>
              </div>

              {/* Result */}
              <div>
                <h4 className="mb-1.5 text-[12px] font-bold">Result</h4>
                <p className="text-[13px] leading-relaxed">{result.result}</p>
              </div>

              {/* Recommendation */}
              <div>
                <h4 className="mb-1.5 text-[12px] font-bold">Recommendation</h4>
                <div className="rounded-lg border border-info/40 bg-info/10 p-3 text-[13px] text-info">{result.recommendation}</div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button onClick={copyResult} className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 text-[13px] font-medium hover:bg-muted">
                  <FontAwesomeIcon icon={faCopy} className="text-xs" /> Copy Result
                </button>
                <button onClick={() => setResultOpen(false)} className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-brand px-3 text-[13px] font-semibold text-primary-foreground hover:opacity-90">
                  <FontAwesomeIcon icon={faXmark} className="text-xs" /> Close
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
