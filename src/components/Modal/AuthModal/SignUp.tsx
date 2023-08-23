'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { userAPI } from '~/api/userAPI';
import Button from '~/components/Button/Button';
import Input from '~/components/Input/Input';
import { TypeModal, UserSignUpInfo } from '~/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './constants';
import CircleLoading from '~/components/Loading/CircleLoading';

interface Props {
  setOpen: (type: TypeModal) => void;
}
function SignUp({ setOpen }: Props) {
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpInfo>({ mode: 'onTouched', resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<UserSignUpInfo> = async (data) => {
    setLoading(true);
    const res = await userAPI.createUser(data);
    setMsg(res.data.msg);
    setLoading(false);
  };
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          id="fullName"
          placeholder="Nhập họ và tên của bạn"
          error={!!errors.fullName}
          errMsg={errors.fullName?.message}
        />
        <Input
          register={register}
          id="phone"
          placeholder="Nhập SĐT của bạn"
          error={!!errors.phone}
          errMsg={errors.phone?.message}
        />
        <Input
          register={register}
          id="email"
          placeholder="Nhập email của bạn"
          error={!!errors.email}
          errMsg={errors.email?.message}
        />
        <Input
          register={register}
          id="password"
          type="password"
          placeholder="Nhập mật khẩu"
          error={!!errors.password}
          errMsg={errors.password?.message}
        />
        <Input
          register={register}
          id="passwordConfirm"
          type="password"
          placeholder="Xác nhận mật khẩu"
          error={!!errors.passwordConfirm}
          errMsg={errors.passwordConfirm?.message}
        />
        <Button
          containerStyles="w-full text-center bg-black text-white rounded-2xl h-10 py-1 font-mono font-bold
      hover:bg-[#d9d9d9] hover:text-black transition-all duration-200 flex items-center justify-center gap-4"
          title="Đăng ký"
          rightIcon={loading && <CircleLoading />}
          type="submit"
        />
        {msg && <p className="text-[#ff2459] font-medium text-sm mx-4 mt-2 text-center">{msg}</p>}
      </form>
      <div className="my-4 flex items-center font-mono font-medium before:block before:flex-1 before:bg-[#ebebeb] before:h-[1px] after:flex-1 after:bg-[#ebebeb] after:h-[1px]">
        <span className="text-sm">Hoặc</span>
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
          title="Đăng nhập"
          containerStyles="text-[#2f5acf] text-sm font-medium"
          onClick={() => setOpen(TypeModal.LOGIN)}
        />
        <Button title="Quên mật khẩu" containerStyles="text-[#2f5acf] text-sm font-medium" />
      </div>
    </div>
  );
}

export default SignUp;
