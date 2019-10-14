import { Primitive } from './types';

let hashCode: number = 0;

const PrimitiveHashTable: {
  [k: string]: { value: null | undefined | false | true }
} = {
  NULL: { value: null },
  UNDEFINED: { value: undefined },
  FALSE: { value: false },
  TRUE: { value: true },
};
const NumberHashTable: {[k: number]: {value: number}} = {};
const StringHashTable: {[k: string]: {value: string}} = {};
const SymbolLookupMap: Array<{value: symbol}> = [];
const VolatileHashTable = new WeakMap();

function findOrCreateHashTableRef(ref: object): string {
  const seen = VolatileHashTable.get(ref);
  if (seen) return seen;
  const newHashCode = `${hashCode++}`;
  VolatileHashTable.set(ref, newHashCode);
  return newHashCode;
};

export function hashTableRefForPrimitive(arg: Primitive): string {
  if (arg === undefined) {
    return findOrCreateHashTableRef(PrimitiveHashTable.UNDEFINED);
  }
  if (arg === null) {
    return findOrCreateHashTableRef(PrimitiveHashTable.NULL);
  }
  if (arg === true) {
    return findOrCreateHashTableRef(PrimitiveHashTable.TRUE);
  }
  if (arg === false) {
    return findOrCreateHashTableRef(PrimitiveHashTable.FALSE);
  }
  if (typeof arg === 'string') {
    StringHashTable[arg] = StringHashTable[arg] || { value: arg };
    const ref: object = StringHashTable[arg];
    return findOrCreateHashTableRef(ref);
  }
  if (typeof arg === 'number') {
    NumberHashTable[arg] = NumberHashTable[arg] || { value: arg };
    const ref: object = NumberHashTable[arg];
    return findOrCreateHashTableRef(ref);
  }
  if (typeof arg === 'symbol') {
    // This has to be done as a slow lookup until the following issue is resolved
    // https://github.com/microsoft/TypeScript/issues/1863
    let ref: {value: symbol} | undefined = 
      SymbolLookupMap.find((ref: {value: symbol}) => ref.value === arg);

    if (ref === undefined) {
      ref = {value: arg};
      SymbolLookupMap.push(ref);
      return findOrCreateHashTableRef(ref);
    } else {
      return findOrCreateHashTableRef(ref);
    }
  }

  return findOrCreateHashTableRef(arg);
};
