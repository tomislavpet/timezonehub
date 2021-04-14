import { useState } from 'react';

import { City } from 'src/types';

import allCities from './cities.json';

export const useCities = () => {
  const cities: City[] = allCities;

  const findCity = (text: string) =>
    cities.filter(
      (c) => c.name.toLowerCase().indexOf(text.toLowerCase()) > -1
    )[0];

  const getUserCity = () => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userCity = cities
      .filter((city) => city.timezone === userTimeZone)
      .sort((city) => (userTimeZone.indexOf(city.nameAscii) ? -1 : 1))[0];

    return userCity;
  };

  const getStoredCities = (): City[] | null => {
    const storedCitiesString = localStorage?.getItem('selectedCities');
    if (!storedCitiesString) {
      return null;
    }

    try {
      return JSON.parse(storedCitiesString);
    } catch {
      return null;
    }
  };

  const [selectedCities, setSelectedCities] = useState<City[]>(
    getStoredCities() || [
      getUserCity(),
      findCity('New York'),
      findCity('London'),
      findCity('Tokyo'),
    ]
  );

  const addSelectedCity = (city: City) => {
    const newSelectedCities = [...selectedCities, city];
    setSelectedCities(newSelectedCities);
    localStorage?.setItem('selectedCities', JSON.stringify(newSelectedCities));
  };

  const removeSelectedCity = (city: City) => {
    const newSelectedCities = selectedCities.filter(
      (c) => !(c.name === city.name && c.countryShort === city.countryShort)
    );
    setSelectedCities(newSelectedCities);
    localStorage?.setItem('selectedCities', JSON.stringify(newSelectedCities));
  };

  return { cities, selectedCities, addSelectedCity, removeSelectedCity };
};
