import validation from "../../types/validation";

export const loginValidation = {
    email: validation.email,
    password: (value: string) => {
      if (!value) return 'Password is required'
      return '';
    },
  }