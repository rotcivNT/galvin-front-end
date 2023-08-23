import { Timestamp } from 'firebase/firestore';

interface ButtonProps {
  // Icon có thể đóng vai trò là title -> truyền title là empty string
  title: string;
  containerStyles?: string;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

interface CategoryItemProps {
  id: number;
  categoryName: string;
  parentID: number | null;
  imagePath: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  children?: CategoryItemProps[];
}

interface NavbarItemProps {
  title: string;
  href: string;
  imagePath?: string;
  childItems?: CategoryItemProps[];
}

interface ProductCardProps {
  id: number;
  productName: string;
  price: number;
  saleOff: number;
  thumbnail: string;
}

interface CartProductProps extends ProductCardProps {
  color: number;
  size: string;
  quantity: number;
}

interface ColorSizeProps {
  id: number;
  value: string;
}

interface ReducerInitState {
  cartList: CartProductProps[];
  comments: Comments[];
  quantityCarts: number;
}

interface UserSignUpInfo {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export enum ActionType {
  ADD_NEW_PRODUCT,
  ADD_EXISTS_PRODUCT,
  FETCH_COMMENTS,
  INC_PRODUCT_CART,
  DES_PRODUCT_CART,
  SET_PRODUCT_CART,
  ADD_COMMENT,
  INC_COMMENT_QUANTITY,
}

export enum TypeModal {
  NONE,
  LOGIN,
  SIGN_UP,
  CART_MODAL,
}

interface Comments {
  id: string;
  avatar: string;
  content: string;
  createdAt: Timestamp;
  parentID: string;
  replyFor: string;
  userID: number;
  userName: string;
  children?: Comments[];
  pID: number;
}

interface FilterProps {
  sizeList: number[];
  colorID: number | string;
}

interface OrderInfo {
  paymentMethod: string;
  totalDue: number;
  products: any[];
  shippedAddress: string;
  customerName: string;
  customerPhone: string;
  email: string;
  userID: number;
}

export type {
  ButtonProps,
  CategoryItemProps,
  NavbarItemProps,
  ProductCardProps,
  ColorSizeProps,
  ReducerInitState,
  CartProductProps,
  Comments,
  UserSignUpInfo,
  FilterProps,
  OrderInfo,
};
