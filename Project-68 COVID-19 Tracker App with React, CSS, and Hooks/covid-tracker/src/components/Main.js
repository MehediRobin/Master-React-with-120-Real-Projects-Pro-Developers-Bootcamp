import { useEffect, useState } from "react";

const appKey = process.env.REACT_APP_KEY;

function Main() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": String(appKey),
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };
  const [covData, setCovData] = useState([]);
  const covidData = async () => {
    try {
      const res = await fetch(
        `https://covid-193.p.rapidapi.com/statistics`,
        options
      );
      const data = await res.json();
      setCovData(data.response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    covidData();
  }, []);
  console.log(covData);

  return (
    <div className="main">
      {covData.map((sta, i) => (
        <div className="main-card" key={i}>
          <p>Country: {sta.country}</p>
          <p>Continent: {sta.continent}</p>
          <p> Date: {sta.day}</p>
          <p>Total Population: {sta.population}</p>
          <p> Active Case: {sta.cases.active}</p>
          <p>Recovered: {sta.cases.recovered}</p>
        </div>
      ))}
    </div>
  );
}

export default Main;
