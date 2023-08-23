'use client';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import Button from '../Button/Button';
import SuggestSize from './SuggestSize';
import { useState } from 'react';
// Wrapper sẽ là client Component -> nên sẽ nhận SuggestSize là con
// SuggestSize nên là sever component bởi vì nó render 1 ảnh

function SuggestSizeWrapper() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((pre) => !pre);
  };
  return (
    <div>
      <div className="mb-1 mt-3 flex justify-end">
        <Button
          containerStyles="flex items-center gap-2 py-1 px-[30px] border border-[#e5e5e5] text-[#5b5b5b]"
          title="+ Tìm cỡ của bạn"
          rightIcon={<BsFillQuestionCircleFill className="text-[#ffb400] text-[24px]" />}
          onClick={handleClick}
        />
      </div>
      <SuggestSize handleClickClose={handleClick} isOpen={open} />
    </div>
  );
}

export default SuggestSizeWrapper;
