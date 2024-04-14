// SearchItem1.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';

function SearchItem1() {
  const [inputValues, setInputValues] = useState(['']);
  const [showCrosses, setShowCrosses] = useState([false]);
  const [searchResults, setSearchResults] = useState([[]]);
  const textareaRefs = useRef([]);

  const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange'];

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
    const filteredFruits = fruits.filter((fruit) => fruit.toLowerCase().includes(searchTerm));
    setSearchResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = filteredFruits;
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
    setSearchResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = [];
      return newResults;
    });
    setShowCrosses((prevShowCrosses) => {
      const newShowCrosses = [...prevShowCrosses];
      newShowCrosses[index] = false;
      return newShowCrosses;
    });
    alert('ok!');
  };

  const openModal = () => {
    // Add your modal logic here
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
  };

  const addTextarea = () => {
    setInputValues((prevValues) => [...prevValues, '']);
    setShowCrosses((prevShowCrosses) => [...prevShowCrosses, false]);
    setSearchResults((prevResults) => [...prevResults, []]);
    textareaRefs.current.push(React.createRef());
  };

  return (
    <div>
      {inputValues.map((inputValue, index) => (
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
            >
              &#10006;
            </textarea>
            {showCrosses[index] && (
              <div className={styles.crossWrapper} onClick={clearInput(index)}>
                <span id={`crossIcon-${index}`}>&#10006;</span>
              </div>
            )}
            {!showCrosses[index] && (
              <div className={styles.dotWrapper} onClick={openModal}>
                <span className={styles.dotItems} id={`dot1-${index}`}></span>
                <span className={styles.dotItems} id={`dot2-${index}`}></span>
                <span className={styles.dotItems} id={`dot3-${index}`}></span>
              </div>
            )}
            <ul id={`searchResults-${index}`} className={styles.searchResults}>
              {searchResults[index].map((result, resultIndex) => (
                <li key={resultIndex} onClick={() => handleResultClick(index, result)}>{result}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <div className={styles.searchWrapper}>
        <div className={styles.relativeContainer}>
          <textarea
            placeholder="Search Trends..."
            className={styles.textArea}
            style={{ height: "50px" }} // Set a fixed height for the textarea
          ></textarea>
          <div className={styles.dotWrapper} onClick={addTextarea}>
            <span className={styles.plusIcon}>+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchItem1;
