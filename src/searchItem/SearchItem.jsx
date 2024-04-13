import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';

function SearchItem() {
  const [inputValue, setInputValue] = useState('');
  const [showCross, setShowCross] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange'];
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (textareaRef.current && !textareaRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setInputValue(event.target.value);
    const filteredFruits = fruits.filter(fruit => fruit.toLowerCase().includes(searchTerm));
    setSearchResults(filteredFruits);
    setShowCross(searchTerm.length > 0);
    if (searchTerm === '') {
      setSearchResults([]);
    }
  };

  const clearInput = () => {
    setInputValue('');
    setSearchResults([]);
    setShowCross(false);
    alert('ok!');
  };

  const openModal = () => {
    // Add your modal logic here
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.relativeContainer}>
        <textarea
          id="myInput"
          placeholder="Type something..."
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowCross(true)}
          onBlur={() => setShowCross(false)}
          className={styles.textArea}
          wrap="off"
          ref={textareaRef}
        ></textarea>
        {showCross && (
          <div className={styles.crossWrapper} onClick={clearInput}>
            <span id="crossIcon">&#10006;</span>
          </div>
        )}
        {!showCross && (
          <div className={styles.dotWrapper} onClick={openModal}>
            <span className={styles.dotItems} id="dot1"></span>
            <span className={styles.dotItems} id="dot2"></span>
            <span className={styles.dotItems} id="dot3"></span>
          </div>
        )}
      </div>
      <ul id="searchResults" className={styles.searchResults}>
        {searchResults.map((result, index) => (
          <h3 key={index}>{result}</h3>
        ))}
      </ul>
    </div>
  );
}

export default SearchItem;
