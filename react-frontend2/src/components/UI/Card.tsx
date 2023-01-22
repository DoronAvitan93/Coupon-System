import React, { PropsWithChildren } from 'react';

import classes from './Card.module.css';


type Props = {

}
const Card: React.FC<PropsWithChildren<Props>> = (props) => {
  const styling = classes.card
  //`${classes.card} ${props.className}`

  return <div className={styling}>
    {props.children}
  </div>;
};

export default Card;
