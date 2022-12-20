import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

export const loader = async (args: LoaderArgs) => {
  // eslint-disable-next-line no-empty-pattern
  const {} = args;

  return json({});
};
