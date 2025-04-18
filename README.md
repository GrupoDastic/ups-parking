# UPS Parking

A smart parking system with speech recognition that allows users to park their vehicles without leaving their cars. The system recognizes voice commands and guides users to available parking spots.

## 🎯 Purpose

UPS Parking aims to streamline the parking experience at Universidad Politécnica Salesiana (UPS) by:
- Providing a hands-free, voice-controlled parking solution
- Optimizing parking space utilization
- Reducing time spent searching for parking spots
- Improving accessibility for all users

## 🖼️ Demo

*Screenshots and demo videos will be added here as they become available.*

## 🛠️ Technologies Used

- **Frontend Framework**: React Native
- **Development Platform**: Expo
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Query
- **Voice Recognition**: Expo Speech Recognition
- **UI Components**: Custom SVG components
- **Testing**: Jest with React Testing Library

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GrupoDastic/ups-parking.git
   cd ups-parking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the required variables.

## 💻 Usage

### Development Mode

```bash
npm start
```

This will start the Expo development server, allowing you to run the app on a physical device using the Expo Go app or on an emulator.

### Platform-Specific Commands

- **Android**
  ```bash
  npm run android
  ```

- **iOS**
  ```bash
  npm run ios
  ```

- **Web**
  ```bash
  npm run web
  ```

### Testing

```bash
npm test
```

### Project Reset

```bash
npm run reset-project
```

## 📁 Project Structure

- **app/**: Main application screens using Expo Router
- **components/**: Reusable UI components
- **constants/**: Application constants (colors, themes, etc.)
- **hooks/**: Custom React hooks
- **services/**: API services and external integrations
- **types/**: TypeScript type definitions
- **assets/**: Static assets (images, fonts, etc.)
- **__tests__/**: Test files

## 🤝 Contributing

We welcome contributions to the UPS Parking project! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the code style of the project.

## 👥 Authors

- **GrupoDastic** - *Initial work* - [GrupoDastic](https://github.com/GrupoDastic)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Universidad Politécnica Salesiana (UPS) for supporting this project
- All contributors who have helped shape this project
