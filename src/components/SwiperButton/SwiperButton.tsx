'use client';
import { useState } from 'react';
import Button from '../Button/Button';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useSwiper } from 'swiper/react';

function SwiperButton() {
  const swiper = useSwiper();

  return (
    <>
      <Button
        title=""
        icon={<FiChevronLeft />}
        onClick={() => swiper.slidePrev()}
        containerStyles=" absolute flex items-center justify-center top-[50%] left-0 z-[999] text-[30px] translate-y-[-50%] w-8 h-8 bg-white border border-black"
      />
      <Button
        title=""
        icon={<FiChevronRight />}
        onClick={() => swiper.slideNext()}
        containerStyles=" absolute flex items-center justify-center top-[50%] right-0 z-[999] text-[30px] translate-y-[-50%] w-8 h-8 bg-white border border-black"
      />
    </>
  );
}

export default SwiperButton;
