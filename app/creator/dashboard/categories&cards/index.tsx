export default function CategoriesAndCards() {
  return (
    // grid-cols-5 kar diya taaki Categories 2 columns le sake (zyada width)
    <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
      {/* Categories Container: Isay col-span-2 kiya taaki width barh jaye */}
      <div className="md:col-span-2 bg-white rounded-3xl p-6 h-[320px] shadow-sm border border-slate-100 transition-all">
        <h3 className="font-bold text-slate-800">Categories</h3>
        <div className="w-full h-[85%] mt-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200"></div>
      </div>

      {/* Stats Cards: Inki height 300 se 280 kar di (thori kam) */}
      <div className="bg-red-400 rounded-3xl h-[280px] shadow-lg shadow-red-200/50"></div>
      <div className="bg-cyan-400 rounded-3xl h-[280px] shadow-lg shadow-cyan-200/50"></div>
      <div className="bg-indigo-500 rounded-3xl h-[280px] shadow-lg shadow-indigo-200/50"></div>
    </div>
  );
}
