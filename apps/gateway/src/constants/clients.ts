type MSClientSet = {
  name: string;
  host: string;
  port: number;
}

export const AuthClient: MSClientSet = {
  name: 'AUTH_SERVICE',
  host: 'auth-ms',
  port: 3001,
};
