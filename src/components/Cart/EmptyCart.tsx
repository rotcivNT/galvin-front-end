import { IoCartOutline } from 'react-icons/io5';

function EmptyCart() {
  return (
    <div className="text-center py-5 my-[120px]">
      <span className="text-[100px]">
        <IoCartOutline className="inline-block" />
      </span>
      <p>Không có sản phẩm nào trong giỏ hàng</p>
    </div>
  );
}

export default EmptyCart;
