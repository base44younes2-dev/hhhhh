import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved, faCircleInfo, faRocket, faHeartPulse, faBolt, faFileLines,
  faBell, faPaperPlane, faFileExport, faGear, faGauge, faChevronDown, faChevronUp,
  faBook, faLifeRing, faCheck, faCode, faServer,
} from "@fortawesome/free-solid-svg-icons";
import { IconBadge, Panel, Pill, toFa } from "@/components/yguard/ui";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { CHANGELOG_SECTIONS, HELP_CARDS, FAQ_ITEMS } from "@/lib/settingsData";

const helpIconMap = { faRocket, faHeartPulse, faBolt, faShieldHalved, faBell, faPaperPlane, faFileExport, faGear };
const changelogIconMap = { faGauge, faHeartPulse, faBolt, faFileLines, faShieldHalved, faBell, faPaperPlane, faFileExport, faGear };

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="space-y-5" dir="rtl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconBadge icon={faCircleInfo} className="h-11 w-11" />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">درباره YGuard</h1>
            <p className="text-[13px] text-muted-foreground">سیستم جامع مانیتورینگ، سلامت، عملکرد و امنیت وردپرس</p>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <Panel title="Product Information">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-primary-foreground shadow-glow">
            <FontAwesomeIcon icon={faShieldHalved} className="text-2xl" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold" dir="ltr">YGuard</span>
              <Pill tone="primary">v1.0.0</Pill>
            </div>
            <p className="mt-1 text-[13px] text-muted-foreground">سیستم جامع مانیتورینگ، سلامت، عملکرد و امنیت وردپرس</p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { l: "Version", v: "1.0.0", icon: faCode, ltr: true },
            { l: "Creator", v: "Younes Gohari", icon: faServer, ltr: true },
            { l: "License", v: "Premium", icon: faShieldHalved },
            { l: "Platform", v: "WordPress", icon: faBook },
          ].map((f) => (
            <div key={f.l} className="rounded-lg border border-border bg-muted/40 p-3">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <FontAwesomeIcon icon={f.icon} className="text-[10px]" /> {f.l}
              </div>
              <div className="mt-1 text-[13px] font-semibold" dir={f.ltr ? "ltr" : "rtl"} style={f.ltr ? { textAlign: "right" } : undefined}>{f.v}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Credit Card */}
      <div className="overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-soft to-card p-6 shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[12px] text-muted-foreground">Designed & Developed by</div>
            <div className="mt-1 text-2xl font-extrabold text-primary" dir="ltr">Younes Gohari</div>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-primary-foreground shadow-glow">
            <FontAwesomeIcon icon={faShieldHalved} className="text-xl" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-primary/20 pt-4">
          <span className="text-[12px] text-muted-foreground">YGuard v1.0.0</span>
          <span className="text-[12px] font-semibold text-primary">Premium WordPress Plugin</span>
        </div>
      </div>

      {/* Changelog */}
      <Panel title="Changelog" action={<Pill tone="primary">v1.0.0</Pill>}>
        <div className="space-y-4">
          {CHANGELOG_SECTIONS.map((sec, i) => {
            const Icon = changelogIconMap[sec.icon] || faCheck;
            return (
              <div key={i} className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2">
                  <IconBadge icon={Icon} tone="primary" className="h-8 w-8 text-[12px]" />
                  <h3 className="text-[14px] font-bold">{sec.section}</h3>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {sec.items.map((item, j) => (
                    <span key={j} className="flex items-center gap-1.5 rounded-lg bg-background px-2.5 py-1 text-[12px] text-muted-foreground">
                      <FontAwesomeIcon icon={faCheck} className="text-[9px] text-success" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* Help & Documentation */}
      <Panel title="Help & Documentation">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HELP_CARDS.map((card) => {
            const Icon = helpIconMap[card.icon] || faBook;
            return (
              <div key={card.id} className="rounded-xl border border-border bg-card p-4 shadow-card">
                <IconBadge icon={Icon} tone="primary" className="h-9 w-9" />
                <h3 className="mt-3 text-[13px] font-bold">{card.title}</h3>
                <p className="mt-1 text-[11px] text-muted-foreground">{card.desc}</p>
                <div className="mt-2 space-y-1">
                  {card.links.map((link, j) => (
                    <button key={j} onClick={() => toast(`مستندات: ${link}`)} className="flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-primary hover:bg-primary-soft">
                      <FontAwesomeIcon icon={faChevronUp} className="text-[8px] rotate-90" />
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* FAQ */}
      <Panel title="FAQ">
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="rounded-lg border border-border bg-muted/40">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-[13px] font-medium"
              >
                <span>{item.q}</span>
                <FontAwesomeIcon icon={openFaq === i ? faChevronUp : faChevronDown} className="text-[10px] text-muted-foreground" />
              </button>
              {openFaq === i && (
                <div className="px-3 pb-3 text-[12px] leading-relaxed text-muted-foreground">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </Panel>

      {/* System Requirements */}
      <Panel title="System Requirements">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { l: "WordPress", v: "5.6+", icon: faCode },
            { l: "PHP", v: "7.4+ (8.x recommended)", icon: faServer },
            { l: "MySQL", v: "5.7+ / MariaDB 10.3+", icon: faShieldHalved },
            { l: "Browser", v: "Modern browser (Chrome, Firefox, Safari, Edge)", icon: faBook },
          ].map((r) => (
            <div key={r.l} className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-3">
              <FontAwesomeIcon icon={r.icon} className="text-sm text-primary" />
              <div>
                <div className="text-[12px] font-bold">{r.l}</div>
                <div className="text-[11px] text-muted-foreground" dir="ltr" style={{ textAlign: "right" }}>{r.v}</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Support */}
      <Panel title="Support">
        <div className="flex flex-wrap gap-3">
          <button onClick={() => toast("مستندات باز شد")} className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-[13px] font-medium hover:bg-muted">
            <FontAwesomeIcon icon={faBook} className="text-xs" /> مستندات
          </button>
          <button onClick={() => toast("پشتیبانی باز شد")} className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-[13px] font-medium hover:bg-muted">
            <FontAwesomeIcon icon={faLifeRing} className="text-xs" /> پشتیبانی
          </button>
        </div>
      </Panel>

      {/* Footer */}
      <div className="border-t border-border pt-4 text-center text-[11px] text-muted-foreground">
        <span dir="ltr">YGuard v1.0.0</span> — ساخته شده توسط <span className="font-semibold" dir="ltr">Younes Gohari</span>
      </div>
    </div>
  );
}
