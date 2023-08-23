/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { productAPI } from '~/api/productAPI';
import ProductCard from '~/components/ProductCard/ProductCard';
import { CategoryItemProps } from '~/types';

const getFirstProduct = async (cateId: number) => {
  const res = await productAPI.getFirstProduct(cateId);
  return res.data.data;
};

async function MegaSub({ subItem }: { subItem: CategoryItemProps[] }) {
  const product = await getFirstProduct(subItem[1].id);

  return (
    <li className="flex">
      <div className="basis-3/12 border-r border-[#ccc]">
        <span className="text-sm text-[#2D2D2D] font-medium border-b border-[#333] pb-[1px] ">
          SHOP BY BRAND
        </span>
        <ul className="mt-3">
          {/* <li className="flex items-center gap-2 pb-2">
            <img
              className="w-[30px] h-[30px] rounded-full border border-[#ccc]"
              src="https://file.hstatic.net/200000386961/collection/sm_31e0c0c4c0464332be2d04a3eef77c4c_small.png"
              alt="logo"
            />
            <Link
              className="text-sm text-black border-b border-[#ccc] py-2 transition-all hover:text-[#fcce6f]"
              href="/"
            >
              ÁO SƠ MI
            </Link>
          </li> */}
          {subItem.map((item) => (
            <li key={item.id} className="flex items-center gap-2 pb-2">
              <img
                className="w-[30px] h-[30px] rounded-full border border-[#ccc]"
                src={item.imagePath || ''}
                alt={item.categoryName}
              />
              <Link
                className="text-sm text-black border-b border-[#ccc] py-2 transition-all hover:text-[#fcce6f]"
                href={`/collections/${item.id}`}
              >
                {item.categoryName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="basis-9/12 flex">
        <div className="basis-4/12 px-5">
          <ProductCard
            id={product[0].id}
            productName={product[0].productName}
            price={product[0].price}
            saleOff={product[0].saleOff}
            thumbnail={product[0].thumbnail}
          />
        </div>
      </div>
    </li>
  );
}

export default MegaSub;
