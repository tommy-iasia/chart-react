import { useEffect, useRef } from "react";

export function useAsync(func, dependencies) {
  useEffect(
    () => {
      let cancellation = { value: false };

      func(cancellation);

      return () => (cancellation.value = true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );
}

export function useEqualObject(object, equaller) {
  const ref = useRef();

  const equal = equaller ? equaller(object, ref.current) : object?.equals?.(ref.current);
  if (!equal) {
    ref.current = object;
  }

  return ref.current;
}

export function useTimeout(func, length, dependencies) {
  useEffect(
    () => {
      const handle = setTimeout(() => func(), length);

      return () => clearTimeout(handle);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );
}

export function useInterval(callback, interval) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (interval === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), interval);

    return () => clearInterval(id);
  }, [interval]);
}
