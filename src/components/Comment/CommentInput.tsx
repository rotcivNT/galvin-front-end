'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import Swal from 'sweetalert2';

interface Props {
  addComment: (content: string) => void;
}

function CommentInput({ addComment }: Props) {
  const [comment, setComment] = useState('');
  const session = useSession();
  const handleAddComment = async () => {
    if (session.status === 'unauthenticated') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải đăng nhập mới có thể nhận xét!',
      });
      return;
    }
    if (!comment.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nội dung nhận xét không được để trống!',
      });
      return;
    }
    addComment(comment);
    setComment('');
  };
  return (
    <div className="flex items-center gap-4 mt-[20px]">
      <Image
        className="rounded-full"
        src="/product-banner-1.webp"
        alt={'Avatar'}
        width={40}
        height={40}
        priority={true}
      />
      <div className="flex-1 flex items-center border-b border-[#ccc]">
        <input
          className="py-2 h-8 w-full outline-none text-[#2d2d2d]"
          type="text"
          placeholder="Bạn có nhận xét gì về sản phẩm này?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <span onClick={handleAddComment} className="text-[#2d2d2d] text-lg cursor-pointer">
          <IoSend />
        </span>
      </div>
    </div>
  );
}

export default CommentInput;
