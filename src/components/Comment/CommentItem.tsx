/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import { Comments } from '~/types';
import Button from '../Button/Button';
import { memo, useContext, useEffect, useState } from 'react';

interface Props {
  comment: Comments;
  handleClickReply: (commentID: string, replyFor: string) => void;
}

function CommentItem({ comment, handleClickReply }: Props) {
  const miliseconds = new Date().getTime() - comment.createdAt.toDate().getTime();
  // Xư lý re-render mỗi 1p
  const [count, setCount] = useState(0);
  const handleTime = () => {
    const minutes = Math.floor(miliseconds / (1000 * 60));
    if (minutes < 60) {
      return `${minutes} phút trước`;
    } else {
      const hours = Math.floor(minutes / 60);
      if (hours < 24) {
        return `${hours} giờ trước`;
      } else {
        const days = Math.floor(hours / 24);
        // Handle tạm all tháng 30 ngày
        if (days < 30) {
          return `${days} ngày trước`;
        } else {
          const months = Math.floor(days / 30);
          if (months < 12) {
            return `${months} tháng trước`;
          } else {
            const years = Math.floor(months / 12);
            return `${years} năm trước`;
          }
        }
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      // Tăng giá trị count lên 1 sau mỗi 1 phút
      setCount((prevCount) => prevCount + 1);
    }, 60000); // 60000 milliseconds = 1 phút

    return () => {
      // Clear interval khi component unmount
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex gap-4 mt-4">
      <Image
        src="/product-banner-1.webp"
        alt={'Avatar'}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <div className="min-w-[400px] max-w-[500px] bg-[#f2f3f5] rounded-[18px] px-3 py-[10px]">
          <p className="font-medium text-sm">{comment.userName}</p>
          <p className="text-sm my-2 text-[#292929]">
            <span className="text-[#007575] font-medium">{comment.replyFor} </span>
            {comment.content}
          </p>
        </div>
        <div className="mt-2 flex items-center">
          <Button title="Thích" containerStyles="text-[#E87A5A] text-sm mx-1 font-medium" />
          <Button
            onClick={() => handleClickReply(comment.parentID || comment.id, comment.userName)}
            title="Trả lời"
            containerStyles="text-[#E87A5A] text-sm mx-1 font-medium"
          />
          <span className="ml-[6px] text-[13px] text-[#999]">{handleTime()}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(CommentItem);
