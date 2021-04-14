import { addHours } from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';
import { getSunrise, getSunset } from 'sunrise-sunset-js';

import { City } from 'src/types';

export const generate24Hours = (startDateTime: Date): Date[] => {
  const result = [];

  for (let i = 0; i < 24; i++) {
    const hour = addHours(startDateTime, i);
    hour.setMinutes(0);
    hour.setSeconds(0);
    hour.setMilliseconds(0);
    result.push(hour);
  }

  return result;
};

export const isDaytime = (dateTime: Date, city: City) => {
  let sunrise = getSunrise(city.lat, city.lng, dateTime);
  let sunset = getSunset(city.lat, city.lng, dateTime);

  const isDaytime =
    formatToTimeZone(dateTime, 'HHmm', { timeZone: city.timezone }) >=
      formatToTimeZone(sunrise, 'HHmm', { timeZone: city.timezone }) &&
    formatToTimeZone(dateTime, 'HHmm', { timeZone: city.timezone }) <
      formatToTimeZone(sunset, 'HHmm', { timeZone: city.timezone });

  return isDaytime;
};
