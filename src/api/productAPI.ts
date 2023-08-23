import { axiosClient } from '~/configs/configs';

export const productAPI = {
  getAllCategory: () => {
    return axiosClient.get('/get-all-category');
  },
  getFirstProduct: (catelogID: number) => {
    return axiosClient.get(`/get-first-product-by-catelog/${catelogID}`);
  },
  // Get 8 new Product
  getNewProduct: () => {
    return axiosClient.get('/get-new-product');
  },
  getProductByID: (id: number) => {
    return axiosClient.get(`/get-product/${id}`);
  },
  getAllColor: () => {
    return axiosClient.get(`/get-all-color`);
  },
  getAllSize: () => {
    return axiosClient.get(`/get-all-size`);
  },
  getProductByCateID: (payload: { id: number; count: number }) => {
    return axiosClient.get('get-products-by-cate-id', { data: payload });
  },
  filterProduct: (payload: any) => {
    return axiosClient.post('/get-all-product-by-category', payload);
  },
  getSearchProduct: (query: string) => {
    return axiosClient.get(`/search?q=${query}`);
  },
};
