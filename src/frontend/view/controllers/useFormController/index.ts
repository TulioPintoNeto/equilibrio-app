import { FormEvent, useState } from 'react';
import { AxiosError } from 'axios';
import {
  EmptyState, ErrorState, LoadingState, State, SuccessState,
} from '@/frontend/core/State';

interface Params<EventType extends FormEvent, Entity> {
  entityBuilder: (eventType: EventType) => Entity;
  functionUseCase: (entity: Entity) => Promise<void>;
}

export interface FormControllerOutput {
  onSubmit: (event: unknown) => void;
  state: State<void>;
}

export const useFormController = <EventType extends FormEvent, Entity>({
  entityBuilder,
  functionUseCase,
}: Params<EventType, Entity>): FormControllerOutput => {
  const [state, setState] = useState<State<void>>(new EmptyState());

  const execute = async (entity: Entity) => {
    setState(new LoadingState());
    try {
      await functionUseCase(entity);
      setState(new SuccessState());
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data.message) {
        setState(new ErrorState(error.response.data.message));
      } else {
        setState(ErrorState.Unnexpected());
      }
    }
  };

  const onSubmit = (event: unknown) => {
    const eventType = event as EventType;
    eventType.preventDefault();
    const entity = entityBuilder(eventType);
    execute(entity);
  };

  return {
    onSubmit,
    state,
  };
};
