import apple from '../../assets/images/Dashboard/Frame 980065.svg';
import android from '../../assets/images/Dashboard/Frame 980067.svg';
import chrome from '../../assets/images/Dashboard/Frame 980071.svg';
import explorer from '../../assets/images/Dashboard/svg3769.svg';
import na from '../../assets/images/Dashboard/Frame 980075.svg';

import outlook from '../../assets/images/Dashboard/Frame 980073.svg';
import appleMail from '../../assets/images/Dashboard/Subtract.svg';
import yahoo from '../../assets/images/Dashboard/yahoo-symbol 1.svg';
import hotmail from '../../assets/images/Dashboard/Frame 980074.svg';

import chinese from '../../assets/images/Dashboard/china.svg';
import spanish from '../../assets/images/Dashboard/spain.svg';
import english from '../../assets/images/Dashboard/united kingdom.svg';
import hindi from '../../assets/images/Dashboard/india.svg';
import arabian from '../../assets/images/Dashboard/united arab emirates.svg';
import netherlands from '../../assets/images/Dashboard/netherlands.svg';
import portugal from '../../assets/images/Dashboard/portugal.svg';
import other from '../../assets/images/Dashboard/Other.svg';

import brazil from '../../assets/images/Dashboard/brazil.svg';
import usa from '../../assets/images/Dashboard/united states.svg';
import germany from '../../assets/images/Dashboard/germany.svg';
import australia from '../../assets/images/Dashboard/australia.svg';

export const STAT_CARDS_DATA = [
  {
    title: 'Total Contacts Amount',
    value: '10460481',
    width: '278px',
  },
  {
    title: 'Campaigns',
    value: '28',
    description: '(500024) Emails',
    width: '278px',
  },
  {
    title: 'Average Delivery Rate',
    value: '81.12%',
    description: '(408621)',
    width: '278px',
  },
  {
    title: 'Average Open Rate',
    value: '41.12%',
    description: '(200621)',
    width: '278px',
  },
  {
    title: 'Hard Bounced',
    value: '2.12%',
    description: '(98547)',
  },
  {
    title: 'Unsubscribed',
    value: '128',
  },
  {
    title: 'Average CTR',
    value: '24.5%',
    description: '(98547)',
  },
];
export const DEVICES_DATA = {
  mobile_devices: {
    overall_stat: { title: 'Mobile', value: '67%' },
    stat_info: [
      {
        img: apple,
        title: 'iPhone (Safari)',
        value: '67%',
      },
      {
        img: android,
        title: 'Android browser',
        value: '14%',
      },
      {
        img: chrome,
        title: 'Chrome mobile',
        value: '10%',
      },
      {
        img: android,
        title: 'Android',
        value: '5%',
      },
      {
        img: explorer,
        title: 'IE Mobile',
        value: '3.2%',
      },
      {
        img: na,
        title: 'Undefined',
        value: '0.8%',
      },
    ],
  },
  desktop_devices: {
    overall_stat: { title: 'Desktop', value: '33%' },
    stat_info: [
      {
        img: outlook,
        title: 'Outlook 2010',
        value: '67%',
      },
      {
        img: appleMail,
        title: 'Apple Mail',
        value: '14%',
      },
      {
        img: yahoo,
        title: 'Yahoo',
        value: '10%',
      },
      {
        img: outlook,
        title: 'Outlook 2013',
        value: '5%',
      },
      {
        img: hotmail,
        title: 'Hotmail',
        value: '3%',
      },
      {
        img: na,
        title: 'Undefined',
        value: '1%',
      },
    ],
  },
};

export const LANGUAGES_STAT = [
  { img: chinese, title: ' Chinese', value: '41.2%' },
  { img: spanish, title: ' Spanish', value: '29.5%' },
  { img: english, title: ' English', value: '17.8%' },
  { img: hindi, title: ' Hindi', value: '6.9%' },
  { img: arabian, title: ' Arab', value: '41.2%' },
  { img: netherlands, title: ' Netherlands', value: '41.2%' },
  { img: portugal, title: ' Portuguese', value: '41.2%' },
  { img: other, title: ' Other', value: '41.2%' },
];

export const SUBSCRIBERS_GEOGRAPHIC = [
  {
    code3: 'USA',
    z: 5194,
    name: 'USA',
    img: usa,
    fullName: 'United States of America',
    percentage: 28.43,
  },
  { code3: 'AUS', z: 2291, name: 'AUS', img: australia, fullName: 'Australia', percentage: 12.54 },
  { code3: 'Other', z: 1000, name: 'Other', img: other, fullName: 'Other', percentage: 19.87 },
  { code3: 'DEU', z: 1359, name: 'DEU', img: germany, fullName: 'Germany', percentage: 7.44 },
  { code3: 'CHN', z: 2731, name: 'CHN', img: chinese, fullName: 'China', percentage: 14.95 },
  { code3: 'BRA', z: 437, name: 'BRA', img: brazil, fullName: 'Brazil', percentage: 2.39 },
  { code3: 'IND', z: 2614, name: 'IND', img: hindi, fullName: 'India', percentage: 14.31 },
  { code3: 'GBR', z: 11, name: 'GBR', img: english, fullName: 'England', percentage: 0.06 },
];
