import bannerImageUrl from '../../../assets/banner.png';
import { CodeConnectLogo } from '../../atoms/CodeConnectLogo';

const DEFAULT_BANNER_ALT = 'Pessoa desenvolvendo código em ambiente conectado';

export interface AuthBannerProps {
  imageSrc?: string;
  imageAlt?: string;
}

export function AuthBanner({
  imageSrc = bannerImageUrl,
  imageAlt = DEFAULT_BANNER_ALT
}: AuthBannerProps) {
  return (
    <div className="relative mx-auto w-full max-w-[407px] overflow-hidden">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="block h-auto w-full object-cover"
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
