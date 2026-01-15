export default function CategoriesAndCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1 bg-white rounded-3xl p-6 h-[300px] shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800">Categories</h3>
        <div className="w-full h-[85%] mt-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200"></div>
      </div>
      <div className="bg-red-400 rounded-3xl h-[300px] shadow-lg shadow-red-200/50"></div>
      <div className="bg-cyan-400 rounded-3xl h-[300px] shadow-lg shadow-cyan-200/50"></div>
      <div className="bg-indigo-500 rounded-3xl h-[300px] shadow-lg shadow-indigo-200/50"></div>
    </div>
  );
}
