'use client';
import { useState } from 'react';
import FilterWrapper from './FilterWrapper';
import ListProduct from './ListProduct';
import { FilterProps } from '~/types';
interface Props {
  type: number;
}
function ListProductWrapper({ type }: Props) {
  const [filter, setFilter] = useState<FilterProps>({
    sizeList: [],
    colorID: '',
  });
  return (
    <div className="flex mb-10">
      <FilterWrapper setFilter={setFilter} />
      <ListProduct categoryID={type} filter={filter} />
    </div>
  );
}

export default ListProductWrapper;
