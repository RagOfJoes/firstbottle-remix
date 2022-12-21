import { Fragment } from 'react';

import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { useLoaderData, useParams } from '@remix-run/react';
import clsx from 'clsx';

import QuantitySelect, {
  QuantitySelectList,
  QuantitySelectListItem,
  QuantitySelectTrigger,
} from '@/components/QuantitySelect';
import useNumberFormatter from '@/hooks/useNumberFormatter';
import type { ProductWineModel } from '@/models/base';

import type { loader } from './server';

const Technical = ({ wine }: { wine: ProductWineModel }) => {
  const { attributes } = wine;

  const keys: {
    key: keyof ProductWineModel['attributes'];
    label: string;
  }[] = [
    { key: 'blend', label: 'Blend' },
    { key: 'winemaker', label: 'Winemaker' },
    { key: 'country', label: 'Country' },
    { key: 'region', label: 'Region' },
    { key: 'subRegion', label: 'Sub-Region' },
    { key: 'appellation', label: 'Appellation' },
    { key: 'vineyard', label: 'Vineyard' },
    { key: 'soil', label: 'Soil' },

    { key: 'farmingMethod', label: 'Farming Method' },
    { key: 'oak', label: 'Oak' },
    { key: 'aging', label: 'Aging' },
    { key: 'stainless', label: 'Stainless' },

    { key: 'residualSugar', label: 'Residual Sugar' },
    { key: 'brixAtHarvest', label: 'Brix at Harvest' },

    { key: 'releaseDate', label: 'Release Date' },
    { key: 'harvestDate', label: 'Harvest Date' },

    { key: 'alcohol', label: 'Alcohol' },
    { key: 'ph', label: 'PH' },
    { key: 'ta', label: 'TA' },

    { key: 'caseProduction', label: 'Production' },

    { key: 'upc', label: 'UPC' },
  ];

  return (
    <>
      <h3>Technical Details</h3>

      {keys.map(({ key, label }, index) => {
        if (!attributes[key]) {
          return null;
        }

        return (
          <div
            className={clsx('flex justify-between', {
              'mt-[1em]': index === 0,
            })}
            key={`WineDetail-Technical-${key}`}
          >
            <p className="w-full opacity-50">{label}</p>
            <p className="w-full">{attributes[key]}</p>
          </div>
        );
      })}
    </>
  );
};

const Detail = () => {
  const { sku } = useParams();
  const { wine } = useLoaderData<typeof loader>();
  const { attributes, description, image, summary, variants } = wine;
  const { country, score, varietal } = attributes;

  const variant = variants.find((v) => v.sku === sku!)!;
  const {
    attributes: { bottleSize },
    isComparable,
    maxPurchaseQuantity,
    minPurchaseQuantity,
    price,
    retailPrice,
    title,
  } = variant;

  const currencyFormatter = useNumberFormatter({
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 2,
  });

  return (
    <div className="mt-4 flex gap-[30px] pb-[5em] max-md:flex-col">
      <div className="w-full basis-1/2 max-md:basis-auto">
        <AspectRatio.Root
          tabIndex={0}
          ratio={4 / 5}
          className="relative w-full outline-none"
        >
          <img src={image} alt={title} className="w-full" />
        </AspectRatio.Root>

        <div className="mt-8 max-md:hidden">
          <Technical wine={wine} />
        </div>
      </div>

      <div className="flex basis-1/2 flex-col items-center pt-7 max-md:basis-auto">
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
          {!!isComparable && (
            <p className="text-[21px] font-medium line-through opacity-50">
              {currencyFormatter.format(retailPrice)}
            </p>
          )}

          <p className="text-[21px] font-medium">- {bottleSize}</p>
        </div>

        <div className="mt-4 flex w-full max-w-[380px] items-center justify-center gap-2 max-md:flex-col">
          <QuantitySelect
            defaultValue={
              !minPurchaseQuantity ? undefined : minPurchaseQuantity?.toString()
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
          <div
            className="mt-11"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        <div className="hidden w-full max-md:mt-[2em] max-md:block">
          <Technical wine={wine} />
        </div>

        {summary && (
          <div className="mt-[2em] w-full">
            <h3>About the Producer</h3>
            <p className="mt-[1em]">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
