import * as yup from 'yup';

const popularDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];

export const signInValidation = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .test(
      'is-popular-domain',
      'Please use provider email (e.g., gmail.com, yahoo.com)',
      (value) => {
        if (!value) return true; // Skip if email is not provided
        const domain = value.split('@')[1];
        return popularDomains.includes(domain);
      },
    )
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[@$!%*?&]/,
      'Password must contain at least one special character @, $, !, %, *, ?, &',
    )
    .required('Password is required'),
  remember: yup.boolean(),
});

export const signUpValidation = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .test(
      'is-popular-domain',
      'Please use provider email (e.g., gmail.com, yahoo.com)',
      (value) => {
        if (!value) return true; // Skip if email is not provided
        const domain = value.split('@')[1];
        return popularDomains.includes(domain);
      },
    )
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[@$!%*?&]/,
      'Password must contain at least one special character (@, $, !, %, *, ?, &)',
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
