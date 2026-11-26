import { CodeConnectLogo } from '../../atoms/CodeConnectLogo';

const DEFAULT_BANNER_IMAGE_SRC = '/images/banner.webp';
const DEFAULT_BANNER_ALT = 'Pessoa desenvolvendo código em ambiente conectado';
const BANNER_WIDTH_PX = 407;
const BANNER_HEIGHT_PX = 628;

export interface AuthBannerProps {
  imageSrc?: string;
  imageAlt?: string;
}

export function AuthBanner({
  imageSrc = DEFAULT_BANNER_IMAGE_SRC,
  imageAlt = DEFAULT_BANNER_ALT
}: AuthBannerProps) {
  return (
    <div className="relative mx-auto aspect-[407/628] w-full max-w-[407px] overflow-hidden">
      <img
        src={imageSrc}
        alt={imageAlt}
        width={BANNER_WIDTH_PX}
        height={BANNER_HEIGHT_PX}
        fetchpriority="high"
        decoding="async"
        className="block h-full w-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-5 flex justify-center">
        <CodeConnectLogo />
      </div>
    </div>
  );
}
