/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { NavbarItemProps } from '~/types';

interface Props extends NavbarItemProps {
  setOpen: (value: string) => void;
}

function MobileSubMenuItem({ title, href, imagePath, setOpen }: Props) {
  return (
    <Link
      onClick={() => setOpen('translate-x-[calc(-100%-40px)]')}
      href={href}
      className="flex gap-3 items-center py-2 border-b-2 border-[#ebebeb]"
    >
      <img className="w-[35px] h-[35px] object-cover" alt={title} src={imagePath} />
      <span className="font-medium text-sm">{title}</span>
    </Link>
  );
}

export default MobileSubMenuItem;
