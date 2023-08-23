import { IoCartOutline } from 'react-icons/io5';

function EmptyContent() {
  return (
    <div className="text-center py-5">
      <span className="text-[100px]">
        <IoCartOutline className="inline-block" />
      </span>
      <p>Không có sản phẩm nào trong giỏ hàng</p>
    </div>
  );
}

export default EmptyContent;
