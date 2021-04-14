import React, { useState } from 'react';
import Select from 'react-windowed-select';

import { City } from 'src/types';

interface CitySearchProps {
  cities: City[];
  onSelect: (city: City) => void;
}

type CityOption = {
  value: City;
  label: string;
};

const CitySearch = ({ cities, onSelect }: CitySearchProps) => {
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

  const cityOptions: CityOption[] = cities.map((c) => ({
    value: c,
    label: `${c.name}, ${c.countryShort}`,
  }));

  const handleSelect = () => {

    if (selectedCity && onSelect) {
      onSelect(selectedCity.value);
    }

    setSelectedCity(null);
  };

  return (
    <section
      className="search-group"
    >
      <Select
        value={selectedCity}
        onChange={setSelectedCity}
        options={cityOptions}
        className='city-search'
        classNamePrefix='city-search'
        placeholder='Search for cities, zip codes...'
        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
        onMenuOpen={() => {
          document.querySelector('body').classList.add('city-search-menu-open');
        }}
        onMenuClose={() => {
          document.querySelector('body').classList.remove('city-search-menu-open');
        }}
      />
      <button
        style={{ width: '100px', marginLeft: '20px' }}
        onClick={handleSelect}
      >
        Add City
      </button>
    </section>
  );
};

export default CitySearch;
