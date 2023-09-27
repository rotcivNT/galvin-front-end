import { Suspense } from 'react';
import SpinnerLoading from '~/components/Loading/SpinnerLoading';
import SearchResult from '~/components/SearchResult/SearchResult';

export default function SearchPages({ searchParams }: { searchParams: { [key: string]: string } }) {
  return (
    <div className="min-h-[100vh] lg:max-w-[960px] xl:max-w-6xl mx-5 md:mx-8 xl:mx-auto lg:mt-[100px]">
      <Suspense fallback={<SpinnerLoading />}>
        <SearchResult searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
