import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import jsonData from "../data.json";

function Home() {
  const [state, setState] = useState({
    lineChartOptions: {
      colors: [], // Empty array for dynamic colors
      chart: {
        id: "line-chart",
      },
      xaxis: {
        categories: [],
        tickPlacement: "on",
      },
    },
    barChartOptions: {
      colors: [], // Empty array for dynamic colors
      chart: {
        id: "bar-chart",
      },
      xaxis: {
        categories: [],
        tickPlacement: "on",
      },
    },
    series: [],
  });

  useEffect(() => {
    // Generate a color palette
    const palette = ['#E91E63', '#FF9800', '#2196F3'];

    // Update lineChartOptions and barChartOptions with the generated palette
    setState((prevState) => ({
      ...prevState,
      lineChartOptions: {
        ...prevState.lineChartOptions,
        colors: palette,
        xaxis: {
          categories: jsonData.years,
        },
      },
      barChartOptions: {
        ...prevState.barChartOptions,
        colors: palette,
        xaxis: {
          categories: jsonData.years,
        },
      },
      series: jsonData.countries.map((country, index) => ({
        name: country.name,
        data: country.values,
        color: palette[index % palette.length], // Assign colors from the palette, looping if necessary
      })),
    }));
  }, []);

  const handleRangeChange = (event) => {
    const range = parseInt(event.target.value);
    setState((prevState) => ({
      ...prevState,
      lineChartOptions: {
        ...prevState.lineChartOptions,
        xaxis: {
          categories: jsonData.years.slice(0, range),
        },
      },
      barChartOptions: {
        ...prevState.barChartOptions,
        xaxis: {
          categories: jsonData.years.slice(0, range),
        },
      },
      series: jsonData.countries.map((country, index) => ({
        name: country.name,
        data: country.values.slice(0, range),
        color: state.lineChartOptions.colors[index % state.lineChartOptions.colors.length], // Use the same color for consistency
      })),
    }));
  };

  return (
    <div className="App">
      <h1>
        Charts <i className="fas fa-user"></i>{" "}
      </h1>
      <div className="row" style={{ display: "flex" }}>
        <div className="col-4" style={{ marginRight: "7rem" }}>
          <label htmlFor="timeRange">Time Range:</label>
          <input
            type="range"
            id="timeRange"
            min="1"
            max="25" // Max years range from 2000 to 2024
            defaultValue="25"
            onChange={handleRangeChange}
          />
          <Chart
            options={state.barChartOptions}
            series={state.series}
            type="bar"
            width="550"
          />
        </div>
        <div className="col-4">
          <Chart
            options={state.lineChartOptions}
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
