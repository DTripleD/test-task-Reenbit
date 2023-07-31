import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cityName, setCityName] = useState("");
  const [city, setCity] = useState("");
  useEffect(() => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
        city || "kyiv"
      }/today?unitGroup=metric&include=days&key=54QNJPLCDHSMZMYJ75EUK7772&contentType=json`
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, [city]);

  return (
    <>
      <h1>Weather Forecast</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCity(cityName);
        }}
      >
        <input
          type="text"
          placeholder="Search your trip"
          onChange={(e) => setCityName(e.target.value)}
        />
        <button type="submit">Click</button>
      </form>
      <div>
        <img src="" alt="" />
        <h2></h2>
        <p></p>
      </div>
    </>
  );
}

export default App;
