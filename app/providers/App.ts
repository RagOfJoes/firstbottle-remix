import createContext from '@/lib/createContext';

export type AppContext = {};

export type UseAppProps = {};

/**
 * Global App provider. Will be responsible for fetching app settings and any other useful
 * global data
 *
 */

export const [AppProvider, useAppContext] = createContext<AppContext>({
  hookName: 'useAppContext',
  name: 'App',
  providerName: 'AppProvider',
  strict: true,
});

/**
 * Used to populate App Provider with necessary data
 */
export const useApp = (props: UseAppProps): AppContext => {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return {};
};
