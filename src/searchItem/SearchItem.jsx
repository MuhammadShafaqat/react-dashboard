import React, { useState } from 'react';
import styles from './styles.module.scss'

function SearchItem() {
  const [inputValue, setInputValue] = useState('');
  const [showCross, setShowCross] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange'];

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
    console.log("Before clearing input value:", inputValue);
    setInputValue('');
    setSearchResults([]);  
    setShowCross(false);  
    console.log("After clearing input value:", inputValue);
    alert('ok!');
  };  

  const openModal = ()=>{
    
  }

  return (
    <div  className={styles.searchWrapper} >
      <textarea
        id="myInput"
        placeholder="Type something..."
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowCross(true)}
        onBlur={() => setShowCross(false)}
        className={styles.textArea}
         wrap="off"
      ></textarea>  
      <ul id="searchResults">
        {searchResults.map((result, index) => (
          <h3 key={index}>{result}</h3>
        ))}
      </ul>
      {showCross && (
  <div className={styles.crossWrapper} onClick={clearInput}>
    <span id="crossIcon">&#10006;</span>
  </div>
)}
      {!showCross && (
        <div className={styles.dotWrapper}  onClick={openModal}>
          <span className={styles.dotItems}  id="dot1"></span>
          <span className={styles.dotItems} id="dot2"></span>
          <span className={styles.dotItems} id="dot3"></span>
        </div>
      )}
    </div>
  );
}

export default SearchItem;
