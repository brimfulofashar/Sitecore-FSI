import { Placeholder, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';
import React, { JSX } from 'react';

const ICON_COLOR = '#00316D';

const SearchIcon = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" aria-hidden="true">
    <g fill="none" fillRule="evenodd">
      <g stroke={ICON_COLOR} strokeWidth="1.25">
        <circle cx="4.667" cy="4.667" r="4.667" transform="translate(1 1)" />
        <path strokeLinecap="square" d="M8.583 9.75L13.592 14.758" transform="translate(1 1)" />
      </g>
    </g>
  </svg>
);

const LocationsIcon = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <g fill="none" fillRule="evenodd" stroke={ICON_COLOR} strokeWidth="1.25">
      <path d="M7 1.75a3.5 3.5 0 0 1 3.5 3.5c0 2.625-3.5 6.125-3.5 6.125S3.5 7.875 3.5 5.25A3.5 3.5 0 0 1 7 1.75z" />
      <circle cx="7" cy="5.25" r="1.167" />
    </g>
  </svg>
);

const PromotionsIcon = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <g fill="none" fillRule="evenodd" stroke={ICON_COLOR} strokeWidth="1.25">
      <path d="M2.333 2.333h7l2.917 2.917v6.417H2.333z" />
      <path strokeLinecap="square" d="M9.333 2.333v2.917h2.917" />
      <path d="M5.25 7.583l1.167 1.167L9.917 5.25" />
    </g>
  </svg>
);

const ContactIcon = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" aria-hidden="true">
    <g fill="none" fillRule="evenodd" stroke={ICON_COLOR} strokeWidth="1.25">
      <rect width="12.833" height="9.333" x="0.583" y="1.333" rx="0.5" />
      <path strokeLinecap="square" d="M0.583 2.917l6.417 4.083 6.417-4.083" />
    </g>
  </svg>
);

type EyebrowLinkProps = {
  href: string;
  label: string;
  icon: JSX.Element;
};

const EyebrowLink = ({ href, label, icon }: EyebrowLinkProps): JSX.Element => (
  <Link href={href} className="header-top-links__item" role="listitem">
    <span className="header-top-links__content">
      <span className="header-top-links__content-icon">{icon}</span>
      <span className="header-top-links__content-label">{label}</span>
    </span>
  </Link>
);

const EyebrowSearch = (): JSX.Element => (
  <button type="button" className="header-top-links__item header-top-links__item--search" role="listitem">
    <span className="header-top-links__content">
      <span className="header-top-links__content-icon">
        <SearchIcon />
      </span>
      <span className="header-top-links__content-label">Search</span>
    </span>
  </button>
);

const EyebrowRegionFallback = (): JSX.Element => {
  const { page } = useSitecore();
  const regionLabels: Record<string, string> = {
    en: 'CA: English',
    'en-CA': 'CA: English',
    'fr-CA': 'CA: Français',
    'ja-JP': 'JP: 日本語',
  };
  const label = regionLabels[page.locale] ?? 'CA: English';

  return <span className="header-top-links__content header-top-links__content--region header-top-links__content--fallback">{label}</span>;
};

export const Default = (props: ComponentProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = props.params.styles?.trimEnd() ?? '';

  return (
    <div className={`component eyebrow ${sxaStyles}`} id={id ? id : undefined}>
      <div className="eyebrow__brand-strip" aria-hidden="true" />
      <div className="header-top-links">
        <div className="header-top-links__inner">
          <nav className="header-top-links__wrapper" role="list" aria-label="Utility navigation">
            <Placeholder name="eyebrow-left" rendering={props.rendering} />
            <EyebrowSearch />
            <EyebrowLink href="/locations" label="Locations" icon={<LocationsIcon />} />
            <EyebrowLink href="/promotions" label="Promotions" icon={<PromotionsIcon />} />
            <EyebrowLink href="/contact-us" label="Contact Us" icon={<ContactIcon />} />
            <div className="header-top-links__item header-top-links__item--region" role="listitem">
              <Placeholder name="eyebrow-right" rendering={props.rendering} />
              <EyebrowRegionFallback />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
