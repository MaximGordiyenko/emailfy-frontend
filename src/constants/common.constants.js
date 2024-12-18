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

export const createCampaignsCards = [
  { text: 'Email', des: 'Send email newsletters, announcements and more' },
  { text: 'A/B Test', des: 'Identify the most effective campaign options' },
  { text: 'SMS', des: 'Send SMS notifications, offers, surveys and more', label: 'Soon' },
  { text: 'Journey', des: 'Visually automate messages and actions over time ', label: 'Soon' },
  { text: 'Automations', des: 'Automate messages based on customer actions', label: 'Soon' },
];
