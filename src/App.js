import React,{useState,useEffect} from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent }  from '@material-ui/core'
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import { sortData } from './utils';
function App() {
  const [countries,setCountries] = useState([]) 
  const [countryCode,setCountryCode] = useState('worldwide')
  const [countryInfo,setCountryInfo] = useState({})
  const [casesType, setCasesType] = useState("cases");
  const [tableData,setTableData] = useState({})
  const [mapOption,setmapOption] = useState({center:{lat:34.80746, lng:-40.4796},zoom:3})
  const [mapCountries, setMapCountries] = useState([]);

  // it will be called only once
  useEffect(() => {
    (async () => {
      const url = "https://disease.sh/v3/covid-19/all";
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
    })();
  }, [])
  useEffect(() => {
     (async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // Pakistan, Australia
            value: country.countryInfo.iso3, // P ak,Aus
          }));
          const sortedData = sortData(data);
          setCountries(countries)
          setMapCountries(data);
          setTableData(sortedData)
        })
    })()    
    // fetchContries()
  }, [])

  const onCountryChange = async (event) => {
    setCountryCode(event.target.value);

    // fetching countryInfo
    const url =
      event.target.value === "worldwide"
        ? "https://disease.sh/v3/covid-19/countries/all"
        : `https://disease.sh/v3/covid-19/countries/${event.target.value}`
    await fetch(url)
      .then((response) =>response.json())
      .then((data) => {
        // console.log(data)
        setCountryInfo(data)
        // console.log(data.countryInfo.lat);
        setmapOption({center:{lat:data.countryInfo.lat,lng:data.countryInfo.long},zoom:6})
      });

  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* Header Text */}
          <h1>Covid 19 Tracking App</h1>

          {/* Countries DropDown  */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={countryCode}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.name} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* 3 InfoBoxes */}
        <div className="app__stats">
          <InfoBox
            key="1"
            isRed
            onClick={(e) => setCasesType("cases")}
            title="Corona Virus Cases"
            active={casesType === "cases"}
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            key="2"
            onClick={(e) => setCasesType("recovered")}
            active={casesType === "recovered"}
            title="Recovered Cases"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            key="3"
            isRed
            onClick={(e) => setCasesType("deaths")}
            title="Deaths Virus Cases"
            active={casesType === "deaths"}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        {/* Map */}
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapOption.center}
          zoom={mapOption.zoom}
        />
      </div>

      {/* Right Sections */}
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          {/* Graph */}
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
