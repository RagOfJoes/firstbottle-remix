import { forwardRef } from 'react';

import clsx from 'clsx';
import { FaCircle } from 'react-icons/fa';

import { useProductCarouselContext } from './Context';
import type { ProductCarouselDotsProps } from './types';

const Dots = forwardRef<HTMLDivElement, ProductCarouselDotsProps>(
  (props, ref) => {
    const { className, ...other } = props;

    const { instanceRef, isLoaded, value } = useProductCarouselContext();

    if (!instanceRef.current || !isLoaded) {
      return null;
    }

    const numOfSlides = instanceRef.current.track.details.slides.length;
    const slidesPerView =
      (instanceRef.current.options.slides as any)?.perView || 0;

    return (
      <div
        {...other}
        ref={ref}
        className={clsx('mt-[10px] flex flex-wrap gap-5', className)}
      >
        {Array.from({
          length: Math.floor(numOfSlides / slidesPerView),
        }).map((_, dot) => {
          return (
            <button
              key={`ProductCarouselDot__${dot}`}
              aria-label={`Go to page ${dot * slidesPerView + 1}`}
              onClick={() => {
                if (!instanceRef.current || !isLoaded) {
                  return;
                }

                let newValue = dot * slidesPerView;

                if (newValue >= numOfSlides - slidesPerView) {
                  newValue = numOfSlides - slidesPerView;
                }

                instanceRef.current.moveToIdx(newValue);
              }}
              className={clsx(
                'text-ofs-secondary opacity-50 hover:opacity-100',
                {
                  'opacity-100':
                    dot * slidesPerView <= value &&
                    (dot + 1) * slidesPerView > value,
                }
              )}
            >
              <FaCircle size={8} />
            </button>
          );
        })}
      </div>
    );
  }
);

Dots.displayName = 'ProductCarouselDots';

export default Dots;
