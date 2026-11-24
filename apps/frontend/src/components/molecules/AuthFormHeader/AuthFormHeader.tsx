export interface AuthFormHeaderProps {
  headingId?: string;
  title: string;
  subtitle: string;
}

export function AuthFormHeader({ headingId, title, subtitle }: AuthFormHeaderProps) {
  return (
    <header className="mb-7">
      <h1 id={headingId} className="text-[31px] leading-tight font-semibold text-white">
        {title}
      </h1>
      <p className="mt-3 text-[20px] leading-snug font-normal text-offwhite">{subtitle}</p>
    </header>
  );
}
