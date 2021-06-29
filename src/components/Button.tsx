import React, { ButtonHTMLAttributes } from 'react';
import "../styles/button.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

const Button: React.FC<Props> = ({isOutlined = false, ...props}:Props) => {
  return <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props}/>;
}

export default Button;