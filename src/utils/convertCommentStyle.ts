import { Comments } from '~/types';

export const convertCommentStyle = (data: any[]) => {
  const results: Comments[] = [];
  const commentByID: { [key: string]: Comments } = {};

  data.forEach((item: Comments) => {
    // Add các category theo type [categoryID]: categoryItem + add children field
    commentByID[item.id] = {
      ...item,
      children: [],
    };
  });

  data.forEach((item: Comments) => {
    // Nếu có parentID thì add nó vào children của parent nó
    if (item.parentID) {
      commentByID[item.parentID].children?.push(item);
    }
    // Nếu không có thì add nó vào results để trả về -> Tức là add các Category
    // level 1 vào results -> Kêt quả muốn lấy các cate lv1 ở results
    else {
      results.push(commentByID[item.id]);
    }
  });
  return results;
};
