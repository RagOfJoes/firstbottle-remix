import type {
  ButtonHTMLAttributes,
  Dispatch,
  HTMLAttributes,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
} from 'react';

import type {
  KeenSliderHooks,
  KeenSliderInstance,
  KeenSliderOptions,
} from 'keen-slider/react';

export type ProductCarouselProps = HTMLAttributes<HTMLDivElement> & {
  onChange?: Dispatch<SetStateAction<number>>;
  options?: KeenSliderOptions;
  value?: number;
};

export type ProductCarouselNextProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type ProductCarouselPreviousProps =
  ButtonHTMLAttributes<HTMLButtonElement>;

export type ProductCarouselItemsProps = PropsWithChildren<{}>;

export type ProductCarouselItemProps = PropsWithChildren<{}>;

export type ProductCarouselDotsProps = HTMLAttributes<HTMLDivElement>;

export type UseProductCarousel = {
  instanceRef: MutableRefObject<KeenSliderInstance<
    {},
    {},
    KeenSliderHooks
  > | null>;
  isLoaded: boolean;
  onChange: Dispatch<SetStateAction<number>>;
  productCarouselProps: ProductCarouselProps;
  sliderRef: (node: HTMLElement | null) => void;
  value: number;
};
