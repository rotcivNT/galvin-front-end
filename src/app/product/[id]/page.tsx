import CommentWrapper from '~/components/Comment/CommentWrapper';
import ProductDetail from '~/components/ProductDetail/ProductDetail';
import RelatedProduct from '~/components/RelatedProduct/RelatedProduct';

function Page({ params }: { params: { id: string } }) {
  return (
    <div className="lg:max-w-[960px] xl:max-w-full mx-5 md:mx-8 xl:mx-10 xl:mt-[100px]">
      <ProductDetail id={params.id} />
      <CommentWrapper />
      <RelatedProduct id={+params.id} />
    </div>
  );
}

export default Page;
