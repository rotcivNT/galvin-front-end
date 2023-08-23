/* eslint-disable @next/next/no-img-element */
'use client';
import { IoClose } from 'react-icons/io5';

interface SuggestSizeProps {
  handleClickClose: () => void;
  isOpen: boolean;
}

function SuggestSize({ handleClickClose, isOpen }: SuggestSizeProps) {
  let styles = 'invisible opacity-0';
  if (isOpen) {
    styles = 'visible opacity-1';
  }
  return (
    <div
      className={`${styles} lg:text-center fixed top-0 left-0 right-0 bottom-0 transition-all duration-500 px-12 py-12 z-[9999] bg-[rgba(0,0,0,0.8)]`}
    >
      <img className="lg:w-[500px] lg:inline-block" alt="size" src="/size-suggest.webp" />
      <span
        onClick={handleClickClose}
        className="absolute top-2 right-2 text-white text-[30px] cursor-pointer"
      >
        <IoClose />
      </span>
    </div>
  );
}

export default SuggestSize;
