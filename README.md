# React Native Authentication App

### Core Functionality
- **User Registration** - Create new accounts with name, email, and password
- **User Login** - Authenticate existing users securely
- **Session Persistence** - Maintain authentication state across app restarts
- **User Profile Display** - Show authenticated user information
- **Secure Logout** - Clear session and return to login flow

### User Experience
- **Password Visibility Toggle** - Eye icon to show/hide password input
- **Form Validation** - Real-time validation with clear error messages
- **Responsive UI** - Clean, modern design with intuitive navigation
- **Loading States** - Proper loading indicators during async operations


## Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`

### 1. Clone the Repository
```bash
git clone <repository-url>
cd authApp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npx expo start
```

### 4. Run the App
- **iOS**: Press `i` in the terminal or `npm run ios`
- **Android**: Press `a` in the terminal or `npm run android`

## 💡 Future Improvements

This app covers all the basic authentication requirements, but there are several areas where it could be enhanced for production use. The current implementation uses local storage with AsyncStorage, which works great for learning and demonstration purposes.

**Testing**: Adding comprehensive test cases would be crucial for production. This includes unit tests for authentication logic, integration tests for the complete login/signup flow, and UI tests to ensure the screens work correctly. Testing helps catch bugs early and makes the app more reliable.

**Better Storage**: Instead of AsyncStorage, we could use react-native-keychain for more secure storage. AsyncStorage is fine for basic data, but keychain storage is encrypted and much safer for sensitive information like user tokens. It also supports biometric authentication which adds an extra security layer.

**State Management**: While Context API works well for this simple app, a larger application would benefit from a dedicated state management library like Redux Toolkit or Zustand. Redux Toolkit provides better debugging tools, handles complex state updates more efficiently, and makes it easier for teams to work together. Zustand is lighter and simpler than Redux but still more powerful than Context for managing app-wide state.

