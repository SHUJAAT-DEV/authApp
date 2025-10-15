import { useState } from "react";
import { isEmptyObject } from "../../utils/common";

type Properties = {
  schema: {
    [key: string]: (p1: any, p2: any, p3: string) => string | null | undefined,
  },
  onSubmitForm: (p?: any) => void,
}

const useFormValidation = ({
  schema,
  onSubmitForm,
}: Properties) => {
  const [error, setError] = useState<{
    [key: string]: string
  }>({});
  const [formData, setFormData] = useState<{
    [key: string]: any,
  }>({});
  const validateField = ({
    name, value_: value, event = 'blur',
  }: {
    name: string,
    value_: any,
    event?: 'change' | 'blur'
  }) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    if (event === 'blur') {
      let result = !schema?.[name]
        ? "'Invalid validation'" : (schema?.[name]?.(value, updatedFormData, name) || '');
      setError({
        ...error,
        [name]: result,
      });
      return result;
    }
  };

  const onSubmit = () => {
    const validatedErrors: {[key: string]: string} = {};
    for (const key in schema) {
      const result = schema[key]?.(formData?.[key] || '', formData, key);
      validatedErrors[key] = result ||'';
    }
    setError(validatedErrors);
    if (isEmptyObject(validatedErrors)) {
      onSubmitForm(formData);
    }
  };

  return { error, validateField, onSubmit, formData, setError };
}

export default useFormValidation;