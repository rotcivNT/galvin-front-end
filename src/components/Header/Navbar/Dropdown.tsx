import Link from 'next/link';
import { NavbarItemProps } from '~/types';

function Dropdown({ title, href }: NavbarItemProps) {
  return (
    <li>
      <Link
        scroll={false}
        className="text-xs block px-4 py-[10px] border-solid border-b border-[#ffffff4d]
         hover:text-[#fcce6f] hover:bg-[#eeeeeee6] duration-200 transition-all"
        href={href}
      >
        <span>{title}</span>
      </Link>
    </li>
  );
}

export default Dropdown;
