'use client';
import { useEffect, useState } from 'react';
import { productAPI } from '~/api/productAPI';
import ProductCard from '../ProductCard/ProductCard';
import ProductLoadingSke from './ProductLoadingSke';
import { FilterProps } from '~/types';
import PaginationButton from '../Pagination/PaginationButton';

interface Props {
  categoryID: number;
  filter: FilterProps;
  searchParams: { [key: string]: string };
}
function ListProduct({ categoryID, filter, searchParams }: Props) {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const page = searchParams.page || '1';
  const perPage = 1;

  // Bắt đầu và kết thúc -> get data
  const start = (Number(page) - 1) * perPage;
  const end = Number(page) * perPage;
  const offset = end / (end - start) - 1;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await productAPI.filterProduct(
        {
          categoryID,
          ...filter,
        },
        offset,
        perPage,
      );

      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    };
    fetchProducts();
  }, [categoryID, filter, offset]);

  return (
    <>
      <div className="flex flex-wrap basis-9/12 justify-center">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div className="basis-4/12" key={index}>
                  <ProductLoadingSke />
                </div>
              ))
          : Array(6)
              .fill(0)
              .map((_, index) =>
                products.map((product: any) => (
                  <div className="basis-4/12 animate-fadeIn" key={product.productID}>
                    <ProductCard
                      id={product.id}
                      productName={product.productName}
                      price={product.price}
                      saleOff={product.saleOff}
                      thumbnail={product.thumbnail}
                    />
                  </div>
                )),
              )}
        {products.length > 0 && (
          <div className="mt-5">
            <PaginationButton totalPages={totalPages} currentPage={Number(page)} />
          </div>
        )}
      </div>
    </>
  );
}

export default ListProduct;
