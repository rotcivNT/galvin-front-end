import { ActionType, CartProductProps, Comments } from '~/types';
import { Action } from './reducer';

const addProductToCart = (payload: CartProductProps): Action => ({
  type: ActionType.ADD_NEW_PRODUCT,
  payload,
});

const addExistsProductToCart = (payload: CartProductProps): Action => ({
  type: ActionType.ADD_EXISTS_PRODUCT,
  payload,
});

const fetchComments = (payload: Comments[]): Action => ({
  type: ActionType.FETCH_COMMENTS,
  payload,
});

const setQuantityCart = (payload: number): Action => ({
  type: ActionType.SET_PRODUCT_CART,
  payload,
});

const incQuantityCart = (payload: number = 1): Action => ({
  type: ActionType.INC_PRODUCT_CART,
  payload,
});

const descQuantityCart = (payload: number = 1): Action => ({
  type: ActionType.DES_PRODUCT_CART,
  payload,
});

const addCommentToState = (payload: Comments): Action => ({
  type: ActionType.ADD_COMMENT,
  payload,
});

const incCommentQuantity = (quantity: number = 1) => ({
  type: ActionType.INC_COMMENT_QUANTITY,
  payload: quantity,
});

export {
  addProductToCart,
  addExistsProductToCart,
  fetchComments,
  setQuantityCart,
  incQuantityCart,
  descQuantityCart,
  addCommentToState,
  incCommentQuantity,
};
