import Image from 'next/image';
import { orderAPI } from '~/api/orderAPI';
import { formatVND } from '~/utils/formatVND';

const getOrderDetail = async (orderID: string) => {
  const res = await orderAPI.getOrderDetail(orderID);
  return res.data.data;
};

async function AccountOrderDetail({ orderID }: { orderID: string }) {
  const data = await getOrderDetail(orderID);
  const totalPrice = data.reduce((total: number, item: any) => {
    return total + item.totalPrice;
  }, 0);

  return (
    <div className=" p-[10px] bg-[#f7f7f7] mb-[100px]">
      <div className="p-3 bg-white">
        <p className="pb-2 border-b-2 border-[#eddeded] text-sm font-medium">CHI TIẾT ĐƠN HÀNG</p>
        <div>
          <table className="table-auto w-full">
            <thead>
              <tr className="text-sm text-[#212529] font-medium text-center border-b-2 border-[#ededed] leading-[40px]">
                <th className="p-3">Ảnh sản phẩm</th>
                <th className="p-3">Tên sản phẩm</th>
                <th className="p-3">Đơn giá</th>
                <th className="p-3">Số lượng</th>
                <th className="p-3">Thành tiền</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.map((item: any) => (
                <tr
                  key={item.id}
                  className="text-center border-b-2 border-[#ededed] last:border-transparent leading-[30px]"
                >
                  <td className="p-3">
                    <Image
                      alt=""
                      src={item.Product.thumbnail}
                      width={60}
                      height={60}
                      className="inline-block"
                    />
                  </td>
                  <td className="p-3">{item.Product.productName}</td>
                  <td className="p-3">{formatVND(item.unitPrice)}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{formatVND(item.totalPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-sm text-[#212529] pt-4 pb-6 border-t border-[#ededed]">
          <p className="w-[200px] flex justify-between py-2">
            Giá sản phẩm: <span className="font-medium">{formatVND(totalPrice)}</span>
          </p>
          <p className="w-[200px] flex justify-between py-2">
            Phí ship: <span className="font-medium">{formatVND(30000)}</span>
          </p>
          <p className="w-[200px] flex justify-between py-2">
            Tổng tiền: <span className="font-medium">{formatVND(totalPrice + 30000)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountOrderDetail;
