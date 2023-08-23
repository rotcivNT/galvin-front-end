'use client';
import { useEffect, useState } from 'react';
import { productAPI } from '~/api/productAPI';
import ProductCard from '../ProductCard/ProductCard';
import ProductLoadingSke from './ProductLoadingSke';
import { FilterProps } from '~/types';

interface Props {
  categoryID: number;
  filter: FilterProps;
}
function ListProduct({ categoryID, filter }: Props) {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await productAPI.filterProduct({
        categoryID,
        ...filter,
      });

      setProducts(res.data.data);
      setLoading(false);
    };
    fetchProducts();
  }, [categoryID, filter]);
  return (
    <div className="flex flex-wrap basis-9/12">
      {loading
        ? Array(6)
            .fill(0)
            .map((_, index) => (
              <div className="basis-4/12" key={index}>
                <ProductLoadingSke />
              </div>
            ))
        : products.map((product: any) => (
            <div className="basis-4/12" key={product.productID}>
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
  );
}

export default ListProduct;
