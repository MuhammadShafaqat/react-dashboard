import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import jsonData from '../data.json';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function SearchItem1({ handleDataSelection, removeGraphLine }) {
  const [inputValues, setInputValues] = useState(['']);
  const [showCrosses, setShowCrosses] = useState([false]);
  const [searchResults, setSearchResults] = useState([[]]);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [graphLines, setGraphLines] = useState([true]); // State to track visibility of graph lines
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
    // Remove corresponding graph line
    setGraphLines((prevGraphLines) => prevGraphLines.filter((_, i) => i !== index));
    // Call removeGraphLine to remove the graph line associated with this textarea
    removeGraphLine(index);
  };

  const handleResultClick = (index, result) => {
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = result;
      return newValues;
    });
    setSearchResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = [];
      return newResults;
    });
    handleDataSelection((prevSelectedDataTypes) => [...prevSelectedDataTypes.slice(0, index), result]);
  };

  const addTextarea = () => {
    if (inputValues.length < 4) {
      setInputValues((prevValues) => [...prevValues, '']);
      setShowCrosses((prevShowCrosses) => [...prevShowCrosses, false]);
      setSearchResults((prevResults) => [...prevResults, []]);
      setGraphLines((prevGraphLines) => [...prevGraphLines, true]); // Add a new graph line
      textareaRefs.current.push(React.createRef());
    }
  };

  const removeTextarea = (index) => () => {
    // Check if an input has been selected in the textarea
    const isInputSelected = inputValues[index] !== '';

    // If an input has been selected, remove only the textarea and its corresponding graph line
    if (isInputSelected) {
      setInputValues((prevValues) => prevValues.filter((_, i) => i !== index));
      setShowCrosses((prevShowCrosses) => prevShowCrosses.filter((_, i) => i !== index));
      setSearchResults((prevResults) => prevResults.filter((_, i) => i !== index));
      setGraphLines((prevGraphLines) => prevGraphLines.filter((_, i) => i !== index));
      textareaRefs.current.splice(index, 1);
      // Call removeGraphLine to remove the graph line associated with this textarea
      removeGraphLine(index);
    } else {
      // If no input has been selected, remove the textarea and its corresponding graph line,
      // as well as any empty textareas that may be after it
      let i = index;
      while (i < inputValues.length && inputValues[i] === '') {
        setInputValues((prevValues) => prevValues.filter((_, idx) => idx !== i));
        setShowCrosses((prevShowCrosses) => prevShowCrosses.filter((_, idx) => idx !== i));
        setSearchResults((prevResults) => prevResults.filter((_, idx) => idx !== i));
        setGraphLines((prevGraphLines) => prevGraphLines.filter((_, idx) => idx !== i));
        textareaRefs.current.splice(i, 1);
        // Call removeGraphLine to remove the graph line associated with this textarea
        removeGraphLine(i);
        i++;
      }
    }
  };


  const editTextarea = (index) => () => {
    // Handle editing functionality
    console.log('Editing textarea', index);
  };

  const handlePopoverClick = (event, index) => {
    setPopoverAnchorEl(popoverAnchorEl === index ? null : index);
    event.stopPropagation();
  };

  return (
    <div>
      {inputValues.map((inputValue, index) => (
        <div key={index} className={styles.searchWrapper}>
          <div className={styles.relativeContainer}>
            <div style={{ position: 'relative' }}>
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
              <div className={styles.dotWrapper} onClick={(event) => handlePopoverClick(event, index)}>
                <span style={{ cursor: 'pointer', position: 'absolute', right: '8px', bottom: '6px' }}>&#x22EE;</span>
              </div>
            </div>
            {index === inputValues.length - 1 && !showCrosses[index] && (
              <div className={styles.dotWrapper} onClick={addTextarea}>
                <span className={styles.dotItems}>➕</span>
              </div>
            )}
            {showCrosses[index] && (
              <div className={styles.crossWrapper}>
                <span onClick={clearInput(index)} id={`crossIcon-${index}`}>&#10006;</span>
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
            <Popover
              open={popoverAnchorEl === index}
              anchorEl={textareaRefs.current[index]}
              onClose={() => setPopoverAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px' }}>
                <span onClick={removeTextarea(index)} style={{ cursor: 'pointer' }}>&#10006; Delete</span>
                <span onClick={editTextarea(index)} style={{ cursor: 'pointer' }}>&#9998; Edit</span>
              </div>
            </Popover>
          </div>
        </div>
      ))}
      {/* Render graph lines */}
      {graphLines.map((isVisible, index) => (
        isVisible && <div key={`graph-line-${index}`} className={styles.graphLine}>{/* Render your graph line component here */}</div>
      ))}
    </div>
  );
}

export default SearchItem1;
