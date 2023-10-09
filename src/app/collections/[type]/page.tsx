import { productAPI } from '~/api/productAPI';
import ListProductWrapper from '~/components/ListProduct';
import PaginationButton from '~/components/Pagination/PaginationButton';

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
      <ListProductWrapper
        sizes={sizes}
        colors={colors}
        searchParams={searchParams}
        type={+params.type}
      >
        <PaginationButton totalPages={10} currentPage={Number(9)} />
      </ListProductWrapper>
    </div>
  );
}

export default Page;
