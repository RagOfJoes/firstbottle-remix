import { forwardRef } from 'react';

import clsx from 'clsx';
import { FaChevronLeft } from 'react-icons/fa';

import { useProductCarouselContext } from './Context';
import type { ProductCarouselPreviousProps } from './types';

const Previous = forwardRef<HTMLButtonElement, ProductCarouselPreviousProps>(
  (props, ref) => {
    const { className, ...other } = props;

    const { instanceRef, isLoaded, value } = useProductCarouselContext();

    if (!instanceRef.current || !isLoaded) {
      return null;
    }

    const slidesPerView =
      (instanceRef.current.options.slides as any)?.perView || 0;
    const isAtStart = value === 0;

    return (
      <button
        {...other}
        ref={ref}
        type="button"
        disabled={isAtStart}
        aria-label="Previous slide"
        onClick={() => {
          let newValue = value - slidesPerView;

          if (newValue < slidesPerView) {
            newValue = 0;
          }

          instanceRef.current?.moveToIdx(newValue);
        }}
        className={clsx(
          'btn btn-primary absolute left-0 top-1/2 flex h-16 w-10 -translate-y-1/2 opacity-70 transition-opacity ease-linear',
          // Disabled
          'disabled:opacity-0',
          // Focus
          'focus:opacity-100',
          // Hover
          'hover:opacity-100',
          {
            'opacity-0': isAtStart,
          },
          className
        )}
      >
        <FaChevronLeft />
      </button>
    );
  }
);

Previous.displayName = 'ProductCarouselPrevious';

export default Previous;
