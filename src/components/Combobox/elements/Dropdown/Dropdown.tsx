import React, { ReactNode } from 'react';
import './Dropdown.scss';

export type DropdownProps = {
  children: ReactNode,
};

const Dropdown = ({ children }: DropdownProps): JSX.Element => (
  <div className="dropdown">
    {children}
  </div>
);

export default Dropdown;
