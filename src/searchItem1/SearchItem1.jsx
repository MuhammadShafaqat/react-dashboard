// SearchItem1.js
import React, { useState, useEffect, useRef } from "react";
import styles from './styles.module.scss'
import jsonData from '../data.json';

function SearchItem1({ handleDataSelection }) {
  const [inputValues, setInputValues] = useState(['']);
  const [showCrosses, setShowCrosses] = useState([false]);
  const [searchResults, setSearchResults] = useState([[]]);
  const textareaRefs = useRef([]);

  useEffect(() => {
    const handleOutsideClick = (index) => (event) => {
      if (textareaRefs.current[index] && !textareaRefs.current[index].contains(event.target)) {
        setSearchResults((prevResults) => {
          const newResults = [...prevResults];
          newResults[index] = [];
          return newResults;
        });
      }
    };

    textareaRefs.current.forEach((ref, index) => {
      document.addEventListener('click', handleOutsideClick(index));
    });

    return () => {
      textareaRefs.current.forEach((ref, index) => {
        document.removeEventListener('click', handleOutsideClick(index));
      });
    };
  }, []);

  const handleInputChange = (index) => (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = event.target.value;
      return newValues;
    });

    const filteredResults = jsonData.data.map((item) => item.name).filter((name) => name.toLowerCase().includes(searchTerm));
    setSearchResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = filteredResults;
      return newResults;
    });
    setShowCrosses((prevShowCrosses) => {
      const newShowCrosses = [...prevShowCrosses];
      newShowCrosses[index] = searchTerm.length > 0;
      return newShowCrosses;
    });
    if (searchTerm === '') {
      setSearchResults((prevResults) => {
        const newResults = [...prevResults];
        newResults[index] = [];
        return newResults;
      });
    }
  };

  const clearInput = (index) => () => {
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = '';
      return newValues;
    });
    setShowCrosses((prevShowCrosses) => {
      const newShowCrosses = [...prevShowCrosses];
      newShowCrosses[index] = false;
      return newShowCrosses;
    });
  };

  const handleResultClick = (index, result) => {
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = result; // Set the input value to the clicked result
      return newValues;
    });
    setSearchResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = []; // Clear the search results
      return newResults;
    });
    handleDataSelection((prevSelectedDataTypes) => [...prevSelectedDataTypes.slice(0, index), result]);
  };

  const addTextarea = () => {
    if (inputValues.length < 4) { // Limit the number of textareas to four
      setInputValues((prevValues) => [...prevValues, '']);
      setShowCrosses((prevShowCrosses) => [...prevShowCrosses, false]);
      setSearchResults((prevResults) => [...prevResults, []]);
      textareaRefs.current.push(React.createRef());
    }
  };

  return (
    <div>
      {inputValues.map((inputValue, index) => (
        index < 4 && ( // Render only up to four textareas
          <div key={index} className={styles.searchWrapper}>
            <div className={styles.relativeContainer}>
              <textarea
                id={`myInput-${index}`}
                placeholder="Search Trends..."
                value={inputValue}
                onChange={handleInputChange(index)}
                onFocus={() => setShowCrosses((prevShowCrosses) => [...prevShowCrosses.slice(0, index), true, ...prevShowCrosses.slice(index + 1)])}
                onBlur={() => setShowCrosses((prevShowCrosses) => [...prevShowCrosses.slice(0, index), false, ...prevShowCrosses.slice(index + 1)])}
                className={styles.textArea}
                wrap="off"
                ref={(el) => (textareaRefs.current[index] = el)}
                list={`datalist-${index}`}
              />
              {showCrosses[index] && (
                <div className={styles.crossWrapper} onClick={clearInput(index)}>
                  <span id={`crossIcon-${index}`}>&#10006;</span>
                </div>
              )}
              {!showCrosses[index] && (
                <div className={styles.dotWrapper} onClick={addTextarea}>
                  <span className={styles.dotItems}>...</span>
                </div>
              )}
              <ul id={`searchResults-${index}`} className={styles.searchResults}>
                {searchResults[index].map((result, resultIndex) => (
                  <li key={resultIndex} onClick={() => handleResultClick(index, result)}>{result}</li>
                ))}
              </ul>
              <datalist id={`datalist-${index}`}>
                {searchResults[index].map((result, resultIndex) => (
                  <option key={resultIndex} value={result} />
                ))}
              </datalist>
            </div>
          </div>
        )
      ))}
    </div>
  );
}

export default SearchItem1;
