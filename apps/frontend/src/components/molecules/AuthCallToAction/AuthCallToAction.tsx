import { Link } from 'react-router-dom';
import { Icon, type IconName } from '../../atoms/Icon';

export interface AuthCallToActionProps {
  promptText: string;
  actionLabel: string;
  to: string;
  iconName: IconName;
}

const ACTION_LINK_CLASSES =
  'inline-flex items-center gap-2 text-lg font-normal text-highlight-green transition-colors hover:text-highlight-green-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-green';

export function AuthCallToAction({ promptText, actionLabel, to, iconName }: AuthCallToActionProps) {
  return (
    <footer className="mt-7 flex flex-col items-center gap-1.5 text-center">
      <p className="text-[15px] text-offwhite">{promptText}</p>
      <Link to={to} className={ACTION_LINK_CLASSES}>
        <span>{actionLabel}</span>
        <Icon name={iconName} className="h-5 w-5" />
      </Link>
    </footer>
  );
}
