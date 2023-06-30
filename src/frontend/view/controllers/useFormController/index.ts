import { FormEvent } from 'react';
import { AxiosError } from 'axios';
import { useStateController } from '../useStateController';
import { ErrorState, State } from '@/frontend/core/State';

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
  const { state, executeWithState } = useStateController();

  const errorFunction = (e: unknown) => {
    if (e instanceof AxiosError && e.response && e.response.data.message) {
      return new ErrorState(e.response.data.message);
    }
    return ErrorState.Unexpected();
  };

  const onSubmit = (event: unknown) => {
    const eventType = event as EventType;
    eventType.preventDefault();
    const entity = entityBuilder(eventType);
    executeWithState(
      async () => functionUseCase(entity),
      errorFunction,
    );
  };

  return {
    onSubmit,
    state,
  };
};
