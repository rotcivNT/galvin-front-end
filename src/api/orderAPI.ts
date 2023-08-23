import { axiosClient } from '~/configs/configs';
import { OrderInfo } from '~/types';

export const orderAPI = {
  createOrder: (payload: OrderInfo) => {
    return axiosClient.post('/create-order', payload);
  },
  acceptOrder: (query: string) => {
    return axiosClient.get(`/accept-order/?${query}`);
  },
  getOrderByUserID: (userID: number) => {
    return axiosClient.get(`/get-order-by-userID/${userID}`);
  },
  getOrderDetail: (orderID: string) => {
    return axiosClient.get(`/get-order-details/${orderID}`);
  },
};
