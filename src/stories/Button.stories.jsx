import React from 'react';
import { AppButton } from '../components/button/AppButton';
import { UserOutlined, DownloadOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';

export default {
  title: 'Components/AppButton',
  component: AppButton,
  decorators: [
    (Story) => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#7E9D00',
          },
        }}>
        <Story />
      </ConfigProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'default', 'dashed', 'link'],
      description: 'The variant style of the button'
    },
    kind: {
      control: 'text',
      description: 'Custom variant modifier'
    },
    size: {
      control: 'select',
      options: ['large', 'middle', 'small'],
      description: 'Size of the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state of button'
    },
    role: {
      control: 'select',
      options: ['submit', 'text'],
      description: 'Special role of the button'
    },
    label: {
      control: 'text',
      description: 'Button label text'
    },
    iconPosition: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Position of the icon'
    },
    onClick: { action: 'clicked' }
  },
};

const Template = (args) => <AppButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  label: 'Send',
  size: 'large'
};

export const PrimaryIcon = Template.bind({});
PrimaryIcon.args = {
  variant: 'primary',
  label: 'Send',
  icon: <UserOutlined />,
  iconPosition: 'start',
  size: 'large'
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'default',
  label: 'Send',
  size: 'large'
};

export const SecondaryIcon = Template.bind({});
SecondaryIcon.args = {
  variant: 'default',
  label: 'Send',
  icon: <DownloadOutlined />,
  iconPosition: 'start',
  size: 'large'
};

export const SecondarySmallIcon = Template.bind({});
SecondarySmallIcon.args = {
  variant: 'default',
  label: 'Send',
  icon: <UserOutlined />,
  iconPosition: 'start',
  size: 'small'
};


export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'primary',
  label: 'Send',
  disabled: true,
  size: 'large'
};
