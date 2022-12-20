import type { Context, Provider } from 'react';
import {
  createContext as createReactContext,
  useContext as useReactContext,
} from 'react';

export type CreateContextArgs<T> = {
  defaultValue?: T | undefined;
  hookName?: string | undefined;
  errorMessage?: string | undefined;
  name: string;
  providerName?: string | undefined;
  strict?: boolean | undefined;
};

export type CreateContextReturn<T> = [Provider<T>, () => T, Context<T>];

/**
 * Helper function for creating context
 * Inspired by chakra-ui's implementation
 */
const createContext = <T>(args: CreateContextArgs<T>) => {
  const {
    defaultValue,
    name,
    strict = true,
    hookName = 'useContext',
    providerName = 'Provider',
    errorMessage,
  } = args;

  const Context = createReactContext<T | undefined>(defaultValue);
  Context.displayName = name;

  const useContext = () => {
    const context = useReactContext(Context);

    if (!context && strict) {
      const error = new Error(
        errorMessage ??
          `${hookName} returned \`undefined\`. Must wrap component within ${providerName}`
      );

      error.name = 'ContextError';
      Error.captureStackTrace?.(error, useContext);

      throw error;
    }

    return context;
  };

  return [Context.Provider, useContext, Context] as CreateContextReturn<T>;
};

export default createContext;
