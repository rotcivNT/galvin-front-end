import { orderAPI } from '~/api/orderAPI';

const confirmToServer = async (query: string) => {
  const res = await orderAPI.acceptOrder(query);
  return res.data.code === 0 ? true : false;
};

async function Page({ params }: { params: { query: string } }) {
  const decodeUrl = decodeURIComponent(params.query);
  const isConfirmed = await confirmToServer(decodeUrl);
  return (
    <div className="min-h-[100vh]">
      <h3 className="uppercase text-xl font-mono text-center">
        {isConfirmed
          ? 'Xác nhận đơn hàng thành công! Galvin xin cảm ơn bạn đã mua hàng của shop'
          : 'Đơn hàng không tồn tại. Đơn hàng của bạn đã xác nhận hoặc bị hủy do quá hạn thời gian xác nhận.'}
      </h3>
    </div>
  );
}

export default Page;
