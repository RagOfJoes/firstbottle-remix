import { forwardRef } from 'react';

import type { ProductCarouselItemProps } from './types';

const Item = forwardRef<HTMLDivElement, ProductCarouselItemProps>(
  (props, ref) => {
    const { children } = props;

    return (
      <div ref={ref} className="keen-slider__slide">
        {children}
      </div>
    );
  }
);

Item.displayName = 'ProductCarouselItem';

export default Item;
