import { forwardRef, Fragment } from 'react';

import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { Link } from '@remix-run/react';

import useNumberFormatter from '@/hooks/useNumberFormatter';

import QuantitySelect, {
  QuantitySelectList,
  QuantitySelectListItem,
  QuantitySelectTrigger,
} from '../QuantitySelect';
import type { FeaturedProductProps } from './types';

const FeaturedProduct = forwardRef<HTMLDivElement, FeaturedProductProps>(
  (props, ref) => {
    const {
      bottleSize,
      country,
      comparePrice,
      description,
      image,
      maxPurchaseQuantity,
      minPurchaseQuantity = 1,
      price,
      score,
      sku,
      title,
      varietal,
    } = props;

    const currencyFormatter = useNumberFormatter({
      currency: 'USD',
      style: 'currency',
      minimumFractionDigits: 2,
    });

    return (
      <div
        ref={ref}
        className="flex w-full gap-[30px] max-md:flex-col max-md:gap-0"
      >
        <div className="basis-5/12 max-md:basis-auto">
          <AspectRatio.Root
            tabIndex={0}
            ratio={4 / 5}
            className="relative w-full outline-none"
          >
            <Link
              className="block"
              to={`/wines/${sku}`}
              aria-label={`View ${title}`}
            >
              <img src={image} alt={title} className="w-full" />
            </Link>
          </AspectRatio.Root>
        </div>

        <div className="flex basis-7/12 flex-col items-center max-md:basis-auto">
          <h4 className="my-[1.5em] text-ofs-secondary">
            TODAY&apos;S FEATURED BOTTLE
          </h4>

          <h1>{title}</h1>

          {(country || varietal) && (
            <div className="mt-[30px] flex items-center justify-center gap-1 uppercase opacity-70">
              {[varietal, country]
                .filter((spec) => !!spec)
                .map((spec, i) => {
                  return (
                    <Fragment key={`FeaturedProduct-Spec-${i}`}>
                      {i !== 0 && (
                        <p className="font-secondary tracking-[0.03em]">|</p>
                      )}

                      <p className="font-secondary tracking-[0.03em]">{spec}</p>
                    </Fragment>
                  );
                })}
            </div>
          )}

          {score && (
            <p className="font-secondary uppercase tracking-[0.03em] text-ofs-primary">
              {score}
            </p>
          )}

          <div className="mt-4 flex gap-1 font-secondary">
            <p className="text-[21px] font-medium">
              {currencyFormatter.format(price)}
            </p>
            {!!comparePrice && (
              <p className="font-medium line-through opacity-50">
                {currencyFormatter.format(comparePrice)}
              </p>
            )}

            <p className="text-[21px] font-medium">- {bottleSize}</p>
          </div>

          <div className="mt-4 flex w-full max-w-[380px] items-center justify-center gap-2 max-md:flex-col">
            <QuantitySelect
              defaultValue={
                !minPurchaseQuantity
                  ? undefined
                  : minPurchaseQuantity?.toString()
              }
            >
              <QuantitySelectTrigger
                placeholder="Select a quantity"
                className="w-full basis-1/3 max-md:basis-auto"
              />

              <QuantitySelectList>
                {Array.from({ length: maxPurchaseQuantity }).map((_, i) => (
                  <QuantitySelectListItem
                    value={(i + 1).toString()}
                    disabled={(i + 1) % 6 === 0}
                    key={`FeaturedProduct_Quantity_${i + 1}`}
                  >
                    {i + 1}
                  </QuantitySelectListItem>
                ))}
              </QuantitySelectList>
            </QuantitySelect>

            <button className="btn btn-primary flex h-[50px] w-full basis-2/3 items-center justify-center font-medium max-md:basis-auto">
              ADD TO CART
            </button>
          </div>

          {description && (
            <p className="mt-10 text-ofs-text line-clamp-4">{description}</p>
          )}

          <Link
            to={`/wines/${sku}`}
            aria-label={`View ${title}`}
            className="mt-6 flex items-center self-start"
          >
            <p className="text-xs">See Products Details &gt;</p>
          </Link>
        </div>
      </div>
    );
  }
);

FeaturedProduct.displayName = 'FeaturedProduct';

export default FeaturedProduct;
