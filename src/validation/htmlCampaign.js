import * as yup from 'yup';

export const campaignHtmlSchema = yup.object({
  campaign: yup.string().required(),
  subject: yup
    .string()
    .min(2, 'This field must have more than 2 characters')
    .max(200, 'This field cannot have more than 200 characters')
    .required('This field is required'),
  fromName: yup
    .string()
    .min(2, 'Field must more than 2 characters')
    .max(70, 'This field cannot have more than 70 characters')
    .required('This field is required'),
  fromEmail: yup.string().email().required('This field is required'),
  sendTo: yup.array().of(yup.string()).min(1, 'Please select at least one option').required('Please select an option'),
  html: yup.string().required('This field is required'),
});
