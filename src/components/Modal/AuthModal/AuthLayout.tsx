import { TypeModal } from '~/types';
import Login from './Login';
import SignUp from './SignUp';
import { IoCloseOutline } from 'react-icons/io5';
import { useState } from 'react';

interface Props {
  open: TypeModal;
  setOpen: (type: TypeModal) => void;
}

function AuthLayout({ open, setOpen }: Props) {
  let styles = 'top-[70%] opacity-0 invisible';
  if (open !== TypeModal.NONE && open !== TypeModal.CART_MODAL) {
    styles = 'top-[50%] opacity-100 visible transition-all duration-500';
  }
  return (
    <>
      {open !== TypeModal.NONE && open !== TypeModal.CART_MODAL && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.6)]"></div>
      )}
      <div
        className={`${styles} overflow-auto z-[999] fixed rounded-2xl left-[50%] w-full max-w-[600px] min-h-[50vh] max-h-[95vh] translate-x-[-50%] 
        translate-y-[-50%] bg-white p-8`}
      >
        <h3 className="text-[30px] text-[#231F20] font-medium font-mono text-center mb-4">
          {open === TypeModal.LOGIN ? 'Đăng Nhập' : 'Đăng Ký'}
        </h3>
        <p className="text-[14px] font-medium text-center text-[#231F20]">
          Chào mừng bạn đến với Galvin. Hãy đăng nhập/đăng ký để có thể mua các sản phẩm của Galvin.
        </p>
        {open === TypeModal.LOGIN && <Login setOpen={setOpen} />}
        {open === TypeModal.SIGN_UP && <SignUp setOpen={setOpen} />}
        <span
          className="absolute top-5 right-5 text-[26px] p-2 cursor-pointer"
          onClick={() => setOpen(TypeModal.NONE)}
        >
          <IoCloseOutline />
        </span>
      </div>
    </>
  );
}

export default AuthLayout;
