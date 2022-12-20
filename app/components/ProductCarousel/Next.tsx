import { forwardRef } from 'react';

import clsx from 'clsx';
import { FaChevronRight } from 'react-icons/fa';

import { useProductCarouselContext } from './Context';
import type { ProductCarouselNextProps } from './types';

const Next = forwardRef<HTMLButtonElement, ProductCarouselNextProps>(
  (props, ref) => {
    const { className, ...other } = props;

    const { instanceRef, isLoaded, value } = useProductCarouselContext();

    if (!instanceRef.current || !isLoaded) {
      return null;
    }

    const numOfSlides = instanceRef.current.track.details.slides.length;
    const slidesPerView =
      (instanceRef.current.options.slides as any)?.perView || 0;
    const isAtEnd =
      value === instanceRef.current.track.details.slides.length - slidesPerView;

    return (
      <button
        {...other}
        ref={ref}
        type="button"
        disabled={isAtEnd}
        aria-label="Next slide"
        onClick={() => {
          let newValue = value + slidesPerView;

          if (!instanceRef.current) {
            return;
          }

          if (newValue >= numOfSlides - slidesPerView) {
            newValue = numOfSlides - slidesPerView;
          }

          instanceRef.current?.moveToIdx(newValue);
        }}
        className={clsx(
          'btn btn-primary absolute right-0 top-1/2 flex h-16 w-10 -translate-y-1/2 opacity-70 transition ease-linear',
          // Disabled
          'disabled:opacity-0',
          // Focus
          'focus:opacity-100',
          // Hover
          'hover:opacity-100',
          {
            'opacity-0': isAtEnd,
          },
          className
        )}
      >
        <FaChevronRight />
      </button>
    );
  }
);

Next.displayName = 'ProductCarouselNext';

export default Next;
