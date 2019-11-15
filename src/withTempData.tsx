import React from "react";
import useTempData from "./useTempData";
import { SelectorFunction } from "./types";

interface Props<T> {
  tempData: T;
}

// An overload to get data just with name
function withTempData<T, V extends Props<T> = Props<T>>(
  Component: React.ComponentType<V>,
  name: string
): React.ComponentType<V>;

// Another overload to get data with name and selector function
function withTempData<T, U, V extends Props<U> = Props<U>>(
  Component: React.ComponentType<V>,
  name: string,
  selector: SelectorFunction<T, U>
): React.ComponentType<V>;

// The main HOC implementation
function withTempData<T, U, V extends Props<U> = Props<U>>(
  Component: React.ComponentType<V>,
  name: string,
  selector?: SelectorFunction<T, U>
): React.ComponentType<V> {
  const temp = useTempData(name, selector!);

  return function(props: V) {
    return <Component tempData={temp} {...props} />;
  };
}

export default withTempData;
