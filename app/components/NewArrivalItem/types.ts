import type { HTMLAttributes } from 'react';

export type NewArrivalItemProps = HTMLAttributes<HTMLDivElement> & {
  comparePrice?: null | number;
  image: string;
  isInView?: boolean;
  onQuickAdd?: () => void | Promise<void>;
  price: number;
  score?: null | string;
  sku: string;
  title: string;
};
