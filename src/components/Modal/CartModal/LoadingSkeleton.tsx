function LoadingSkeleton() {
  return (
    <div className="py-3 flex gap-3 border-b border-[#ebebeb] last:border-b-0 animate-pulse ">
      <div className="w-[65px] h-[65px]">
        <div className="border border-[#ededed] block w-full h-full bg-slate-200"></div>
      </div>
      <div className="flex-1">
        <div className="mb-3 flex items-center justify-between ">
          <div className="w-full">
            <p className="text-xs text-[#333] font-bold h-4  w-full bg-slate-200"></p>
            <p className="text-xs text-[#333] mt-1 h-4 bg-slate-200 w-full"></p>
          </div>
          <span className="text-[18px] cursor-pointer"></span>
        </div>
        <p className="flex items-center justify-between h-6">
          <span className="min-w-[25px] h-[23px] rounded-[3px] text-center text-sm bg-[#f5f5f5] leading-[23px] inline-block"></span>
          <span className="bg-slate-200 w-[100px] h-full"></span>
        </p>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
