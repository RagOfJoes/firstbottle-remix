import { Children, useMemo } from 'react';

import type { ProductCarouselItemsProps } from './types';

const Items = (props: ProductCarouselItemsProps) => {
  const { children } = props;

  const items = useMemo(() => {
    return Children.toArray(children).filter(
      (child: any) => child?.type?.displayName === 'ProductCarouselItem'
    );
  }, [children]);

  return <>{items}</>;
};

Items.displayName = 'ProductCarouselItems';

export default Items;
