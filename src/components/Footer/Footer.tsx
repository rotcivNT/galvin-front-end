/* eslint-disable @next/next/no-img-element */
import { IoLocationOutline, IoMailUnreadOutline } from 'react-icons/io5';
import { AiOutlinePhone } from 'react-icons/ai';
import Link from 'next/link';
const infoData = [
  {
    title: 'Địa chỉ:',
    subTitle: 'Số 47, Ngõ 16 Đường Hoàng Cầu, Quận Đống Đa, TP.Hà Nội',
    icon: <IoLocationOutline />,
  },
  {
    title: 'Điện thoại:',
    subTitle: 'Mua hàng online: 1900633836 | Góp ý, khiếu nại: 0377609999',
    icon: <AiOutlinePhone />,
  },
  {
    title: 'Email:',
    subTitle: 'info@galvin.com.vn',
    icon: <IoMailUnreadOutline />,
  },
];
const servicesData = [
  {
    title: 'Giới thiệu',
    href: '',
  },
  {
    title: 'Chính sách đổi trả',
    href: '',
  },
  {
    title: 'Chính sách bảo mật',
    href: '',
  },
  {
    title: 'Điều khoản dịch vụ',
    href: '',
  },
];
function Footer() {
  return (
    <div className="bg-[#343631] py-8">
      <div className="lg:max-w-[960px] xl:max-w-6xl mx-auto">
        <div className="mx-5 md:mx-8 flex flex-col md:flex-row gap-5 pb-[120px]">
          <div className="md:basis-3/12">
            <img className="w-[263px]" alt="Galvin" src="/logo.webp" />
          </div>
          {infoData.map((item) => (
            <div
              className="text-white flex gap-4 items-center md:basis-3/12 md:items-start"
              key={item.title}
            >
              <span className="text-xl">{item.icon}</span>
              <div className="text-sm">
                <p className="mb-1">{item.title}</p>
                <p>{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div>
        <div className="pt-8 text-center">
          {servicesData.map((item) => (
            <Link
              scroll={false}
              className="text-white text-sm uppercase px-2 border-r border-[#999] last:border-none inline-block"
              href={item.href}
              key={item.title}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <p className="text-[12px] text-white text-center mt-2"> Copyright © 2023 Galvin</p>
      </div>
    </div>
  );
}

export default Footer;
