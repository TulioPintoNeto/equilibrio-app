export abstract class Environment {
  static get isProduction() {
    return process.env.NODE_ENV === 'production';
  }

  static get isLocal() {
    return process.env.NODE_ENV === 'development';
  }
}
