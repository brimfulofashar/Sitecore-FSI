import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  RichTextField,
  Text,
  RichText,
  Link,
  LinkField,
  useSitecore,
  Placeholder,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import { ParallaxBackgroundImage } from 'components/NonSitecore/ParallaxBackgroundImage';
import useVisibility from 'src/hooks/useVisibility';
import { ComponentProps } from 'lib/component-props';
import { DottedAccent } from 'components/NonSitecore/DottedAccent';

interface Fields {
  Eyebrow: Field<string>;
  Title: Field<string>;
  Subtitle: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Link: LinkField;
  Link2: LinkField;
}

export type PromoCtaProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: PromoCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const [isVisible, domRef] = useVisibility();
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component promo-cta ${sxaStyles}`} id={id ? id : undefined} ref={domRef}>
      <div className="container">
        <div className="row row-gap-4 main-content align-items-center">
          <div className="col-lg-5 text-center text-lg-start">
            <h6 className="eyebrow-accent">
              <Text field={props.fields.Eyebrow} />
            </h6>
            <h1 className="display-6 fw-bold mb-3">
              <Text field={props.fields.Title} />
            </h1>
            <div className="promo-cta-text">
              <p className="fs-5">
                <Text field={props.fields.Subtitle} />
              </p>

              <RichText field={props.fields.Text} className="text-content" />

              <div className="row mt-2">
                <Placeholder name="promo-cta" rendering={props.rendering} />
              </div>

              {(isPageEditing || props.fields?.Link?.value?.href) && (
                <Link field={props.fields.Link} className="button button-main mt-3 me-4" />
              )}
              {(isPageEditing || props.fields?.Link2?.value?.href) && (
                <Link field={props.fields.Link2} className="button button-simple mt-3 " />
              )}
            </div>
          </div>
          <div className="col-md-10 mx-auto col-lg-7 mx-lg-0">
            <div className="image-wrapper">
              <DottedAccent className="dotted-accent-top" />
              <NextImage
                field={props.fields.Image}
                className={`d-block mx-lg-auto img-fluid ${
                  !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
                }`}
                width={900}
                height={900}
              />
              <DottedAccent className="dotted-accent-bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WithPlaceholderColumn = (props: PromoCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const [isVisible, domRef] = useVisibility();
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component promo-cta with-placeholder-column ${sxaStyles}`}
      id={id ? id : undefined}
      ref={domRef}
    >
      <div className="container">
        <div className="row row-gap-4 main-content align-items-center">
          <div className="col-lg-5 text-center text-lg-start">
            <h6 className="eyebrow-accent">
              <Text field={props.fields.Eyebrow} />
            </h6>
            <h1 className="fs-1 fw-bold mb-3">
              <Text field={props.fields.Title} />
            </h1>
            <div className="promo-cta-text">
              <p className="fs-5">
                <Text field={props.fields.Subtitle} />
              </p>

              <RichText field={props.fields.Text} className="text-content" />

              {(isPageEditing || props.fields?.Link?.value?.href) && (
                <Link field={props.fields.Link} className="button button-main mt-3" />
              )}
              {(isPageEditing || props.fields?.Link2?.value?.href) && (
                <Link field={props.fields.Link2} className="button button-simple mt-3 mx-4" />
              )}
            </div>
          </div>

          <div className="col-md-12 mx-auto col-lg-7 mx-lg-0">
            <div className="row align-items-center">
              <div className="promo-cta-placeholder col-12 col-md-9">
                <div className="promo-cta-placeholder-inner">
                  <div className="row">
                    <Placeholder name="promo-cta" rendering={props.rendering} />
                  </div>
                </div>
              </div>

              <div className="image-wrapper d-none d-md-block col-md-8">
                <DottedAccent className="dotted-accent-top" />
                <NextImage
                  field={props.fields.Image}
                  className={`d-block mx-lg-auto img-fluid ${
                    !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
                  }`}
                  width={900}
                  height={900}
                />
                <DottedAccent className="dotted-accent-bottom" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Centered copy + CTA link, no image (e.g. community funding band).
 * Sitecore fields: Title (H2), Text (rich text body), Link (inline text link).
 */
export const TextOnly = (props: PromoCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`.trim();

  return (
    <section
      className={`component promo-cta promo-cta-text-only full-width-section py-3 py-md-3 ${sxaStyles}`.trim()}
      id={id ? id : undefined}
    >
      <div className="container d-flex flex-wrap">
        <div className="col-12 col-md-10 col-lg-8 mx-auto">
          <h2 className="text-center mb-3">
            <Text field={props.fields.Title} />
          </h2>
          <div className="text-center promo-cta-text-only-body mb-3">
            <RichText field={props.fields.Text} />
          </div>
            <p className="text-center promo-cta-text-only-link mb-0">
              <Link
                field={props.fields.Link}
                className="promo-cta-text-only-link-anchor"
                editable={isPageEditing}
              />
            </p>
        </div>
      </div>
    </section>
  );
};

export const WithBackgroundImage = (props: PromoCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component promo-cta with-background-image ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <ParallaxBackgroundImage BackgroundImage={props.fields.Image} />
      <div className="container">
        <div className="row justify-content-center main-content">
          <div className="col-12 mx-auto">
            <h1 className="display-3 fw-bold text-center mb-3">
              <Text field={props.fields.Title} />
            </h1>
            <div className="fs-3 text-center">
              <RichText field={props.fields.Text} />

              {(isPageEditing || props.fields?.Link?.value?.href) && (
                <Link field={props.fields.Link} className="button button-main mt-3" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
