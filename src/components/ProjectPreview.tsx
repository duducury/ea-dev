import type { ReactNode } from "react";

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function ProjectPreview({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border">
      <div className="flex items-center gap-2 border-b border-border-strong bg-surface px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <div className="ml-3 flex-1 truncate rounded-full bg-black/60 px-3 py-1 text-[10px] text-text-secondary">
          {hostnameOf(url)}
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
