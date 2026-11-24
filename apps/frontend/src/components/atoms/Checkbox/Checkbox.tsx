import { Icon } from '../Icon';

export interface CheckboxProps {
  id: string;
  label: string;
  isChecked: boolean;
  onToggle: () => void;
}

const BOX_BASE_CLASSES =
  'flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-highlight-green';

const CHECKED_BOX_CLASSES = 'border-offwhite text-offwhite';
const UNCHECKED_BOX_CLASSES = 'border-muted/70 text-transparent';

export function Checkbox({ id, label, isChecked, onToggle }: CheckboxProps) {
  const boxStateClasses = isChecked ? CHECKED_BOX_CLASSES : UNCHECKED_BOX_CLASSES;

  return (
    <label htmlFor={id} className="inline-flex cursor-pointer items-center gap-2.5 select-none">
      <input id={id} type="checkbox" checked={isChecked} onChange={onToggle} className="peer sr-only" />
      <span className={`${BOX_BASE_CLASSES} ${boxStateClasses}`}>
        <Icon name="check" className="h-3.5 w-3.5" />
      </span>
      <span className="text-[15px] text-muted">{label}</span>
    </label>
  );
}
