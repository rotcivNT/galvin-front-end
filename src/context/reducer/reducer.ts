import { Dispatch } from 'react';
import { ActionType, CartProductProps, Comments, ReducerInitState } from '~/types';

interface Action {
  payload: any;
  type: ActionType;
}

const initState: ReducerInitState = {
  cartList: [],
  comments: [],
  quantityCarts: 0,
};

const handlePlusQuantity = (cartListState: CartProductProps[], payload: CartProductProps) => {
  cartListState.some((item) => {
    if (item.id === payload.id && item.size === payload.size) {
      item.quantity += payload.quantity;
      return true;
    }
  });
};

const handleAddComment = (commentListState: Comments[], payload: Comments) => {
  if (payload.parentID) {
    commentListState.some((item) => {
      if (item.id === payload.parentID) {
        item.children && item.children.push(payload);
        return true;
      }
    });
  } else {
    commentListState.unshift(payload);
  }
};

const reducer = (state: ReducerInitState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.ADD_NEW_PRODUCT:
      return {
        ...state,
        cartList: [...state.cartList, payload],
      };
    case ActionType.ADD_EXISTS_PRODUCT:
      handlePlusQuantity(state.cartList, payload);
      return { ...state };
    case ActionType.FETCH_COMMENTS:
      return {
        ...state,
        comments: payload,
      };
    case ActionType.SET_PRODUCT_CART:
      return {
        ...state,
        quantityCarts: payload,
      };
    case ActionType.INC_PRODUCT_CART:
      return {
        ...state,
        quantityCarts: state.quantityCarts + payload,
      };
    case ActionType.DES_PRODUCT_CART:
      return {
        ...state,
        quantityCarts: state.quantityCarts - payload,
      };
    case ActionType.ADD_COMMENT:
      handleAddComment(state.comments, payload);

      return { ...state };
    default:
      return state;
  }
};

export { initState };
export type { Action };
export default reducer;
