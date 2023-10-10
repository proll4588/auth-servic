export interface FullTokens {
  accessToken: string;
  refreshToken: string;
}

export interface Response<T> {
  error: boolean;
  message?: string;
  data: T;
}

export interface ErrorResponse extends Response<undefined> {
  error: true;
  message: string;
}

export interface TokenPayload {
  userId: number;
}
