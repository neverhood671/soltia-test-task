import React, { useEffect, useRef, useState } from 'react';
import './Combobox.scss';
import dayjs from 'dayjs';
import History, { HistoryItemProps } from './elements/History/History';
import Dropdown from './elements/Dropdown/Dropdown';
import List from './elements/List/List';
import QueryInput, { ActiveOption } from './elements/QueryInput/QueryInput';

type ComboboxProps = {
  historyHeaderLabel: string,
  clearHistoryLabel: string,
  getOptions: (searchQuery: string) => Promise<string[]>,
  placeholder: string,
};

const Combobox = ({
  historyHeaderLabel,
  clearHistoryLabel,
  getOptions,
  placeholder,
}: ComboboxProps): JSX.Element => {
  const [options, setOptions] = useState<string[]>([]);
  const [historyItems, setHistoryItems] = useState<HistoryItemProps[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const firstOptionRef = useRef<HTMLInputElement>(null);
  const lastOptionRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const getOptionsBySearchQuery = async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length === 0) {
      setOptions([]);
      return;
    }
    const newOptions = await getOptions(searchQuery);
    setOptions(newOptions);
  };

  const TYPE_TIMEOUT = 2000;
  let timeoutId: ReturnType<typeof setTimeout>;
  const onInputChange = () => {
    if (timeoutId) return;
    timeoutId = setTimeout(() => {
      const query = searchInputRef?.current?.value || '';
      setIsLoading(true);
      getOptionsBySearchQuery(query).finally(() => {
        clearTimeout(timeoutId);
        setIsLoading(false);
      });
    }, TYPE_TIMEOUT);
  };

  const clearSearchQuery = () => {
    setOptions([]);
    setIsDropdownOpen(false);

    const searchInput = searchInputRef.current;
    if (searchInput) {
      searchInput.value = '';
      searchInput?.focus();
    }
  };

  const selectOption = (option: string, timestamp: dayjs.Dayjs) => {
    setHistoryItems([...historyItems, { title: option, timestamp, id: `history-item-${timestamp.unix()}` }]);
    setIsDropdownOpen(false);
    clearSearchQuery();
  };

  const setFocusToOptions = (option: ActiveOption) => {
    if (option === 'first') firstOptionRef?.current?.focus();
    else lastOptionRef?.current?.focus();
  };

  const getInputRef = (index: number, optionsCount: number) => {
    if (index === 0) return firstOptionRef;
    if (index === optionsCount - 1) return lastOptionRef;
    return null;
  };

  const removeHistoryItem = (id: string) => setHistoryItems(
    historyItems.filter((item) => item.id !== id),
  );

  const isMouseClick = (e: MouseEvent) => e.type === 'click' && e.clientX !== 0 && e.clientY !== 0;

  useEffect(() => {
    setIsDropdownOpen(Array.isArray(options) && options.length > 0);
  }, [options]);
  return (
    <div className="combobox">
      <QueryInput
        onQueryChange={onInputChange}
        clearQuery={clearSearchQuery}
        setFocusToOptions={setFocusToOptions}
        placeholder={placeholder}
        ref={searchInputRef}
        isLoading={isLoading}
      />
      {isDropdownOpen && (
      <Dropdown>
        <List
          className="combobox__options"
          items={options.map((option, i) => ({
            key: `search-option-${i}`,
            children: (
              <div className="combobox__option">
                <input
                  type="radio"
                  name="search-option"
                  value={option}
                  id={`search-option-${i}`}
                  className="combobox__option-input"
                  ref={getInputRef(i, options.length)}
                  onClick={(e) => {
                    if (isMouseClick(e.nativeEvent)) selectOption(option, dayjs());
                  }}
                  onKeyDown={(e) => {
                    if ([' ', 'Enter'].includes(e.key)) selectOption(option, dayjs());
                  }}
                />
                <label htmlFor={`search-option-${i}`} className="combobox__option-label">{option}</label>
              </div>),
          }))}
        />
      </Dropdown>
      )}
      <History
        items={historyItems}
        clearLabel={clearHistoryLabel}
        headerLabel={historyHeaderLabel}
        removeItem={removeHistoryItem}
        clearHistory={() => setHistoryItems([])}
      />
    </div>
  );
};

export default Combobox;
