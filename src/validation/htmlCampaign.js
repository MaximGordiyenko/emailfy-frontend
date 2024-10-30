import * as yup from 'yup';

export const campaignHtmlSchema = yup.object({
  campaign_name: yup.string().required(),
  subject: yup
    .string()
    .min(2, 'This field must have more than 2 characters')
    .max(200, 'This field cannot have more than 200 characters')
    .required('This field is required'),
  from_name: yup
    .string()
    .min(2, 'Field must more than 2 characters')
    .max(70, 'This field cannot have more than 70 characters')
    .required('This field is required'),
  from_email: yup.string().email().required('This field is required'),
  sendTo: yup.object().nullable().required('Please select an option'),
  html: yup.string().required('This field is required'),
});
