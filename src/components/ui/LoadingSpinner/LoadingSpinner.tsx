import { Spinner, SpinnerOverlay } from './LoadingSpinner.styles';

export function LoadingSpinner({ isVisible }: { isVisible: boolean }) {
  return (
    <SpinnerOverlay className={isVisible ? 'visible' : ''}>
      <Spinner />
    </SpinnerOverlay>
  );
} 