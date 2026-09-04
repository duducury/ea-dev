export default function DoisAmoresPreview() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-[#3a0d1f] via-[#2a0a17] to-black">
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="h-2.5 w-28 rounded-full bg-white/80" />
        <div className="flex gap-2">
          <div className="h-2 w-6 rounded-full bg-white/25" />
          <div className="h-2 w-6 rounded-full bg-white/25" />
        </div>
        <div className="h-5 w-16 rounded-full bg-[#e0356f]" />
      </div>
      <div className="relative flex flex-1 items-center px-6">
        <div className="max-w-[65%] space-y-2">
          <div className="h-3 w-24 rounded-full bg-white" />
          <div className="h-3 w-16 rounded-full bg-[#e0356f]" />
          <div className="h-2 w-28 rounded-full bg-white/40" />
          <div className="mt-3 flex gap-2">
            <div className="h-5 w-20 rounded-full bg-[#e0356f]" />
            <div className="h-5 w-16 rounded-full border border-white/40" />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute right-6 h-20 w-20 rounded-full bg-[#e0356f]/40 blur-2xl"
        />
      </div>
    </div>
  );
}
