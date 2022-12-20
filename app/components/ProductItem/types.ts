import type { HTMLAttributes } from 'react';

export type ProductItemProps = HTMLAttributes<HTMLDivElement> & {
  comparePrice?: null | number;
  country?: null | string;
  image: string;
  isInView?: boolean;
  onQuickAdd?: () => void | Promise<void>;
  price: number;
  score?: null | string;
  sku: string;
  title: string;
  varietal?: null | string;
};
