import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
const data = [
  {
    imgPath: '/product-banner-1.webp',
    title: 'SIÊU SALE',
    subTitle: 'MUA NGAY',
    href: '',
  },
  {
    imgPath: '/product-banner-2.webp',
    title: 'PREMIUM CAO CẤP',
    subTitle: 'MUA NGAY',
    // Redirect đến polo premium page
    href: '/collection/8',
  },
];

function HomeProductBanner() {
  return (
    <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
      {data.map((item, index) => (
        <Link
          href={item.href}
          className="relative basis-full sm:basis-6/12"
          key={index}
        >
          <img alt={item.title} src={item.imgPath} />
          <p className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center text-white">
            <span className="text-xl font-medium block">{item.title}</span>
            <span className="text-sm">{item.subTitle}</span>
          </p>
        </Link>
      ))}
    </div>
  );
}

export default HomeProductBanner;
