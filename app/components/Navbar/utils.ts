import clsx from 'clsx';

export const getDesktopLinkClass = (current: string, link: string) => {
  const isCurrentLink = current === link;

  return clsx(
    'relative flex h-full items-center uppercase tracking-widest transition-[margin-left] duration-500 ease-linear hover:text-ofs-primary hover:no-underline',
    {
      'text-ofs-primary before:absolute before:bottom-0 before:w-full before:border-b-[3px] before:border-b-ofs-secondary before:content-[""]':
        isCurrentLink,
      'text-ofs-text': !isCurrentLink,
    }
  );
};

export const getMobileLinkClass = (current: string, link: string) => {
  const isCurrentLink = current === link;

  return clsx(
    'relative flex w-full items-center whitespace-nowrap uppercase tracking-widest duration-500 ease-linear hover:text-ofs-primary hover:no-underline',
    {
      'text-ofs-primary before:absolute before:right-0 before:h-full before:border-r-[3px] before:border-r-ofs-secondary before:content-[""]':
        isCurrentLink,
      'text-ofs-text': !isCurrentLink,
    }
  );
};
