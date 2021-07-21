import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders empty calendar', () => {
  render(<App />);
  const linkElement = screen.getByText(/sun/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders populated calendar', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/28/i);
  expect(linkElement.length).toBeGreaterThan(0);
});
