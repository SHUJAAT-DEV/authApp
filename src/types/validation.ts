const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;
const passwordRegex = /^[a-zA-Z0-9]+$/;

const validation = {
  fullName: (value: string) => {
    const trimmedValue = value?.trim?.();
    if (!trimmedValue) return 'Full name is required';
    if (value?.length > 100) return 'Full name cannot have more than 100 characters';
    if (trimmedValue?.split?.(' ')?.length === 1) return 'Second/last name is required';
    return '';
  },
  email: (value: string) => {
    if (!value?.trim?.()) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email';
    if (value?.length > 100) return 'Email cannot have more than 100 characters';
    return '';
  },
  password: (value: string, _: any, fieldName = 'Password') => {
    if (!value?.trim?.()) return `${fieldName} is required`;
    if (value.trim().length < 8) return `${fieldName} must have atleast 8 characters`;
    if (!passwordRegex.test(value)) return `${fieldName} must include letters and numbers only — no symbols allowed.`;
    return '';
  },
  phoneNumber: (value: { countryCode: string, phoneNumber: string }) => {
    const trimmedNumber = value?.phoneNumber?.trim?.();
    if (!trimmedNumber) return 'Phone number is required';
    if (trimmedNumber?.length < 8 || trimmedNumber?.length > 13
      || trimmedNumber?.includes(' ') || !(+trimmedNumber)) return 'Invalid phone number';
    return '';
  }
};

export default validation;