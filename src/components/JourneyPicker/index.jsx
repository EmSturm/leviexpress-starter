import React, { useEffect, useState } from 'react';
import './style.css';

const CityOptions = ({ cities }) => {
  return cities.map(city => <option key={city.code} value={city.code}>{city.name}</option>);
}

const DateOptions = ({ dates }) => {
  return dates.map(date => <option key={date.dateBasic} value={date.dateBasic}>{date.dateCs}</option>) 
}

export const JourneyPicker = ({ onJourneyChange }) =>  {

  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [date, setDate] = useState('')
  const [cities, setCities] = useState([])
  const [dates, setDates] = useState([ 
    {
    "dateBasic": "28.05.2021",
    "dateCs": "pá 28. květen 2021"
  },
  {
    "dateBasic": "29.05.2021",
    "dateCs": "so 29. květen 2021"
  }])

  

  useEffect(() => {
    const fetchCities = async () => {
      const resp = await fetch("https://apps.kodim.cz/daweb/leviexpress/api/cities")
      if (!resp.ok) {
        alert("Něco je špatně, nepodařilo se načíst seznam měst. Dejte si kafe a pak to zkuste znova.")
        return
      }
      const data = await resp.json()
      setCities(data.results)  
    }

    const fetchDates = async () => {
      const resp = await fetch("https://apps.kodim.cz/daweb/leviexpress/api/dates")
      if (!resp.ok) {
        alert("Něco je špatně, nepodařilo se načíst seznam měst. Dejte si kafe a pak to zkuste znova.")
        return
      }
      const data = await resp.json()
      setDates(data.results)  
    }
    
    fetchCities()
    fetchDates()
  }, [])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(`Uživatel si chce objjednat jízdenz z ${fromCity} do ${toCity} dne ${date}`)
   
    }

return (


  <div className="journey-picker container">
    <h2 className="journey-picker__head">Kam chcete jet?</h2>
    <div className="journey-picker__body">
      <form onSubmit={handleSubmit} className="journey-picker__form">
        <label>
          <div className="journey-picker__label">Odkud:</div>
          <select onChange={(e) => setFromCity(e.target.value)} value={fromCity} >
            <option value="">Vyberte</option>
            <CityOptions cities={cities} />
          </select>
        </label>
        <label>
          <div className="journey-picker__label">Kam:</div>
          <select onChange={(e) => setToCity(e.target.value)} value={toCity}>
            <option value="">Vyberte</option>
            <CityOptions cities={cities} />
          </select>
        </label>
        <label>
          <div className="journey-picker__label">Datum:</div>
          <select onChange={(e) => setDate(e.target.value)} value={date}>
            <option value="">Vyberte</option>
            <DateOptions dates={dates} />
          </select>
        </label>
        <div className="journey-picker__controls">
          <button 
            className="btn" 
            type="submit"
          > 
            Vyhledat spoj
          </button>
        </div>
      </form>
      <img className="journey-picker__map" src="/map.svg" />
    </div>
  </div>
);
}