import { Children, forwardRef, useMemo } from 'react';

import * as Select from '@radix-ui/react-select';
import type { SelectContentProps } from '@radix-ui/react-select';
import clsx from 'clsx';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';

const List = forwardRef<HTMLDivElement, SelectContentProps>((props, ref) => {
  const { children, className, ...other } = props;

  const items = useMemo(() => {
    return Children.toArray(children).filter((child: any) => {
      return child?.type?.displayName === 'QuantitySelectListItem';
    });
  }, [children]);

  return (
    <Select.Portal>
      <Select.Content
        {...other}
        ref={ref}
        className={clsx(
          'z-10 overflow-hidden rounded-md border border-ofs-subtext/20 bg-ofs-base shadow-sm',
          className
        )}
      >
        <Select.ScrollUpButton className="flex h-6 items-center justify-center">
          <HiChevronUp />
        </Select.ScrollUpButton>

        <Select.Viewport className="px-[0.375rem] py-3">
          {items}
        </Select.Viewport>

        <Select.ScrollDownButton className="flex h-6 items-center justify-center">
          <HiChevronDown />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  );
});

List.displayName = 'QuantitySelectList';

export default List;
