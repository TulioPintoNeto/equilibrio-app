/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { Environment } from './Environment';

export abstract class Logger {
  static log(message: any) {
    if (!Environment.isProduction) {
      console.log(message);
    }
  }
}
