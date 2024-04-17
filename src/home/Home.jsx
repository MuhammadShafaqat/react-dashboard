import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import jsonData from "../data.json";

function Home({ selectedDataType }) {
  const [state, setState] = useState({
    chartOptions: {
      colors: [],
      xaxis: { categories: jsonData.years },
    },
    series: [],
  });

  useEffect(() => {
    const palette = ['#E91E63', '#FF9800', '#2196F3'];
    const data = jsonData.data[selectedDataType];

    setState((prevState) => ({
      ...prevState,
      chartOptions: {
        ...prevState.chartOptions,
        colors: palette,
      },
      series: data.map((country, index) => ({
        name: country.name,
        data: country.values,
        color: palette[index % palette.length],
      })),
    }));
  }, [selectedDataType]);

  const handleRangeChange = (event) => {
    const range = parseInt(event.target.value);
    setState((prevState) => ({
      ...prevState,
      chartOptions: {
        ...prevState.chartOptions,
        xaxis: { categories: jsonData.years.slice(0, range) },
      },
      series: jsonData.data[selectedDataType].map((country, index) => ({
        name: country.name,
        data: country.values.slice(0, range),
        color: prevState.chartOptions.colors[index % prevState.chartOptions.colors.length],
      })),
    }));
  };

  return (
    <div className="App">
      <h1>Charts <i className="fas fa-user"></i></h1>
      <h3>Data Type: {selectedDataType}</h3>
      <div className="row" style={{ display: "flex" }}>
        <div className="col-4" style={{ marginRight: "7rem" }}>
          <label htmlFor="timeRange">Time Range:</label>
          <input
            type="range"
            id="timeRange"
            min="1"
            max="25"
            defaultValue="25"
            onChange={handleRangeChange}
          />
          <Chart
            options={state.chartOptions}
            series={state.series}
            type="bar"
            width="550"
          />
        </div>
        <div className="col-4">
          <Chart
            options={state.chartOptions}
            series={state.series}
            type="line"
            width="550"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
