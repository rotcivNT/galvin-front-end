'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { orderAPI } from '~/api/orderAPI';
import { formatVND } from '~/utils/formatVND';

function AccountOrder() {
  const [orders, setOrders] = useState([] as any);
  const session = useSession();
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await orderAPI.getOrderByUserID(session.data?.token.user.id);
      setOrders(res.data.data);
    };
    fetchOrders();
  }, [session.data?.token.user.id]);
  return (
    <div className="mx-4 p-[10px] bg-[#f7f7f7]">
      <div className="p-3 bg-white">
        <p className="pb-2 border-b-2 border-[#eddeded] text-sm font-medium">
          DANH SÁCH ĐƠN HÀNG MỚI NHẤT
        </p>
        <div>
          <table className="table-auto w-full">
            <thead>
              <tr className="text-sm text-[#212529] font-medium text-center border-b-2 border-[#ededed] leading-[40px]">
                <th className="p-3">Hành động</th>
                <th className="p-3">Ngày đặt</th>
                <th className="p-3">Thành tiền</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3">Thanh toán</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((order: any) => (
                <tr
                  className="text-center border-b-2 border-[#ededed] last:border-transparent leading-[30px]"
                  key={order.id}
                >
                  <td className="p-3">
                    <Link
                      target="_blank"
                      className="text-blue-400"
                      href={`/account/order/${order.orderID}`}
                    >
                      Xem chi tiết
                    </Link>
                  </td>
                  <td className="p-3">{`${new Date(+order.orderDate).toLocaleDateString(
                    'en-GB',
                  )}`}</td>
                  <td className="p-3">{formatVND(order.totalDue)}</td>
                  <td className="p-3">{order.status}</td>
                  <td className="p-3">{order.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccountOrder;
