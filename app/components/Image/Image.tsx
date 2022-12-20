import { forwardRef, useState } from 'react';

import clsx from 'clsx';

import type { ImageProps } from './types';

const Image = forwardRef<HTMLDivElement, ImageProps>((props, ref) => {
  const {
    alt,
    className,
    isInView,
    isLoading: isLoadingProp,
    onLoad = () => {},
    src,
    ...other
  } = props;

  const [isLoading, toggleIsLoading] = useState(true);

  return (
    <div ref={ref} className="h-full w-full">
      {(isLoading || isLoadingProp || !isInView) && (
        <div className="h-full w-full animate-pulse bg-ofs-text/30" />
      )}
      {isInView && (
        <img
          {...other}
          src={src}
          alt={alt}
          onLoad={(e) => {
            toggleIsLoading(false);

            onLoad(e);
          }}
          className={clsx(
            'w-full opacity-0 transition-opacity duration-75 ease-linear',
            {
              'opacity-100': !isLoading && !isLoadingProp,
            },
            className
          )}
        />
      )}
    </div>
  );
});

Image.displayName = 'Image';

export default Image;
