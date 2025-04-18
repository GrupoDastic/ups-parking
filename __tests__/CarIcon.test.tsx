import React from 'react';
import { render } from '@testing-library/react-native';
import CarIcon from '../components/icon/CarIcon';

// Mock the dependencies
jest.mock('@react-navigation/core', () => ({
  useTheme: () => ({
    dark: false,
  }),
}));

jest.mock('@/constants/Colors', () => ({
  Colors: {
    light: {
      vehicleColors: ['#FF0000', '#00FF00', '#0000FF'],
    },
    dark: {
      vehicleColors: ['#880000', '#008800', '#000088'],
    },
  },
}));

// Mock random to get consistent results
const mockRandom = jest.spyOn(Math, 'random');
mockRandom.mockReturnValue(0.5);

describe('CarIcon', () => {
  it('renders correctly with required props', () => {
    const { toJSON } = render(<CarIcon x={100} y={100} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with rotation', () => {
    const { toJSON } = render(<CarIcon x={100} y={100} rotate={90} />);
    expect(toJSON()).toMatchSnapshot();
  });
});