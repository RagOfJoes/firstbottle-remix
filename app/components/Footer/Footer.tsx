import { Fragment } from 'react';

import { Link } from '@remix-run/react';

import type { FooterProps } from './types';

const Footer = (props: FooterProps) => {
  const { links } = props;

  return (
    <footer className="flex h-[85px] flex-wrap items-center justify-between gap-[10px] border-b-[5px] border-b-ofs-secondary bg-ofs-primary py-[10px] px-[45px] max-xl:h-auto max-xl:flex-col max-xl:flex-nowrap max-md:pt-5 max-md:pr-[25px] max-md:pb-[10px] max-md:pl-[70px]">
      <div className="flex flex-wrap items-center gap-[5px] font-secondary font-extralight uppercase tracking-[0.06em] text-ofs-base max-xl:justify-center max-md:flex-col">
        {links.map((link, index) => {
          let key = `Footer__Link__Item__${index}`;
          let footerLink = null;
          if (link.render) {
            footerLink = link.render;
          }
          if (link.to && link.label) {
            key = `Footer__Link__${link.label}:${link.to}`;
            footerLink = (
              <Link
                to={link.to}
                aria-label={`Go to ${link.label}`}
                className="text-inherit hover:text-ofs-text hover:no-underline"
              >
                {link.label}
              </Link>
            );
          }

          if (footerLink) {
            return (
              <Fragment key={key}>
                {footerLink}
                {index !== links.length - 1 && (
                  <p className="-translate-y-[0.1em] max-md:hidden">&bull;</p>
                )}
              </Fragment>
            );
          }

          return footerLink;
        })}
      </div>

      <Link
        to="/"
        aria-label="Go home"
        className="translate-y-[2px] uppercase tracking-widest text-ofs-base hover:text-ofs-text hover:no-underline"
      >
        © First Bottle {new Date().getFullYear()}
      </Link>
    </footer>
  );
};

export default Footer;
