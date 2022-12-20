import { forwardRef } from 'react';

import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { Link } from '@remix-run/react';
import clsx from 'clsx';

import useNumberFormatter from '@/hooks/useNumberFormatter';

import Image from '../Image';
import type { NewArrivalItemProps } from './types';

const NewArrivalItem = forwardRef<HTMLDivElement, NewArrivalItemProps>(
  (props, ref) => {
    const {
      className,
      comparePrice,
      image,
      isInView,
      onQuickAdd = () => {},
      price,
      score,
      sku,
      title,
      ...other
    } = props;

    const currencyFormatter = useNumberFormatter({
      currency: 'USD',
      style: 'currency',
      minimumFractionDigits: 2,
    });

    return (
      <div {...other} ref={ref} className={clsx('w-full', className)}>
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

        <Link
          to={`/wines/${sku}`}
          aria-label={`View ${title}`}
          className={clsx(
            'mt-2 block font-secondary uppercase leading-4 text-ofs-text outline-none',
            // Focus
            'focus:text-ofs-secondary',
            // Hover
            'hover:text-ofs-text'
          )}
        >
          {title}
        </Link>

        <div className="mt-2 flex gap-1 font-secondary">
          <p className="font-medium">{currencyFormatter.format(price)}</p>
          {!!comparePrice && (
            <p className="font-medium line-through opacity-50">
              {currencyFormatter.format(comparePrice)}
            </p>
          )}
        </div>

        {score && (
          <p className="mt-2 font-secondary text-sm uppercase leading-[25.2px] tracking-[0.03em] text-ofs-primary">
            {score}
          </p>
        )}
      </div>
    );
  }
);

NewArrivalItem.displayName = 'NewArrivalItem';

export default NewArrivalItem;
