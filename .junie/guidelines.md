# UPS Parking Project Development Guidelines

This document provides essential information for developers working on the UPS Parking project.

## Build/Configuration Instructions

### Environment Setup

1. **Node.js and npm**: Ensure you have Node.js (v16+) and npm installed.

2. **Environment Variables**: The project uses environment variables stored in `.env` file. Make sure this file exists with the required variables.

3. **Dependencies Installation**:
   ```bash
   npm install
   ```

### Running the Application

- **Development Mode**:
  ```bash
  npm start
  ```
  This will start the Expo development server.

- **Android**:
  ```bash
  npm run android
  ```
  Builds and runs the app on an Android device/emulator.

- **iOS**:
  ```bash
  npm run ios
  ```
  Builds and runs the app on an iOS simulator/device.

- **Web**:
  ```bash
  npm run web
  ```
  Starts the app in a web browser.

### Project Reset

If you need to reset the project state:
```bash
npm run reset-project
```

## Testing Information

### Testing Framework

The project uses Jest as the testing framework with the following key packages:
- `jest-expo`: Jest preset for Expo projects
- `@testing-library/react-native`: Testing utilities for React Native
- `react-test-renderer`: For snapshot testing

### Running Tests

- **Run all tests in watch mode** (automatically re-runs when files change):
  ```bash
  npm test
  ```

- **Run tests once without watch mode**:
  ```bash
  npx jest --no-watch
  ```

- **Run specific test file**:
  ```bash
  npx jest path/to/test.js
  ```

### Adding New Tests

1. **Test File Location**: Place test files in the `__tests__` directory or co-locate them with the component/module being tested with a `.test.tsx` or `.spec.tsx` extension.

2. **Test File Naming**: Use the format `[ComponentName].test.tsx` or `[ModuleName].spec.tsx`.

3. **Basic Test Structure**:
   ```typescript
   import React from 'react';
   import { render } from '@testing-library/react-native';
   import ComponentToTest from '../path/to/component';

   // Mock dependencies as needed
   jest.mock('dependency', () => ({
     // mock implementation
   }));

   describe('ComponentToTest', () => {
     it('should render correctly', () => {
       const { toJSON } = render(<ComponentToTest prop1="value" />);
       expect(toJSON()).toMatchSnapshot();
     });

     it('should handle user interaction', () => {
       const { getByText } = render(<ComponentToTest />);
       // Test interactions
     });
   });
   ```

4. **Snapshot Testing**: The project uses snapshot testing for UI components. When you make intentional changes to a component, update snapshots with:
   ```bash
   npx jest --updateSnapshot
   ```

5. **Mocking Dependencies**: For components that use external dependencies (like navigation, theme, etc.), mock them in your test file:
   ```typescript
   jest.mock('@react-navigation/core', () => ({
     useTheme: () => ({
       dark: false,
     }),
   }));
   ```

### Example Test

Here's an example test for the `CarIcon` component:

```typescript
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
```

## Additional Development Information

### Project Structure

- **app/**: Contains the main application screens using Expo Router
- **components/**: Reusable UI components
- **constants/**: Application constants like colors, themes, etc.
- **hooks/**: Custom React hooks
- **services/**: API services and other external integrations
- **types/**: TypeScript type definitions
- **assets/**: Static assets like images, fonts, etc.

### Code Style

- The project uses TypeScript for type safety
- Components are primarily functional components with hooks
- Styling is done using NativeWind (Tailwind CSS for React Native)

### SVG Components

The project uses `react-native-svg` and `react-native-svg-transformer` for SVG handling:
- SVG files can be imported directly as React components
- Custom SVG components (like icons) are in the `components/icon` directory

### Navigation

The project uses Expo Router for navigation, which is built on top of React Navigation:
- File-based routing in the `app/` directory
- Navigation state and theme are accessible via React Navigation hooks

### State Management

- Local component state with React's `useState` and `useReducer`
- React Query (`@tanstack/react-query`) for server state management and data fetching

### Theming

The application supports light and dark themes:
- Theme values are in `constants/Colors.ts`
- Current theme can be accessed with `useTheme()` from React Navigation
- NativeWind/Tailwind is configured to support theming