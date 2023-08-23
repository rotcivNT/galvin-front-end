/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { NavbarItemProps } from '~/types';
import MobileSubMenu from './MobileSubMenu';

function MobileMenuItem({ title, href, childItems, imagePath }: NavbarItemProps) {
  const [open, setOpen] = useState(false);

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
      setOpen((pre) => !pre);
    }
  };
  return (
    <>
      <Link href={href} onClick={(e) => handleClick(e)} className={containerStyles}>
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
        setOpen={setOpen}
        childItems={childItems}
        open={open}
      />
    </>
  );
}

export default MobileMenuItem;
