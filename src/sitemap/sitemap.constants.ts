import { TopLevelCategory } from '../page/page.model';

type routeMapType = Record<TopLevelCategory, string>;

export const CATEGORY_ULR: routeMapType = {
  0: '/courses',
  1: '/services',
  2: '/books',
  3: '/products',
};
