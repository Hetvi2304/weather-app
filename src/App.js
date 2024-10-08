// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = '111eb7e67c4d6dc33642d02cc8740025'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('City not found or issue with API');
      setWeather(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    } else {
      setError('Please enter a valid city name');
    }
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-yellow-300 to-orange-300">
      <h1 className="text-5xl font-bold text-white mb-8">Weather App</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          className="p-2 w-full max-w-xs rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Weather Data */}
      {weather && (
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4">{weather.name}</h2>
          <p className="text-3xl font-semibold">{weather.main.temp}°C</p>
          <p className="capitalize text-lg">{weather.weather[0].description}</p>
          <p className="mt-4">Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
       {/* Footer */}
       <footer className="bg-gray-800 text-white py-4 w-full">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Developed by Hetvi Gohil- 202203103510210.</p>
        </div>
      </footer>
      </>
  );
};

export default App;
