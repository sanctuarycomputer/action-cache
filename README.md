# Action Cache

[![codecov](https://codecov.io/gh/sanctuarycomputer/action-cache/branch/master/graph/badge.svg)](https://codecov.io/gh/sanctuarycomputer/action-cache)

#### Never allocate the same function twice

When using anonymous functions in React (or similar), it's easy to accidentally cause unnecessary re-renders, as an anonymous function will never equal another. `action-cache` is a type-safe way to wrap a function with its arguments, so that the identity of a given function stays the same across re-renders.

And no, `.bind` does not solve this problem.

## Installation

###### yarn

```
yarn add action-cache
```

###### npm

```
npm install action-cache
```

## Example

```ts
import { action } from 'action-cache';

function originalFunction(arg1: string, arg2: number): string {
  return `String: ${arg1}, Number: ${arg2}`;
};

const action1 = action(originalFunction, "Foo", 3);
const action2 = action(originalFunction, "Foo", 3);

expect(action1).toBe(action2);
```

## Example with React

```ts
import React, { Component } from 'react';
import { action } from 'action-cache';

interface State {
  list: number[];
}

class MyComponent extends Component<{}, State> {
  state: State = {
    list: [1, 2, 3]
  }

  didClickItem = (item: number) => {
    console.log(item);
  }

  render() {
    return (
      <div>
        {this.state.list.map(item => (
          <button onClick={action(this.didClickItem, item)}>Click Item</button>
        ))}
      </div>
    )
  }
}

```

## Differences to Reflective Bind

An alternative to this approach is [Reflective Bind](https://github.com/flexport/reflective-bind), which is super clever. Action Cache was built to solve the same problem with the following differences:

- Doesn't have a dependency on Babel
- Doesn't require overriding your `shouldComponentUpdate`
- Requires an import and change to your normal syntax
