import { useLoaderData } from '@remix-run/react';
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

const Similar = () => {
  const { similar } = useLoaderData<typeof loader>();

  if (similar.edges.length === 0) {
    return null;
  }

  return (
    <section className="pb-12">
      <h4>YOU MIGHT ALSO LIKE THESE BOTTLES</h4>

      <div className="mt-[30px]">
        <ProductCarousel>
          <ProductCarouselPrevious />
          <ProductCarouselNext />

          <ProductCarouselItems>
            {similar.edges.map((edge) => {
              const { cursor, node } = edge;
              const { type, variants } = node;

              if (type !== 'WINE' || variants.length === 0) {
                return null;
              }

              const { attributes, image, images } = node;
              const { country, score, varietal } = attributes;
              const { isComparable, price, retailPrice, sku, title } =
                variants[0]!;

              const thumbnail = images.find((i) => i.type === 'THUMBNAIL');

              return (
                <ProductCarouselItem key={cursor}>
                  <InView triggerOnce key={`Similar-ProductItem-${cursor}`}>
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
                          thumbnail ? thumbnail.attributes.formats.small : image
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
};

export default Similar;
