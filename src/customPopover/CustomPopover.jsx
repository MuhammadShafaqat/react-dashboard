// App.js
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchItem1 from "../searchItem1/SearchItem1";
import Home from "../home/Home";

const CustomPopover = () => {
  const [selectedDataTypes, setSelectedDataTypes] = useState(["adult"]);

  // Function to remove the graph line associated with the given index
  const removeGraphLine = (index) => {
    setSelectedDataTypes((prevSelectedDataTypes) => {
      return prevSelectedDataTypes.filter((_, i) => i !== index);
    });
  };

  return (
    <div>  
      <SearchItem1 handleDataSelection={setSelectedDataTypes} removeGraphLine={removeGraphLine} />
      <Home selectedDataTypes={selectedDataTypes} />
    </div>
  );
};

export default CustomPopover;
