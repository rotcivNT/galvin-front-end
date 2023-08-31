import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Suspense } from 'react';
import { productAPI } from '~/api/productAPI';
import CommentWrapper from '~/components/Comment/CommentWrapper';
import SpinnerLoading from '~/components/Loading/SpinnerLoading';
import ProductDetail from '~/components/ProductDetail/ProductDetail';
import RelatedProduct from '~/components/RelatedProduct/RelatedProduct';
import { fetchComments } from '~/context/reducer/actions';
import { Comments } from '~/types';
import { convertCommentStyle } from '~/utils/convertCommentStyle';
import { db } from '~/utils/initFirebaseStore';
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
    <div className="lg:max-w-[960px] xl:max-w-full mx-5 md:mx-8 xl:mx-10 xl:mt-[100px]">
      <Suspense fallback={<SpinnerLoading />}>
        <ProductDetail colors={colors} sizes={sizes} productList={listProduct} id={+params.id} />
      </Suspense>
      <CommentWrapper />
      <RelatedProduct id={+params.id} />
    </div>
  );
}

export default Page;
