import { forwardRef } from 'react';

import { Link } from '@remix-run/react';

import type { SamplerItemProps } from './types';

const SamplerItem = forwardRef<HTMLDivElement, SamplerItemProps>(
  (props, ref) => {
    const { description, image, title, slug } = props;

    return (
      <div ref={ref} className="flex h-full w-full flex-col">
        <Link
          to={`/samplers/${slug}`}
          className="text-ofs-text hover:text-ofs-text hover:no-underline"
        >
          <div className="flex basis-2/3 flex-col">
            <img alt={title} src={image} className="mx-auto w-[64%]" />

            <div className="mt-5 flex min-h-[7.5em] items-center justify-center">
              <h2 className="text-center font-tertiary leading-[1em]">
                {title}
              </h2>
            </div>
          </div>
        </Link>

        <div className="mt-5 flex basis-1/3 flex-col">
          <p className="text-[13px]">{description}</p>

          <Link
            to={`/samplers/${slug}`}
            className="mt-6 flex items-center self-start"
          >
            <p className="text-xs">View Wines &gt;</p>
          </Link>
        </div>
      </div>
    );
  }
);

SamplerItem.displayName = 'SamplerItem';

export default SamplerItem;
