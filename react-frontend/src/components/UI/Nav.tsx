import React, { PropsWithChildren } from 'react';
import './Nav.css'

type Props = {
    type?: "button" | "submit" | "reset" // "?" means: the user don't have to provide type
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}
const Button: React.FC<PropsWithChildren<Props>> = (props) => {



    return (
        <nav
            className='nav'
        >

            {props.children}
        </nav>
    );
};

export default Button;
