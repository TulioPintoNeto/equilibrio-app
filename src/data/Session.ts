/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-constructor */
interface SessionParams {
  user: any;
}

declare module 'iron-session' {
  interface IronSessionData extends SessionParams {}
}

export class Session {
  user: any;

  constructor(sessionParams: SessionParams) {
    this.user = sessionParams.user;
  }
}
