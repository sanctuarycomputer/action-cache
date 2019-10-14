interface ActionSubCache<T extends (...args: any[]) => any> {
  [k: string]: () => ReturnType<T>
}

export type VolatileActionCache<T> = T extends (...args: any[]) => any ? WeakMap<T, ActionSubCache<T>> : never;
export type Primitive = object | number | string | boolean | null | undefined | symbol;

