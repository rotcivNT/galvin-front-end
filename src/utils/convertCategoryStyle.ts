import { CategoryItemProps } from '~/types';

export const convertCategoryStyle = (data: any[]) => {
  const results: CategoryItemProps[] = [];
  const categoryById: { [key: number]: CategoryItemProps } = {};

  data.forEach((item: CategoryItemProps) => {
    // Add các category theo type [categoryID]: categoryItem + add children field
    categoryById[item.id] = {
      ...item,
      children: [],
    };
  });

  data.forEach((item: CategoryItemProps) => {
    // Nếu có parentID thì add nó vào children của parent nó
    if (item.parentID) {
      categoryById[item.parentID].children?.push(item);
    }
    // Nếu không có thì add nó vào results để trả về -> Tức là add các Category
    // level 1 vào results -> Kêt quả muốn lấy các cate lv1 ở results
    else {
      results.push(categoryById[item.id]);
    }
  });
  return results;
};
