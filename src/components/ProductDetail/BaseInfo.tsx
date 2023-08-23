'use client';
import { useEffect, useState } from 'react';
import { productAPI } from '~/api/productAPI';
import { ActionType, CartProductProps, ColorSizeProps, ProductCardProps } from '~/types';
import Button from '../Button/Button';
import { useAppContext } from '~/context/useAppContext';
import {
  addExistsProductToCart,
  addProductToCart,
  incQuantityCart,
} from '~/context/reducer/actions';
import { formatVND } from '~/utils/formatVND';
import ServiceInfo from '../ServiceInfo/ServiceInfo';
import SuggestSizeWrapper from '../SuggestSize/SuggestSizeWrapper';
import { useSession } from 'next-auth/react';
import { userAPI } from '~/api/userAPI';

interface BaseInfoProps {
  product: any;
  selectedColor: any;
  setSelectedColor: (args: any) => void;
  children: React.ReactNode;
}

enum TypeBtnQty {
  ASC,
  DESC,
}

function BaseInfo({ product, setSelectedColor, selectedColor, children }: BaseInfoProps) {
  const session = useSession();
  const [colorList, setColorList] = useState<any>([]);
  const [sizeList, setSizeList] = useState<ColorSizeProps[]>();
  const [variants, setVariants] = useState<any>([]);
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ColorSizeProps>({
    id: 0,
    value: '',
  });
  const [err, setErr] = useState('');
  const { state, dispatch } = useAppContext();
  const getValueByColorID = (colorID: number) => {
    const colorItem = colorList.find((item: ColorSizeProps) => item.id === colorID);
    return colorItem?.value;
  };

  const handleClickColor = (colorID: number) => {
    const selected = product.Gallery.find((item: any) => item[0].colorID === colorID);
    setSelectedColor(selected);
    // Chọn màu thì sẽ bỏ các selected size trước đó nếu có
    setSelectedSize({
      id: 0,
      value: '',
    });
  };

  const checkingSelectedColorBtn = (colorID: number) => {
    return colorID === selectedColor[0].colorID ? 'text-[#ee4d2d] border-[#ee4d2d] ' : '';
  };

  const checkingSelectedSizeBtn = (colorID: number) => {
    return colorID === selectedSize?.id ? 'text-[#ee4d2d] border-[#ee4d2d] ' : '';
  };

  const checkQuantity = (sizeID: number) => {
    let qty = 0;
    variants.forEach((variant: any) => {
      if (variant.sizeID === sizeID && variant.qtyStock > 0) {
        qty = variant.qtyStock;
      }
    });
    return qty;
  };
  const handleClickQuantity = (type: TypeBtnQty) => {
    if (type === TypeBtnQty.ASC && quantity > 0) {
      setQuantity((pre) => pre - 1);
    } else if (type === TypeBtnQty.DESC) {
      setQuantity((pre) => pre + 1);
    }
  };

  const handleAddProductToCart = async () => {
    if (!selectedSize.value) {
      setErr('Vui lòng chọn size');
      return;
    }
    if (!quantity) {
      setErr('Vui lòng chọn số lượng');
      return;
    }
    if (session.status === 'unauthenticated') {
      setErr('Bạn phải đăng nhập để mua hàng');
      return;
    }
    setErr('');
    const payload = {
      productID: product.productID,
      price: product.price,
      thumbnail: product.thumbnail,
      colorValue: getValueByColorID(selectedColor[0].colorID),
      sizeValue: selectedSize.value,
      quantity: quantity,
      userID: session.data?.token.user.id,
      productName: product.productName,
      saleOff: product.saleOff,
    };

    const res = await userAPI.addProductToCart(payload);
    if (res.data.code === 0) {
      dispatch(incQuantityCart());
    }
  };

  useEffect(() => {
    product.Variant &&
      setVariants(
        product.Variant.find((item: any) => item[0].colorID === selectedColor[0].colorID),
      );
  }, [product, selectedColor]);

  useEffect(() => {
    const fetchColorList = async () => {
      const res = await productAPI.getAllColor();
      setColorList(res.data.data);
    };
    const fetchSizeList = async () => {
      const res = await productAPI.getAllSize();
      setSizeList(res.data.data);
    };
    fetchColorList();
    fetchSizeList();
  }, []);

  return (
    <div className="lg:basis-5/12">
      <div className="pb-5">
        <h3 className="text-[28px]">{product.productName}</h3>
        <p>
          <span className=" text-[15px] font-medium text-[#5b5b5b]">Mã sản phẩm: </span>
          <span className="text-[#C4996B] font-medium">{product.productID}</span>
        </p>
        <p className="my-1">
          <span className="text-[#5b5b5b] text-[15px] font-medium">Giá: </span>
          <span className="text-[#C4996B] text-[18px] font-medium">
            {formatVND(product.price - product.price * (product.saleOff / 100))}
          </span>
          <span className="pl-4 text-[15px] text-[#2d2d2d] line-through italic font-medium">
            {formatVND(product.price)}
          </span>
        </p>
        <p className="text-[#5b5b5b] text-[15px] font-medium">
          Mô tả sản phẩm: <span className="">{product.description}</span>
        </p>
      </div>
      <hr />
      <SuggestSizeWrapper />
      {/* Màu sắc */}
      <div className="pt-1">
        <div className="flex items-center">
          <span className="text-sm text-[#757575] basis-2/12">Màu</span>
          <ul className="flex items-center flex-wrap gap-3 basis-10/12">
            {/* Map qua từng mảng các gallery và lấy tên màu của gallery đó- > nên chỉ cần dùng element[0] */}
            {product.Gallery &&
              product.Gallery.map((item: any, index: number) => (
                <li key={index}>
                  <Button
                    onClick={() => handleClickColor(item[0].colorID)}
                    containerStyles={
                      checkingSelectedColorBtn(item[0].colorID) +
                      'text-center min-w-[80px] py-1 px-3 border border-[rgba(0,0,0,.09)]'
                    }
                    title={getValueByColorID(item[0].colorID)}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
      {/* Size */}
      <div className="pt-5">
        <div className="flex flex-wrap">
          <span className="text-sm text-[#757575] basis-2/12">Size</span>
          <ul className="flex items-center flex-wrap gap-3 basis-10/12">
            {sizeList &&
              sizeList.map((item: ColorSizeProps) => (
                <li key={item.id}>
                  <Button
                    containerStyles={
                      (checkQuantity(item.id) === 0
                        ? 'pointer-events-none bg-[rgba(0,0,0,0.03)] '
                        : '') +
                      checkingSelectedSizeBtn(item.id) +
                      'min-w-[80px] text-center py-1 px-3 border border-[rgba(0,0,0,.09)] text-center'
                    }
                    title={item.value}
                    onClick={() => setSelectedSize(item)}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
      {/* Quantity */}
      <div className="flex items-center mt-5">
        <span className="text-sm text-[#757575] basis-2/12">Số lượng</span>
        <div className="basis-10/12 flex items-center gap-3">
          <div>
            <Button
              title="-"
              onClick={() => handleClickQuantity(TypeBtnQty.ASC)}
              containerStyles="border boder-[#eee] w-8 h-8 text-[#909090] text-lg"
            />
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              className="w-[60px] h-8 border boder-[#eee] text-center text-lg appearance-none outline-none"
            />
            <Button
              onClick={() => handleClickQuantity(TypeBtnQty.DESC)}
              title="+"
              containerStyles="border boder-[#eee] w-8 h-8 text-[#909090] text-lg"
            />
          </div>
          {selectedSize && (
            <span className="text-sm text-[#757575]">
              {checkQuantity(+selectedSize?.id)} sản phẩm có sẵn
            </span>
          )}
        </div>
      </div>
      <p>{err}</p>
      <div className="text-center mt-8 mb-5 md:text-left ">
        <Button
          containerStyles="w-full text-center bg-[#3f4140] py-2 px-4 rounded-[8px] text-white uppercase md:w-[250px] md:px-10 
          border border-transparent hover:border-[#3f4140] hover:bg-transparent hover:text-[#3f4140] transition-all duration-300 md:text-[12px] md:py-3"
          title="Thêm vào giỏ"
          onClick={handleAddProductToCart}
        />
      </div>
      {children}
    </div>
  );
}

export default BaseInfo;
