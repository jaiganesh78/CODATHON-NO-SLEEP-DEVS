export default function Speedometer() {
  const value = 1050;
  const max = 1050;
  const angle = (value / max) * 180;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center">
      <div className="relative w-48 h-24 overflow-hidden">
        {/* Background Arc */}
        <div className="absolute w-48 h-48 border-[14px] border-red-200 rounded-full top-0 left-0" />

        {/* Filled Arc */}
        <div
          className="absolute w-48 h-48 border-[14px] border-red-500 rounded-full top-0 left-0"
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: "center bottom",
            clipPath: "inset(0 0 50% 0)",
          }}
        />

        {/* Value */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl font-bold text-orange-600">
          {value}+
        </div>
      </div>

      <p className="mt-3 text-lg font-semibold text-gray-700">
        Issues Resolved
      </p>
      <p className="text-sm text-gray-500">
        Trusted by citizens across the city
      </p>
    </div>
  );
}
