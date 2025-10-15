import validation from "../../types/validation";

export const basicInfoValidation = {
  fullName: validation.fullName,
  email: validation.email,
  password: validation.password,
  confirmPassword: (value: string, formData: any) => {
    if (!value?.trim?.()) return 'Confirm password is required';
    if (value !== formData?.password) return 'Passwords do not match';
    return '';
  }  
}