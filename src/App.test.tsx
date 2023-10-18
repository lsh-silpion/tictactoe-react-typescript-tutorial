import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders status element', () => {
  render(<App />);
  const statusElement = screen.getByText(/Next player/i);
  expect(statusElement).toBeInTheDocument();
});
