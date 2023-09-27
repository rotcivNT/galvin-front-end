'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { productAPI } from '~/api/productAPI';
import { CategoryItemProps } from '~/types';
import { convertCategoryStyle } from '~/utils/convertCategoryStyle';
import { staticCategory } from '~/utils/defaultValue';
import MobileMenuItem from './MobileMenuItem';

interface StaticCategoryProps {
  categoryName: string;
  id: string;
  children: never[];
  imagePath?: string;
}

function MobileMenu() {
  const [open, setOpen] = useState('translate-x-[calc(-100%-40px)]');
  const [category, setCategory] = useState<(CategoryItemProps | StaticCategoryProps)[]>([]);
  const handleClickOpen = () => {
    setOpen('translate-x-0');
  };
  const handleClose = () => {
    setOpen('translate-x-[calc(-100%-40px)]');
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await productAPI.getAllCategory();
      const results: CategoryItemProps[] = convertCategoryStyle(res.data.data);
      setCategory([staticCategory[0], ...results, ...staticCategory.slice(1)]);
    };
    fetchData();
  }, []);

  return (
    <>
      <Button
        title={''}
        icon={<AiOutlineMenu className="align-top" />}
        containerStyles="text-[26px] text-white lg:hidden"
        onClick={handleClickOpen}
      />
      <div>
        {open === 'translate-x-0' && (
          <div className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-50"></div>
        )}
        <div
          className={`fixed top-0 bottom-0 left-0 w-[70%] bg-white z-50 shadow-[1px_1px_5px_#ccc] 
          transition-all duration-300 ${open}`}
        >
          <div className="flex border-b border-[#2d2d2d1a]">
            <Button
              title="Nam"
              containerStyles="text-sm text-[#2d2d2d] cursor-pointer h-[50px] 
                basis-1/2 uppercase font-medium border-b-2 border-[#2d2d2d]"
            />
            <Button
              title="Nữ"
              containerStyles="text-sm text-[#999] cursor-pointer h-[50px] basis-1/2 uppercase font-medium"
            />
          </div>
          {category.map((item) => {
            return (
              <MobileMenuItem
                key={item.categoryName}
                title={item.categoryName}
                href={`${typeof item.id == 'number' ? `/` : `${item.id}`}`}
                imagePath={item.imagePath || ''}
                childItems={item.children}
                setOpen={setOpen}
              />
            );
          })}
          <div
            onClick={handleClose}
            className="absolute top-0 right-[-40px] w-10 h-10 bg-[#fbae40] flex items-center justify-center"
          >
            <FaTimes className="text-[22px] text-white" />
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
