import React from 'react';
import CN from 'classnames';
import { Loading } from '../Loading';

const wrapperStyles = 'flex items-center p-2 rounded-lg w-full';

const enabledStyles = 'text-white hover:bg-indigo-700';

const loadingStyles = 'text-indigo-600 hover:bg-indigo-600';

interface Params {
  Icon: () => JSX.Element;
  text: string;
  Wrapper: ({ children }: { children: React.ReactNode }) => JSX.Element;
}

function _ListItem({ Icon, text, Wrapper }: Params) {
  return (
    <li>
      <Wrapper>
        <Icon />
        <span className="ml-3">{text}</span>
      </Wrapper>
    </li>
  );
}

interface AnchorParams extends Omit<Params, 'Wrapper'> {
  href: string;
}

function Anchor({ href, Icon, text }: AnchorParams) {
  return _ListItem({
    Icon,
    text,
    Wrapper: ({ children }: { children: React.ReactNode }) => (
      <a className={CN(wrapperStyles, enabledStyles)} href={href}>
        {children}
      </a>
    ),
  });
}

interface ButtonParams extends Omit<Params, 'Wrapper'> {
  handleClick: () => void;
  loading?: boolean;
}

function Button({
  handleClick, Icon, loading, text,
}: ButtonParams) {
  return _ListItem({
    Icon,
    text,
    Wrapper: ({ children }: { children: React.ReactNode }) => (
      <button
        disabled={loading}
        className={CN(
          wrapperStyles,
          'relative',
          {
            [enabledStyles]: !loading,
            [loadingStyles]: loading,
          },
        )}
        onClick={handleClick}
      >
        {children}
        {loading && <Loading $color="white" $size="20px" />}
      </button>
    ),
  });
}

export const ListItem = { Anchor, Button };
