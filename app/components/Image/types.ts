import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

export type ImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement> & {
    isInView?: boolean;
    isLoading?: boolean;
  },
  HTMLImageElement
>;
