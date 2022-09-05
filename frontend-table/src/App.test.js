import { render, screen } from '@testing-library/react';
import App from './App';
import TableComponent from './TableComponent';

it('should show loading', () => {
  const { getByTestId }=  render(<App />);
  expect(getByTestId('loading')).toHaveTextContent('Loading')
});

it('should show table header when table has been loaded', () => {
  const { getByTestId }=  render(<App />);
  setTimeout(function () {
    expect(getByTestId('tableHeading')).toHaveTextContent('Table')
  }, 500)
});
