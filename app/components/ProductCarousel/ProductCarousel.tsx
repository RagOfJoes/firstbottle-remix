import type { ReactNode } from 'react';
import { forwardRef, Children, useMemo } from 'react';

import type { LinksFunction } from '@remix-run/node';
import clsx from 'clsx';
import styles from 'keen-slider/keen-slider.min.css';

import { ProductCarouselProvider } from './Context';
import type { ProductCarouselProps } from './types';
import useProductCarousel from './useProductCarousel';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
];

const ProductCarousel = forwardRef<HTMLDivElement, ProductCarouselProps>(
  (props, ref) => {
    const context = useProductCarousel(props);
    const { instanceRef, isLoaded, productCarouselProps, sliderRef } = context;
    const { children, className, ...other } = productCarouselProps;

    const { dots, items, next, previous } = useMemo(() => {
      const c: {
        dots?: ReactNode;
        items?: ReactNode;
        next?: ReactNode;
        previous?: ReactNode;
      } = {};

      Children.toArray(children).forEach((child: any) => {
        switch (child?.type?.displayName) {
          case 'ProductCarouselDots':
            c.dots = child;
            break;
          case 'ProductCarouselItems':
            c.items = child;
            break;
          case 'ProductCarouselNext':
            c.next = child;
            break;
          case 'ProductCarouselPrevious':
            c.previous = child;
            break;
          default:
            break;
        }
      });

      return c;
    }, [children]);

    return (
      <ProductCarouselProvider value={context}>
        <div
          {...other}
          ref={ref}
          className={clsx('flex flex-col items-center', className)}
        >
          <div
            ref={sliderRef}
            className={clsx('keen-slider', {
              'opacity-0': !instanceRef.current || !isLoaded,
            })}
          >
            {!!items && items}

            {!!previous && previous}
            {!!next && next}
          </div>

          {!!dots && dots}
        </div>
      </ProductCarouselProvider>
    );
  }
);

ProductCarousel.displayName = 'ProductCarousel';

export default ProductCarousel;
