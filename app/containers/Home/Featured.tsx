import { useLoaderData } from '@remix-run/react';

import FeaturedProduct from '@/components/FeaturedProduct';
import OfferBanner from '@/components/OfferBanner';

import type { loader } from './server';

const Featured = () => {
  const { featuredProduct } = useLoaderData<typeof loader>();

  return (
    <section className="w-full">
      <div className="flex justify-end gap-[30px]">
        <div className="basis-5/12 max-md:hidden" />
        <div className="basis-7/12 max-md:basis-full">
          <OfferBanner>
            Buy any <strong>6</strong> Bottles and get{' '}
            <strong>FREE GROUND SHIPPING</strong>
          </OfferBanner>
        </div>
      </div>

      <div className="mt-4">
        <FeaturedProduct
          image={featuredProduct.image}
          description={featuredProduct.summary}
          sku={featuredProduct.variants[0]!.sku}
          score={featuredProduct.attributes.score}
          title={featuredProduct.variants[0]!.title}
          price={featuredProduct.variants[0]!.price}
          country={featuredProduct.attributes.country}
          varietal={featuredProduct.attributes.varietal}
          comparePrice={featuredProduct.variants[0]!.retailPrice}
          bottleSize={featuredProduct.variants[0]!.attributes.bottleSize}
          maxPurchaseQuantity={featuredProduct.variants[0]!.maxPurchaseQuantity}
          minPurchaseQuantity={featuredProduct.variants[0]!.minPurchaseQuantity}
        />
      </div>
    </section>
  );
};

export default Featured;
