import type { ReactNode } from 'react';

import type { LinkProps } from '@remix-run/react';

export type FooterProps = {
  links: {
    label?: string;
    render?: ReactNode;
    to?: LinkProps['to'];
  }[];
};
