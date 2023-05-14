export abstract class Environment {
  static isProduction() {
    return process.env.NODE_ENV === 'production';
  }
}
