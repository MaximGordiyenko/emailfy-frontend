import React from 'react';
import { useSelector } from 'react-redux';
import { StatCard } from './statCard/StatCard';
import { STAT_CARDS_DATA } from '../../../../../constants/statisticData';

export const StatCards = () => {
  const selectedOption = useSelector((state) => state.user.selectedOption);

  const getData = () => {
    let dataset;

    switch (selectedOption) {
      case 'Year':
        dataset = STAT_CARDS_DATA.map((data) => ({
          ...data,
          value: Math.floor(Math.random() * 100000),
        }));
        break;
      case 'Month':
        dataset = STAT_CARDS_DATA.map((data) => ({
          ...data,
          value: Math.floor(Math.random() * 10000),
        }));
        break;
      case 'Week':
        dataset = STAT_CARDS_DATA.map((data) => ({
          ...data,
          value: Math.floor(Math.random() * 1000),
        }));
        break;
      case 'Day':
        dataset = STAT_CARDS_DATA.map((data) => ({
          ...data,
          value: Math.floor(Math.random() * 100),
        }));
        break;
      default:
        dataset = STAT_CARDS_DATA;
    }

    return dataset;
  };

  const bigCards = [];
  const smallCards = [];

  getData().forEach((data, index) => {
    if (index < 3) {
      // Assuming the first 3 cards are big cards, you can adjust the condition accordingly
      bigCards.push(<StatCard key={index} {...data} />);
    } else {
      smallCards.push(<StatCard key={index} {...data} />);
    }
  });

  return (
    <div className="dashboard-stat-cards-box">
      <div className="small-cards-section">{smallCards}</div>
      <div className="big-cards-section">{bigCards}</div>
    </div>
  );
};
