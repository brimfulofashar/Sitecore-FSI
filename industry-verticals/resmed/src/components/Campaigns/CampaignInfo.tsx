'use client';

import Image from 'next/image';
import React, { JSX } from 'react';

const SECTION_BG = '#004BA6';
const ICON_SRC = 'https://lm.resmed.com/hubfs/Resmed%20Oura/sleepApnea%20plus.svg';
const LEARN_MORE_HREF =
  'https://www.resmed.com/en-us/sleep-health/resources/partnerships/#component_2';

/** Top divider curve path (matches HubSpot `new-curve` symbol). */
const TOP_CURVE_PATH =
  'M2760.6,94.6C2305.9,32.6,1845.8,1.1,1380.3.9,914.9,1,454.7,31.6,0,93.6v1391.2s2760.6,0,2760.6,0V94.6Z';

function pushDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') {
    return;
  }
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(payload);
}

function ModTopCurve(): JSX.Element {
  return (
    <div className="mod-top-curve pointer-events-none relative z-[1] -mt-[min(12vw,120px)] mb-2 block w-full leading-none md:-mt-[100px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2760.6 100.6"
        preserveAspectRatio="none"
        className="block h-[min(12vw,100px)] w-full"
        style={{ fill: SECTION_BG }}
        aria-hidden
        role="img"
      >
        <path d={TOP_CURVE_PATH} />
      </svg>
    </div>
  );
}

/**
 * “What is sleep apnea?” educational block for ADA campaign pages.
 */
export default function CampaignInfo(): JSX.Element {
  const onLearnMoreClick = () => {
    pushDataLayer({
      event: 'cta_click',
      clickedArea: 'secondary-light',
      componentName: 'Sleep apnea Block',
      componentVariant: 'a',
      clickedText: 'Learn more',
      clickedUrl: LEARN_MORE_HREF,
    });
  };

  return (
    <section className="sleep-apnea-section relative w-full min-w-0 bg-[#004BA6] pb-[120px] pt-[80px] text-white">
      <ModTopCurve />

      <div className="relative z-[2] mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="sleep-apnea-content flex flex-col items-center text-center">
          <Image
            src={ICON_SRC}
            alt="Sleep apnea"
            width={128}
            height={128}
            className="mb-8 h-auto max-w-full"
          />

          <h2 className="mb-6 font-sans text-3xl font-bold leading-tight text-white md:text-4xl">
            What is sleep apnea?
          </h2>

          <p className="mb-10 max-w-3xl font-sans text-base leading-relaxed text-white md:text-lg">
            Sleep apnea is a serious sleep disorder that causes you to stop breathing during sleep.
            <sup className="ml-0.5 align-super text-xs md:text-sm">3</sup>
            {'\u00a0'}
            It&apos;s important to understand the signs and symptoms and consult your doctor if you
            think you might have it.
          </p>

          <div className="sleep-apnea-btn">
            <a
              className="secondary-white inline-flex rounded-full border border-white bg-white px-8 py-3 text-base font-semibold text-black transition hover:bg-white/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href={LEARN_MORE_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onLearnMoreClick}
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
