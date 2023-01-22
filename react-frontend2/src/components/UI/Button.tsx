import React, { PropsWithChildren } from 'react';
import './Button.css'

type Props = {
  type?: "button" | "submit" | "reset" // "?" means: the user don't have to provide type
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
const Button: React.FC<PropsWithChildren<Props>> = (props) => {



  return (
    <button
      className='button'
      type={props.type || 'button'}
      onClick={props.onClick}
    >

      {props.children}
    </button>
  );
};

export default Button;
