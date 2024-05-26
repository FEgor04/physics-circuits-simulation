import { useMemo } from "react";

export function useIsDirty<T>(currentValue: T, initialValue: T, isEqual: (a: T, b: T) => boolean) {
  return useMemo(() => !isEqual(currentValue, initialValue), [currentValue, initialValue, isEqual]);
}

export function useIsArrayDirty<T>(current: Array<T>, initial: Array<T>, isEqual: (a: T, b: T) => boolean) {
  return useIsDirty(current, initial, (a, b) => a.length == b.length && a.every((_, i) => isEqual(a[i], b[i])));
}
