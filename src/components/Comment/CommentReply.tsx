'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { memo, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import Swal from 'sweetalert2';

interface Props {
  replyComment: (content: string, parentID: string, replyFor: string) => void;
  parentID: string;
  replyFor: string;
}

function CommentReply({ replyComment, parentID, replyFor }: Props) {
  const [replyCmt, setReplyCmt] = useState(`@${replyFor} `);
  const session = useSession();
  const handleReplyComment = () => {
    if (session.status === 'unauthenticated') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn phải đăng nhập mới có thể phản hồi nhận xét!',
      });
      return;
    }
    if (!replyCmt.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nội dung nhận xét không được để trống!',
      });
      return;
    }
    const contentReply = replyCmt.replace(`@${replyFor} `, '');
    replyComment(contentReply, parentID, replyFor);
    setReplyCmt('');
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
          autoFocus
          className="py-2 h-8 w-full outline-none text-[#2d2d2d]"
          type="text"
          placeholder="Bạn có nhận xét gì về sản phẩm này?"
          onChange={(e) => setReplyCmt(e.target.value)}
          value={replyCmt}
        />
        <span onClick={handleReplyComment} className="text-[#2d2d2d] text-lg cursor-pointer">
          <IoSend />
        </span>
      </div>
    </div>
  );
}

export default CommentReply;
