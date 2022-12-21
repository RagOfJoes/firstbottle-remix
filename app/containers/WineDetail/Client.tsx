import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';

import OfferBanner from '@/components/OfferBanner';
import { links as productCarouselLinks } from '@/components/ProductCarousel';

import Detail from './Detail';
import type { loader } from './server';
import Similar from './Similar';

export const links: LinksFunction = () => [...productCarouselLinks()];

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data.wine) {
    return {
      title: 'Not found - First Bottle',
    };
  }

  const { description, seo, title } = data.wine;
  return {
    title: `${seo?.title || title} - First Bottle`,
    description: seo?.description || description,

    // Open Graph
    'og:description': seo?.description || description,
  };
};

const WineDetailContainer = () => {
  const go = useNavigate();

  return (
    <>
      <button
        className="flex items-center pt-8 text-ofs-primary hover:text-ofs-secondary hover:underline max-md:pt-5"
        onClick={() => {
          if (document.referrer.indexOf(window.location.host) !== -1) {
            go(-1);
            return;
          }

          go('/');
        }}
      >
        &lt; Continue shopping
      </button>

      <div className="mt-4 flex w-full justify-center">
        <section className="w-full max-w-[83.33%] max-md:max-w-full">
          <div className="flex justify-end gap-[30px]">
            <div className="basis-1/2 max-md:hidden" />
            <div className="basis-1/2 max-md:basis-full">
              <OfferBanner>
                Buy any <strong>6</strong> Bottles and get{' '}
                <strong>FREE GROUND SHIPPING</strong>
              </OfferBanner>
            </div>
          </div>

          <Detail />
        </section>
      </div>

      <Similar />
    </>
  );
};

export default WineDetailContainer;
