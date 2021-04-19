import { formatToTimeZone } from 'date-fns-timezone';

import { City } from 'src/types';
import { generate24Hours, isDaytime } from 'src/utils/time';

import handle from 'src/images/icons/icon-handle.svg';
import day from 'src/images/icons/icon-day.svg';
import night from 'src/images/icons/icon-moon.svg';

interface CityCardProps {
  city: City;
  currentTime: Date;
  onRemove: (city: City) => void;
  onPin: (city: City) => void;
}

const CityCard = ({ city, currentTime, onRemove, onPin }: CityCardProps) => {
  const handlePin = () => {
    onPin(city);
  };

  return (
    <div className="city">
      <div className="city__handle">
        <img src={handle} alt="" />
      </div>
      <div className="city__name">{city.name}</div>
      <div className="city__current-time">
        <div className="city__current">
          {formatToTimeZone(currentTime, 'h:mm:ss', {
            timeZone: city.timezone,
          })}
          <span>
            {formatToTimeZone(currentTime, 'a', { timeZone: city.timezone })}
          </span>
        </div>
      </div>
      <div className="city__controls">
        <div
          onClick={handlePin}
          className={`city__pin ${city.isPinned ? 'is-active' : ''}`}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 4.5l-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4L20 9.5"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="city__remove" onClick={() => onRemove(city)}>
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="city__time-list">
        {generate24Hours(currentTime).map((hour, index) => {
          const daytime = isDaytime(hour, city);
          return (
            <div
              className="city__time"
              key={index}
              style={{
                backgroundColor: daytime ? undefined : '#F7FAFD',
              }}
            >
              <div className="city__tod">
                {daytime ? (
                  <img src={day} alt="" />
                ) : (
                  <img src={night} alt="" />
                )}
                <span>
                  {formatToTimeZone(hour, 'h', { timeZone: city.timezone })}
                </span>
                <span>
                  {formatToTimeZone(hour, 'a', { timeZone: city.timezone })}
                </span>
              </div>

              <div className="city__day">
                {formatToTimeZone(hour, 'ddd', { timeZone: city.timezone })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CityCard;
