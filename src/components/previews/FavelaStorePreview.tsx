import { Shirt, Glasses, Footprints } from "lucide-react";

export default function FavelaStorePreview() {
  return (
    <div className="flex h-full flex-col bg-[#f2f2f2] text-black">
      <div className="flex items-center gap-3 bg-black px-4 py-2.5">
        <div className="flex gap-2 text-[9px] font-extrabold italic tracking-tight">
          <span className="text-red-500">F</span>
          <span className="-ml-1.5 text-yellow-400">S</span>
        </div>
        <div className="h-2 flex-1 rounded-full bg-white/10" />
        <div className="h-3.5 w-3.5 rounded-full bg-accent/70" />
        <div className="h-4 w-10 rounded-full bg-white" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-3 w-28 rounded-full bg-black/80" />
            <div className="h-2 w-20 rounded-full bg-black/30" />
          </div>
          <div className="h-6 w-20 rounded-full bg-accent" />
        </div>
        <div className="mt-1 grid flex-1 grid-cols-3 gap-3">
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-black text-white">
            <Shirt className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-black text-white">
            <Glasses className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-black text-white">
            <Footprints className="h-6 w-6" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
