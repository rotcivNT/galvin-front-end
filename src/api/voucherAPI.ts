import { axiosClient } from '~/configs/configs';

export const voucherAPI = {
  getAllVoucher: () => {
    return axiosClient.get('/get-all-voucher');
  },
  getVoucherByCode: (code: string) => {
    return axiosClient.get(`/get-voucher-by-code/${code}`);
  },
};
