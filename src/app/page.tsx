import Image from 'next/image';
import Brands from '~/components/sections/Brands';
import HomeProductBanner from '~/components/sections/HomeProductBanner';
import NewProduct from '~/components/sections/NewProduct';
import PolicySection from '~/components/sections/PolicySection';
import Voucher from '~/components/sections/Voucher';

export default function Home() {
  return (
    <div className="lg:max-w-[960px] xl:max-w-6xl mx-auto">
      <div className="text-center">
        <Image
          src={'/banner.webp'}
          width={1080}
          height={700}
          priority={true}
          alt={'Banner Galvin'}
          className="inline-block"
        />
      </div>
      <div className="mx-5 md:mx-8">
        <PolicySection />
        <HomeProductBanner />
        <Voucher />
        <NewProduct />
        <Brands />
      </div>
    </div>
  );
}
