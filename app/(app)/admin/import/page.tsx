"use client";

import { Sparkles, Languages, Bot, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ImportFlow } from "@/components/features/admin/ImportFlow";
import { useT } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n/uz";

interface Feature {
  code: string;
  nameKey: DictKey;
  descKey: DictKey;
  Icon: typeof Sparkles;
}

const AI_FEATURES: Feature[] = [
  { code: "α", nameKey: "import.ai.gen.name", descKey: "import.ai.gen.desc", Icon: Sparkles },
  { code: "β", nameKey: "import.ai.checks.name", descKey: "import.ai.checks.desc", Icon: Bot },
  { code: "δ", nameKey: "import.ai.tr.name", descKey: "import.ai.tr.desc", Icon: Languages },
];

export default function AdminImportPage() {
  const { t } = useT();
  return (
    <>
      <PageHeader
        eyebrow={t("adminImport.eyebrow")}
        title={t("adminImport.title")}
        description={t("adminImport.desc")}
      />

      <ImportFlow />

      <div className="mt-8">
        <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-ink-mute mb-3">
          {t("adminImport.features")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {AI_FEATURES.map((f) => (
            <div key={f.code} className="card !p-4 flex items-start gap-3">
              <span className="h-9 w-9 rounded-xl bg-brand-50 text-brand-700 inline-flex items-center justify-center font-bold text-[15px] shrink-0">
                {f.code}
              </span>
              <div className="min-w-0">
                <div className="text-[13.5px] font-semibold leading-tight">{t(f.nameKey)}</div>
                <p className="text-[12.5px] text-ink-soft mt-1 leading-snug">{t(f.descKey)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card !p-4 mt-3 flex items-start gap-3 bg-brand-50/40 border-brand-100">
          <ShieldCheck size={18} className="text-success shrink-0 mt-0.5" />
          <p className="text-[12.5px] text-ink-soft">{t("adminImport.secure")}</p>
        </div>
      </div>
    </>
  );
}
