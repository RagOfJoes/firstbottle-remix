import { Link } from '@remix-run/react';

import type { NavbarProps } from './types';
import { getMobileLinkClass } from './utils';

const Mobile = (props: NavbarProps) => {
  const { currentLink, links } = props;

  return (
    <header className="hidden max-md:block">
      <nav className="fixed top-0 left-0 z-10 h-navbarMobile w-navbarMobile justify-between overflow-y-auto border-r border-r-ofs-border bg-ofs-base">
        <div className="flex w-full items-center gap-[30px] py-[30px] [writing-mode:vertical-rl]">
          {links.map((link) => {
            return (
              <Link
                to={link.to}
                key={`Navbar__Link__${link.label}:${link.to}`}
                className={getMobileLinkClass(currentLink, link.to)}
              >
                {link.label}
              </Link>
            );
          })}

          {[
            { label: 'Refer Friends/Get $', to: '/invites/' },
            { label: 'Log in', to: '/login/' },
          ].map((link) => {
            return (
              <Link
                to={link.to}
                key={`Navbar__Link__${link.label}:${link.to}`}
                className={getMobileLinkClass(currentLink, link.to)}
              >
                {link.label}
              </Link>
            );
          })}

          {/* TODO: Create Cart popover */}
          <button className="relative w-full">
            <p className="flex w-full items-center uppercase tracking-widest duration-500 ease-linear [writing-mode:vertical-rl] hover:text-ofs-primary">
              Cart
            </p>
          </button>
        </div>
      </nav>

      <div className="flex w-full justify-center pt-5 pl-navbarWidth">
        <Link
          to="/"
          className="h-[60px] w-full bg-[url('/images/desktop-logo.png')] bg-contain bg-center bg-no-repeat -indent-[999em] hover:bg-[url('/images/desktop-logo-hover.png')]"
        >
          First Bottle
        </Link>
      </div>
    </header>
  );
};

export default Mobile;
