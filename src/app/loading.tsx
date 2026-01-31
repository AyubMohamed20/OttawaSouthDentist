export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8F3]">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo placeholder */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[#722F37]/20 border-t-[#722F37] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#722F37]/10" />
          </div>
        </div>

        {/* Loading text */}
        <p className="text-neutral-500 text-sm font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
