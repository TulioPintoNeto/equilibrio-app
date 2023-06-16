import React from 'react';

interface Props {
   onClick?: (() => void);
   text: string;
   type: 'button' | 'submit' | 'reset';
}

function _Button({
  onClick,
  text,
  type,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        bg-indigo-600
        flex
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-indigo-600
        font-semibold
        hover:bg-indigo-500
        justify-center
        leading-6
        px-3
        py-1.5
        rounded-md
        shadow-sm
        text-sm
        text-white
        w-full
      "
    >
      {text}
    </button>
  );
}

interface FormButtonProps extends Omit<Props, 'onClick'> {
  type: 'submit' | 'reset';
}

export function FormButton({ text, type }: FormButtonProps) {
  return <_Button text={text} type={type} />;
}

interface ButtonProps extends Omit<Props, 'type'> {
  onClick: () => void,
}

export function Button({ onClick, text }: ButtonProps) {
  return <_Button onClick={onClick} text={text} type="button" />;
}
