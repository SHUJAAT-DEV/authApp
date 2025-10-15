import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ErrorMessage } from '../../components';
import { H6 } from '../../components/general/atoms/headings';
import { Url } from '../../components/general/atoms/url';
import PasswordInputWrapper from '../../components/general/molecules/password_input_wrapper';
import TextInputWrapper from '../../components/general/molecules/text_input_wrapper';
import { PrimaryButton } from '../../components/general/molecules/wrapped_buttons';
import { NavigationKeys } from '../../constants/navigation_keys';
import { useAuth } from '../../context/AuthContext';
import useFormValidation from '../../hooks/general/useFormValidation';
import { responsiveSize } from '../../utils/responsive';
import { loginValidation } from './loginValidation';

interface LoginScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const goto = navigation.navigate;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticating } = useAuth();

  const handleLogin = async (formData: {
    email: string;
    password: string;
  }) => {
    try {
      await handleLogin(formData);
    } catch (_) {
      setError({
        email: " ",
        password: "Invalid email or password",
      });
    }
  };

  const onPressRegister = () => {
    goto(NavigationKeys.Screen.Register);
  };

  const isLoading = isSubmitting || isAuthenticating;

  const { error, validateField, onSubmit, setError } = useFormValidation({
    schema: loginValidation,
    onSubmitForm: handleLogin,
  });


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.form}>

          <TextInputWrapper
            placeholder="Your email address"
            name="email"
            validateField={validateField}
            error={error}
          />
          <PasswordInputWrapper
            placeholder="Password"
            validateField={validateField}
            name="password"
            error={error}
          />

          <ErrorMessage error={error?.message} />

          <PrimaryButton
            title="Login"
            onPress={onSubmit}
            loading={isLoading}
            testID="login-button"
          />
          </View>

          <View style={styles.registerContainer}>
            <H6 type="regular" text="Don't have an account?" />
            <Url type="medium" text="Register here" onPress={onPressRegister} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  linkButton: {
    marginTop: 16,
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: responsiveSize(4),
    marginTop: responsiveSize(50),
    marginBottom: responsiveSize(24),
  },
  form: {
    flex: 1,
    rowGap: responsiveSize(16),
  },
});

export default LoginScreen;
