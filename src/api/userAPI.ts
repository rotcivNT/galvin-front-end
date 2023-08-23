import { axiosClient } from '~/configs/configs';
import { UserSignUpInfo } from '~/types';

const userAPI = {
  createUser: (payload: UserSignUpInfo) => {
    return axiosClient.post('/create-user', payload);
  },
  checkUser: (payload: { email: string; password: string }) => {
    return axiosClient.post('/check-user', payload);
  },
  addProductToCart: (payload: any) => {
    return axiosClient.post('/add-product-cart', payload);
  },
  deleteProductToCart: (id: number) => {
    return axiosClient.get(`/delete-product-cart/${id}`);
  },
  getProdutCart: (userID: number) => {
    return axiosClient.get(`/get-product-cart/${userID}`);
  },
  deleteProductCartByUserID: (userID: number) => {
    return axiosClient.get(`/delete-product-cart-by-userID/${userID}`);
  },
};

export { userAPI };
