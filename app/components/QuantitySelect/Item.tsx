import type { ElementRef } from 'react';
import { forwardRef } from 'react';

import type { Primitive } from '@radix-ui/react-primitive';
import * as Select from '@radix-ui/react-select';
import type { SelectItemProps } from '@radix-ui/react-select';
import clsx from 'clsx';
import { HiCheck } from 'react-icons/hi2';

const Item = forwardRef<ElementRef<typeof Primitive.div>, SelectItemProps>(
  (props, ref) => {
    const { children, className, ...other } = props;

    return (
      <Select.Item
        {...other}
        ref={ref}
        className={clsx(
          'relative flex select-none items-center justify-between rounded-sm p-1 font-secondary text-[21px] outline-none',
          // Disabled
          'data-[disabled]:pointer-events-none data-[disabled]:bg-ofs-subtext/10 data-[disabled]:text-ofs-subtext',
          // Hover or Highlighted
          'data-[highlighted]:bg-ofs-primary data-[highlighted]:text-ofs-base data-[highlighted]:outline-none',
          className
        )}
      >
        <Select.ItemText>{children}</Select.ItemText>

        <Select.ItemIndicator>
          <HiCheck size={15} />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

Item.displayName = 'QuantitySelectListItem';

export default Item;
