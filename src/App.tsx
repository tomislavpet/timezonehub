import React, { useEffect, useState } from 'react';

import { useCities } from 'src/hooks/use-cities';
import { CityCard, CitySearch } from 'src/components';

const App = () => {
  const {
    cities,
    selectedCities,
    addSelectedCity,
    removeSelectedCity,
  } = useCities();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '40px' }}>
      <img src="/images/logo.png" alt="logo" style={{ margin: 'auto' }} />
      <CitySearch cities={cities} onSelect={addSelectedCity} />
      <div style={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>
        {selectedCities.map((city, index) => (
          <CityCard
            key={index}
            city={city}
            currentTime={currentTime}
            onRemove={removeSelectedCity}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
