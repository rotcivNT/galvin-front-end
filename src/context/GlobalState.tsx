'use client';

import { Dispatch, createContext, useEffect, useReducer } from 'react';
import reducer, { Action, initState } from './reducer/reducer';
import { Comments, ReducerInitState } from '~/types';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '~/utils/initFirebaseStore';
import { fetchComments, setQuantityCart } from './reducer/actions';
import { convertCommentStyle } from '~/utils/convertCommentStyle';
import { userAPI } from '~/api/userAPI';
import { useSession } from 'next-auth/react';

const AppContext = createContext<{ state: ReducerInitState; dispatch: Dispatch<Action> }>({
  state: initState,
  dispatch: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const fetchProductCart = async () => {
      const res = await userAPI.getProdutCart(session.data?.token.user.id);
      dispatch(setQuantityCart(res.data.data.length));
    };
    fetchProductCart();
  }, [session.data]);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext };

export default AppProvider;
