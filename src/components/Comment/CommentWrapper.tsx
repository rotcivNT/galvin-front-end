'use client';

import { IoChatbubblesSharp } from 'react-icons/io5';
import Button from '../Button';
import Comment from './Comment';
import { useState } from 'react';
import CommentProvider from './store/CommentContext';

function CommentWrapper() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((pre) => !pre);
  };
  return (
    <CommentProvider>
      <div>
        <div className="fixed right-5 bottom-5 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] rounded-[999px] overflow-hidden">
          <Button
            title="Nhận xét"
            leftIcon={<IoChatbubblesSharp />}
            containerStyles="flex bg-white py-1 px-4 items-center gap-2 text-[#2d2d2d] font-medium"
            onClick={handleClick}
          />
        </div>
        <Comment open={open} handleClick={handleClick} />
      </div>
    </CommentProvider>
  );
}

export default CommentWrapper;
