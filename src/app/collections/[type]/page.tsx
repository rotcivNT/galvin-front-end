import { Suspense } from 'react';
import { productAPI } from '~/api/productAPI';
import ListProductWrapper from '~/components/ListProduct';
import Loading from '../loading';

const getColorsAndSizes = async () => {
  const sizeRes = await productAPI.getAllSize();
  const colorRes = await productAPI.getAllColor();
  return {
    sizes: sizeRes.data.data,
    colors: colorRes.data.data,
  };
};

async function Page({
  params,
  searchParams,
}: {
  params: { type: string };
  searchParams: { [key: string]: string };
}) {
  const { sizes, colors } = await getColorsAndSizes();
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ListProductWrapper
          sizes={sizes}
          colors={colors}
          searchParams={searchParams}
          type={+params.type}
        />
      </Suspense>
    </div>
  );
}

export default Page;
