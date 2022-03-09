import React, {
  KeyboardEventHandler, forwardRef, Ref, ChangeEventHandler,
} from 'react';
import './QueryInput.scss';
import Spinner from '../Spinner/Spinner';

export type ActiveOption = 'first' | 'last';
export type QueryInputProps = {
  onQueryChange: ChangeEventHandler,
  clearQuery: () => void,
  setFocusToOptions: (option: ActiveOption) => void,
  placeholder: string,
  isLoading: boolean,
};

const QueryInput = forwardRef(({
  onQueryChange,
  clearQuery,
  setFocusToOptions,
  placeholder,
  isLoading,
}: QueryInputProps, ref: Ref<HTMLInputElement>): JSX.Element => {
  const handleInputKeyEvent: KeyboardEventHandler = (e) => {
    if (e.key === 'ArrowUp') {
      setFocusToOptions('last');
      return;
    }
    if (e.key === 'ArrowDown') {
      setFocusToOptions('first');
    }
  };
  return (
    <div className="query-input">
      <input
        ref={ref}
        onKeyDown={handleInputKeyEvent}
        onChange={onQueryChange}
        className="query-input__input"
        type="text"
        aria-label="Search Query"
        placeholder={placeholder}
      />
      {isLoading && <Spinner className="query-input__spinner" />}
      <button
        className="query-input__clear-btn"
        type="button"
        aria-label="Clear Search Query"
        onClick={clearQuery}
      />
    </div>
  );
});

export default QueryInput;
