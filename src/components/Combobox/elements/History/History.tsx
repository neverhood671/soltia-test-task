import React from 'react';
import './History.scss';
import { Dayjs } from 'dayjs';
import List from '../List/List';
import formatDate from '../../../../utils/formatDate';

export type HistoryItemProps = {
  title: string,
  timestamp: Dayjs,
  id: string,
};
export type HistoryProps = {
  headerLabel: string,
  clearLabel: string,
  items: HistoryItemProps[],
  removeItem: (id: string) => void,
  clearHistory: () => void,
};

const HistoryItem = (props: HistoryItemProps & { removeItem: (id: string) => void }) => {
  const {
    title, timestamp, id, removeItem,
  } = props;
  const getItemId = (target: HTMLButtonElement) => target?.dataset.itemId;

  return (
    <div className="history__item">
      <div className="history__item-title">{title}</div>
      <div className="history__item-aside">
        <div className="history__item-date-time">{formatDate(timestamp)}</div>
        <button
          className="history__remove-item-btn"
          type="button"
          onClick={(e) => {
            const itemId = getItemId(e.target as HTMLButtonElement);
            if (itemId) removeItem(itemId);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              const itemId = getItemId(e.target as HTMLButtonElement);
              if (itemId) removeItem(itemId);
            }
          }}
          aria-label={`remove "${title}" from history`}
          data-item-id={id}
        />
      </div>
    </div>
  );
};
const History = ({
  headerLabel,
  clearLabel,
  items,
  removeItem,
  clearHistory,
}: HistoryProps): JSX.Element => {
  const historyItems = items
    ? items.map(({ title, timestamp, id }) => (
      {
        key: id,
        children: <HistoryItem {...{
          title, timestamp, id, removeItem,
        }}
        />,
      }
    )) : [];

  const isHistoryNotEmpty = Array.isArray(items) && items.length > 0;

  return (
    <div className="history">
      <div className="history__header">
        <h3 className="history__title">{headerLabel}</h3>
        {isHistoryNotEmpty && <button className="history__clear-btn" type="button" onClick={clearHistory}>{clearLabel}</button>}
      </div>
      {isHistoryNotEmpty && <List className="history__list" items={historyItems} />}
      {!isHistoryNotEmpty && <span className="history__empty-history-msg">Search history is empty</span>}
    </div>
  );
};

export default History;
