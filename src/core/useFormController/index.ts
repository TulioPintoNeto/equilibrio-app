import { FormEvent, useState } from 'react';
import {
  EmptyState,
  ErrorState,
  LoadingState,
  State,
  SuccessState,
} from '../State';

interface Params<EventType extends FormEvent, Entity> {
  // eslint-disable-next-line no-unused-vars
  entityBuilder: (eventType: EventType) => Entity;
  // eslint-disable-next-line no-unused-vars
  functionUseCase: (entity: Entity) => Promise<void>;
}

export const useFormController = <EventType extends FormEvent, Entity, Data>({
  entityBuilder,
  functionUseCase,
}: Params<EventType, Entity>) => {
  const [state, setState] = useState<State<Data>>(new EmptyState());

  const execute = async (entity: Entity) => {
    setState(new LoadingState());
    try {
      await functionUseCase(entity);
      setState(new SuccessState());
    } catch (error) {
      if (error instanceof Error) {
        setState(new ErrorState(error.message));
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
