import { productAPI } from '~/api/productAPI';
import { ProductCardProps } from '~/types';
import ProductCard from '../ProductCard/ProductCard';

const getRelatedProduct = async (id: number) => {
  const payload = {
    id,
    count: 4,
  };
  const res = await productAPI.getProductByCateID(payload);
  return res.data.data;
};

async function RelatedProduct({ id }: { id: number }) {
  const products = await getRelatedProduct(id);

  return (
    <div className="my-10">
      <h3 className="text-center text-2xl font-medium mb-8">
        <span className="border-b-4 pb-1 border-[#3A3A3A]">SẢM PHẨM LIÊN QUAN</span>
      </h3>
      <div className="flex flex-wrap items-center mx-[-8px]">
        {products.map((product: ProductCardProps) => (
          <div className="basis-6/12 md:basis-4/12 xl:basis-3/12 px-2 mb-4" key={product.id}>
            <ProductCard
              id={product.id}
              productName={product.productName}
              price={product.price}
              saleOff={product.saleOff}
              thumbnail={product.thumbnail}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
