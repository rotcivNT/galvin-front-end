import { productAPI } from '~/api/productAPI';
import ProductCard from '../ProductCard/ProductCard';

const getNewProduct = async () => {
  const res = await productAPI.getNewProduct();
  return res.data.data;
};

async function NewProduct() {
  const productList = await getNewProduct();
  return (
    <div>
      <h3 className="text-center text-[40px] font-medium mb-8">
        <span className="border-b-4 pb-1 border-[#3A3A3A] font-[SVN]">SẢN PHẨM MỚI</span>
      </h3>
      <div className="flex flex-wrap items-center mx-[-8px]">
        {productList.map((product: any) => (
          <div
            key={product.productID}
            className="basis-6/12 md:basis-4/12 xl:basis-3/12 sm:px-2 mb-4"
          >
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

export default NewProduct;
