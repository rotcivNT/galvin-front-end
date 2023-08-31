'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiHeart, FiShoppingBag, FiUser } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { TypeModal } from '~/types';
import Button from '../Button/Button';
import MobileMenu from '../MobileMenu/MobileMenu';
import AuthLayout from '../Modal/AuthModal/AuthLayout';
import SearchInput from '../SearchInput/SearchInput';
import { useSession } from 'next-auth/react';
import CartModal from '../Modal/CartModal/CartModal';
import { useAppContext } from '~/context/useAppContext';

function Header({ children }: { children: React.ReactNode }) {
  const [openMobileSearch, setOpenMobileSearch] = useState(false);
  const [openModal, setOpenModal] = useState<TypeModal>(TypeModal.NONE);
  const session = useSession();
  const { state } = useAppContext();
  const handleClickOpenSearch = () => {
    setOpenMobileSearch((pre) => !pre);
  };
  const handleOpenCart = () => {
    if (session.status === 'authenticated') {
      setOpenModal(TypeModal.CART_MODAL);
    } else {
      setOpenModal(TypeModal.LOGIN);
    }
  };
  useEffect(() => {
    if (session.status === 'authenticated') {
      setOpenModal(TypeModal.NONE);
    }
  }, [session]);
  return (
    <>
      <div className="w-full bg-[#343631] fixed top-0 z-50">
        <div className="px-3 lg:px-0 max-w-6xl mx-5 md:mx-8 h-[50px] xl:mx-auto flex items-center lg:justify-between relative">
          <MobileMenu />
          <div className="pl-4 lg:pl-0">
            <Image width={180} height={70} src={'/logo.webp'} priority={true} alt="Galvin Logo" />
          </div>
          <ul className="hidden xl:flex items-center h-full">
            <li className="h-full">
              <Link
                className="w-[80px] h-full text-white font-medium text-sm text-center bg-[#514f4f] flex items-center justify-center "
                href={'/'}
              >
                NAM
              </Link>
            </li>
            <li className="h-full">
              <Link
                className="w-[80px] h-full text-white font-medium text-sm text-center hover:bg-[#514f4f] flex items-center justify-center transition duration-200"
                href={'/'}
              >
                NỮ
              </Link>
            </li>
          </ul>
          <SearchInput isOpenMobile={openMobileSearch} />
          <div>
            <span className="hidden xl:inline text-white text-sm font-medium">
              Đăng ký giảm ngay 10%
            </span>
          </div>
          <div className="flex-1 lg:flex-none gap-3 justify-end flex items-center xl:gap-2">
            {session.status === 'unauthenticated' ? (
              <Button
                onClick={() => setOpenModal(TypeModal.LOGIN)}
                containerStyles="text-[26px] text-white"
                title=""
                icon={<FiUser />}
              />
            ) : (
              <Link className="text-[26px] text-white" scroll={false} href="/account/info">
                <FiUser />
              </Link>
            )}
            <Link className="text-[26px] text-white" scroll={false} href={'/'}>
              <FiHeart />
            </Link>
            <div className="relative">
              <Button
                title=""
                icon={<FiShoppingBag />}
                containerStyles="text-[26px] text-white block"
                onClick={handleOpenCart}
              />
              <span
                className="absolute top-[-10px] right-[-10px] bg-black block text-center 
              font-bold text-sm text-white w-[24px] h-[24px] rounded-[100%]"
              >
                {state.quantityCarts}
              </span>
            </div>
            <Button
              title=""
              onClick={handleClickOpenSearch}
              icon={<GoSearch />}
              containerStyles="text-[26px] text-white lg:hidden"
            />
          </div>
        </div>
        <div className="hidden lg:block border-solid border-t-[1px] border-[#a3a3a3]">
          {children}
        </div>
      </div>
      {openModal !== TypeModal.CART_MODAL && openModal !== TypeModal.NONE && (
        <AuthLayout open={openModal} setOpen={setOpenModal} />
      )}
      {openModal === TypeModal.CART_MODAL && <CartModal open={openModal} setOpen={setOpenModal} />}
    </>
  );
}

export default Header;
