'use client';

import Input from '../Input/Input';
import { useForm } from 'react-hook-form';
import PaymentWrapper from './PaymentWrapper';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { userAPI } from '~/api/userAPI';
import CheckoutProduct from './CheckoutProduct';
import { OrderInfo } from '~/types';
import { orderAPI } from '~/api/orderAPI';
import { useRouter } from 'next/navigation';
import { useAppContext } from '~/context/useAppContext';
import { setQuantityCart } from '~/context/reducer/actions';
import EmptyCart from './EmptyCart';

function Cart() {
  const session = useSession();
  const { register, setValue, handleSubmit } = useForm();
  const [payment, setPayment] = useState('');
  const [products, setProducts] = useState<any>([]);
  const [voucherSelected, setVoucherSelected] = useState(0);
  const { dispatch } = useAppContext();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    const totalDue =
      30000 +
      products.reduce((pre: number, cur: any) => {
        return pre + cur.price * cur.quantity;
      }, 0) -
      voucherSelected;
    const payload: OrderInfo = {
      paymentMethod: payment,
      totalDue,
      shippedAddress: data.address,
      customerPhone: data.phone,
      customerName: data.fullName,
      products: products,
      email: data.email,
      userID: session.data?.token.user.id,
    };
    const res = await orderAPI.createOrder(payload);
    if (res.data.code === 0) {
      router.push('/order/success');
      const res = await userAPI.deleteProductCartByUserID(session.data?.token.user.id);
      if (res.data.code === 0) {
        dispatch(setQuantityCart(0));
      }
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await userAPI.getProdutCart(session.data?.token.user.id);
      setProducts(res.data.data);
    };
    if (session.data) {
      setValue('fullName', session.data.token.user.fullName);
      setValue('email', session.data.token.user.email);
      setValue('phone', session.data.token.user.phone);
      setValue('address', session.data.token.user.address);
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.data]);

  return products.length !== 0 ? (
    <form onSubmit={handleSubmit(onSubmit)} className="flex pb-10 flex-col-reverse md:flex-row">
      <div className="font-mono basis-7/12 px-8">
        <h3 className="mx-2 mb-3">Thông tin vận chuyển</h3>
        <div className="flex">
          <div className="basis-6/12 px-2">
            <Input register={register} id="fullName" />
          </div>
          <div className="basis-6/12 px-2">
            <Input register={register} id="phone" />
          </div>
        </div>
        <div className="px-2">
          <Input register={register} id="email" />
        </div>
        <div className="px-2">
          <Input register={register} id="address" />
        </div>
        <div className="px-2">
          <Input
            register={register}
            placeholder="Ghi chú thêm (Ví dụ: Giao hàng giờ hành chính, ...)"
            id="userNote"
          />
        </div>

        <div>
          <PaymentWrapper payment={payment} setPayment={setPayment} />
        </div>
      </div>
      <div className="basis-5/12 px-3 border-l border-[#d9d9d9]">
        <CheckoutProduct
          voucherSelected={voucherSelected}
          setVoucherSelected={setVoucherSelected}
          products={products}
        />
      </div>
    </form>
  ) : (
    <EmptyCart />
  );
}

export default Cart;
