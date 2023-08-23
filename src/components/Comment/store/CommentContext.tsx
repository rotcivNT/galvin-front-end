'use client';
import { createContext, useState } from 'react';

export const CommentContext = createContext({} as any);

function CommentProvider({ children }: { children: React.ReactNode }) {
  const [replyList, setReplyList] = useState({} as any);
  return (
    <CommentContext.Provider value={{ replyList, setReplyList }}>
      {children}
    </CommentContext.Provider>
  );
}

export default CommentProvider;
