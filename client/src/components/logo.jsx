const Logo = ({ white = false }) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-lg shadow-blue-500/30`}
      >
        M
      </div>

      <div className="leading-tight">
        <h1
          className={`text-xl font-extrabold tracking-wide ${
            white ? "text-white" : "text-slate-900"
          }`}
        >
          MEDCARE
        </h1>

        <p className="text-xs font-medium text-slate-500">
          AI Healthcare Platform
        </p>
      </div>
    </div>
  );
};

export default Logo;