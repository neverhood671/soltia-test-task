import React, { ReactNode } from 'react';
import clsx from 'clsx';
import './List.scss';

export type ListItemProps = {
  children: ReactNode;
  key: string;
};
export type ListProps = {
  className?: string;
  items: ListItemProps[];
};

const List = ({ className, items }: ListProps): JSX.Element => (
  <ul className={clsx(['list', className])}>
    {items.map(({ key, children }) => (
      <li className="list__item" key={key}>
        {children}
      </li>
    ))}
  </ul>
);

List.defaultProps = {
  className: undefined,
};

export default List;
