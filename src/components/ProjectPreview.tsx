import type { LucideIcon } from "lucide-react";

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function ProjectPreview({
  url,
  Icon,
  accent = false,
}: {
  url: string;
  Icon: LucideIcon;
  accent?: boolean;
}) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-[#050505]">
      <div className="flex items-center gap-2 border-b border-border-strong bg-surface px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <div className="ml-3 flex-1 truncate rounded-full bg-black/60 px-3 py-1 text-[10px] text-text-secondary">
          {hostnameOf(url)}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <div className="h-2 w-16 rounded-full bg-border-strong" />
          <div className="flex gap-2">
            <div className="h-2 w-6 rounded-full bg-border-strong" />
            <div className="h-2 w-6 rounded-full bg-border-strong" />
            <div className="h-2 w-6 rounded-full bg-border-strong" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded-full bg-text/70" />
          <div className="h-4 w-1/2 rounded-full bg-text/40" />
        </div>

        <div className={`h-7 w-28 rounded-full ${accent ? "bg-accent" : "bg-border-strong"}`} />

        <div className="mt-auto grid grid-cols-3 gap-3">
          <div className="aspect-square rounded-lg border border-border-strong bg-surface" />
          <div className="flex aspect-square items-center justify-center rounded-lg border border-accent/50 bg-surface">
            <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
          </div>
          <div className="aspect-square rounded-lg border border-border-strong bg-surface" />
        </div>
      </div>
    </div>
  );
}
