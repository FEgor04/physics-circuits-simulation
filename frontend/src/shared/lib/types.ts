// This Omit works nice with dicriminated unions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OmitBetter<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertNever(_x: never): never {
  throw new Error("Unexpected value.");
}

