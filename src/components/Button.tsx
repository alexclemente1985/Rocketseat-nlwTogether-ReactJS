import React, { ButtonHTMLAttributes } from 'react';
import "../styles/button.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = (props:Props) => {
  return <button className="button" {...props}/>;
}

export default Button;