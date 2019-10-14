import { hashTableRefForPrimitive } from './hashTable';
import { VolatileActionCache } from './types';

const VolatileActionCache: VolatileActionCache<(...args: any[]) => any> = new WeakMap();

export default function action<T extends (...args: any[]) => any> (
  unbound: T,
  ...args: Parameters<T>
): () => ReturnType<T> {
  const signature: string = args.map(hashTableRefForPrimitive).join('-');

  let superset = VolatileActionCache.get(unbound);
  if (!superset) {
    superset = VolatileActionCache.set(unbound, {}).get(unbound);
  }

  if (superset && superset[signature]) return superset[signature];
  
  const closure = () => unbound.call(null, ...args);
  if (superset) superset[signature] = closure;
  return closure;
};
