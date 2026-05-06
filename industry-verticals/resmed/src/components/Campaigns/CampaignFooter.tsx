import React, { JSX } from 'react';

const USEFUL_LINKS = [
  { href: 'https://www.resmed.com/en-us/legal-ip/', label: 'Legal & IP' },
  { href: 'https://www.resmed.com/en-us/security/', label: 'Security' },
  { href: 'https://www.resmed.com/en-us/terms-of-use/', label: 'Terms of Use' },
  { href: 'https://www.resmed.com/en-us/contact-us/', label: 'Contact us' },
] as const;

const SECOND_COLUMN_LINKS = [
  { href: 'https://www.resmed.com/en-us/consumer-health-data/', label: 'Consumer Health Data' },
  { href: 'https://www.resmed.com/en-us/privacy/', label: 'Privacy Policy' },
  { href: 'https://www.resmed.com/en-us/sms-tnc/', label: "SMS T&C's" },
] as const;

const linkClassName =
  'text-sm font-normal text-white/90 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const NavMenu = ({
  links,
  menuId,
}: {
  links: readonly { href: string; label: string }[];
  menuId: string;
}): JSX.Element => (
  <div
    id={menuId}
    className="hs-menu-wrapper active-branch flyouts hs-menu-flow-horizontal"
    role="navigation"
    data-sitemap-name=""
    data-menu-id=""
    aria-label="Navigation Menu"
  >
    <ul className="m-0 flex list-none flex-col space-y-2 p-0" role="menu">
      {links.map((item) => (
        <li key={item.href} className="hs-menu-item hs-menu-depth-1" role="none">
          <a href={item.href} className={linkClassName} role="menuitem" target="_self">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

function LinkedInIcon(): JSX.Element {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <g id="LinkedIn In1_layer">
        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
      </g>
    </svg>
  );
}

function FacebookIcon(): JSX.Element {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <g id="Facebook F2_layer">
        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
      </g>
    </svg>
  );
}

function InstagramIcon(): JSX.Element {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <g id="Instagram3_layer">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
      </g>
    </svg>
  );
}

function YouTubeIcon(): JSX.Element {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <g id="YouTube4_layer">
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
      </g>
    </svg>
  );
}

function XIcon(): JSX.Element {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <g id="X Twitter5_layer">
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
      </g>
    </svg>
  );
}

const SOCIAL_LINKS: {
  href: string;
  label: string;
  Icon: () => JSX.Element;
}[] = [
  {
    href: 'https://www.linkedin.com/company/resmed',
    label: 'LinkedIn',
    Icon: LinkedInIcon,
  },
  {
    href: 'https://www.facebook.com/ResMedAmericas/',
    label: 'Facebook',
    Icon: FacebookIcon,
  },
  {
    href: 'https://www.instagram.com/resmed',
    label: 'Instagram',
    Icon: InstagramIcon,
  },
  {
    href: 'https://www.youtube.com/channel/UCwjFC_AikD4--KeVnU7mbJg?',
    label: 'YouTube',
    Icon: YouTubeIcon,
  },
  {
    href: 'https://twitter.com/resmed',
    label: 'X',
    Icon: XIcon,
  },
];

const headingClassName = 'mb-3 text-base font-semibold leading-tight text-white';

/**
 * Campaign footer matching global ResMed footer layout (useful links, legal links, social).
 */
export default function CampaignFooter(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <div className="gbl-fotr-wrp w-full bg-[#0a0812] text-white">
      <div className="w-full px-4 py-12 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
        <div className="gbl-fotr-in grid w-full max-w-none grid-cols-1 gap-10 md:grid-cols-3 md:gap-x-8 md:gap-y-8 lg:gap-x-16">
          <div className="gbl-fotr-nav min-w-0">
            <h6 className={headingClassName}>Useful links</h6>
            <NavMenu links={USEFUL_LINKS} menuId="campaign-footer-menu-useful" />
          </div>

          <div className="gbl-fotr-nav min-w-0">
            <h6 className={`${headingClassName} invisible select-none`} aria-hidden="true">
              Useful links
            </h6>
            <NavMenu links={SECOND_COLUMN_LINKS} menuId="campaign-footer-menu-legal" />
          </div>

          <div className="gbl-fotr-social-contn-wrp flex min-w-0 flex-col md:items-end md:text-right">
            <h6 className={headingClassName}>Connect</h6>
            <div className="gbl-fotr-social-contn mb-6 flex flex-wrap justify-start gap-4 md:justify-end">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
            <div className="gbl-fotr-rgth-nav">
              <ul className="m-0 list-none p-0" />
            </div>
            <div className="gbl-fotr-btm-txt mt-auto w-full">
              <p className="m-0 text-sm text-white/80 md:text-right">
                @ {year} Resmed | All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
