import { Link, useLoaderData } from '@remix-run/react';
import { InView } from 'react-intersection-observer';

import ProductCarousel, {
  ProductCarouselDots,
  ProductCarouselItem,
  ProductCarouselItems,
  ProductCarouselNext,
  ProductCarouselPrevious,
} from '@/components/ProductCarousel';
import ProductItem from '@/components/ProductItem';

import type { loader } from './server';

const Collections = () => {
  const {
    champagne,
    largeFormats,
    organicallyFarmed,
    newCellar,
    rareCollectible,
    trendingNow,
  } = useLoaderData<typeof loader>();

  return (
    <>
      {[
        { title: 'Trending Now', items: trendingNow },
        { title: 'Champagne', items: champagne },
        { title: 'Organically Farmed', items: organicallyFarmed },
        { title: 'Rare & Collectable', items: rareCollectible },
        { title: 'Large Formats', items: largeFormats },
        { title: 'New Cellar', items: newCellar },
      ].map((collection) => {
        return (
          <section key={`Collection-${collection.title}`} className="w-full">
            <h4>COLLECTIONS</h4>

            <div className="mt-6 flex w-full flex-col items-center justify-center gap-2">
              <h2 className="text-center font-tertiary leading-[1em]">
                {collection.title}
              </h2>

              <Link
                to="/wines/"
                aria-label={`View products in ${collection.title}`}
              >
                [VIEW ALL]
              </Link>
            </div>

            <div className="mt-[30px]">
              <ProductCarousel>
                <ProductCarouselPrevious />
                <ProductCarouselNext>Next</ProductCarouselNext>

                <ProductCarouselItems>
                  {collection.items.edges.map((edge) => {
                    const { cursor, node } = edge;
                    const { type, variants } = node;

                    if (type !== 'WINE' || variants.length === 0) {
                      return null;
                    }

                    const { attributes, image, images } = node;
                    const { country, score, varietal } = attributes;
                    const { isComparable, price, retailPrice, sku, title } =
                      variants[0]!;

                    const thumbnail = images.find(
                      (i) => i.type === 'THUMBNAIL'
                    );

                    return (
                      <ProductCarouselItem key={cursor}>
                        <InView
                          triggerOnce
                          key={`Collection-${collection.title}-ProductItem-${cursor}`}
                        >
                          {({ inView, ref }) => (
                            <ProductItem
                              ref={ref}
                              sku={sku}
                              title={title}
                              price={price}
                              score={score}
                              isInView={inView}
                              country={country}
                              varietal={varietal}
                              comparePrice={isComparable ? retailPrice : null}
                              image={
                                thumbnail
                                  ? thumbnail.attributes.formats.small
                                  : image
                              }
                            />
                          )}
                        </InView>
                      </ProductCarouselItem>
                    );
                  })}
                </ProductCarouselItems>

                <ProductCarouselDots />
              </ProductCarousel>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Collections;
