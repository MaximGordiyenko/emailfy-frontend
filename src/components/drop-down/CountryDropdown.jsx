import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { CaretDownIcon } from './assets/caret-down';
import search from '../../assets/images/Minimalistic Magnifer.svg';
import { LoadingSpinner } from '../loader/LoadingSpinner';

export const CountryDropdown = (props) => {
  const [countries, setCountries] = useState([]);
  const [countriesCopy, setCountriesCopy] = useState([]);
  const [open, setOpen] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState({});
  const [loading, setLoading] = useState(true);

  const dropdownRef = useRef(null);

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching countries
    preFetchCountries()
      .then((res) => {
        setCountries(res);
        setCountriesCopy(res);
      })
      .catch((error) => {
        console.log(error, 'fetch countries error');
      })
      .finally(() => {
        setLoading(false); // Set loading to false when countries are loaded
      });

    document.addEventListener('mousedown', handleClickOutSide);

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      defaultCountrySetter(props.countryCode ? props.countryCode : 'US');
    }
  }, [loading]);

  const defaultCountrySetter = (d) => {
    if (loading) {
      return;
    }
    const defaultC = countries.filter(
      (country) => country.alpha2Code.toLowerCase() === d.toLowerCase(),
    );
    setDefaultCountry(defaultC[0]);
  };

  const preFetchCountries = async () => {
    const data = await fetch('https://restcountries.com/v2/all');
    const result = await data.json();
    return result;
  };

  const handleClickOutSide = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const toggleDropDown = () => {
    if (!open) {
      setCountries(countriesCopy);
    }
    setOpen(!open);
  };

  const handleCountryClick = (country) => {
    const result = {
      name: country?.name,
      code: country?.alpha2Code,
      capital: country?.capital,
      region: country?.region,
      latlng: country?.latlng,
    };
    setDefaultCountry(country);

    if (props.onSelect) {
      props.onSelect(result);
    }

    /* Hide the dropdown menu on selecting a country */
    toggleDropDown();
  };

  const handleSearchInput = (e) => {
    const input = e.target.value.toLowerCase();
    let filteredCountries = countriesCopy.filter((i) =>
      i.name.toLowerCase().includes(input.toLowerCase()),
    );
    setCountries(filteredCountries);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={styles.dropdown} onClick={toggleDropDown}>
            <div style={{ alignItems: 'center', display: 'flex' }}>
              <img
                className={styles.country_flag}
                src={defaultCountry?.flag}
                alt={defaultCountry?.name}
              />
              <span className={styles.selected_country}>{defaultCountry?.name}</span>
            </div>
            <CaretDownIcon point={open ? 'up' : 'down'} />
          </div>

          {open && (
            <div className={styles.dropdown_items_wrapper}>
              <CaretDownIcon point="up_white" />
              <div className={styles.input_wrapper}>
                <img src={search} className={styles.search_icon} alt="bla" />
                <input
                  onChange={(e) => handleSearchInput(e)}
                  className={styles.country_search}
                  type="text"
                  placeholder="search coutries..."
                />
              </div>

              <div className={styles.dropdown_items}>
                {countries.map((i, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleCountryClick(i)}
                      className={styles.dropdown_item}>
                      <img className={styles.country_flag} src={i.flag} alt="" />
                      <span className={styles.dropdown_item_title}> {i.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
