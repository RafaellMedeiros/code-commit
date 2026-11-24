export interface DividerWithLabelProps {
  label: string;
}

export function DividerWithLabel({ label }: DividerWithLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-offwhite/45" aria-hidden="true" />
      <span className="text-[15px] text-offwhite">{label}</span>
      <span className="h-px flex-1 bg-offwhite/45" aria-hidden="true" />
    </div>
  );
}
