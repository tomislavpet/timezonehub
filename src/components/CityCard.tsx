import { formatToTimeZone } from 'date-fns-timezone';

import { City } from 'src/types';
import { generate24Hours, isDaytime } from 'src/utils/time';

interface CityCardProps {
  city: City;
  currentTime: Date;
  onRemove: (city: City) => void;
}

const CityCard = ({ city, currentTime, onRemove }: CityCardProps) => {
  return (
    <div
      style={{
        width: '150px',
        height: '700px',
        paddingTop: '20px',
        border: 'solid 1px lightgray',
      }}
    >
      <div style={{ textAlign: 'center', fontWeight: 700 }}>
        {city.name}
        <span
          style={{ marginLeft: '10px', cursor: 'pointer' }}
          onClick={() => onRemove(city)}
        >
          ✖️
        </span>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px', fontWeight: 500, color: 'gray' }}>
        {formatToTimeZone(currentTime, 'h:mm:ssa ddd', { timeZone: city.timezone })}
      </div>
      <div style={{ height: '20px' }} />

      {generate24Hours(currentTime).map((hour, index) => {
        const daytime = isDaytime(hour, city);
        return (
          <div
            key={index}
            style={{
              textAlign: 'left',
              paddingLeft: '15px',
              backgroundColor: daytime ? undefined : '#eee',
            }}
          >
            {daytime ? '☀️' : '🌛'}
            {formatToTimeZone(hour, 'ha ddd', { timeZone: city.timezone })}
          </div>
        );
      })}
    </div>
  );
};

export default CityCard;
