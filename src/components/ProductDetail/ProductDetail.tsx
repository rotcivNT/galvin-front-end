/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState, Suspense, useContext } from 'react';
import { productAPI } from '~/api/productAPI';
import { mergeColorProducts } from '~/utils/mergeColorProduct';
import BaseInfo from './BaseInfo';
import GalleryDetail from './GalleryDetail';
import SuggestSizeWrapper from '../SuggestSize/SuggestSizeWrapper';
import ServiceInfo from '../ServiceInfo/ServiceInfo';
import ProductDetailLoading from './ProductDetailLoading';
import { Comments } from '~/types';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '~/utils/initFirebaseStore';
import { convertCommentStyle } from '~/utils/convertCommentStyle';
import { fetchComments } from '~/context/reducer/actions';
import { AppContext } from '~/context/GlobalState';

function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<any>();
  const [selectedColor, setSelectedColor] = useState<any>([]);
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    const fetchData = async () => {
      const res = await productAPI.getProductByID(+id);
      const data = res.data.data;
      data.Gallery = mergeColorProducts(data.Gallery);
      data.Variant = mergeColorProducts(data.Variant);
      setSelectedColor(data.Gallery[0]);
      setProduct(data);
    };
    const fetchCommentList = async () => {
      let listComments: Comments[] = [];
      const docSnap = await getDocs(
        query(
          collection(db, 'comments'),
          orderBy('createdAt', 'desc'),
          // pID -> ID of product not productID
          where('pID', '==', +id),
        ),
      );
      docSnap.forEach((doc) => {
        const { avatar, content, createdAt, parentID, replyFor, userID, userName } = doc.data();
        const obj: Comments = {
          id: doc.id,
          avatar,
          content,
          createdAt,
          parentID,
          replyFor,
          userID,
          userName,
          pID: +id,
        };

        listComments.push(obj);
      });

      listComments = convertCommentStyle(listComments);
      dispatch(fetchComments(listComments));
    };
    fetchData();
    fetchCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <div className="flex flex-col mt-20 lg:flex-row lg:mt-[140px] lg:gap-[30px]">
        {product ? (
          <>
            <GalleryDetail selectedColor={selectedColor} />
            <BaseInfo
              setSelectedColor={setSelectedColor}
              product={product}
              selectedColor={selectedColor}
            >
              <ServiceInfo />
            </BaseInfo>
          </>
        ) : (
          <ProductDetailLoading />
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
