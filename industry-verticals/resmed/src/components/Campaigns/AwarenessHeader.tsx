'use client';

import React, { JSX, useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  Field,
  ImageField,
  RichTextField,
  Link,
  LinkField,
  useSitecore,
  NextImage,
  RichText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

const HERO_BACKGROUND_IMAGE =
  'https://lm.resmed.com/hubfs/Resmed%20Oura/phys_exam_female_wpatents.png';
const LOGO_SRC = 'https://jzi-resmed.sitecoresandbox.cloud/api/public/content/8fe7a14e5821499d8462b366d1f815bb?v=232e7563';
const CONTINUE_URL =
  'https://sleep.arimahealth.com/e/resmed/refer?utm_source=ada-health-app&utm_medium=referral&utm_campaign=autobahn-ada-health';

function pushDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') {
    return;
  }
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(payload);
}

export type AwarenessHeaderProps = ComponentProps & {
  params: { [key: string]: string };
  fields: {
    Title: Field<string>;
    Text: RichTextField;
    BackgroundImage: ImageField;
    Link: LinkField;
    Logo: ImageField;
  }
};

function imageFieldSrc(field: ImageField | undefined): string | undefined {
  const src = field?.value?.src;
  return typeof src === 'string' && src.trim() !== '' ? src.trim() : undefined;
}

function HeroBottomWave(): JSX.Element {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] leading-none"
      aria-hidden
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="block h-[min(14vw,140px)] w-full"
      >
        <path fill="#004BA6" d="M0 100V55C240 15 480 0 720 0s480 15 720 55v45H0z" />
      </svg>
    </div>
  );
}

/**
 * ADA campaign hero with background imagery and Arima Health booking modal.
 */
export default function AwarenessHeader(props: AwarenessHeaderProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  const backgroundUrl =
    imageFieldSrc(props.fields?.BackgroundImage) ?? HERO_BACKGROUND_IMAGE;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  const onStay = () => {
    pushDataLayer({
      event: 'cta_click',
      clickedArea: 'primary-light',
      componentName: 'Popup',
      componentVariant: 'a',
      clickedText: 'Stay',
      clickedUrl: '#closepopup',
    });
    close();
  };

  const onContinueClick = () => {
    pushDataLayer({
      event: 'cta_click',
      clickedArea: 'primary-light',
      componentName: 'Popup',
      componentVariant: 'a',
      clickedText: 'Continue',
      clickedUrl: CONTINUE_URL,
    });
  };

  return (
    
    <>
    {console.log(props)}
      <section
        className="ada-hero-module-outer relative flex min-h-[92vh] w-full min-w-0 flex-col overflow-x-clip bg-cover bg-no-repeat pb-72 pt-16 sm:min-h-[94vh] sm:pb-80 sm:pt-20 md:pb-80 md:pt-24 lg:min-h-[min(960px,95vh)] lg:pb-96 lg:pt-28"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundPosition: 'center 18%',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 z-0 bg-black/35" aria-hidden />

        <HeroBottomWave />

        <div className="relative z-10 flex w-full max-w-none flex-1 flex-col px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
          <div className="content-background-container mx-auto flex w-full max-w-none flex-1 flex-col items-center justify-between gap-12 md:gap-16 lg:gap-20">
            <div className="rm-logo relative z-[15] w-full shrink-0 py-2">

                <NextImage
                  field={props.fields.Logo}
                  width={269}
                  height={94}
                  className="mx-auto block h-[94px] w-auto max-w-[min(100%,269px)] object-contain object-center"
                  priority
                />
            </div>

            <div className="content-outer flex w-full flex-1 flex-col justify-center">
              <div className="center-content mx-auto max-w-4xl text-center">
                <div className="ada-hero-Heading">
                  <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
                    <RichText field={props.fields.Text} />
                  </h2>
                </div>
                <div className="ada-hero-btn mt-8 md:mt-10">
                  <Link field={props.fields.Link}
                    className="secondary-white openModal inline-flex rounded-full bg-white px-8 py-3 text-base font-semibold text-black transition hover:bg-white/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {open ? (
        <div
          className="modal myModal fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 z-0 cursor-default bg-black/50"
            aria-label="Close dialog"
            onClick={close}
          />
          <div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="modal-content relative z-10 w-full max-w-lg rounded-xl border border-neutral-200 bg-[#F4F3EE] px-6 py-8 sm:px-8"
          >
            <h2 id={titleId} className="font-sans text-xl font-semibold text-neutral-900 sm:text-2xl">
              Taking you to Arima Health
            </h2>
            <p id={descriptionId} className="sub-text mt-3 text-base leading-relaxed text-neutral-800">
              Our partner for trusted, independent clinical care, where you can book a virtual
              appointment.
            </p>

            <div className="modal-buttons mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <button
                type="button"
                id="stayBtn"
                className="primary-black inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-[#E8E7E0] px-6 py-3 text-center text-base font-semibold text-neutral-900 transition hover:bg-[#dddcd4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                onClick={onStay}
              >
                Stay
              </button>
              <a
                id="leaveBtn"
                href={CONTINUE_URL}
                className="secondary-black inline-flex flex-1 items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                target="_self"
                rel="noopener noreferrer"
                onClick={onContinueClick}
              >
                Continue
              </a>
            </div>

            <div className="disclaimer mt-8 space-y-3 border-t border-neutral-300/80 pt-6 text-sm leading-relaxed text-neutral-700">
              <p>
                You&apos;ll connect with an independent telehealth provider who makes its own
                clinical decisions, which may or may not include prescribing medication.
              </p>
              <p>
                Resmed does not control or endorse the content or privacy practices of third-party
                sites.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
