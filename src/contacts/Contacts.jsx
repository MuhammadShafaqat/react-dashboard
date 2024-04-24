import React, { useState, useEffect } from 'react';
import contacts from '../contacts.json'; // Import JSON data
import styles from './styles.module.scss'

const Contacts = () => {
  // Use state to manage contacts data
  const [contactList, setContactList] = useState([]); 

  useEffect(() => {
    // Set contacts data from imported JSON
    setContactList(contacts);
  }, []);

  return (
    <div className={styles.contact_table_container}  >
      <h1>Contact List</h1>
      <div  className={styles.contact__table}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Register ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>City</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over contacts array to render each contact */}
            {contactList.map(contact => 
            
            (
              
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.registerId}</td>
                <td>{contact.name}</td>
                <td>{contact.age}</td>
                <td>{contact.phoneNumber}</td>
                <td>{contact.email}</td>
                <td>{contact.address}</td>
                <td>{contact.city}</td>
                <td>{contact.zipCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;
