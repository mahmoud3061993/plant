"use client";

import type { ReactNode } from "react";

export function WizardShell({
  title,
  subtitle,
  step,
  total,
  onBack,
  children,
}: {
  title: string;
  subtitle?: string;
  step: number;
  total: number;
  onBack?: () => void;
  children: ReactNode;
}) {
  const percent = Math.round((step / Math.max(total, 1)) * 100);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <p className="text-sm font-bold text-leaf">{title}</p>
      {subtitle ? <p className="mt-2 text-sm leading-7 text-muted">{subtitle}</p> : null}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs font-bold text-muted">
          <span>
            خطوة {step} من {total}
          </span>
          <span>{percent}٪</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-leaf transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="mt-5 inline-flex min-h-12 items-center rounded-full border border-line bg-card px-5 text-sm font-bold text-leaf-dark"
        >
          رجوع
        </button>
      ) : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function ChoiceButton({
  label,
  selected,
  onClick,
  icon,
}: {
  label: string;
  selected?: boolean;
  onClick: () => void;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-14 w-full items-center gap-3 rounded-[1.25rem] border px-4 text-right text-base font-semibold leading-7 transition ${
        selected
          ? "border-leaf bg-leaf-soft text-leaf-dark"
          : "border-line bg-card text-foreground hover:border-leaf/40"
      }`}
    >
      {icon ? <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-leaf-soft">{icon}</span> : null}
      <span className="flex-1">{label}</span>
    </button>
  );
}

export function ChoiceList({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string; icon?: ReactNode }[];
  value?: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid gap-3">
      {options.map((option) => (
        <ChoiceButton
          key={option.id}
          label={option.label}
          icon={option.icon}
          selected={value === option.id}
          onClick={() => onChange(option.id)}
        />
      ))}
    </div>
  );
}

export function ResultCard({
  children,
  tone = "leaf",
}: {
  children: ReactNode;
  tone?: "leaf" | "earth" | "clay";
}) {
  const cls =
    tone === "clay"
      ? "border-clay/20 bg-clay-soft"
      : tone === "earth"
        ? "border-line bg-earth-soft"
        : "border-leaf/20 bg-leaf-soft";
  return <section className={`rounded-[1.75rem] border p-5 leading-8 ${cls}`}>{children}</section>;
}
