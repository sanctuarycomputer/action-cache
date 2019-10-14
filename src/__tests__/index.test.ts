import action from '../index';

describe('access', () => {
  it('should call the fallback callback when prop doesnt exist', () => {
    function originalFunction(arg1: string, arg2: number): string {
      return `String: ${arg1}, Number: ${arg2}`;
    };

    const action1 = action(originalFunction, "Foo", 3);
    const action2 = action(originalFunction, "Foo", 3);

    expect(action1).toBe(action2);
  });
});
