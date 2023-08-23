'use client';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { formatVND } from '~/utils/formatVND';
import Button from '../Button/Button';
import LoadingSkeleton from '../Modal/CartModal/LoadingSkeleton';
import { voucherAPI } from '~/api/voucherAPI';

interface Props {
  products: any;
  voucherSelected: number;
  setVoucherSelected: (voucher: number) => void;
}
function CheckoutProduct({ products, voucherSelected, setVoucherSelected }: Props) {
  const [voucher, setVoucher] = useState('');
  let totalPrice = products.reduce((pre: number, cur: any) => {
    return pre + cur.price * cur.quantity;
  }, 0);
  const handeClickUseVoucher = async () => {
    const res = await voucherAPI.getVoucherByCode(voucher);
    if (res.data.data) {
      const length = res.data.data.code.length;
      const voucherValue = res.data.data.code.slice(length - 3, length - 1);

      setVoucherSelected(+voucherValue * 1000);
    }
  };

  return (
    <div className="px-5">
      <h3 className="text-[#231F20] text-[30px] font-semibold">Giỏ hàng</h3>
      <div>
        <div className="px-4">
          {products.length === 0
            ? [1, 2, 3, 4].map((item) => <LoadingSkeleton key={item} />)
            : products.map((product: any) => (
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
                      <span className="text-[18px] cursor-pointer">
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
              ))}
          <div>
            <div className="mt-5 flex items-center justify-between gap-[10px]">
              <input
                type="text"
                className="rounded-[4px] focus:border-[#338dbc] transition-all duration-300 basis-8/12 py-[6px] h-[40px] pl-3 pr-8 outline-none border-2 border-[#d9d9d9]"
                placeholder="Mã giảm giá"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
              />
              <Button
                title="Sử dụng"
                onClick={handeClickUseVoucher}
                containerStyles="bg-[#338dbc] basis-4/12 font-medium text-white text-sm rounded-[4px] px-6 block min-w-[104px] h-[40px]"
              />
            </div>
            <div className="mt-5 border-t border-[#d9d9d9] pb-5">
              <div className="flex items-center justify-between mt-5">
                <span className="text-sm text-[#717171] font-medium">Tiền sản phẩm: </span>
                <span className="text-sm text-[#4b4b4b]">{formatVND(totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-[#717171] font-medium">Phí vận chuyển: </span>
                <span className="text-sm text-[#4b4b4b]">{formatVND(30000)}</span>
              </div>
              <div className="mt-5 border-t border-[#d9d9d9]">
                <div className="flex items-center justify-between mt-5">
                  <span className="text-[#4b4b4b] font-medium">Tổng cộng: </span>
                  <span className="text-[#4b4b4b] font-medium">
                    {formatVND(totalPrice + 30000 - voucherSelected)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
