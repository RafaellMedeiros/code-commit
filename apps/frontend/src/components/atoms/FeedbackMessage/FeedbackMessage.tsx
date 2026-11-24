export type FeedbackTone = 'success' | 'error';

export interface FeedbackMessageProps {
  message: string | null;
  tone?: FeedbackTone;
}

const TONE_CLASSES: Record<FeedbackTone, string> = {
  success: 'border-highlight-green/40 bg-highlight-green/10 text-highlight-green',
  error: 'border-error/40 bg-error/10 text-error'
};

export function FeedbackMessage({ message, tone = 'success' }: FeedbackMessageProps) {
  const isErrorTone = tone === 'error';
  const liveRegionRole = isErrorTone ? 'alert' : 'status';
  const ariaLiveMode = isErrorTone ? 'assertive' : 'polite';

  return (
    <div
      role={liveRegionRole}
      aria-live={ariaLiveMode}
      aria-atomic="true"
      className={message ? undefined : 'sr-only'}
    >
      {message ? (
        <p className={`rounded-md border px-3 py-2 text-sm ${TONE_CLASSES[tone]}`}>{message}</p>
      ) : null}
    </div>
  );
}
