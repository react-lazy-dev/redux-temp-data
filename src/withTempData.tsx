import React from "react";
import useTempData from "./useTempData";

interface Props<T> {
  tempData: T;
}

function withTempData<T, I = T, J extends Props<I> = Props<I>>(
  Component: React.ComponentType<J>,
  name: string,
  selector?: (temp: T) => I
) {
  const temp = useTempData(name, selector);

  return function(props: J) {
    return <Component tempData={temp} {...props} />;
  };
}

export default withTempData;
