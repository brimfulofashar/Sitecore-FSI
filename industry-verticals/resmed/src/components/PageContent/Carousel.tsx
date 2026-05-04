import React, { useEffect, useId, useMemo, useRef, useState, JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  RichTextField,
  LinkField,
  Text,
  Link,
  RichText,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

interface Fields {
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Link: LinkField;
  Video: ImageField;
}

export type CarouselItemProps = {
  id: string;
  fields: Fields;
};

export interface CarouselComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    items: CarouselItemProps[];
  };
}

/** Controls pattern per ResMed carousel system */
export type CarouselControlVariant = 'buttons' | 'indicators' | 'combo';

function sanitizeDomId(raw: string | undefined): string {
  if (!raw) return 'carousel';
  return raw.replace(/[^a-zA-Z0-9_-]/g, '-');
}

type CarouselInnerProps = CarouselComponentProps & {
  controlVariant: CarouselControlVariant;
};

const CarouselInner = ({ controlVariant, ...props }: CarouselInnerProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const reactId = useId();
  const baseId = sanitizeDomId(id ?? reactId);
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  const toneParam = (props.params?.Tone ?? props.params?.tone ?? '').toLowerCase();
  const toneOnImage =
    String(props.params?.BackgroundTone ?? props.params?.backgroundTone ?? '')
      .toLowerCase()
      .includes('color') || toneParam.includes('oncolor');
  const toneClass =
    toneParam === 'dark' ? 'carousel--tone-dark' : 'carousel--tone-light';
  const comboColorClass =
    controlVariant === 'combo' && toneOnImage ? 'carousel--tone-on-color' : '';

  const swiperInstanceRef = useRef<SwiperType | null>(null);

  const [playing, setPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = props.fields?.items ?? [];
  const hasManySlides = items.length > 1;

  const sxaStyles = `${props.params?.styles || ''}`;

  const modules = useMemo(() => {
    const list = [A11y];
    if (!isPageEditing && hasManySlides) {
      list.push(Autoplay);
    }
    return list;
  }, [controlVariant, isPageEditing, hasManySlides]);

  const onSwiperInit = (swiper: SwiperType): void => {
    swiperInstanceRef.current = swiper;
    setActiveIndex(swiper.realIndex);
  };

  const goPrev = (): void => {
    swiperInstanceRef.current?.slidePrev();
  };

  const goNext = (): void => {
    swiperInstanceRef.current?.slideNext();
  };

  const goToSlide = (index: number): void => {
    const swiper = swiperInstanceRef.current;
    if (!swiper) {
      return;
    }
    if (swiper.params.loop && !isPageEditing) {
      swiper.slideToLoop(index);
    } else {
      swiper.slideTo(index);
    }
  };

  useEffect(() => {
    const swiper = swiperInstanceRef.current;
    if (!swiper || isPageEditing || !hasManySlides) {
      return;
    }
    if (playing) {
      swiper.autoplay?.start();
    } else {
      swiper.autoplay?.stop();
    }
  }, [playing, isPageEditing, hasManySlides]);

  const toggleAutoplay = (): void => {
    setPlaying((p) => !p);
  };

  const showArrows = controlVariant === 'buttons' || controlVariant === 'combo';
  const showPagination = controlVariant === 'indicators' || controlVariant === 'combo';
  const showPlayPause = hasManySlides && !isPageEditing;

  const variantClass =
    controlVariant === 'indicators'
      ? 'carousel--variant-indicators'
      : controlVariant === 'combo'
        ? 'carousel--variant-combo'
        : 'carousel--variant-buttons';

  const comboArrowStyle =
    toneOnImage && controlVariant === 'combo'
      ? ({ ['--carousel-arrow-on-color' as string]: 'var(--bg-saturated, #0077c8)' } as React.CSSProperties)
      : undefined;

  return (
    <section
      className={`component carousel carousel--resmed ${variantClass} ${toneClass} ${comboColorClass} ${sxaStyles}`.trim()}
      id={id ? id : undefined}
      style={comboArrowStyle}
    >
      <Swiper
        className="carousel-resmed-swiper"
        modules={modules}
        loop={hasManySlides && !isPageEditing}
        slidesPerView={1}
        speed={600}
        allowTouchMove={false}
        simulateTouch={false}
        noSwiping
        autoplay={
          !isPageEditing && hasManySlides
            ? {
                delay: 7000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        onSwiper={onSwiperInit}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        a11y={{
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        }}
      >
        {items.map((item, i) => (
          <SwiperSlide key={item.id || `slide-${baseId}-${i}`} className="carousel-resmed-slide">
            <div className="carousel-resmed-slide-media">
              {!isPageEditing && item.fields?.Video?.value?.src ? (
                <video
                  key={item.id}
                  className="object-fit-cover d-block w-100 h-100"
                  autoPlay={true}
                  loop={true}
                  muted
                  playsInline
                  poster={item.fields.Image?.value?.src}
                >
                  <source src={item.fields.Video.value.src} type="video/webm" />
                </video>
              ) : (
                <NextImage
                  field={item.fields.Image}
                  className="object-fit-cover d-block w-100 h-100"
                  width={1920}
                  height={800}
                />
              )}
            </div>

            <div className="side-content">
              <div className="container">
                <div className="carousel-resmed-wrapper">
                  <div className="carousel-resmed-grid">
                    <div className="title">
                      <h1>
                        <Text field={item.fields.Title} />
                      </h1>
                    </div>
                    <div className="text">
                      <RichText field={item.fields.Text} />
                    </div>
                    {!isPageEditing && item.fields?.Link?.value?.href && (
                      <div className="btns">
                        <Link field={item.fields.Link} className="button button-accent" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {hasManySlides && (
        <div className="carousel-resmed-navigation-main">
          <div className="carousel-resmed-navigation">
            {showArrows && (
              <div className="carousel-resmed-arrow">
                <button
                  type="button"
                  className={`carousel-resmed-arrow-btn carousel-resmed-prev-${baseId}`}
                  aria-label="Previous slide"
                  onClick={goPrev}
                >
                  <span className="material-symbols-outlined" translate="no" aria-hidden>
                    chevron_left
                  </span>
                </button>
              </div>
            )}

            {showPagination && (
              <div
                className="carousel-resmed-pagination-host"
                role="tablist"
                aria-label="Carousel slides"
              >
                {items.map((_, i) => (
                  <button
                    key={`${baseId}-dot-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={activeIndex === i}
                    aria-label={`Go to slide ${i + 1} of ${items.length}`}
                    className={`carousel-resmed-dot ${activeIndex === i ? 'is-active' : ''}`}
                    onClick={() => goToSlide(i)}
                  />
                ))}
              </div>
            )}

            {showArrows && (
              <div className="carousel-resmed-arrow">
                <button
                  type="button"
                  className={`carousel-resmed-arrow-btn carousel-resmed-next-${baseId}`}
                  aria-label="Next slide"
                  onClick={goNext}
                >
                  <span className="material-symbols-outlined" translate="no" aria-hidden>
                    chevron_right
                  </span>
                </button>
              </div>
            )}
          </div>

          {showPlayPause && (
            <div className="carousel-resmed-playpause">
              <button
                id={`${baseId}-playpause`}
                type="button"
                onClick={toggleAutoplay}
                aria-label={playing ? 'Pause carousel' : 'Play carousel'}
                title={playing ? 'Pause carousel' : 'Play carousel'}
              >
                <span className="material-symbols-outlined" translate="no" aria-hidden>
                  {playing ? 'pause' : 'play_arrow'}
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

/** Variant A: secondary (outline) circular prev/next — solid backgrounds. Rendering param `Tone`: light | dark */
export const Default = (props: CarouselComponentProps): JSX.Element => (
  <CarouselInner {...props} controlVariant="buttons" />
);

/** Variant B: blurred pill + dot indicators only — imagery / video */
export const IndicatorGroup = (props: CarouselComponentProps): JSX.Element => (
  <CarouselInner {...props} controlVariant="indicators" />
);

/** Variant C: filled circular arrows + pill indicators — imagery / video. Optional `BackgroundTone=color` for arrow fill */
export const Combo = (props: CarouselComponentProps): JSX.Element => (
  <CarouselInner {...props} controlVariant="combo" />
);
