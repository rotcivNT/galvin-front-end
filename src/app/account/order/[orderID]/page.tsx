import AccountOrderDetail from '~/components/Account/AccountOrderDetail';

function Page({ params }: { params: { orderID: string } }) {
  return <AccountOrderDetail orderID={params.orderID} />;
}

export default Page;
