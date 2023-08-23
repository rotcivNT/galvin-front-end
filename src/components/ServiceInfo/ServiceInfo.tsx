/* eslint-disable @next/next/no-img-element */

const listSellPolicy = [
  {
    imgPath: '/ship-services.webp',
    title: 'Giao hàng miễn phí',
    subTitle: '(Sản phẩm trên 500k)',
  },
  {
    imgPath: '/clock.webp',
    title: 'Đổi trả miễn phí',
    subTitle: '(15 ngày)',
  },
  {
    imgPath: '/thanhtoan.webp',
    title: 'Thanh toán',
    subTitle: '(Chuyển khoản hoặc COD)',
  },
];

function ServiceInfo() {
  const titleStyles = 'text-[#F48914] font-medium';
  const subContentStyles = 'text-sm text-[#757575] font-normal';
  return (
    <div className="rounded-lg border border-[#757575] p-4">
      <div className="mb-2">
        <h3 className={titleStyles}>GỌI ĐỂ MUA HÀNG NHANH HƠN</h3>
        <p className="text-lg font-medium">
          1900.633.836 <span className={subContentStyles}>(9h00 - 18h00)</span>
        </p>
      </div>
      <div className="mb-2">
        <h3 className={titleStyles}>TƯ VẤN NHẬP BUÔN SỈ</h3>
        <p className="text-lg font-medium">
          0377609999 <span className={subContentStyles}>(buôn / sỉ)</span>
        </p>
      </div>
      <div className="mb-2">
        <h3 className={titleStyles}>CHÍNH SÁCH BÁN HÀNG</h3>
        <ul>
          {listSellPolicy.map((item) => (
            <li key={item.title} className="flex items-center gap-2 mb-1">
              <img src={item.imgPath} alt={item.title} />
              <p className="text-sm font-medium">
                {item.title} <span className={subContentStyles}>{item.subTitle}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ServiceInfo;
