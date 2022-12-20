import type { HTMLAttributes } from 'react';

export type CTACardProps = HTMLAttributes<HTMLDivElement> & {
  subtitle?: string;
  title?: string;
};
