function ProductLoadingSke() {
  return (
    <div className="animate-pulse px-4 pb-4">
      <div className="w-full object-cover h-[288px] bg-slate-200" />
      <p className="text-sm text-[#2D2D2D] font-medium mt-3 h-5 bg-slate-200"></p>
      <p className="h-6 bg-slate-200">
        <span className="text-[#D20909] text-sm font-medium"></span>
        <span className="text-sm text-[#999] line-through font-medium ml-2"></span>
      </p>
    </div>
  );
}

export default ProductLoadingSke;
