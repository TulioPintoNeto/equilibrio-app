export interface SessionParams {
  isLogged: boolean;
  destroy: () => void;
  save: () => void;
}

export class Session {
  isLogged: boolean;
  destroy: () => void;
  save: () => void;

  constructor(sessionParams: SessionParams) {
    this.isLogged = sessionParams.isLogged;
    this.destroy = sessionParams.destroy;
    this.save = sessionParams.save;
  }
}
