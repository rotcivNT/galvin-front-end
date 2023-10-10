'use client';
import { useEffect, useState } from 'react';
import { productAPI } from '~/api/productAPI';
import ProductCard from '../ProductCard/ProductCard';
import ProductLoadingSke from './ProductLoadingSke';
import { FilterProps } from '~/types';
import PaginationButton from '../Pagination/PaginationButton';
import { axiosClient } from '~/configs/configs';
import useSWR from 'swr';
import axios from 'axios';

interface Props {
  categoryID: number;
  filter: FilterProps;
  searchParams: { [key: string]: string };
}
function ListProduct({ categoryID, filter, searchParams }: Props) {
  const fetcher = async (url: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const page = searchParams.page || '1';
  const perPage = 9;

  // Bắt đầu và kết thúc -> get data
  const start = (Number(page) - 1) * perPage;
  const end = Number(page) * perPage;
  const offset = end / (end - start) - 1;

  const { data, error, isLoading } = useSWR(
    `/get-all-product-by-category?categoryID=${categoryID}&offset=${offset}&limit=${perPage}&colorID=${
      filter.colorID
    }&sizes=${filter.sizeList.join(',')}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  return (
    <>
      <div className="flex flex-wrap basis-9/12 justify-center">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div className="basis-4/12" key={index}>
                  <ProductLoadingSke />
                </div>
              ))
          : data?.data.map((product: any) => (
              <div className="basis-4/12 animate-fadeIn" key={product.productID}>
                <ProductCard
                  id={product.id}
                  productName={product.productName}
                  price={product.price}
                  saleOff={product.saleOff}
                  thumbnail={product.thumbnail}
                />
              </div>
            ))}
        {data?.data.length > 0 && (
          <div className="mt-5">
            <PaginationButton totalPages={data.totalPages} currentPage={Number(page)} />
          </div>
        )}
      </div>
    </>
  );
}

export default ListProduct;
