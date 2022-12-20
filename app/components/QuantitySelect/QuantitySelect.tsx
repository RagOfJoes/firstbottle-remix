import type { ReactNode } from 'react';
import { Children, useMemo } from 'react';

import type { SelectProps } from '@radix-ui/react-select';
import * as Select from '@radix-ui/react-select';

const QuantitySelect = (props: SelectProps) => {
  const { children, ...other } = props;

  // Filter children and ensure that the render order is correct
  const { trigger, list } = useMemo(() => {
    const c: { trigger?: ReactNode; list?: ReactNode } = {};

    Children.toArray(children).forEach((child: any) => {
      switch (child?.type?.displayName) {
        case 'QuantitySelectTrigger':
          c.trigger = child;
          break;
        case 'QuantitySelectList':
          c.list = child;
          break;
        default:
          break;
      }
    });

    return c;
  }, [children]);

  return (
    <Select.Root {...other}>
      {trigger}

      {list}
    </Select.Root>
  );
};

QuantitySelect.displayName = 'QuantitySelect';

export default QuantitySelect;
