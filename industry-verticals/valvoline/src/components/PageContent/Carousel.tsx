import React, { useEffect, useRef, useState, JSX, PointerEvent, DragEvent } from 'react';
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

interface CarouselComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    items: CarouselItemProps[];
  };
}

export const Default = (props: CarouselComponentProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [index, setIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragPointerId = useRef<number | null>(null);
  const dragCleanupRef = useRef<(() => void) | null>(null);
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const itemCount = props.fields.items.length;
  const dragThreshold = 50;

  const sxaStyles = `${props.params?.styles || ''}`;

  const goToSlide = (slideIndex: number) => {
    setIndex(slideIndex);
  };

  const goToNextSlide = () => {
    setIndex((prevIndex) => (prevIndex < itemCount - 1 ? prevIndex + 1 : 0));
  };

  const goToPrevSlide = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : itemCount - 1));
  };

  const finishDrag = (clientX: number) => {
    if (dragStartX.current === null) return;

    const delta = clientX - dragStartX.current;
    dragStartX.current = null;
    dragPointerId.current = null;

    if (Math.abs(delta) < dragThreshold) return;

    if (delta < 0) {
      goToNextSlide();
    } else {
      goToPrevSlide();
    }
  };

  const clearDragListeners = () => {
    dragCleanupRef.current?.();
    dragCleanupRef.current = null;
  };

  useEffect(() => clearDragListeners, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (isPageEditing) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const target = event.target as HTMLElement;
    if (target.closest('a, button')) return;

    event.preventDefault();
    clearDragListeners();

    dragStartX.current = event.clientX;
    dragPointerId.current = event.pointerId;

    const handlePointerEnd = (endEvent: globalThis.PointerEvent) => {
      if (dragPointerId.current !== endEvent.pointerId) return;
      clearDragListeners();
      finishDrag(endEvent.clientX);
    };

    document.addEventListener('pointerup', handlePointerEnd);
    document.addEventListener('pointercancel', handlePointerEnd);

    dragCleanupRef.current = () => {
      document.removeEventListener('pointerup', handlePointerEnd);
      document.removeEventListener('pointercancel', handlePointerEnd);
    };
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <section className={`component carousel ${sxaStyles}`} id={id ? id : undefined}>
      <div
        className="carousel-inner"
        onPointerDown={handlePointerDown}
        onDragStart={handleDragStart}
      >
        {props.fields.items.map((item, i) => (
          <div key={i} className={'carousel-item ' + (i == index ? 'active' : '')}>
            {!isPageEditing && item.fields?.Video?.value?.src ? (
              <video
                className="object-fit-cover d-block w-100 h-100"
                key={item.id}
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

            <div className="side-content">
              <div className="container">
                <div className="col-lg-5 col-md-6">
                  <h1 className="display-6 fw-bold">
                    <Text field={item.fields.Title}></Text>
                  </h1>
                  <RichText field={item.fields.Text}></RichText>
                  {!isPageEditing && item.fields?.Link?.value?.href && (
                    <Link field={item.fields.Link} className="button button-accent"></Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ol className="carousel-indicators">
        {props.fields.items.map((_item, i) => (
          <li key={i}>
            <button
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              className={i === index ? 'active' : ''}
              onClick={() => goToSlide(i)}
            />
          </li>
        ))}
      </ol>
    </section>
  );
};
