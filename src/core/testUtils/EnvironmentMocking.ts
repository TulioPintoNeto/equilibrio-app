export class EnvironmentMocking {
  OLD_ENV: NodeJS.ProcessEnv;

  constructor() {
    this.OLD_ENV = process.env;
  }

  resetMock() {
    process.env = { ...this.OLD_ENV };
  }

  resetToInitial() {
    process.env = this.OLD_ENV;
  }
}
