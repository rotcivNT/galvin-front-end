'use client';
import { NavbarItemProps } from '~/types';
import Button from '../Button/Button';
import MobileSubMenuItem from './MobileSubMenuItem';
import { BsArrowLeft } from 'react-icons/bs';

interface MobileSubMenuProps extends NavbarItemProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

function MobileSubMenu({ title, childItems, setOpen, open }: MobileSubMenuProps) {
  const isOpen = open ? 'translate-x-0' : 'translate-x-[calc(-100%-42px)]';

  return (
    <div
      className={`transition-all duration-300 fixed top-0 bottom-0 left-0 
      w-[100%] bg-white z-50 shadow-[1px_1px_5px_#ccc] ${isOpen}`}
    >
      <div className="flex border-b-2 border-[#2d2d2d1a]">
        <Button
          title={title}
          containerStyles="text-sm text-center text-[#2d2d2d] cursor-pointer h-[50px]
          basis-full uppercase font-medium "
        />
      </div>
      <div className="px-4 py-2">
        {childItems?.map((item) => (
          <MobileSubMenuItem
            key={item.id}
            title={item.categoryName}
            imagePath={item.imagePath || ''}
            href={`${item.id}`}
          />
        ))}
      </div>
      <div
        onClick={() => setOpen((pre) => !pre)}
        className="absolute top-0 right-[-40px] w-10 h-10 bg-[#fbae40] flex items-center justify-center"
      >
        <BsArrowLeft className="text-[22px] text-white" />
      </div>
    </div>
  );
}

export default MobileSubMenu;
