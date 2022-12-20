import { useState } from 'react';

import { useKeenSlider } from 'keen-slider/react';

import useControllableState from '@/hooks/useControllableState';

import type { ProductCarouselProps, UseProductCarousel } from './types';

const useProductCarousel = (
  props: ProductCarouselProps
): UseProductCarousel => {
  const {
    options = {
      breakpoints: {
        'not all and (min-width: 768px)': {
          slides: { perView: 1, spacing: 30 },
        },
      },
      slides: { perView: 3, spacing: 30 },
    },
    onChange: onChangeProp,
    value: valueProp,
  } = props;

  const [isLoaded, toggleIsLoaded] = useState(false);
  const [value, onChange] = useControllableState({
    defaultValue: 0,
    value: valueProp,
    onChange: onChangeProp,
  });

  const [sliderRef, instanceRef] = useKeenSlider({
    ...options,
    slideChanged: (newSlide) => {
      onChange(newSlide.track.details.rel);

      if (typeof options?.slideChanged === 'function') {
        options.slideChanged(newSlide);
      }
    },
    created: (slider) => {
      toggleIsLoaded(true);

      if (typeof options?.created === 'function') {
        options.created(slider);
      }
    },
  });

  return {
    instanceRef,
    isLoaded,
    onChange,
    productCarouselProps: props,
    sliderRef,
    value,
  };
};

export default useProductCarousel;
