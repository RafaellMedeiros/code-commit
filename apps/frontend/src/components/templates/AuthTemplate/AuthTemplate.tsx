import type { ReactNode } from 'react';
import appendixBackgroundUrl from '../../../assets/appendix-background.svg';
import { SkipLink } from '../../atoms/SkipLink';

const MAIN_CONTENT_ID = 'main-content';
const APPENDIX_WIDTH_PX = 407;
const APPENDIX_HEIGHT_PX = 486;

export interface AuthTemplateProps {
  bannerSlot: ReactNode;
  children: ReactNode;
}

export function AuthTemplate({ bannerSlot, children }: AuthTemplateProps) {
  return (
    <>
      <SkipLink targetId={MAIN_CONTENT_ID} />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="relative flex min-h-screen w-full items-center justify-center overflow-clip bg-graphite px-4 py-8 focus:outline-none sm:px-8"
      >
        <img
          src={appendixBackgroundUrl}
          alt=""
          aria-hidden="true"
          width={APPENDIX_WIDTH_PX}
          height={APPENDIX_HEIGHT_PX}
          decoding="async"
          className="pointer-events-none absolute top-4 left-4 h-auto w-[240px] select-none sm:left-10 md:w-[340px] lg:left-16 lg:w-[407px]"
        />
        <img
          src={appendixBackgroundUrl}
          alt=""
          aria-hidden="true"
          width={APPENDIX_WIDTH_PX}
          height={APPENDIX_HEIGHT_PX}
          decoding="async"
          className="pointer-events-none absolute -bottom-24 right-4 h-auto w-[240px] select-none sm:right-10 md:w-[340px] lg:right-16 lg:w-[407px]"
        />
        <div className="relative z-10 grid w-full max-w-[996px] grid-cols-1 items-center gap-8 rounded-3xl bg-surface-card p-6 shadow-2xl sm:p-10 md:grid-cols-[minmax(280px,407px)_1fr] md:gap-12 md:px-14 md:py-14">
          <div>{bannerSlot}</div>
          <div>{children}</div>
        </div>
      </main>
    </>
  );
}
