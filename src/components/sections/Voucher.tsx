'use client';
import { useEffect, useState } from 'react';
import { voucherAPI } from '~/api/voucherAPI';
import Button from '../Button/Button';

function Voucher() {
  const [title, setTitle] = useState(['']);
  const [vouchers, setVouchers] = useState([]);

  const handleCoppy = (data: string, index: number) => {
    navigator.clipboard.writeText(data);
    setTitle((pre) => {
      const updated = [...pre];
      updated[index] = 'Đã sao chép';
      return updated;
    });
  };

  useEffect(() => {
    const getVoucher = async () => {
      const res = await voucherAPI.getAllVoucher();
      setVouchers(res.data.data);

      setTitle(new Array(res.data.data.length).fill('Sao chép ngay'));
    };
    getVoucher();
  }, []);

  return (
    <div className="flex mt-10 overflow-scroll md:overflow-auto md:flex-wrap gap-3 md:gap-0 justify-between mb-8">
      {vouchers.map((voucher: any, index) => (
        <div
          key={voucher.id}
          className="bg-[#ffedf5] basis-full md:basis-[calc(50%-10px)] p-3 rounded-[10px] shrink-0 md:shrink-1 md:mb-5"
        >
          <div className="bg-[#fa0b0b] p-3 text-right rounded-lg">
            <p className="bg-white text-[#fa0b0b] uppercase py-1 text-center font-medium rounded-[4px] mb-2">
              {voucher.value}
            </p>
            <Button
              containerStyles="px-[10px] py-[3px] rounded-full text-[#fa0b0b] bg-white font-medium text-[12px]"
              title={title[index]}
              onClick={() => handleCoppy(voucher.code, index)}
            />
          </div>
          <p className="px-2 py-3 text-[12px]">Hạn sử dụng: 31/12/2023</p>
        </div>
      ))}
    </div>
  );
}

export default Voucher;
