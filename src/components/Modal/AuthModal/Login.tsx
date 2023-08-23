'use client';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Button from '~/components/Button/Button';
import { TypeModal } from '~/types';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import CircleLoading from '~/components/Loading/CircleLoading';

interface Props {
  setOpen: (type: TypeModal) => void;
}

function Login({ setOpen }: Props) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const handleOnChange = (type: string, value: string) => {
    setUserInfo((pre) => ({ ...pre, [type]: value }));
  };
  const handleLogin = async () => {
    setLoading(true);
    const res = await signIn('credentials', {
      ...userInfo,
      redirect: false,
    });
    setLoading(false);
  };
  return (
    <div className="mt-4">
      <input
        className="outline-none block px-5 py-1 border border-[#d9d9d9] font-bold font-mono placeholder:font-normal 
          placeholder:font-sans rounded-2xl w-full mb-4 h-10 focus:border-[#2f5acf] transition-all duration-200 text-[#231F20]"
        type="text"
        placeholder="Email/SĐT của bạn"
        onChange={(e) => handleOnChange('email', e.target.value)}
      />
      <input
        className="outline-none block px-5 py-1 border border-[#d9d9d9] font-bold font-mono placeholder:font-normal 
          placeholder:font-sans rounded-2xl w-full mb-4 h-10 focus:border-[#2f5acf] transition-all duration-200 text-[#231F20]"
        type="password"
        placeholder="Mật khẩu"
        onChange={(e) => handleOnChange('password', e.target.value)}
      />
      <Button
        containerStyles="w-full text-center bg-black text-white rounded-2xl h-10 py-1 font-mono font-bold 
          hover:bg-[#d9d9d9] hover:text-black transition-all duration-200 flex items-center justify-center gap-4"
        title="Đăng nhập"
        rightIcon={loading && <CircleLoading />}
        onClick={handleLogin}
      />
      <div className="my-4 flex items-center font-mono font-medium before:block before:flex-1 before:bg-[#ebebeb] before:h-[1px] after:flex-1 after:bg-[#ebebeb] after:h-[1px]">
        <span className="text-sm text-[#231F20]">Hoặc</span>
      </div>
      <div>
        <Button
          containerStyles="w-full flex items-center gap-2 mb-4 font-medium text-sm text-white bg-[#3B5998] h-10 rounded-2xl justify-center"
          title="Đăng nhập với Facebook"
          rightIcon={<FaFacebookSquare className="text-lg" />}
        />
        <Button
          containerStyles="w-full flex items-center gap-2 mb-4 font-medium text-sm text-black h-10 border border-[#ccc] rounded-2xl justify-center"
          title="Đăng nhập với Google"
          rightIcon={<FcGoogle className="text-lg" />}
        />
      </div>
      <div className="flex items-center justify-between">
        <Button
          title="Đăng ký tài khoản mới"
          containerStyles="text-[#2f5acf] text-sm font-medium"
          onClick={() => setOpen(TypeModal.SIGN_UP)}
        />
        <Button title="Quên mật khẩu" containerStyles="text-[#2f5acf] text-sm font-medium" />
      </div>
    </div>
  );
}

export default Login;
