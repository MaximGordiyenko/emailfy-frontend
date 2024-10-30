import campaignsEmail from '../assets/images/campaignsicon.png';

export const fieldList = {
  email: 'email',
  firstname: 'firstname',
  lastname: 'lastname',
  addresses: 'addresses',
  company: 'company',
  voidField: 'voidField',
  aaaaaaaa: 'aaaaaa',
  ssssssss: 'sssssss',
  pppppppp: 'pppppp',
  ttttttt: 'tttttt',
  qqqqqqq: 'qqqq',
};

export const permanentFields = {
  email: 'email',
  firstname: 'firstname',
  lastname: 'lastname',
  addresses: 'addresses',
};

export const data = [
  {
    checkbox: false,
    email: 'dolores.chambers@example.com',
    firstname: 'ast aarp',
    lastname: 'Yonkers',
    addresses: 'NY',
    id: 1,
  },
  {
    checkbox: false,
    email: 'curtis.weaver@example.com',
    firstname: 'jost Cop',
    lastname: 'ccccc',
    addresses: 'NY',
    id: 2,
  },
  {
    checkbox: false,
    email: 'jackson.graham@example.com',
    firstname: 'Tac rp',
    lastname: '12222',
    addresses: 'KZ',
    id: 3,
  },
  {
    checkbox: false,
    email: 'sara.cruz@example.com',
    firstname: 'avs pro',
    lastname: 'ggg',
    addresses: 'UA',
    id: 4,
  },
  {
    checkbox: false,
    email: 'felicia.reid@example.com',
    firstname: 'gpos v',
    lastname: 'Yonkedgffrs',
    addresses: 'BL',
    id: 5,
  },
  {
    checkbox: false,
    email: 'deanna.curtis@example.com',
    firstname: 'dsc Corp',
    lastname: 'f',
    addresses: 'NY',
    id: 6,
  },
];

export const restructuredDataColumns = Object.keys(data[0]);

export const changeTags = [
  {
    isChecked: false,
    name: '#Passive',
  },
  {
    isChecked: false,
    name: '#Subs',
  },
  {
    isChecked: false,
    name: '#Active',
  },
  {
    isChecked: false,
    name: '#Customers',
  },
  {
    isChecked: false,
    name: '#Important',
  },
];

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
