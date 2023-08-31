import Link from 'next/link';

interface Props {
  totalPages: number;
  currentPage: number;
  query?: string;
}
function PaginationButton({ totalPages, currentPage, query }: Props) {
  const pageNumbers: any[] = [];
  for (let i: number = currentPage - 3; i <= currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPages) break;
    pageNumbers.push(i);
  }
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="px-5 text-sm py-2 cursor-pointer text-white bg-black font-[PNSemiBold]">
        {totalPages} TRANG
      </span>
      <div className="justify-center flex gap-1">
        {pageNumbers.map((number) => (
          <Link
            scroll={false}
            href={query ? `/search?q=${query}&page=${number}` : `?page=${number}`}
            className={`${
              currentPage == number
                ? 'text-white bg-[#FD014E]'
                : 'border border-[#e2e2e2] text-[#656565] hover:bg-[#f7f7f7] hover:text-black transition-all duration-200'
            } px-3 text-center py-[6px] min-w-[36px] inline-block font-[PNSemiBold] `}
            key={number}
          >
            {number}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PaginationButton;
