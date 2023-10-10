'use client';

import { useSession } from 'next-auth/react';
import { Dispatch, createContext, useEffect, useReducer } from 'react';
import { userAPI } from '~/api/userAPI';
import { ReducerInitState } from '~/types';
import { setQuantityCart } from './reducer/actions';
import reducer, { Action, initState } from './reducer/reducer';

const AppContext = createContext<{ state: ReducerInitState; dispatch: Dispatch<Action> }>({
  state: initState,
  dispatch: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const fetchProductCart = async () => {
      let cartQty = 0;
      if (session.data?.token.user.id) {
        const res = await userAPI.getProdutCart(session.data?.token.user.id);
        cartQty = res.data.data.length;
      } else {
        const cartsJson = localStorage.getItem('carts');
        const carts = cartsJson ? JSON.parse(cartsJson) : [];
        cartQty = carts.length;
      }
      dispatch(setQuantityCart(cartQty));
    };
    fetchProductCart();
  }, [session.data]);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext };

export default AppProvider;
