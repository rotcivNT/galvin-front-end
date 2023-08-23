import AccountOrderDetail from '~/components/Account/AccountOrderDetail';

function Page({ params }: { params: { orderID: string } }) {
  return (
    <div className="lg:max-w-[960px] xl:max-w-6xl mx-5 md:mx-8 xl:mx-auto mt-[100px] md:mt-[140px]">
      <AccountOrderDetail orderID={params.orderID} />
    </div>
  );
}

export default Page;
