'use client';
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import SwiperButton from '../SwiperButton/SwiperButton';

const arrTemp = [1, 2, 3, 4];

function GalleryDetail({ selectedColor }: { selectedColor: any }) {
  const [selectedImg, setSelectedImg] = useState(selectedColor[0]?.imagePath);
  const handleClick = (url: string) => {
    setSelectedImg(url);
  };
  useEffect(() => {
    setSelectedImg(selectedColor[0]?.imagePath);
  }, [selectedColor]);
  return (
    <div className="basis-full overflow-hidden pb-10 lg:basis-7/12">
      <div>
        <Image
          alt="Image"
          width={500}
          height={500}
          quality={100}
          src={selectedImg || selectedColor[0]?.imagePath}
          className="w-full h-[600px] lg:h-[auto]"
          priority
        />
      </div>
      <div className="overflow-x-auto mt-4">
        <Swiper
          navigation={{
            nextEl: 'button-swiper-next',
            prevEl: 'button-swiper-pre',
          }}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
        >
          {selectedColor.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleClick(item.imagePath)}
                className="basis-3/12 border border-[#999] shrink-0"
              >
                <Image
                  alt=""
                  src={item.imagePath}
                  width={100}
                  height={100}
                  className="w-full max-h-[160px] lg:h-[auto]"
                  quality={100}
                />
              </div>
            </SwiperSlide>
          ))}
          {selectedColor.length > 4 && <SwiperButton />}
        </Swiper>
      </div>
    </div>
  );
}

export default GalleryDetail;
