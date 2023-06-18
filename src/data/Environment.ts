export class EnvVariableNotFound extends Error {}

export abstract class Environment {
  static get isProduction() {
    return process.env.NODE_ENV === 'production';
  }

  static get isLocal() {
    return process.env.NODE_ENV === 'development';
  }

  static getVariable(name: string): string {
    const variable = process.env[name];

    if (variable) {
      return variable;
    }

    throw new EnvVariableNotFound();
  }
}
