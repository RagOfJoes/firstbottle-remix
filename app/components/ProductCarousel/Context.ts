import createContext from '@/lib/createContext';

import type { UseProductCarousel } from './types';

export const [ProductCarouselProvider, useProductCarouselContext] =
  createContext<UseProductCarousel>({
    strict: true,
    name: 'ProductCarouselContext',
  });
