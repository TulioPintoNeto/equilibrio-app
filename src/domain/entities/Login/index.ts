interface Params {
  email: string;
  password: string;
}

export class Login {
  email: string;
  password: string;

  constructor({ email, password }: Params) {
    this.email = email;
    this.password = password;
  }
}
