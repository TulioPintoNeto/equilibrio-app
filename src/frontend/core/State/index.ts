export class EmptyState {}

export class LoadingState {}

export class ErrorState {
  error: string;

  constructor(error: string) {
    this.error = error;
  }

  static Unnexpected() {
    return new ErrorState('Algo inesperado ocorreu');
  }
}

export class SuccessState<T> {
  data?: T;

  constructor(data?: T) {
    this.data = data;
  }
}

export type State<T> = EmptyState | LoadingState | ErrorState | SuccessState<T>;
