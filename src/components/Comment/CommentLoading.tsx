import Image from 'next/image';
import Button from '../Button/Button';
interface Props {
  content: string;
  userName: string;
}
function CommentLoading({ content, userName }: Props) {
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
          <p className="font-medium text-sm">{userName}</p>
          <p className="text-sm my-2 text-[#292929]">
            {content}
            <span className="text-[#007575] font-medium"></span>
          </p>
        </div>
        <span className="mt-1 ml-1 flex items-center text-sm text-[#B0B3B8]">Đang viết ...</span>
      </div>
    </div>
  );
}

export default CommentLoading;
