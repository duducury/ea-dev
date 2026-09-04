export default function UnitedFlooringPreview() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-2.5">
        <div className="h-2.5 w-24 rounded-full bg-[#1a2744]" />
        <div className="flex gap-2">
          <div className="h-2 w-8 rounded-full bg-black/15" />
          <div className="h-2 w-8 rounded-full bg-black/15" />
          <div className="h-2 w-8 rounded-full bg-black/15" />
        </div>
        <div className="h-5 w-16 rounded-full bg-[#c9a24b]" />
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#8a6644] via-[#5c3b23] to-[#2f1d10] px-6 text-center">
        <div className="h-3 w-36 rounded-full bg-white/90" />
        <div className="h-2 w-24 rounded-full bg-white/60" />
        <div className="mt-2 h-6 w-32 rounded-full bg-[#c9a24b]" />
      </div>
    </div>
  );
}
