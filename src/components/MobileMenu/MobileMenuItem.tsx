/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { NavbarItemProps } from '~/types';
import MobileSubMenu from './MobileSubMenu';

interface MobileMenuItemProps extends NavbarItemProps {
  setOpen: (value: string) => void;
}

function MobileMenuItem({ title, href, childItems, imagePath, setOpen }: MobileMenuItemProps) {
  const [openChild, setOpenChild] = useState(false);

  // Để space cuối
  let containerStyles = 'flex items-center justify-between my-1 ';
  if (imagePath) {
    containerStyles = containerStyles + 'bg-[#efefef] h-[80px]';
  } else {
    containerStyles = containerStyles + 'h-[40px] border-b border-[#e9e9e9]';
  }
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (childItems && childItems.length) {
      e.preventDefault();
      setOpenChild((pre) => !pre);
    }
  };
  return (
    <>
      <Link scroll={false} href={href} onClick={(e) => handleClick(e)} className={containerStyles}>
        <div className="pl-2 flex items-center gap-4">
          <span className="text-sm text-[#2d2d2d] font-medium">{title}</span>
          {childItems && childItems.length !== 0 && <FaPlus />}
        </div>
        {imagePath && (
          <div className="w-[80px]">
            <img className="w-[100%] object-cover" alt={title} src={imagePath} />
          </div>
        )}
      </Link>
      {/* không handle href trong case này */}
      <MobileSubMenu
        title={title}
        href={''}
        setOpenChild={setOpenChild}
        childItems={childItems}
        open={openChild}
        setOpen={setOpen}
      />
    </>
  );
}

export default MobileMenuItem;
