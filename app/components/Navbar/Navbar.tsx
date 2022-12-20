import { Link } from '@remix-run/react';

import Mobile from './Mobile';
import type { NavbarProps } from './types';
import { getDesktopLinkClass } from './utils';

const Navbar = (props: NavbarProps) => {
  const { currentLink, links } = props;

  return (
    <>
      <header className="sticky top-0 z-10 flex h-navbarDesktop w-navbarDesktop justify-between border-b border-b-ofs-border bg-ofs-base px-[50px] max-lg:px-[30px] max-md:hidden">
        <div className="flex h-full items-center gap-[72px] transition-[padding] duration-500 ease-linear max-xl:gap-[20px] max-lg:gap-[14px]">
          <Link
            to="/"
            className="h-full w-[253px] bg-[url('/images/desktop-logo.png')] bg-contain bg-center bg-no-repeat -indent-[999em] hover:bg-[url('/images/desktop-logo-hover.png')] max-lg:w-[170px]"
          >
            First Bottle
          </Link>

          {links.map((link) => {
            return (
              <Link
                to={link.to}
                key={`Navbar__Link__${link.label}:${link.to}`}
                className={getDesktopLinkClass(currentLink, link.to)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex h-full items-center gap-[30px] transition-[padding] duration-500 ease-linear max-lg:gap-[14px]">
          {[
            { label: 'Refer Friends/Get $', to: '/invites/' },
            { label: 'Log in', to: '/login/' },
          ].map((link) => {
            return (
              <Link
                to={link.to}
                key={`Navbar__Link__${link.label}:${link.to}`}
                className={getDesktopLinkClass(currentLink, link.to)}
              >
                {link.label}
              </Link>
            );
          })}

          {/* TODO: Create Cart popover */}
          <button className="relative flex h-full items-center uppercase tracking-widest transition-[margin-left] duration-500 ease-linear hover:text-ofs-primary">
            Cart
          </button>
        </div>
      </header>

      <Mobile {...props} />
    </>
  );
};

export default Navbar;
