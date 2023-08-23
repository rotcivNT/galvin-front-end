'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import Button from '../Button/Button';

function SearchInput({ isOpenMobile }: { isOpenMobile: boolean }) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  let wrapperMobileStyles = isOpenMobile
    ? 'absolute top-[calc(100%+10px)] left-[0] right-[0]'
    : 'hidden';
  const handleClickSearch = () => {
    router.push(`/search?q=${query}`);
  };
  const handleEnter = (e: any) => {
    if (e.keyCode === 13) {
      handleClickSearch();
    }
  };
  return (
    <div
      className={`${wrapperMobileStyles} p-[5px] md:p-0 bg-white md:bg-transparent lg:px-[72px] lg:flex 
      items-center lg:relative shadow-lg`}
    >
      <input
        className="w-full lg:w-[400px] text-sm py-[6px] pl-4 pr-9 bg-[#ededed] lg:rounded-[20px] outline-none"
        type="text"
        placeholder="Tìm kiếm sản phẩm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleEnter}
      />
      <Button
        title=""
        icon={<IoIosSearch className="mx-auto" />}
        onClick={handleClickSearch}
        containerStyles="text-2xl text-white lg:text-black absolute right-0 lg:right-[72px] top-0 bottom-0 w-10 cursor-pointer"
      />
    </div>
  );
}

export default SearchInput;
