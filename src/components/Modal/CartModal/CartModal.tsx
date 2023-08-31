/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Image from 'next/image';
import Button from '~/components/Button/Button';
import { IoClose } from 'react-icons/io5';
import { TypeModal } from '~/types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { userAPI } from '~/api/userAPI';
import { formatVND } from '~/utils/formatVND';
import LoadingSkeleton from './LoadingSkeleton';
import { useAppContext } from '~/context/useAppContext';
import { descQuantityCart, setQuantityCart } from '~/context/reducer/actions';
import Link from 'next/link';
import EmptyContent from './EmptyContent';

interface Props {
  open: TypeModal;
  setOpen: (type: TypeModal) => void;
}
interface ProductCart {
  id: number;
  userID: number;
  productID: string;
  price: number;
  thumbnail: string;
  quantity: number;
  sizeValue: string;
  colorValue: string;
  productName: string;
}
function CartModal({ open, setOpen }: Props) {
  const { dispatch } = useAppContext();
  const [products, setProducts] = useState<ProductCart[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();
  let totalPrice = 0;
  const handleClickDelete = async (id: number) => {
    const res = await userAPI.deleteProductToCart(id);
    if (res.data.code === 0) {
      dispatch(descQuantityCart());
      fetchData();
    }
  };
  const fetchData = async () => {
    setLoading(true);
    const res = await userAPI.getProdutCart(session.data?.token.user.id);
    setProducts(res.data.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    totalPrice = products.reduce((pre: number, cur: any) => {
      return pre + cur.price * cur.quantity;
    }, 0);
  }, [session.data]);

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.7)]"></div>
      <div className="right-0 transition-all duration-500 fixed top-0 bottom-0 min-w-[400px] bg-white z-[999] px-4 py-5 font-mono">
        <p
          className="font-mono text-[#222] py-4 pl-5 pr-3 border-b border-[rgba(129,127,129,0.2)] 
        flex items-center justify-between"
        >
          GIỎ HÀNG
          <span onClick={() => setOpen(TypeModal.NONE)} className="text-[24px] cursor-pointer">
            <IoClose />
          </span>
        </p>
        <div className="px-4">
          {loading ? (
            [1, 2, 3, 4].map((item) => <LoadingSkeleton key={item} />)
          ) : products.length !== 0 ? (
            products.map((product) => (
              <div
                key={product.colorValue + product.sizeValue + product.productName}
                className="py-3 flex gap-3 border-b border-[#ebebeb] last:border-b-0"
              >
                <div className="w-[65px] h-[65px]">
                  <Image
                    width={65}
                    height={65}
                    src={product.thumbnail}
                    className="border border-[#ededed] block w-full h-full"
                    alt="Galvin Logo"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#333] font-bold">{product.productName}</p>
                      <p className="text-xs text-[#333] mt-1">
                        {product.colorValue} / {product.sizeValue}
                      </p>
                    </div>
                    <span
                      onClick={() => handleClickDelete(product.id)}
                      className="text-[18px] cursor-pointer"
                    >
                      <IoClose />
                    </span>
                  </div>
                  <p className="flex items-center justify-between">
                    <span className="min-w-[25px] h-[23px] rounded-[3px] text-center text-sm bg-[#f5f5f5] leading-[23px] inline-block">
                      {product.quantity}
                    </span>
                    <span>{formatVND(product.price)}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <EmptyContent />
          )}
        </div>
        {/* Button */}
        <div className="mt-2 pt-5 px-4 border-t border-[rgba(129,127,129,0.2)]">
          <div className="flex items-center justify-between">
            <span>TỔNG TIỀN</span>
            <span className="font-semibold text-red-500">{formatVND(totalPrice)}</span>
          </div>
          <Link
            scroll={false}
            href="/cart"
            onClick={() => setOpen(TypeModal.NONE)}
            className="inline-block uppercase text-xs text-white min-w-[200px] text-center bg-black rounded-2xl mt-5 py-[6px]"
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartModal;
