import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import useRoutes from '../hooks/navigation/useRoutes';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  const { user, isLoading } = useAuth();

  const { guestScreens, protectedScreens } = useRoutes();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {user ? (
          <>
            {protectedScreens.map((item: any) => (
              <Stack.Screen
                name={item.name}
                component={item.component}
                options={{ headerShown: false }}
                key={item.name}
              />
            ))}
          </>
        ) : (
          <>
            {guestScreens.map((item: any) => (
              <Stack.Screen
                name={item.name}
                component={item.component}
                options={{ headerShown: false }}
                key={item.name}
              />
            ))}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default AppNavigator;
