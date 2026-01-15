export default function VedioAndAchivemnet() {
  return (
    <div className="col-span-12 lg:col-span-3 border-2 rounded-2xl md:rounded-[0px] md:border-l-0 md:border-t-0 md:border-r-1 space-y-8 bg-[#FCFBFF]">
      <div className="p-6 md:px-0 h-[600px]">
        <div className="px-6">
          <h3 className="font-bold mb-4 text-slate-800">Recent Videos</h3>
        </div>
        <div className="w-full h-[90%] rounded-2xl border-0 border-dashed flex items-center justify-center text-slate-400">
          Video Container
        </div>
      </div>
      <div className="bg-[#FFFFFF] border-t-1 p-6 md:px-0 h-[230px]">
        <div className="md:px-6">
          <h3 className="font-bold mb-4 text-slate-800">New Achievement</h3>
        </div>
        <div className="w-full h-[70%] rounded-2xl flex items-center justify-center text-indigo-300">
          Achievement Box
        </div>
      </div>
    </div>
  );
}
