'use client';
import { useState } from 'react';
import Button from '../Button/Button';
import { signOut } from 'next-auth/react';

const btnData = [
  {
    id: 1,
    title: 'Thông tin cá nhân',
  },
  {
    id: 2,
    title: 'Danh sách đơn hàng',
  },
  {
    id: 3,
    title: 'Đăng xuất',
  },
];

interface Props {
  clickBtn: number;
  handleClick: (type: number) => void;
}

function AccountSidebar({ clickBtn, handleClick }: Props) {
  return (
    <div className="px-4 border-r border-[#d9d9d9]">
      <h3 className="text-[30px] mb-5 font-bold font-mono">Ngọc Thắng</h3>
      {btnData.map((btn) => (
        <div key={btn.id} className="mb-4">
          <Button
            containerStyles={`${
              clickBtn === btn.id
                ? 'bg-black text-white'
                : 'bg-white border border-[#000] text-black'
            } h-10 text-left ] w-full px-5 rounded-2xl text-sm font-medium`}
            title={btn.title}
            onClick={() => handleClick(btn.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default AccountSidebar;
