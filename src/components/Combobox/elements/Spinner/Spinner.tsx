import React from 'react';
import './Spinner.scss';
import clsx from 'clsx';

export type SpinnerProps = {
  className: string,
};
const Spinner = ({ className }: SpinnerProps): JSX.Element => <div className={clsx(['spinner', className])} />;

export default Spinner;
