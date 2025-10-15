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
import PasswordInputWrapper from '../../components/general/molecules/password_input_wrapper';
import TextInputWrapper from '../../components/general/molecules/text_input_wrapper';
import { PrimaryButton } from '../../components/general/molecules/wrapped_buttons';
import { useAuth } from '../../context/AuthContext';
import useFormValidation from '../../hooks/general/useFormValidation';
import { basicInfoValidation } from './basicInfoValidation';
import { responsiveSize } from '../../utils/responsive';
import { Url } from '../../components/general/atoms/url';
import { H6 } from '../../components/general/atoms/headings';
import { NavigationKeys } from '../../constants/navigation_keys';

interface SignupScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const RegisterScreen: React.FC<SignupScreenProps> = ({ navigation }) => {

  const goto = navigation.navigate;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup, isAuthenticating } = useAuth();

  const onSubmitForm = async (formData: any) => {
    const payload = {
      name: formData.fullName,
      email: formData.email?.toLowerCase(),
      password: formData.password,
    };

    if (isSubmitting || isAuthenticating) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await signup(payload);
      if (!result.success && result.error) {
        setError({ code: 'UNKNOWN_ERROR', message: result?.error?.message ?? "Error" });
      }
    } catch (err) {
      setError({ code: 'UNKNOWN_ERROR', message: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { error, validateField, onSubmit, setError } = useFormValidation({
    schema: basicInfoValidation,
    onSubmitForm: onSubmitForm,
  });

  const navigateToLogin = () => {
    goto(NavigationKeys.Screen.Login);
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.form}>
            <TextInputWrapper
              placeholder="Full name"
              validateField={validateField}
              name="fullName"
              error={error}
            />
            <TextInputWrapper
              placeholder="Email address"
              validateField={validateField}
              name="email"
              error={error}
            />
            <PasswordInputWrapper
              placeholder="Password"
              validateField={validateField}
              name="password"
              error={error}
            />
            <PasswordInputWrapper
              placeholder="Confirm password"
              validateField={validateField}
              name="confirmPassword"
              error={error}
            />
            <ErrorMessage error={error?.message} />
            <PrimaryButton
              title="Sign Up"
              onPress={onSubmit}
              loading={isSubmitting}
              testID="signup-button"
            />
          </View>
          <View style={styles.registerContainer}>
            <H6 type="regular" text="Already have an account?" />
            <Url type="medium" text="Login here" onPress={navigateToLogin} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
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
  form: {
    flex: 1,
    rowGap: responsiveSize(16),
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: responsiveSize(4),
    marginTop: responsiveSize(50),
    marginBottom: responsiveSize(24),
  },
});

export default RegisterScreen;
