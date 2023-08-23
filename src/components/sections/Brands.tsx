/* eslint-disable @next/next/no-img-element */
function Brands() {
  return (
    <div className="py-8">
      <h3 className="text-center text-[40px] font-medium mb-12">
        <span className="border-b-4 pb-1 border-[#3A3A3A] font-[SVN]">THƯƠNG HIỆU</span>
      </h3>
      <div className="flex items-center justify-center gap-5">
        <div className="basis-3/12">
          <img alt="" src="/brand_img1.webp" />
        </div>
        <div className="basis-3/12">
          <img alt="" src="/brand_img2.webp" />
        </div>
        <div className="basis-3/12">
          <img alt="" src="/brand_img4.webp" />
        </div>
        <div className="basis-3/12">
          <img alt="" src="/brand_img5.webp" />
        </div>
      </div>
    </div>
  );
}

export default Brands;
