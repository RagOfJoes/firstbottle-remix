import type { PropsWithChildren } from 'react';

import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from '@remix-run/react';
import dayjs from 'dayjs';
import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { AppProvider, useApp } from '@/providers/App';
import tailwind from '@/tailwind.css';

export const links: LinksFunction = () => [
  // Fonts
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600&family=Dynalight&display=swap',
  },

  // Icons
  {
    rel: 'icon',
    sizes: '16x16 32x32 64x64',
    href: '/images/favicon.png',
  },
  {
    rel: 'icon',
    sizes: '32x32',
    href: `https://s3.amazonaws.com/efcheckout/firstbottle/favicon-63215.png?v${dayjs().format(
      'YYYYMMDD'
    )}`,
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: `https://s3.amazonaws.com/efcheckout/firstbottle/favicon-large-18667.png?v${dayjs().format(
      'YYYYMMDD'
    )}`,
  },
  {
    rel: 'shortcut icon',
    href: '/images/favicon.png',
  },

  // Tailwind
  { rel: 'stylesheet', href: tailwind },
];

export const meta: MetaFunction = () => ({
  author: 'Design by Offset - www.offsetpartners.com',
  charset: 'utf-8',
  commerce: 'Commerce by Figure - www.commercebyfigure.com',
  description:
    'A curated selection of vino for the discerning wine lover at incredible prices.',
  title:
    'First Bottle - Shop Rare and Collectable Wines at Best Prices Online.',
  viewport:
    'width=device-width, initial-scale=1, shrink-to-fit=no, minimal-ui, user-scalable=no',

  // Open Graph
  'og:description':
    'A curated selection of vino for the discerning wine lover at incredible prices.',
  'og:image':
    'https://s3.amazonaws.com/efcheckout/firstbottle/social-og-image-60778.png',
  'og:site_name': 'First Bottle',
  'og:type': 'website',
});

const Layout = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const { pathname } = useLocation();
  const context = useApp({});

  return (
    <AppProvider value={context}>
      <Navbar
        currentLink={pathname}
        links={[
          { label: 'Featured', to: '/' },
          { label: 'Search All Wines', to: '/wines/' },
        ]}
      />

      <main className="w-full px-[50px] max-lg:px-[30px] max-md:pl-[70px] max-md:pr-[25px]">
        {children}
      </main>

      <Footer
        links={[
          { to: '/about/', label: 'About' },
          { to: '/faq/', label: 'FAQ' },
          { to: '/contact/', label: 'Contact' },
          {
            render: (
              <a
                target="_blank"
                rel="noreferrer"
                aria-label="Visit our blog"
                href="https://blog.firstbottlewines.com/"
                className="text-inherit hover:text-ofs-text hover:no-underline"
              >
                Blog
              </a>
            ),
          },
          {
            to: '/shipping/',
            label: 'Shipping Info',
          },
          {
            to: '/privacy/',
            label: 'Privacy Policy',
          },
          {
            to: '/terms/',
            label: 'Terms of Use',
          },
          {
            to: '/accessibility/',
            label: 'Accessibility',
          },
          {
            render: (
              <div className="flex gap-[10px] max-md:hidden">
                <a
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit our facebook"
                  href="https://facebook.com/firstbottlewines"
                  className="text-inherit hover:text-ofs-text hover:no-underline"
                >
                  <FaFacebookSquare />
                </a>

                <a
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit our instagram"
                  href="https://instagram.com/firstbottlewines"
                  className="text-inherit hover:text-ofs-text hover:no-underline"
                >
                  <FaInstagram />
                </a>

                <a
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit our twitter"
                  href="https://twitter.com/firstbottlewines"
                  className="text-inherit hover:text-ofs-text hover:no-underline"
                >
                  <FaTwitter />
                </a>
              </div>
            ),
          },
          {
            to: '/invites/',
            label: 'Refer Friends/Get $',
          },
        ]}
      />
    </AppProvider>
  );
};

const Document = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  return (
    <html lang="en-US" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>

      <body className="min-h-full w-full bg-ofs-base font-primary text-ofs-text antialiased">
        <Layout>{children}</Layout>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

const Root = () => (
  <Document>
    <Outlet />
  </Document>
);

export default Root;
