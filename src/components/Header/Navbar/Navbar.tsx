import { productAPI } from '~/api/productAPI';
import { CategoryItemProps } from '~/types';
import NavbarItem from './NavbarItem';
import { staticCategory } from '~/utils/defaultValue';
import { convertCategoryStyle } from '~/utils/convertCategoryStyle';

const getCategory = async () => {
  const res = await productAPI.getAllCategory();
  const data = res.data.data;
  const results: CategoryItemProps[] = convertCategoryStyle(data);
  return results;
};

async function Navbar() {
  const categoryList = await getCategory();
  const allCategory = [staticCategory[0], ...categoryList, ...staticCategory.slice(1)];
  return (
    <nav className="max-w-6xl mx-auto">
      <ul className="relative h-[50px] flex items-center justify-center">
        {allCategory.map((category) => (
          <NavbarItem
            title={category.categoryName}
            childItems={category.children}
            href={`${
              category?.children?.length !== 0
                ? `/`
                : `${
                    typeof category.id === 'number'
                      ? `/collections/${category.id}`
                      : `${category.id}`
                  }`
            }`}
            key={category.categoryName}
          />
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
