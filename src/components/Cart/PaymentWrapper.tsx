'use client';
import Image from 'next/image';
import styles from './Cart.module.css';
import Button from '../Button/Button';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

interface Props {
  payment: string;
  setPayment: (payment: string) => void;
}

const data = [
  {
    icon: '/logo-zalopay.svg',
    title: 'Ví điện tử ZaloPay',
  },
  {
    icon: '/COD.svg',
    title: 'Thanh toán khi nhận hàng',
  },
  {
    icon: '/momo-icon.webp',
    title: 'Thánh toán MoMo',
  },
  {
    icon: '/shopee-pay.webp',
    title: 'Ví Shopee Pay',
  },
];

function PaymentWrapper({ payment, setPayment }: Props) {
  const stylesWrapper = `${styles.payment} flex gap-4 items-center py-4 px-5 rounded-2xl border transition-all duration-200 hover:border-[#2f5acf] cursor-pointer mb-5`;
  return (
    <div className="px-2">
      <h3 className="mb-3">Hình thức thanh toán</h3>
      {data.map((item) => (
        <div
          key={item.title}
          className={`${stylesWrapper} ${
            payment === item.title ? 'border-[#2f5acf]' : 'border-[#d9d9d9]'
          }`}
          onClick={() => setPayment(item.title)}
        >
          {item.title === payment ? (
            <span className="flex justify-center items-center w-5 h-5 rounded-[50%] border border-[#2f5acf] ">
              <span className="block w-[10px] h-[10px] rounded-[50%] bg-[#2f5acf]"></span>
            </span>
          ) : (
            <span className="block w-5 h-5 rounded-[50%] border border-[#d9d9d9]"></span>
          )}
          {/* Hardcode */}
          <Image
            src={item.icon}
            alt=""
            width={50}
            height={50}
            className={`${item.title === 'Ví điện tử ZaloPay' ? 'w-auto' : 'w-[35px]'}`}
          />
          <span className="text-sm text-[#231F20] font-semibold">{item.title}</span>
        </div>
      ))}
      <div>
        <Button
          title={payment || 'Thánh toán'}
          type="submit"
          containerStyles="rounded-2xl w-full hover:bg-[#d9d9d9] hover:text-black transition-all duration-200 h-[56px] py-4 px-5 bg-black text-white text-center font-semibold"
        />
      </div>
    </div>
  );
}

export default PaymentWrapper;
