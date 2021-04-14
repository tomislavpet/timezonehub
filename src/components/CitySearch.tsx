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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '40px',
        margin: 'auto',
      }}
    >
      <div style={{ width: '300px' }}>
        <Select
          value={selectedCity}
          onChange={setSelectedCity}
          options={cityOptions}
        />
      </div>
      <button
        style={{ width: '100px', marginLeft: '20px' }}
        onClick={handleSelect}
      >
        Add City
      </button>
    </div>
  );
};

export default CitySearch;
