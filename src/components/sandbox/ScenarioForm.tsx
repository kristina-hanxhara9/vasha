"use client";

import { useMemo, useState } from "react";
import type { Scenario, UploadFile } from "@/lib/types";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Spinner } from "@/components/ui/misc";

const inputClass =
  "w-full rounded-xl border border-plum-200 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-muted/70 focus:border-plum-400 focus:ring-2 focus:ring-plum-200";

const MAX_FILE_BYTES = 4_000_000;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1] || "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ScenarioForm({
  scenario,
  onSubmit,
  onBack,
  busy,
  initialValues,
}: {
  scenario: Scenario;
  onSubmit: (values: Record<string, string>, files: UploadFile[]) => void;
  onBack: () => void;
  busy: boolean;
  initialValues?: Record<string, string>;
}) {
  const { t, loc } = useI18n();

  const init = useMemo(() => {
    const o: Record<string, string> = {};
    for (const f of scenario.fields) {
      if (f.type === "select") o[f.name] = f.options?.[0]?.sq ?? "";
      else if (f.type !== "file") o[f.name] = "";
    }
    return { ...o, ...(initialValues || {}) };
  }, [scenario, initialValues]);

  const [values, setValues] = useState<Record<string, string>>(init);
  const [files, setFiles] = useState<Record<string, UploadFile>>({});
  const [fileError, setFileError] = useState("");
  const set = (name: string, v: string) => setValues((p) => ({ ...p, [name]: v }));

  const onFile = async (name: string, file: File | undefined) => {
    setFileError("");
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setFileError(loc({ sq: "Skedari është shumë i madh (maks. 4MB).", en: "File is too large (max 4MB)." }));
      return;
    }
    const data = await fileToBase64(file);
    setFiles((p) => ({ ...p, [name]: { name: file.name, mimeType: file.type || "application/octet-stream", data } }));
  };

  const canSubmit = scenario.fields.every((f) => {
    if (!f.required) return true;
    if (f.type === "file") return Boolean(files[f.name]);
    return Boolean(values[f.name]?.trim());
  });

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-plum-700"
      >
        <Icon name="ChevronRight" className="h-4 w-4 rotate-180" aria-hidden="true" />
        {t("sandbox.chooseAnother")}
      </button>

      <div className="mt-3 flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-plum-50 text-plum-500">
          <Icon name={scenario.icon} className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold text-plum-700">{loc(scenario.title)}</h2>
          <p className="text-sm text-muted">{loc(scenario.description)}</p>
        </div>
      </div>

      <form
        className="mt-5 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit && !busy) onSubmit(values, Object.values(files));
        }}
      >
        {scenario.fields.map((f) => (
          <div key={f.name}>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">
              {loc(f.label)}
              {f.required ? <span className="text-plum-400"> *</span> : null}
            </label>

            {f.type === "file" ? (
              <FileField
                accept={f.accept}
                file={files[f.name]}
                onPick={(file) => onFile(f.name, file)}
                onClear={() => setFiles((p) => { const n = { ...p }; delete n[f.name]; return n; })}
              />
            ) : f.type === "textarea" ? (
              <textarea
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder={f.placeholder ? loc(f.placeholder) : undefined}
                rows={4}
                className={inputClass}
              />
            ) : f.type === "select" ? (
              <select
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={inputClass}
              >
                {f.options?.map((opt, i) => (
                  <option key={i} value={opt.sq}>
                    {loc(opt)}
                  </option>
                ))}
              </select>
            ) : (
              <input
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder={f.placeholder ? loc(f.placeholder) : undefined}
                className={inputClass}
              />
            )}
          </div>
        ))}

        {fileError ? <p className="text-xs text-red-700">{fileError}</p> : null}

        {scenario.fields.some((f) => f.type === "file") ? (
          <p className="flex items-start gap-1.5 text-xs text-muted">
            <Icon name="ShieldCheck" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-plum-400" aria-hidden="true" />
            {loc({
              sq: "Foto/dokumenti yt nuk ruhet — përdoret vetëm për t'u përgjigjur, pastaj fshihet.",
              en: "Your photo/document isn't stored — it's used only to answer, then deleted.",
            })}
          </p>
        ) : null}

        <Button type="submit" disabled={!canSubmit || busy} fullWidth size="lg">
          {busy ? (
            <>
              <Spinner /> {t("sandbox.generating")}
            </>
          ) : (
            <>
              <Icon name="Sparkles" className="h-4 w-4" aria-hidden="true" /> {t("sandbox.generate")}
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

function FileField({
  accept,
  file,
  onPick,
  onClear,
}: {
  accept?: string;
  file?: UploadFile;
  onPick: (file: File | undefined) => void;
  onClear: () => void;
}) {
  const { loc } = useI18n();
  const isImage = file?.mimeType.startsWith("image/");

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-plum-200 bg-white p-3">
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`data:${file.mimeType};base64,${file.data}`}
            alt=""
            className="h-12 w-12 rounded-lg object-cover"
          />
        ) : (
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-plum-50 text-plum-500">
            <Icon name="FileText" className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
        <p className="min-w-0 flex-1 truncate text-sm text-charcoal">{file.name}</p>
        <button type="button" onClick={onClear} aria-label="remove" className="text-muted hover:text-plum-600">
          <Icon name="X" className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-plum-300 bg-white px-3 py-4 text-sm font-medium text-plum-600 transition-colors hover:bg-plum-50">
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onPick(e.target.files?.[0])}
      />
      <Icon name="Upload" className="h-4 w-4" aria-hidden="true" />
      {loc({ sq: "Ngarko foto ose PDF", en: "Upload photo or PDF" })}
    </label>
  );
}
