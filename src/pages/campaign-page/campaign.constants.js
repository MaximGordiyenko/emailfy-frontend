import html from '../../assets/compaigns/Frame 980935.svg';
import text from '../../assets/compaigns/Frame 980936.svg';
import custom from '../../assets/compaigns/Frame 980938.svg';
import emails from '../../assets/images/emails.png';
import { ROUTE } from '../../routes/routes.constants.js';

export const MODAL_CARDS = [
  {
    id: 1,
    img: html,
    title: 'Upload HTML',
    background: 'rgba(126, 157, 0, 0.10)',
    hover: '#7E9D00',
    borderHover: 'red',
    path: `${ROUTE.uploadHtml}`
  },
  {
    id: 2,
    img: text,
    title: 'Manual text input',
    background: 'rgba(102, 109, 165, 0.10)',
    hover: '#666DA5',
    path: `${ROUTE.createText}`
  },
  {
    id: 3,
    img: custom,
    title: 'Custom design',
    background: 'rgba(211, 103, 0, 0.10)',
    hover: '#D36700',
    path: `${ROUTE.mailBuilderPage}`
  }
];

export const FILTERED_CARDS = [
  {
    id: 1,
    img: emails,
    title: 'Back Friday',
    status: 'Draft',
    color: '#a5a5a5',
    type: 'Regular',
    des: 'Edited st, october 4th 10:11 AM by You'
  },
  {
    id: 2,
    img: emails,
    title: 'Thanksgiven',
    status: 'Draft',
    color: '#a5a5a5',
    type: 'Regular',
    des: 'Edited st, october 4th 10:11 AM by You'
  },
  {
    id: 3,
    img: emails,
    title: 'Crestams eve',
    status: 'Draft',
    color: '#a5a5a5',
    type: 'Regular',
    des: 'Edited st, october 4th 10:11 AM by You'
  },
  {
    id: 4,
    img: emails,
    title: 'Promocode gift',
    status: 'Ongoing',
    type: 'Event',
    color: '#3F93F7',
    des: 'Edited st, october 4th 10:11 AM by You'
  },
  {
    id: 5,
    img: emails,
    title: 'Promocode gift',
    status: 'Ongoing',
    type: 'Event',
    color: '#3F93F7',
    des: 'Edited st, october 4th 10:11 AM by You'
  },
  {
    id: 6,
    img: emails,
    title: 'Promocode gift',
    status: 'Ongoing',
    type: 'Event',
    color: '#3F93F7',
    des: 'Edited st, october 4th 10:11 AM by You'
  },
  {
    id: 7,
    img: emails,
    title: 'Promocode gift',
    status: 'Ongoing',
    type: 'Event',
    color: '#3F93F7',
    des: 'Edited st, october 4th 10:11 AM by You'
  },
  {
    id: 8,
    img: emails,
    title: 'The weekly drop',
    status: 'Completed',
    color: '#1BBDA0',
    type: 'Event',
    des: 'Edited st, october 4th 10:11 AM by You'
  },
  {
    id: 9,
    img: emails,
    title: 'The weekly drop',
    status: 'Completed',
    color: '#1BBDA0',
    type: 'Event',
    des: 'Edited st, october 4th 10:11 AM by You'
  },
  {
    id: 10,
    img: emails,
    title: 'The weekly drop',
    status: 'Scheduled',
    color: '#EDB833',
    type: 'Event',
    des: 'Edited st, october 4th 10:11 AM by You'
  },
  {id: 11,
    img: emails,
    title: 'The weekly drop',
    status: 'Scheduled',
    color: '#EDB833',
    type: 'Event',
    des: 'Edited st, october 4th 10:11 AM by You'
  },
  {id: 12,
    img: emails,
    title: 'The weekly drop',
    status: 'Scheduled',
    color: '#EDB833',
    type: 'Event',
    des: 'Edited st, october 4th 10:11 AM by You'
  }
];

export const STATUSES = {
  in_queue: 'Scheduled',
  ready: 'Scheduled',
  in_progress: 'Ongoing',
  finished: 'Completed',
  overload: 'Failed',
  access_error: 'Failed',
  data_error: 'Failed',
  server_error: 'Failed',
};

export const COLORS = {
  in_queue: '#EDB833',
  ready: '#EDB833',
  in_progress: '#3F93F7',
  finished: '#1BBDA0',
  overload: '#FF4444',
  access_error: '#FF4444',
  data_error: '#FF4444',
  server_error: '#FF4444',
};

export const tooltipMessages = {
  firstCampaignSteps: `Lorem impus dolor set`,
};
