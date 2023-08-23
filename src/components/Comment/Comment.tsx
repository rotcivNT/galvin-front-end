'use client';
import { useContext, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useAppContext } from '~/context/useAppContext';
import Button from '../Button/Button';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { addCommentToState } from '~/context/reducer/actions';
import { db } from '~/utils/initFirebaseStore';
import { CommentContext } from './store/CommentContext';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface CommentProps {
  open: boolean;
  handleClick: () => void;
}

function Comment({ open, handleClick }: CommentProps) {
  const { state, dispatch } = useAppContext();
  const params = useParams();

  const session = useSession();
  const { setReplyList } = useContext(CommentContext);
  const [submit, setSubmit] = useState({
    isSubmit: false,
    content: '',
    userName: '',
  });
  const handleClose = () => {
    setReplyList({});
    handleClick();
  };
  const handleAddComment = async (content: string) => {
    const userName = session.data?.token?.user.fullName;
    const data = {
      // Empty ID -> Render trước tối ưu trải nghiệm thay vì lưu vào Firebase rồi get lại id rồi mới lưu
      id: '',
      content,
      createdAt: Timestamp.now(),
      parentID: '',
      replyFor: '',
      userID: session.data?.token?.user.id,
      userName,
      avatar: '',
      children: [],
      pID: +params.id,
    };
    setSubmit({
      isSubmit: true,
      content,
      userName,
    });
    const docRef = await addDoc(collection(db, 'comments'), data);
    setSubmit({
      isSubmit: false,
      content: '',
      userName: '',
    });
    dispatch(
      addCommentToState({
        ...data,
        id: docRef.id,
      }),
    );
  };
  let stylesOpen = 'top-[60px] invisible opacity-0 md:top-0 md:right-[-100px]';
  if (open) {
    stylesOpen = 'opacity-100 top-0 visible md:right-0 md:w-[720px]';
  }
  return (
    <>
      {open && (
        <div
          onClick={handleClose}
          className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.6)] z-[99999]"
        ></div>
      )}
      <div
        className={`${stylesOpen} fixed  transition-all duration-300 right-0 left-0 md:left-[unset] bottom-0 
      px-3
    sm:px-[32px] pt-[32px] pb-[calc(20%-32px)] z-[99999] md:p-0 `}
      >
        <div className="bg-white h-full rounded-2xl md:rounded-none shadow-[0_4px_12px_rgba(0,0,0,.15)] pt-10 px-3 sm:px-10 overflow-scroll relative">
          <div>
            <p className="text-lg font-medium">{state.comments.length} Nhận xét</p>
            <p className="my-2 text-[13px] text-[#666] italic">
              (Galvin xin cảm ơn những nhận xét của các bạn về sản phẩm)
            </p>
          </div>
          <CommentInput addComment={handleAddComment} />
          <CommentList submitComment={submit} />
          <Button
            containerStyles="absolute top-5 right-5 text-[26px]"
            title=""
            icon={<IoCloseSharp />}
            onClick={handleClose}
          />
        </div>
      </div>
    </>
  );
}

export default Comment;
