'use client';
import { memo, useCallback, useContext, useRef, useState } from 'react';
import { useAppContext } from '~/context/useAppContext';
import CommentItem from './CommentItem';
import CommentReply from './CommentReply';
import { useSession } from 'next-auth/react';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '~/utils/initFirebaseStore';
import { addCommentToState, fetchComments } from '~/context/reducer/actions';
import { CommentContext } from './store/CommentContext';
import CommentLoading from './CommentLoading';
import { useParams } from 'next/navigation';

interface SubmitCommentProps {
  isSubmit: boolean;
  content: string;
  userName: string;
}

interface Props {
  submitComment: SubmitCommentProps;
}

function CommentList({ submitComment }: Props) {
  const { state, dispatch } = useAppContext();
  const { comments } = state;
  const { replyList, setReplyList } = useContext(CommentContext);
  const [submitReply, setSubmitReply] = useState({
    isSubmit: false,
    content: '',
    userName: '',
  });
  const params = useParams();
  const session = useSession();
  const handleClickReply = useCallback((commentID: string, replyFor: string) => {
    setReplyList((pre: any) => ({ ...pre, [commentID]: replyFor }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleReplyComment = async (content: string, parentID: string, replyFor: string) => {
    const userName = session.data?.token?.user.fullName;
    const data = {
      content,
      createdAt: Timestamp.now(),
      parentID,
      replyFor,
      userID: session.data?.token?.user.id,
      userName,
      avatar: '',
      pID: +params.id,
    };
    setSubmitReply({
      isSubmit: true,
      content,
      userName,
    });
    const docRef = await addDoc(collection(db, 'comments'), data);
    setSubmitReply({
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

  return (
    <div>
      {submitComment.isSubmit && (
        <CommentLoading content={submitComment.content} userName={submitComment.userName} />
      )}
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentItem handleClickReply={handleClickReply} comment={comment} />
          {comment?.children?.map((item) => (
            <div key={item.id} className="ml-[56px]">
              <CommentItem handleClickReply={handleClickReply} comment={item} />
            </div>
          ))}
          {replyList[comment.id] && (
            <div className="ml-[56px]">
              <CommentReply
                parentID={comment.id}
                replyFor={replyList[comment.id]}
                replyComment={handleReplyComment}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default memo(CommentList);
