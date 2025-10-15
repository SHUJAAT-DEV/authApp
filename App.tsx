import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/error_boundary';

export default function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <AppNavigator />
      </ErrorBoundary>
    </AuthProvider>
  );
}