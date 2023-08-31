import { productAPI } from '~/api/productAPI';
import ProductCard from '../ProductCard/ProductCard';
import PaginationButton from '../Pagination/PaginationButton';

const getProducts = async (query: string) => {
  const res = await productAPI.getSearchProduct(query);
  if (res.data.data) {
    return res.data.data;
  }
};

interface Props {
  searchParams: { [key: string]: string };
}
async function SearchResult({ searchParams }: Props) {
  const query = searchParams.q.split('+').join(' ');
  const products = await getProducts(query);
  const page = searchParams.page || '1';
  const perPage = 12;

  // Bắt đầu và kết thúc -> get data
  const start = (Number(page) - 1) * perPage;
  const end = Number(page) * perPage;
  const data = products.slice(start, end);
  const totalPages = Math.ceil(products.length / perPage);
  return (
    <div className="py-[60px]">
      <div className="text-center pb-[30px]">
        <h3 className="text-[#252A2B text-[36px] font-[SVN] mb-3">TÌM KIẾM</h3>
        <p className="text-sm">Có {products.length} kết quả cho tìm kiếm</p>
        <p className="w-[60px] mx-auto h-1 mt-6 bg-[#252a2b]"></p>
      </div>
      <div>
        <p className="text-sm">
          Kết quả tìm kiếm cho <strong>&quot;{query}&quot;</strong>
        </p>
        <div className="flex flex-wrap py-5 mx-[-8px]">
          {data.map((product: any) => (
            <div className="basis-2/12 md:basis-3/12 xl:basis-3/12 animate-fadeIn" key={product.id}>
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
      <PaginationButton query={searchParams.q} totalPages={totalPages} currentPage={Number(page)} />
    </div>
  );
}

export default SearchResult;
