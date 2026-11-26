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
  const statusMessage = tone === 'success' ? message : null;
  const alertMessage = tone === 'error' ? message : null;

  return (
    <>
      <div role="status" aria-live="polite" aria-atomic="true" className={statusMessage ? undefined : 'sr-only'}>
        {statusMessage ? (
          <p className={`rounded-md border px-3 py-2 text-sm ${TONE_CLASSES.success}`}>{statusMessage}</p>
        ) : null}
      </div>
      <div role="alert" aria-live="assertive" aria-atomic="true" className={alertMessage ? undefined : 'sr-only'}>
        {alertMessage ? (
          <p className={`rounded-md border px-3 py-2 text-sm ${TONE_CLASSES.error}`}>{alertMessage}</p>
        ) : null}
      </div>
    </>
  );
}
