'use client';

import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

function AccountInfo() {
  const session = useSession();
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    if (session.data) {
      setValue('fullName', session.data.token.user.fullName);
      setValue('email', session.data.token.user.email);
      setValue('phone', session.data.token.user.phone);
      setValue('address', session.data.token.user.address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.data]);

  return (
    <div className="px-4">
      <h3 className="text-[30px] mb-5 font-bold font-mono">Thông tin tài khoản</h3>
      <div>
        <form>
          <div className="flex items-center">
            <span className="basis-3/12 mb-4 text-sm text-[#231F20] font-medium">Họ và tên</span>
            <div className="basis-8/12">
              <Input id="fullName" register={register} />
            </div>
          </div>
          <div className="flex items-center">
            <span className="w-[25%] mb-4 text-sm text-[#231F20] font-medium">Email</span>
            <div className="basis-8/12">
              <Input disabled id="email" register={register} />
            </div>
          </div>
          <div className="flex items-center">
            <span className="w-[25%] mb-4 text-sm text-[#231F20] font-medium">Số điện thoại</span>
            <div className="basis-8/12">
              <Input id="phone" register={register} />
            </div>
          </div>
          <div className="flex items-center">
            <span className="w-[25%] mb-4 text-sm text-[#231F20] font-medium">Địa chỉ</span>
            <div className="basis-8/12">
              <Input id="address" register={register} />
            </div>
          </div>
          <Button
            title="Cập nhập tài khoản"
            containerStyles="bg-[#2f5acf] h-10 px-8 text-white text-sm font-medium rounded-2xl mt-5 hover:bg-black hover:text-white 
            transition-all duration-300"
          />
        </form>
      </div>
    </div>
  );
}

export default AccountInfo;
