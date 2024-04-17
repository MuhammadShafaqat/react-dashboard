// App.js
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchItem1 from "./searchItem1/SearchItem1";
import Home from "./home/Home";

const App = () => {
  const [selectedDataTypes, setSelectedDataTypes] = useState(["adult"]);

  return (
    <div>  
      <SearchItem1 handleDataSelection={setSelectedDataTypes} />
      <Home selectedDataTypes={selectedDataTypes} />
    </div>
  );
};

export default App;
