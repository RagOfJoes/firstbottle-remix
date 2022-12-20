import type { ElementRef } from 'react';
import { forwardRef } from 'react';

import type { Primitive } from '@radix-ui/react-primitive';
import type { SelectTriggerProps } from '@radix-ui/react-select';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { HiChevronUpDown } from 'react-icons/hi2';

const Trigger = forwardRef<
  ElementRef<typeof Primitive.button>,
  SelectTriggerProps
>((props, ref) => {
  const { className, placeholder = 'Select a quantity', ...other } = props;

  return (
    <Select.Trigger
      {...other}
      ref={ref}
      aria-label="Quantity"
      className={clsx(
        'flex h-[50px] cursor-default items-center justify-between gap-[5px] truncate border border-ofs-text px-[0.375rem] font-secondary text-[21px] leading-none outline-none',
        // Placeholder
        'data-[placeholder]:truncate data-[placeholder]:text-ofs-subtext',
        // Focus
        'focus:border-ofs-primary',
        // Open
        'data-[state=open]:border-ofs-primary',
        className
      )}
    >
      <span className="truncate">
        <Select.Value placeholder={placeholder} />
      </span>

      <Select.Icon>
        <HiChevronUpDown size={16} />
      </Select.Icon>
    </Select.Trigger>
  );
});

Trigger.displayName = 'QuantitySelectTrigger';

export default Trigger;
