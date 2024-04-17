import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchItem1 from "./searchItem1/SearchItem1";
import Home from "./home/Home";

const App = () => {
  const [selectedDataType, setSelectedDataType] = useState("adult");

  return (
    <div>  
      <SearchItem1 handleDataSelection={setSelectedDataType} />
      <Home selectedDataType={selectedDataType} />
    </div>
  );
};

export default App;
