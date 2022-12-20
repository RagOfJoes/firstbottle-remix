import { forwardRef, Fragment } from 'react';

import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { Link } from '@remix-run/react';
import clsx from 'clsx';

import useNumberFormatter from '@/hooks/useNumberFormatter';

import Image from '../Image';
import type { ProductItemProps } from './types';

const ProductItem = forwardRef<HTMLDivElement, ProductItemProps>(
  (props, ref) => {
    const {
      className,
      comparePrice,
      country,
      image,
      isInView,
      onQuickAdd = () => {},
      price,
      score,
      sku,
      title,
      varietal,
      ...other
    } = props;

    const currencyFormatter = useNumberFormatter({
      currency: 'USD',
      style: 'currency',
      minimumFractionDigits: 2,
    });

    return (
      <div {...other} ref={ref} className={clsx('block', className)}>
        <AspectRatio.Root
          tabIndex={0}
          ratio={4 / 5}
          className="group relative w-full outline-none"
        >
          <Link to={`/wines/${sku}`} tabIndex={-1} aria-label={`View ${title}`}>
            <Image src={image} alt={title} isInView={isInView} />
          </Link>

          <button
            onClick={onQuickAdd}
            className={clsx(
              'btn btn-outline absolute left-1/2 bottom-[5%] w-4/5 -translate-x-1/2 truncate opacity-0 outline-none transition-opacity',
              // Focus
              'focus:opacity-100',
              // Group
              'group-hover:opacity-100 group-focus:opacity-100',
              // Hover
              'hover:opacity-100'
            )}
          >
            Quick Add
          </button>
        </AspectRatio.Root>

        <div className="mt-4 flex items-start">
          <Link
            to={`/wines/${sku}`}
            aria-label={`View ${title}`}
            className="block basis-9/12 font-secondary uppercase leading-4 text-ofs-text outline-none hover:text-ofs-text focus:text-ofs-secondary max-md:basis-full"
          >
            {title}
          </Link>

          <div className="basis-3/12 text-end font-secondary max-md:basis-full">
            <p className="font-medium leading-none">
              {currencyFormatter.format(price)}
            </p>
            {!!comparePrice && (
              <p className="font-medium leading-none line-through opacity-50">
                {currencyFormatter.format(comparePrice)}
              </p>
            )}
          </div>
        </div>

        {(country || varietal) && (
          <div className="flex items-center gap-1 uppercase opacity-70">
            {[varietal, country]
              .filter((spec) => !!spec)
              .map((spec, i) => {
                return (
                  <Fragment key={`ProductItem-Spec-${i}`}>
                    {i !== 0 && (
                      <p className="font-secondary text-[14px] tracking-[0.02em]">
                        |
                      </p>
                    )}

                    <p className="font-secondary text-[14px] tracking-[0.02em]">
                      {spec}
                    </p>
                  </Fragment>
                );
              })}
          </div>
        )}

        {score && (
          <p className="font-secondary text-sm uppercase tracking-[0.03em] text-ofs-primary">
            {score}
          </p>
        )}
      </div>
    );
  }
);

ProductItem.displayName = 'ProductItem';

export default ProductItem;
