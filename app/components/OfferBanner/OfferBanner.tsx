import { forwardRef } from 'react';

import type {
  ComponentPropsWithoutRef,
  Primitive,
} from '@radix-ui/react-primitive';
import clsx from 'clsx';

const OfferBanner = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Primitive.p>
>((props, ref) => {
  const { className } = props;

  return (
    <div
      ref={ref}
      className={clsx(
        'relative flex w-full select-none items-center justify-center text-center',
        // Before
        'before:absolute before:top-[0.5em] before:bottom-[0.3em] before:-z-[1] before:block before:w-full before:bg-ofs-yellowish before:leading-[1em] before:content-[""]'
      )}
    >
      <p
        {...props}
        className={clsx(
          'font-secondary text-[21px] uppercase leading-[1em] tracking-[0.03em]',
          className
        )}
      />
    </div>
  );
});

OfferBanner.displayName = 'OfferBanner';

export default OfferBanner;
