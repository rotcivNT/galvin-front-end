/* eslint-disable @next/next/no-img-element */
'use client';

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '~/context/GlobalState';
import { fetchComments } from '~/context/reducer/actions';
import { ColorSizeProps, Comments } from '~/types';
import { convertCommentStyle } from '~/utils/convertCommentStyle';
import { db } from '~/utils/initFirebaseStore';
import ServiceInfo from '../ServiceInfo/ServiceInfo';
import BaseInfo from './BaseInfo';
import GalleryDetail from './GalleryDetail';

interface Props {
  productList: any;
  id: number;
  sizes: ColorSizeProps[];
  colors: ColorSizeProps[];
}

function ProductDetail({ productList, id, colors, sizes }: Props) {
  const [product, setProduct] = useState<any>();
  const [selectedColor, setSelectedColor] = useState<any>([]);
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    setSelectedColor(productList.Gallery[0]);
    setProduct(productList);
    const fetchCommentList = async () => {
      let listComments: Comments[] = [];
      const docSnap = await getDocs(
        query(
          collection(db, 'comments'),
          orderBy('createdAt', 'desc'),
          // pID -> ID of product not productID
          where('pID', '==', id),
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
    fetchCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex flex-col mt-20 lg:flex-row lg:mt-[140px] lg:gap-[30px]">
        {product && (
          <>
            <GalleryDetail selectedColor={selectedColor} />
            <BaseInfo
              sizes={sizes}
              colors={colors}
              setSelectedColor={setSelectedColor}
              product={product}
              selectedColor={selectedColor}
            >
              <ServiceInfo />
            </BaseInfo>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
