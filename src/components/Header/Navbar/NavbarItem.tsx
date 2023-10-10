import Link from 'next/link';
import { NavbarItemProps } from '~/types';
import { BsChevronDown } from 'react-icons/bs';
import Dropdown from './Dropdown';
import styles from '../Header.module.css';
import MegaSub from './MegaSub';

function NavbarItem({ title, childItems, href, imagePath }: NavbarItemProps) {
  const renderSubMenu = () => {
    if (childItems?.length !== 0) {
      if (title.toLowerCase() === 'premium') {
        return (
          <ul
            className={`invisible mt-5 opacity-0 w-[206px] text-black  absolute top-full 
            transition-colors duration-300 left-0 bg-[#eeeeeeb3] ${styles.dropdown}`}
          >
            {childItems?.map((item) => (
              <Dropdown title={item.categoryName} href={`/collections/${item.id}`} key={item.id} />
            ))}
          </ul>
        );
      } else {
        return (
          <ul
            className={`invisible mt-5 opacity-0 bg-[#eee] border-b border-l transition-colors duration-300
             border-r border-[#707070] absolute w-full top-full left-0 p-4 ${styles.dropdown} `}
          >
            <MegaSub subItem={childItems || []} />
          </ul>
        );
      }
    }
  };
  return (
    <li className={` text-white ${styles.navbarItem}`}>
      <Link
        className="text-sm font-semibold px-5 py-4 text-center  flex items-center gap-2"
        href={href}
      >
        {title}
        {childItems?.length === 0 ? '' : <BsChevronDown />}
      </Link>
      {renderSubMenu()}
    </li>
  );
}

export default NavbarItem;
