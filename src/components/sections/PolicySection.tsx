/* eslint-disable @next/next/no-img-element */
const policyData = [
  {
    imgPath: '/ship-img.webp',
    title: 'FREESHIP COD với đơn hàng > 500k',
  },
  {
    imgPath: '/payment-img.webp',
    title: 'Thanh toán khi nhận hàng',
  },
  {
    imgPath: '/service-img.webp',
    title: 'Hỗ trợ tư vấn khách hàng 24/7',
  },
];
function PolicySection() {
  return (
    <div
      className="max-w-[980px] mx-auto my-[45px] border border-[#d5d4d4] 
    rounded-[8px] flex items-center justify-around lg:h-[90px] flex-wrap"
    >
      {policyData.map((item, index) => (
        <div className="text-center basis-full my-3 md:basis-4/12" key={index}>
          <img alt={item.title} className="w-[35px] inline-block" src={item.imgPath} />
          <p className="text-sm mt-[10px]">{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default PolicySection;
