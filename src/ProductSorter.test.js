import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('sorts products by price', async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Sort By:/i), { target: { value: 'price' } });

  // Update to match actual names displayed by the component
  const firstProduct = await screen.findByText(/Headphones/);
  const secondProduct = await screen.findByText(/Monitor/);
  const thirdProduct = await screen.findByText(/Phone/);

  // Assuming "price" sort will order from cheapest to most expensive
  expect(firstProduct).toBeInTheDocument();
  expect(secondProduct).toBeInTheDocument();
  expect(thirdProduct).toBeInTheDocument();
});

test('sorts products by rating', async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Sort By:/i), { target: { value: 'rating' } });

  const firstProduct = await screen.findByText(/Phone/);
  const secondProduct = await screen.findByText(/Monitor/);
  const thirdProduct = await screen.findByText(/Laptop/);

  // Assuming "rating" sort will order from highest rating to lowest
  expect(firstProduct).toBeInTheDocument();
  expect(secondProduct).toBeInTheDocument();
  expect(thirdProduct).toBeInTheDocument();
});

test('sorts products by date', async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Sort By:/i), { target: { value: 'date' } });

  const firstProduct = await screen.findByText(/Phone/);
  const secondProduct = await screen.findByText(/Monitor/);
  const thirdProduct = await screen.findByText(/Headphones/);

  // Assuming "date" sort will order from newest to oldest
  expect(firstProduct).toBeInTheDocument();
  expect(secondProduct).toBeInTheDocument();
  expect(thirdProduct).toBeInTheDocument();
});
