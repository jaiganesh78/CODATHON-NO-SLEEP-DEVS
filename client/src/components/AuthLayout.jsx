import authBg from "../assets/auth-bg.jpg";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="hidden lg:block relative overflow-hidden">
          <img
            src={authBg}
            alt="Auth background"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* orange overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/60 via-orange-400/20 to-transparent" />

          <div className="absolute top-8 left-8 flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl bg-white/90 flex items-center justify-center font-black text-orange-500">
              ⚡
            </div>
            <div className="text-white font-semibold text-lg">Hackathon</div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>
            {subtitle ? (
              <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>
            ) : null}

            <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm border border-zinc-200">
              {children}
            </div>

            <p className="mt-6 text-center text-xs text-zinc-400">
              Built for speed. Designed to win.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
