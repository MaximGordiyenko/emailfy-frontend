import html from '../../assets/images/compaigns/Frame 980935.svg';
import text from '../../assets/images/compaigns/Frame 980936.svg';
import custom from '../../assets/images/compaigns/Frame 980938.svg';
import blackHole from '../../assets/images/blackHole.svg';
import emails from '../../assets/images/emails.png';
import all from '../../assets/images/all.png';
import ongoing from '../../assets/images/ongoing.png';
import scheduled from '../../assets/images/calendarMark.svg';
import completed from '../../assets/images/completed.png';
import drafts from '../../assets/images/drafts.png';
export const MODAL_CARDS = [
  {
    img: html,
    img2: blackHole,
    title: 'Upload HTML',
    background: 'rgba(126, 157, 0, 0.10)',
    hover: '#7E9D00',
    path: '/campaigns/create/html',
  },
  {
    img: text,
    title: 'Manual text input',
    background: 'rgba(102, 109, 165, 0.10)',
    hover: '#666DA5',
    path: '/campaigns/create/text',
  },
  {
    img: custom,
    title: 'Custom design',
    background: 'rgba(211, 103, 0, 0.10)',
    hover: '#D36700',
    path: '/mail-builder-page',
  },
];
export const TAB_ITEMS = [
  { img: all, text: 'All' },
  { img: ongoing, text: 'Ongoing' },
  { img: scheduled, text: 'Scheduled' },
  { img: completed, text: 'Completed' },
  { img: drafts, text: 'Draft' },
];

export const FILTERED_CARDS = [
  {
    img: emails,
    title: 'Welcome message',
    status: 'Draft',
    color: '#a5a5a5',
    type: 'Regular',
    des: 'Edited st, october 4th 10:11 AM by You',
  },
  {
    img: emails,
    title: 'Welcome message',
    status: 'Draft',
    color: '#a5a5a5',
    type: 'Regular',
    des: 'Edited st, october 4th 10:11 AM by You',
  },
  {
    img: emails,
    title: 'Welcome message',
    status: 'Draft',
    color: '#a5a5a5',
    type: 'Regular',
    des: 'Edited st, october 4th 10:11 AM by You',
  },
  {
    img: emails,
    title: 'Promocode gift',
    status: 'Ongoing',
    type: 'Event',
    color: '#3F93F7',
    des: 'Edited st, october 4th 10:11 AM by You',
  },
  {
    img: emails,
    title: 'Promocode gift',
    status: 'Ongoing',
    type: 'Event',
    color: '#3F93F7',
    des: 'Edited st, october 4th 10:11 AM by You',
  },
  {
    img: emails,
    title: 'Promocode gift',
    status: 'Ongoing',
    type: 'Event',
    color: '#3F93F7',
    des: 'Edited st, october 4th 10:11 AM by You',
  },
  {
    img: emails,
    title: 'Promocode gift',
    status: 'Ongoing',
    type: 'Event',
    color: '#3F93F7',
    des: 'Edited st, october 4th 10:11 AM by You',
  },
  {
    img: emails,
    title: 'The weekly drop',
    status: 'Completed',
    color: '#1BBDA0',
    type: 'Event',
    des: 'Edited st, october 4th 10:11 AM by You',
  },
  {
    img: emails,
    title: 'The weekly drop',
    status: 'Completed',
    color: '#1BBDA0',
    type: 'Event',
    des: 'Edited st, october 4th 10:11 AM by You',
  },
  {
    img: emails,
    title: 'The weekly drop',
    status: 'Scheduled',
    color: '#EDB833',
    type: 'Event',
    des: 'Edited st, october 4th 10:11 AM by You',
  },
  {
    img: emails,
    title: 'The weekly drop',
    status: 'Scheduled',
    color: '#EDB833',
    type: 'Event',
    des: 'Edited st, october 4th 10:11 AM by You',
  },
  {
    img: emails,
    title: 'The weekly drop',
    status: 'Scheduled',
    color: '#EDB833',
    type: 'Event',
    des: 'Edited st, october 4th 10:11 AM by You',
  },
];
