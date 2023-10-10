import { ErrorResponse } from './types';

export const RESPONSE_ERROR_MESSAGES = {
  other: 'Unknow error',
  notAuth: 'Not auth',
  userExist: 'User alrady exist',
};

const createError = (message: string): ErrorResponse => {
  return {
    data: undefined,
    error: true,
    message,
  };
};

export const createErrorMap = () => {
  let map: object = {};
  for (const key in RESPONSE_ERROR_MESSAGES) {
    const KEY = key as keyof typeof RESPONSE_ERROR_MESSAGES;
    Object.assign(map, { [key]: createError(RESPONSE_ERROR_MESSAGES[KEY]) });
  }

  return map as ErrorsMap;
};

type ErrorsMap = {
  [key in keyof typeof RESPONSE_ERROR_MESSAGES]: ErrorResponse;
};

export const ERRORS_MAP = createErrorMap();
