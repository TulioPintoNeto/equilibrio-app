import { useState } from 'react';
import {
  EmptyState,
  ErrorState,
  LoadingState,
  State,
  SuccessState,
} from '@/frontend/core/State';

export const useStateController = () => {
  const [state, setState] = useState<State<void>>(new EmptyState());

  const executeWithState = async (
    fn: () => Promise<void>,
    errorFn?: (e: unknown) => ErrorState,
  ) => {
    setState(new LoadingState());
    try {
      await fn();
      setState(new SuccessState());
    } catch (e: unknown) {
      if (errorFn) {
        setState(errorFn(e));
      } else {
        setState(ErrorState.Unexpected());
      }
    }
  };

  return { state, executeWithState };
};
