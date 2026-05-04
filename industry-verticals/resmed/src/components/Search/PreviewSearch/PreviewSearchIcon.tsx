import { JSX } from 'react';

export type PreviewSearchIconProps = {
  onClick?: (keyphrase: string) => void;
  className?: string;
  keyphrase: string;
};

const PreviewSearchIcon = ({
  onClick,
  className,
  keyphrase,
}: PreviewSearchIconProps): JSX.Element => {
  return (
    <span
      className={`preview-search-content-icon material-symbols-outlined ${className || ''}`}
      translate="no"
      aria-hidden={true}
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onClick && onClick(keyphrase);
      }}
    >
      search
    </span>
  );
};

export default PreviewSearchIcon;
