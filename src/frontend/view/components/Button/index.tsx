import React from 'react';
import classNames from 'classnames';
import { Loading } from '../Loading';

interface Props {
  onClick?: () => void;
  loading?: boolean;
  text: string;
  type: 'button' | 'submit' | 'reset';
}

const loadingAndDisabledStyles = `
  bg-indigo-600
  cursor-not-allowed
  text-indigo-600
  opacity-50
`;

const enabledStyles = `
  bg-indigo-600
  focus-visible:outline
  focus-visible:outline-2
  focus-visible:outline-offset-2
  focus-visible:outline-indigo-600
  hover:bg-indigo-500
  text-white
`;

function _Button({
  loading, onClick, text, type,
}: Props) {
  return (
    <button
      disabled={loading}
      type={type}
      onClick={onClick}
      className={classNames(
        `
          flex
          font-semibold
          justify-center
          leading-6
          relative
          px-3
          py-1.5
          rounded-md
          shadow-sm
          text-sm
          w-full
        `,
        {
          [loadingAndDisabledStyles]: loading,
          [enabledStyles]: !loading,
        },
      )}
    >
      {text}
      {loading && (
        <Loading $color="white" $size="20px" />
      )}
    </button>
  );
}

interface FormButtonProps extends Omit<Props, 'onClick'> {
  type: 'submit' | 'reset';
}

export function FormButton({ loading, text, type }: FormButtonProps) {
  return (
    <_Button
      loading={loading}
      text={text}
      type={type}
    />
  );
}

interface ButtonProps extends Omit<Props, 'type'> {
  onClick: () => void;
}

export function Button({ loading, onClick, text }: ButtonProps) {
  return (
    <_Button
      loading={loading}
      onClick={onClick}
      text={text}
      type="button"
    />
  );
}
