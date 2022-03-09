import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import History, {HistoryProps} from "../src/components/Combobox/elements/History/History";
import dayjs from "dayjs";

describe('Combobox Component', () => {
  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('Renders Empty History', () => {
    const historyProps: HistoryProps = {
      clearHistory(): void {},
      items: [],
      removeItem(id: string): void {},
      headerLabel: "Test History Header",
      clearLabel: "Clear Test History"
    };

    act(() => {
      render(<History  {...historyProps}/>, container)
    });

    expect(container?.querySelector('.history__title')?.textContent).toBe(historyProps.headerLabel);
    expect(container?.querySelector('.history__clear-btn')).toBe(null);
    expect(container.querySelector('.history__list')).toBe(null)
  });

  it('Renders History with 2 items', () => {
    const historyProps: HistoryProps = {
      clearHistory(): void {},
      items: [
        {
          title: 'History Item 1',
          timestamp: dayjs(new Date(2018, 8, 18, 12, 30)),
          id: '123',
        },
        {
          title: 'History Item 2',
          timestamp: dayjs(new Date(2018, 8, 18, 14, 30)),
          id: '456',
        },
      ],
      removeItem(id: string): void {},
      headerLabel: "Test History Header",
      clearLabel: "Clear Test History"
    };

    act(() => {
      render(<History  {...historyProps}/>, container)
    });

    expect(container.querySelectorAll('.history__item').length).toBe(2)
  });
});
