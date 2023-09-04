import { Suspense } from 'react';
import { productAPI } from '~/api/productAPI';
import CommentWrapper from '~/components/Comment/CommentWrapper';
import ProductDetail from '~/components/ProductDetail/ProductDetail';
import RelatedProduct from '~/components/RelatedProduct/RelatedProduct';
import { mergeColorProducts } from '~/utils/mergeColorProduct';

const getProductByID = async (id: string) => {
  const res = await productAPI.getProductByID(+id);
  const data = res.data.data;
  data.Gallery = mergeColorProducts(data.Gallery);
  data.Variant = mergeColorProducts(data.Variant);
  return data;
};

const fetchColorList = async () => {
  const resColor = await productAPI.getAllColor();
  const resSize = await productAPI.getAllSize();
  return {
    colors: resColor.data.data,
    sizes: resSize.data.data,
  };
};

async function Page({ params }: { params: { id: string } }) {
  const listProduct = await getProductByID(params.id);
  const { colors, sizes } = await fetchColorList();
  return (
    <>
      <ProductDetail colors={colors} sizes={sizes} productList={listProduct} id={+params.id} />
      <CommentWrapper />
      <RelatedProduct id={+params.id} />
    </>
  );
}

export default Page;
