# AuthApp - React Native Authentication Application

### Installation & Setup
```bash
# Clone the repository
git clone git@github.com:SHUJAAT-DEV/authApp.git

# Navigate to project directory
cd authApp

# Install dependencies
npm install

# Start the development server
npx expo start
```

## Features

### Core Authentication Features
- **User Registration**: Secure signup with email validation and password hashing
- **User Login**: Email/password authentication with credential verification
- **Session Management**: Persistent user sessions using AsyncStorage
- **Auto-logout**: Secure logout functionality with session cleanup
- **Error Handling**: Comprehensive error messages and user feedback

### Technical Features
- **Context API State Management**: Centralized authentication state using React Context
- **AsyncStorage Persistence**: Local data storage for user sessions and registered users
- **Navigation**: Stack-based navigation with authentication-aware routing
- **Error Boundaries**: Application-level error handling and crash prevention
- **Responsive Design**: Mobile-first responsive UI components
- **TypeScript**: Full type safety throughout the application

## Project Structure (Atomic Design Pattern)

The project follows the **Atomic Design Pattern** for component organization:

```
src/
├── components/
│   ├── error_boundary/           # Error boundary components
│   ├── general/
│   │   ├── atoms/               # Basic UI building blocks
│   │   │   ├── body/           # Body text components
│   │   │   ├── button/         # Button components
│   │   │   ├── headings/       # Heading components
│   │   │   ├── input/          # Input field components
│   │   │   ├── span/           # Span text components
│   │   │   └── url/            # URL/link components
│   │   └── molecules/          # Component combinations
│   ├── ErrorMessage.tsx        # Error display component
│   └── index.ts                # Component exports
├── constants/
│   ├── errors.ts               # Error message constants
│   ├── navigation_keys.ts      # Navigation route keys
│   ├── storage.ts              # AsyncStorage keys
│   ├── theme.ts                # UI theme configuration
│   └── index.ts                # Constants exports
├── context/
│   └── AuthContext.tsx         # Authentication context provider
├── hooks/                      # Custom React hooks
├── navigation/
│   └── AppNavigator.tsx        # Main navigation configuration
├── screens/
│   ├── HomeScreen.tsx          # Authenticated user home screen
│   ├── login/                  # Login screen components
│   └── signup/                 # Registration screen components
├── types/                      # TypeScript type definitions
└── utils/
    ├── auth.ts                 # Authentication utilities
    ├── common.ts               # Common utility functions
    └── responsive.ts           # Responsive design utilities
```

### Atomic Design Breakdown

1. **Atoms** (`src/components/general/atoms/`): Basic UI elements
   - Buttons, inputs, headings, text components
   - Reusable, single-purpose components

2. **Molecules** (`src/components/general/molecules/`): Component combinations
   - Form fields, card components, navigation items
   - Combinations of atoms to form functional units

3. **Organisms** (Screen-level components): Complex UI sections
   - Login forms, navigation bars, content sections
   - Combinations of molecules and atoms

4. **Templates & Pages** (`src/screens/`): Complete screen layouts
   - Full page implementations using organisms, molecules, and atoms

## Implementation Details

### Authentication System

#### Context API Implementation
The application uses React Context API for state management:

```typescript
// AuthContext.tsx - src/context/AuthContext.tsx:21
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticating: false,
  login: async () => ({ success: false, error: AUTH_ERRORS.NOT_IMPLEMENTED }),
  signup: async () => ({ success: false, error: AUTH_ERRORS.NOT_IMPLEMENTED }),
  logout: async () => {},
  clearError: () => {},
});
```

**Key Features:**
- Centralized authentication state management
- Loading states for better UX
- Type-safe context with TypeScript
- Custom `useAuth` hook for easy context consumption

#### AsyncStorage Integration
Persistent data storage using React Native AsyncStorage:

```typescript
// Storage keys - src/constants/storage.ts
export const STORAGE_KEYS = {
  CURRENT_USER: '@auth_app_current_user',
  REGISTERED_USERS: '@auth_app_registered_users',
} as const;
```

**Storage Implementation:**
- **Current User Session**: Stores active user data for session persistence
- **Registered Users**: Maintains a local database of all registered users
- **Automatic Cleanup**: Removes corrupted data on load failure
- **Error Handling**: Comprehensive error handling for storage operations

#### Password Security
Secure password handling with cryptographic hashing:

```typescript
// Password hashing - src/utils/auth.ts:5
export const hashPassword = (password: string): string => {
  const CryptoJS = require('crypto-js');
  const salt = 'user_auth_app_salt_2024';
  return CryptoJS.SHA256(password + salt).toString();
};
```

**Security Features:**
- SHA256 cryptographic hashing
- Salt-based password protection
- Unique user ID generation
- No plain text password storage

### Navigation System

#### Stack Navigation
React Navigation implementation with authentication awareness:

```typescript
// AppNavigator.tsx - src/navigation/AppNavigator.tsx
export default function AppNavigator() {
  const { user, isLoading } = useAuth();
  // Navigation logic based on authentication state
}
```

**Navigation Features:**
- Authentication-aware routing
- Automatic redirects based on login state
- Stack-based navigation structure
- Loading states during authentication

### Error Handling

#### Error Boundaries
Application-level error handling and crash prevention:

```typescript
// App.tsx:4
import ErrorBoundary from './src/components/error_boundary';
```

**Error Management:**
- Application-level error boundaries
- Comprehensive error constants
- User-friendly error messages
- Graceful degradation on failures


# Improvements 
This app covers all the basic authentication requirements, but there are several areas where it could be enhanced for production use. The current implementation uses local storage with AsyncStorage, which works great for learning and demonstration purposes.

**Testing**: Adding comprehensive test cases would be crucial for production. This includes unit tests for authentication logic, integration tests for the complete login/signup flow, and UI tests to ensure the screens work correctly. Testing helps catch bugs early and makes the app more reliable.

**Better Storage**: Instead of AsyncStorage, we could use react-native-keychain for more secure storage. AsyncStorage is fine for basic data, but keychain storage is encrypted and much safer for sensitive information like user tokens. It also supports biometric authentication which adds an extra security layer.

**State Management**: While Context API works well for this simple app, a larger application would benefit from a dedicated state management library like Redux Toolkit or Zustand. Redux Toolkit provides better debugging tools, handles complex state updates more efficiently, and makes it easier for teams to work together. Zustand is lighter and simpler than Redux but still more powerful than Context for managing app-wide state.