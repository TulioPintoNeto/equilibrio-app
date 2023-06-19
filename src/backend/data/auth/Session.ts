export interface SessionParams {
  isLogged: boolean;
}

export class Session {
  isLogged: boolean;

  constructor(sessionParams?: SessionParams) {
    this.isLogged = sessionParams?.isLogged || false;
  }
}
