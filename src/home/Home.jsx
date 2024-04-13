import React, { useState } from "react";
import Chart from "react-apexcharts";

// Function to generate x-axis categories based on the number of years
const generateCategories = (years) => {
  const currentYear = new Date().getFullYear();
  const categories = [];
  for (let i = 2000; i <= currentYear; i++) {
    categories.push(i);
  }
  return categories;
};

// Function to generate random data for the given length
const generateRandomData = (length) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 100));
};

function Home() {
  const [state, setState] = useState({
    options: {
      colors: ["#E91E63", "#FF9800"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: generateCategories(20), // Initial range of 20 years
        tickPlacement: "on", // Keep the ticks (labels) fixed
      },
    },
    series: [
      {
        name: "People Born",
        data: generateRandomData(20),
      },
      {
        name: "People Died",
        data: generateRandomData(20),
      },
    ],
  });
  

  // Function to handle range change
  const handleRangeChange = (event) => {
    const range = parseInt(event.target.value);
    setState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        xaxis: {
          categories: generateCategories(range),
        },
      },
      series: [
        {
          ...prevState.series[0],
          data: generateRandomData(range),
        },
        {
          ...prevState.series[1],
          data: generateRandomData(range),
        },
      ],
    }));
  };

  return (
    <div className="App">
      <h1>
        Charts <i className="fas fa-user"></i>{" "}
      </h1>
      <div className="row" style={{ display: "flex" }}>
        <div className="col-4">
          <label htmlFor="timeRange">Time Range:</label>
          <input
            type="range"
            id="timeRange"
            min="1"
            max="50"
            defaultValue="20"
            onChange={handleRangeChange}
          />
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="550"
          />
        </div>
        <div className="col-4">
          <Chart
            options={state.options}
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

