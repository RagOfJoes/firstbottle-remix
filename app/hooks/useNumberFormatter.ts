import { useMemo } from 'react';

import type { NumberFormatOptions } from '@internationalized/number';
import { NumberFormatter } from '@internationalized/number';

const useNumberFormatter = (
  options: NumberFormatOptions = {}
): Intl.NumberFormat => {
  // TODO: Allow for dynamic locale
  return useMemo(() => new NumberFormatter('en-US', options), [options]);
};

export default useNumberFormatter;
