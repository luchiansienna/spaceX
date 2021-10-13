import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/SpaceX 50 Most Recent Launches/i);
  expect(linkElement).toBeInTheDocument();
});
