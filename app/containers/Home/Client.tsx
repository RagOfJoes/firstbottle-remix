import type { LinksFunction, MetaFunction } from '@remix-run/node';

import CTACard from '@/components/CTACard';
import { links as productCarouselLinks } from '@/components/ProductCarousel';

import Collections from './Collections';
import Featured from './Featured';
import NewArrivals from './NewArrivals';
import Samplers from './Samplers';

export const links: LinksFunction = () => [...productCarouselLinks()];

export const meta: MetaFunction = () => ({});

const HomeContainer = () => {
  return (
    <>
      <div className="flex w-full gap-[30px]">
        <div className="flex w-full basis-10/12 flex-col gap-[5em] overflow-hidden pt-8 pb-12 max-xl:basis-9/12 max-lg:basis-full max-md:pt-5">
          <Featured />
          <Samplers />
          <Collections />

          <CTACard />
        </div>

        <NewArrivals />
      </div>
    </>
  );
};

export default HomeContainer;
