'use client';
/* eslint-disable @next/next/no-img-element */

import 'swiper/css';
import 'swiper/css/navigation';

function ProductDetailLoading() {
  return (
    <>
      <div className="basis-full overflow-hidden pb-10 lg:basis-7/12 animate-pulse">
        <div className="w-full h-[600px] bg-slate-200"></div>
        <div className="overflow-x-auto mt-4 flex mx-[-8px]">
          {Array(4)
            .fill(0)
            .map((item, index) => (
              <div key={index} className="basis-3/12 mx-2 bg-slate-200 h-[160px]"></div>
            ))}
        </div>
      </div>
      <div className="basis-full lg:basis-7/12 animate-pulse">
        <div className="pb-5">
          <h3 className="h-7 bg-slate-200 mb-3"></h3>
          <p className="h-[75px] bg-slate-200"></p>
        </div>

        {Array(4)
          .fill(0)
          .map((item, index) => (
            <div key={index} className="mb-3 h-8 bg-slate-200"></div>
          ))}
      </div>
    </>
  );
}

export default ProductDetailLoading;
