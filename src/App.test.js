import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders Calendar component', () => {
  render(<App />);
  const calendar = screen.getByRole('grid');
  expect(calendar).toBeInTheDocument();
});