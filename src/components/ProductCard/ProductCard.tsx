import Image from 'next/image';
import Link from 'next/link';
import { ProductCardProps } from '~/types';
import { formatVND } from '~/utils/formatVND';

/* eslint-disable @next/next/no-img-element */
function ProductCard({ id, productName, price, saleOff, thumbnail }: ProductCardProps) {
  const realPerPrice = price - price * (saleOff / 100);
  const newPrice = formatVND(realPerPrice);
  const oldPrice = formatVND(price);
  return (
    <Link replace className="mb-4 px-4 block font-[PNSemiBold]" href={`/product/${id}`}>
      <Image src={thumbnail} alt={productName} width={200} height={200} className="w-full" />
      <p className="text-sm text-[#2D2D2D] font-medium mt-3 h-10">{productName}</p>
      <p>
        <span className="text-[#D20909] text-sm font-medium">{newPrice}</span>
        <span className="text-sm text-[#999] line-through font-medium ml-2">{oldPrice}</span>
      </p>
    </Link>
  );
}

export default ProductCard;
