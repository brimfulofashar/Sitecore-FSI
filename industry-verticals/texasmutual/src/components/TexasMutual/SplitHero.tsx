import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  NextImage,
  Text,
} from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from 'lib/component-props';

export interface SplitHeroFields {
  LeftImage: ImageField;
  LeftTitle: Field<string>;
  LeftDescription: Field<string>;
  RightImage: ImageField;
  RightTitle: Field<string>;
  RightDescription: Field<string>;
}

export type SplitHeroProps = ComponentProps & {
  fields: SplitHeroFields;
};

type PanelProps = {
  image: ImageField;
  title: Field<string>;
  description: Field<string>;
  sizes: string;
};

const HeroPanel = ({ image, title, description, sizes }: PanelProps): JSX.Element => {
  const hasImage = Boolean(image?.value?.src);

  return (
    <div className="tm-relative tm-flex tm-min-h-[min(85vh,640px)] tm-min-w-0 tm-flex-1 tm-basis-0 tm-flex-col tm-justify-center tm-overflow-hidden">
      {hasImage ? (
        <NextImage
          field={image}
          width={1920}
          height={1080}
          className="tm-pointer-events-none tm-absolute tm-inset-0 tm-h-full tm-w-full tm-object-cover"
          sizes={sizes}
          priority
        />
      ) : (
        <div className="tm-absolute tm-inset-0 tm-bg-slate-800" aria-hidden />
      )}
      <div className="tm-relative tm-z-[1] tm-flex tm-h-full tm-min-h-[min(85vh,640px)] tm-w-full tm-flex-col tm-items-center tm-justify-center tm-px-6 tm-py-12 tm-text-center sm:tm-px-8 md:tm-px-10 lg:tm-px-12">
        <h1 className="tm-mb-4 tm-max-w-lg tm-text-balance tm-text-4xl tm-font-bold tm-tracking-tight tm-text-white xl:tm-text-5xl">
          <Text field={title} />
        </h1>
        <p className="tm-max-w-md tm-text-balance tm-text-base tm-leading-relaxed tm-text-white sm:tm-text-lg md:tm-text-xl">
          <Text field={description} />
        </p>
      </div>
    </div>
  );
};

export const Default = (props: SplitHeroProps): JSX.Element => {
  const { fields, params } = props;
  const id = params.RenderingIdentifier;
  const sxaStyles = params.styles?.trim() ?? '';

  return (
    <section
      className={`tm-split-hero component split-hero ${sxaStyles}`.trim()}
      id={id || undefined}
      aria-label="Texas Mutual hero"
    >
      <div className="tm-flex tm-w-full tm-max-w-none tm-flex-row tm-flex-nowrap">
        <HeroPanel
          image={fields.LeftImage}
          title={fields.LeftTitle}
          description={fields.LeftDescription}
          sizes="50vw"
        />
        <HeroPanel
          image={fields.RightImage}
          title={fields.RightTitle}
          description={fields.RightDescription}
          sizes="50vw"
        />
      </div>
    </section>
  );
};
