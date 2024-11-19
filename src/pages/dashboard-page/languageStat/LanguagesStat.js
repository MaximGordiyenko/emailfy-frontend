import { LANGUAGES_STAT } from '../../../constants/statisticData';
import './style.scss';

export const LanguagesStat = () => {
  return (
    <div className={'lang-stat-wrapper'}>
      <div className={'lang-title'}>Languages</div>
      {LANGUAGES_STAT.map((lang, i) => {
        return (
          <div className={'lang-name'} key={i}>
            <div className={'name-box'}>
              <img src={lang.img} alt="bla" />
              <div className={'title-text'}>{lang.title}</div>
            </div>
            <div className={'lang-value'}>{lang.value}</div>
          </div>
        );
      })}
    </div>
  );
};
