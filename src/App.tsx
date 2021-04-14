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
    <main className="wrapper">
      <div className="logo">
        <img src="/images/timezonehub-logo.png" alt="Timezonehub" />
      </div>
      <CitySearch cities={cities} onSelect={addSelectedCity} />
      <section className="cities-group">
        <div className="cities">
          {selectedCities.map((city, index) => (
            <CityCard
              key={index}
              city={city}
              currentTime={currentTime}
              onRemove={removeSelectedCity}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default App;
