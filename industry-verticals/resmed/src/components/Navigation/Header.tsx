import { ImageField, NextImage, Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import React, { JSX } from 'react';

/**
 * Temporary hardcoded utility strip (ResMed-style). Replace with CMS-driven content when ready.
 * External links use target="_blank" and get the open-in-new icon via CSS.
 */
const HeaderUtilityStrip = (): JSX.Element => (
  <nav className="header__utility-links w-full" aria-label="Utility navigation">
    <a
      href="https://www.resmed.com/en-us/"
      target="_blank"
      rel="noopener noreferrer"
      className="header__utility-link"
    >
      Book a virtual appointment
    </a>
    <span className="header__utility-divider" aria-hidden="true" />
    <a href="https://www.resmed.com/en-us/sleep-apnea/clinical-resources/" className="header__utility-link">
      Find a sleep clinic
    </a>
    <span className="header__utility-divider" aria-hidden="true" />
    <a
      href="https://www.resmed.com/en-us/sleep-apnea/cpap-parts-support/myair-app/"
      target="_blank"
      rel="noopener noreferrer"
      className="header__utility-link"
    >
      myAir
    </a>
    <span className="header__utility-divider" aria-hidden="true" />
    <a href="https://www.resmed.com/en-us/change-country/" className="header__utility-link">
      Country
    </a>
    <span className="header__utility-divider" aria-hidden="true" />
    <button type="button" className="header__utility-lang" aria-haspopup="listbox" aria-expanded="false">
      <span>English</span>
      <span className="material-symbols-outlined header__utility-chevron" translate="no" aria-hidden>
        expand_more
      </span>
    </button>
    <span className="header__utility-divider" aria-hidden="true" />
    <a
      href="https://www.resmed.com/en-us/accessibility/"
      target="_blank"
      rel="noopener noreferrer"
      className="header__utility-link"
    >
      Accessibility
    </a>
  </nav>
);

export const Default = (props: ComponentProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params.styles?.trimEnd() || ''}`;

  return (
    <div className={`component header header--resmed px-0 ${sxaStyles}`.trim()} id={id ? id : undefined}>
      <div className="header__utility-bar">
        <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
          <div className="header__utility-inner">
            <HeaderUtilityStrip />
          </div>
        </div>
      </div>

      <div className="header__main">
        <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
          <div className="row align-items-center header__main-row flex-nowrap">
            <div className="col-auto header__brand">
              <Placeholder name="header-left" rendering={props.rendering} />
            </div>
            <div className="col header__nav-cluster">
              <Placeholder name="header-right" rendering={props.rendering} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export type WithImageProps = ComponentProps & {
  fields: {
    LogoImage: ImageField;
  };
};

export const WithLogoImage = (props: WithImageProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component header header--resmed ${sxaStyles}`.trim()} id={id ? id : undefined}>
      <div className="header__utility-bar">
        <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
          <div className="header__utility-inner">
            <HeaderUtilityStrip />
          </div>
        </div>
      </div>

      <div className="header__main">
        <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
          <div className="row align-items-center header__main-row flex-nowrap">
            <div className="col-auto header__brand">
              <NextImage field={props.fields.LogoImage} width={200} height={50} className="header__logo" />
            </div>
            <div className="col header__nav-cluster">
              <Placeholder name="header-right" rendering={props.rendering} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
