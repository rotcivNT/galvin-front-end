'use client';
import { ButtonProps } from '~/types';

function Button({
  title,
  icon,
  containerStyles,
  onClick,
  rightIcon,
  leftIcon,
  type = 'button',
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`${containerStyles}`}>
      {leftIcon}
      {title} {icon}
      {rightIcon}
    </button>
  );
}

export default Button;
