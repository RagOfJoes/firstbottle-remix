import { forwardRef, useRef } from 'react';

import { Link } from '@remix-run/react';
import clsx from 'clsx';

import type { CTACardProps } from './types';

const CTACard = forwardRef<HTMLDivElement, CTACardProps>((props, ref) => {
  const {
    className,
    subtitle = "It's like bragging rights, but you drink it",
    title = 'Never miss a Bottle',
    ...other
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      {...other}
      ref={ref}
      className={clsx(
        'flex flex-col items-center bg-ofs-yellowish p-12 text-center max-sm:px-[10px]',
        className
      )}
    >
      <h1>{title}</h1>

      <p className="mt-8 font-secondary text-[21px] uppercase tracking-[0.03em]">
        {subtitle}
      </p>

      <div
        className="relative mt-8 flex w-1/2 cursor-text justify-between border-b border-b-ofs-text bg-ofs-base px-4 py-3 max-sm:w-full"
        onClick={() => {
          inputRef.current?.focus();
        }}
        onFocus={() => {
          inputRef.current?.focus();
        }}
      >
        <input
          ref={inputRef}
          placeholder="Enter your email..."
          className={clsx(
            'w-full basis-7/12 truncate bg-transparent',
            // Focus
            'focus:outline-none',
            // Placeholder
            'placeholder:truncate placeholder:text-[#d4d4d4]'
          )}
        />

        <button
          type="submit"
          className={clsx(
            'bg-transparent text-ofs-primary shadow-none outline-none',
            // Hover
            'hover:underline'
          )}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          SUBSCRIBE
        </button>
      </div>

      <p className="mt-[1em] font-secondary text-[12px] tracking-[0.03em] opacity-70">
        BY SIGNING UP YOU AGREE TO OUR{' '}
        <Link to="/terms/" aria-label="View terms of use">
          TERMS OF USE
        </Link>
      </p>
    </div>
  );
});

CTACard.displayName = 'CTACard';

export default CTACard;
