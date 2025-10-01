import React from 'react';
import { Form, ConfigProvider } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import CheckboxForm from '../components/forms/Checkbox.tsx';

export default {
  title: 'Components/CheckboxForm',
  component: CheckboxForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#7E9D00',
          },
        }}>
        <FormProvider {...useForm()}>
          <Form>
            <Story />
          </Form>
        </FormProvider>
      </ConfigProvider>
    ),
  ],
  argTypes: {
    name: {
      control: 'text',
      description: 'Field name for form control',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    text: {
      control: 'text',
      description: 'Checkbox label text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A themed form checkbox component that integrates Ant Design Checkbox with react-hook-form.',
      },
    },
  },
};

const Template = (args) => {
  const methods = useForm({
    defaultValues: {
      [args.name]: args.defaultChecked || false,
    },
  });
  
  return <CheckboxForm {...args} control={methods.control} />;
};

export const Default = Template.bind({});
Default.args = {
  name: 'agreement',
  text: 'I agree to the terms and conditions'
};

export const PreChecked = Template.bind({});
PreChecked.args = {
  name: 'newsletter',
  text: 'Subscribe to newsletter',
  defaultChecked: true
};

export const LongText = Template.bind({});
LongText.args = {
  name: 'longAgreement',
  text: 'I hereby agree to the extensive terms and conditions, privacy policy, and data processing agreement that govern the use of this application and its services.'
};

// Example with different theme configuration
export const CustomTheme = () => {
  const methods = useForm({
    defaultValues: {
      customTheme: false,
    },
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#98B133D5', // Using a different shade of green
          borderRadius: 8,
          controlInteractiveSize: 20, // Customize checkbox size
        },
      }}>
      <FormProvider {...methods}>
        <Form>
          <CheckboxForm
            name="customTheme"
            text="Checkbox with custom theme"
            control={methods.control}
          />
        </Form>
      </FormProvider>
    </ConfigProvider>
  );
};
CustomTheme.parameters = {
  docs: {
    description: {
      story: 'Example of CheckboxForm with custom theme configuration.',
    },
  },
};

// Multiple checkboxes with themed form context
export const ThemedFormGroup = () => {
  const methods = useForm({
    defaultValues: {
      terms: false,
      privacy: false,
      updates: false,
    },
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <FormProvider {...methods}>
      <Form onFinish={methods.handleSubmit(onSubmit)}>
        <CheckboxForm
          name="terms"
          text="I accept the terms"
          control={methods.control}
        />
        <CheckboxForm
          name="privacy"
          text="I accept the privacy policy"
          control={methods.control}
        />
        <CheckboxForm
          name="updates"
          text="Send me product updates"
          control={methods.control}
        />
        <Form.Item>
          <button type="submit">Submit</button>
        </Form.Item>
      </Form>
    </FormProvider>
  );
};
ThemedFormGroup.parameters = {
  docs: {
    description: {
      story: 'Multiple themed checkboxes in a form context.',
    },
  },
};

// Interactive example maintained
export const Interactive = () => {
  const methods = useForm({
    defaultValues: {
      interactive: false,
    },
  });

  React.useEffect(() => {
    const subscription = methods.watch((value) => {
      console.log('Form values:', value);
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  return (
    <FormProvider {...methods}>
      <Form>
        <CheckboxForm
          name="interactive"
          text="Interactive checkbox (check console for value changes)"
          control={methods.control}
        />
      </Form>
    </FormProvider>
  );
};
