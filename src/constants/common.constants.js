export const initialStatusData = {
  spf: null,
  dkim: null,
  dmarc: null,
  status: false,
};

export const initialSmtpData = {
  email: '',
  name: '',
  domain: '',
  selector: '',
  dkim: '',
};

export const newSMTPInitialData = {
  dkim: {
    name: '',
    ttl: 3600,
    type: 'TXT',
    value: '',
  },
  dkim_private_key: '',
  dmarc: {
    name: '',
    ttl: 3600,
    type: 'TXT',
    value: '',
  },
  spf: {
    name: '',
    ttl: 3600,
    type: 'TXT',
    value: '',
  },
};

export const domainAuthSteps = [
  { title: 'Start your email authentication process' },
  { title: 'Go to your domain provider’s website' },
  { title: 'Create a DKIM record' },
  { title: 'Create a SPF record' },
  { title: 'Create a DMARC record' },
  { title: 'Wait for Emailfy to check the record' },
];

export const createCampaignsCards = [
  { text: 'Email', des: 'Send email newsletters, announcements and more' },
  { text: 'A/B Test', des: 'Identify the most effective campaign options' },
  { text: 'SMS', des: 'Send SMS notifications, offers, surveys and more', label: 'Soon' },
  { text: 'Journey', des: 'Visually automate messages and actions over time ', label: 'Soon' },
  { text: 'Automations', des: 'Automate messages based on customer actions', label: 'Soon' },
];
