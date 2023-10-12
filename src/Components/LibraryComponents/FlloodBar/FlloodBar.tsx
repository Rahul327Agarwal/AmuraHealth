import React, { useState } from 'react';
import { SliderStyled } from './FloodBar.styles';
import { IProps } from './FloodBar.types';

const FloodBar = (props: IProps) => {
  const { isAutoCounter } = props;
  const [count, setCount] = useState<any>(props.defaultValue);
  if (isAutoCounter) {
    let counter;
    if (count > 0 && count < 100) {
      counter = setTimeout(function () {
        setCount((pre: number) => pre + 1);
      }, 2000);
    } else {
      clearInterval(counter);
    }
  }

  return <SliderStyled {...props} value={count} />;
};

export default FloodBar;
