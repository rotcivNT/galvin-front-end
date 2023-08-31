import Image from 'next/image';
import { voucherAPI } from '~/api/voucherAPI';
import Brands from '~/components/sections/Brands';
import HomeProductBanner from '~/components/sections/HomeProductBanner';
import NewProduct from '~/components/sections/NewProduct';
import PolicySection from '~/components/sections/PolicySection';
import Voucher from '~/components/sections/Voucher';

const getAllVoucher = async () => {
  const res = await voucherAPI.getAllVoucher();
  return res.data.data;
};

export default async function Home() {
  const vouchers = await getAllVoucher();
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
        <Voucher vouchers={vouchers} />
        <NewProduct />
        <Brands />
      </div>
    </div>
  );
}
