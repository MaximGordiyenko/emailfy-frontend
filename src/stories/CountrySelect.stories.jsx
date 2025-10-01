import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CountrySelect from '../components/selects/CountriySelect.jsx';

// Mock data for countries
const mockCountries = [
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'FR', label: 'France' },
  { value: 'DE', label: 'Germany' },
  { value: 'IT', label: 'Italy' }
];

export default {
  title: 'Components/CountrySelect',
  component: CountrySelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
            <Story />
          </form>
        </FormProvider>
      );
    }
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the select field'
    },
    validateStatus: {
      control: 'select',
      options: ['success', 'warning', 'error', 'validating', undefined],
      description: 'Validation status of select'
    },
    help: {
      control: 'text',
      description: 'Help text or error message'
    },
    name: {
      control: 'text',
      description: 'Field name for form control'
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text for the label'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state of the select'
    },
    data: {
      control: 'object',
      description: 'Array of country options'
    }
  }
};

// Template for all stories
const Template = (args) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <CountrySelect {...args} control={methods.control} />
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Select Country',
  name: 'country',
  data: mockCountries
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  label: 'Select Country',
  name: 'country',
  tooltip: 'Please select your country of residence',
  data: mockCountries
};

export const Loading = Template.bind({});
Loading.args = {
  label: 'Select Country',
  name: 'country',
  loading: true,
  data: mockCountries
};

export const EmptyData = Template.bind({});
EmptyData.args = {
  label: 'Select Country',
  name: 'country',
  data: []
};
