import { useRef } from 'react';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Link, useLoaderData } from '@remix-run/react';
import clsx from 'clsx';
import { InView } from 'react-intersection-observer';

import NewArrivalItem from '@/components/NewArrivalItem';

import type { loader } from './server';

const NewArrivals = () => {
  const { newArrivals } = useLoaderData<typeof loader>();

  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <aside className="sticky top-[88px] h-[calc(100vh-88px)] w-full basis-2/12 overflow-hidden border-l border-l-ofs-border max-xl:basis-3/12 max-lg:hidden">
      <ScrollArea.Root className="h-full w-full">
        <ScrollArea.Viewport ref={rootRef} className="h-full w-full">
          <div className="py-8 pl-[30px]">
            <h4 className="truncate">New Arrivals</h4>

            <div className="mt-6 flex flex-col gap-[30px]">
              {newArrivals.edges.map((edge) => {
                const { cursor, node } = edge;
                const { type, variants } = node;

                if (type !== 'WINE' || variants.length === 0) {
                  return null;
                }

                const { attributes, image, images } = node;
                const { score } = attributes;
                const { isComparable, price, retailPrice, sku, title } =
                  variants[0]!;

                const thumbnail = images.find((i) => i.type === 'THUMBNAIL');

                return (
                  <InView
                    triggerOnce
                    root={rootRef.current}
                    key={`NewArrivalItem-${cursor}`}
                  >
                    {({ inView, ref }) => (
                      <NewArrivalItem
                        ref={ref}
                        sku={sku}
                        title={title}
                        price={price}
                        score={score}
                        isInView={inView}
                        comparePrice={isComparable ? retailPrice : null}
                        image={
                          thumbnail ? thumbnail.attributes.formats.small : image
                        }
                      />
                    )}
                  </InView>
                );
              })}

              <Link to="/wines/" className="btn btn-primary">
                View All
              </Link>
            </div>
          </div>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          orientation="vertical"
          className="left-0 flex w-1 touch-none select-none p-[1px]"
        >
          <ScrollArea.Thumb
            className={clsx(
              'relative flex-1 rounded-md bg-ofs-secondary',
              'before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[""]'
            )}
          />
        </ScrollArea.Scrollbar>

        <ScrollArea.Corner />
      </ScrollArea.Root>
    </aside>
  );
};

export default NewArrivals;
