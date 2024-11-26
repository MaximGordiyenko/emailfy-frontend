import InputComponent from '../../inputs/InputComponent';
import { useEffect, useRef, useState } from 'react';
import { CountryDropdown } from '../../drop-down/CountryDropdown';
import aiInfoImage from '../../../assets/images/aiInfo.svg';
import closeCircle from '../../../assets/images/closeCircle.svg';
import * as companyInfoAPI from '../../../api/settings/company_info';
import { getToken } from '../../../api/API';

export const CompanyInformationTab = ({ onSave, setOnSave }) => {
  const [showBanner, setShowBanner] = useState(true);
  const parentRef = useRef(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!onSave) return;
    (async () => {
      const access_token = getToken('accessToken');
      await companyInfoAPI.set_company_info(access_token, {
        name,
        description,
        target_audience: targetAudience,
        country,
        city,
        postal_code: postalCode,
        address,
      });
      setOnSave(false);
    })();
  }, [onSave]);

  const closeBanner = () => {
    setShowBanner(false);
  };

  useEffect(() => {
    const modalElements = parentRef.current.getElementsByClassName('styles_dropdown_items_wrapper');
    if (modalElements.length > 0) {
      parentRef.current.style.height = '600px';
      parentRef.current.style.alignItems = 'flex-start';
    }

    (async () => {
      const access_token = getToken('accessToken');
      const companyInfo = (await companyInfoAPI.get_company_info(access_token)).data;
      if (companyInfo) {
        setName(companyInfo.name || '');
        setDescription(companyInfo.description || '');
        setTargetAudience(companyInfo.target_audience || '');
        setCountry(companyInfo.country || '');
        setCity(companyInfo.city || '');
        setPostalCode(companyInfo.postal_code || '');
        setAddress(companyInfo.address || '');
      }
    })();
  }, []);

  return (
    <div className="company-info">
      {showBanner && (
        <div className="banner">
          <div className="banner-image">
            <img src={aiInfoImage} alt="" />
          </div>
          <div className="banner-content">
            <span className="banner-title">
              {'Following information will be utilized by AI\n' +
                'for enhanced content generation and precise segmentation'}
            </span>
            <span className="banner-description">
              {'Please take your time to provide the most comprehensive and accurate\n' +
                'information available, ensuring you get the most out of Emailfy AI'}
            </span>
          </div>
          <div className="banner-close" onClick={closeBanner}>
            <img src={closeCircle} alt="" />
          </div>
        </div>
      )}
      <div className={'company-name'}>
        <div className={'name-title'}>
          <h1>Company name</h1>
          <p>Legal company name, and, optionally, any alternatives, divided by comma.</p>
        </div>
        <InputComponent
          placeholder={'Emailfy'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={'company-des'}>
        <div className={'name-title'}>
          <h1>Company description</h1>
          <p>
            {'What is your business about? Please provide information about your products, ' +
              'goals, bio, and any additional details you consider valuable.'}
          </p>
        </div>
        <div className="input-container">
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} />
        </div>
      </div>
      <div className={'target-audience-des'}>
        <div className={'name-title'}>
          <h1>Description of the target audience</h1>
          <p>
            {'Who is your desired clientele? What are their age, location, height, and pronouns? ' +
              'Feel free to provide user portraits if you have any.'}
          </p>
        </div>
        <div className="input-container">
          <textarea onChange={(e) => setTargetAudience(e.target.value)} value={targetAudience} />
        </div>
      </div>
      <div className={'company-address'} ref={parentRef}>
        <div className={'name-title'}>
          <h1>Company address</h1>
          <p>
            {'May be necessary to comply with laws on the protection of personal data and ' +
              'consumer rights and ensuring the legality of the mailing'}
          </p>
        </div>
        <div className={'dropdowns'}>
          <CountryDropdown />
          <InputComponent
            placeholder={'City'}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <InputComponent
            placeholder={'Postal code'}
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <InputComponent
            placeholder={'Address'}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
