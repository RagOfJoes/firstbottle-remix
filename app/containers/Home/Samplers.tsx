import { useMemo } from 'react';

import { useLoaderData } from '@remix-run/react';

import SamplerItem from '@/components/SamplerItem';
import type { ProductCategoryModel } from '@/models/base';

import type { loader } from './server';

const Samplers = () => {
  const { samplers } = useLoaderData<typeof loader>();

  const samplersRecord = useMemo(() => {
    const res: Record<string, ProductCategoryModel> = {};

    samplers.forEach((category) => {
      res[category.slug] = category;
    });

    return res;
  }, [samplers]);

  return (
    <section className="w-full">
      <h4>SIX-BOTTLE SAMPLERS</h4>

      <div className="mt-[1.5em] grid grid-cols-3 gap-[30px] max-md:grid-cols-1">
        {['kick-ass-napa-cabs', 'farmer-fizz', 'kick-the-grill-up-a-notch'].map(
          (slug) => {
            const { description, image, images, title } = samplersRecord[slug]!;

            return (
              <SamplerItem
                slug={slug}
                title={title}
                key={`SamplerItem-${slug}`}
                description={description || ''}
                image={
                  images.find((i) => i.type === 'THUMBNAIL')?.attributes.formats
                    .small || image!
                }
              />
            );
          }
        )}
      </div>
    </section>
  );
};

export default Samplers;
