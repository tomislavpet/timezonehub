import React from 'react';
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
  const cityOptions: CityOption[] = cities.map((c) => ({
    value: c,
    label: `${c.name}, ${c.countryShort}`,
  }));

  const handleSelect = (selectedValue: CityOption) => {
    if (selectedValue?.value) {
      onSelect(selectedValue.value);
    }
  };

  return (
    <section className="search-group">
      <Select
        onChange={handleSelect}
        options={cityOptions}
        className="city-search"
        classNamePrefix="city-search"
        placeholder="Search for a city..."
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        onMenuOpen={() => {
          document
            .querySelector('body')
            ?.classList.add('city-search-menu-open');
        }}
        onMenuClose={() => {
          document
            .querySelector('body')
            ?.classList.remove('city-search-menu-open');
        }}
      />
    </section>
  );
};

export default CitySearch;
