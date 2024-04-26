import React, { useState, useEffect } from 'react';
import contacts from '../contacts.json'; // Import JSON data
import styles from './styles.module.scss';

const Contacts = () => {
  // Use state to manage contacts data
  const [contactList, setContactList] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [phoneNumberFilter, setPhoneNumberFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [zipCodeFilter, setZipCodeFilter] = useState('');

  useEffect(() => {
    // Set contacts data from imported JSON
    setContactList(contacts);
  }, []);

  function filterData(value, field) {
    const filterItem = value.trim().toLowerCase();

    if (filterItem === '') {
      setContactList(contacts);
    } else {
      const filteredData = contacts.filter((item) =>
        item[field].toString().toLowerCase().includes(filterItem)
      );
      setContactList(filteredData);
    }
  }

  return (
    <div className={styles.contact_table_container} style={{ width: '100%' }}>
      <h1>Contact List</h1>
      <div className={styles.contact__table}>
        <table style={{ width: '100%', border: '1px solid #ddd', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Register ID</th>
              <th>
                <input
                className={styles.input_wrappers}
                  value={nameFilter}
                  placeholder="Search by Name"
                  onChange={(e) => {
                    setNameFilter(e.target.value);
                    filterData(e.target.value, 'name');
                  }}
                
                />
              </th>
              <th>
                <input
                 className={styles.input_wrappers}
                  value={ageFilter}
                  placeholder="Search by Age"
                  onChange={(e) => {
                    setAgeFilter(e.target.value);
                    filterData(e.target.value, 'age');
                  }}
                />
              </th>
              <th>
                <input
                 className={styles.input_wrappers}
                  value={phoneNumberFilter}
                  placeholder="Search by Phone Number"
                  onChange={(e) => {
                    setPhoneNumberFilter(e.target.value);
                    filterData(e.target.value, 'phoneNumber');
                  }}
                />
              </th>
              <th>
                <input
                 className={styles.input_wrappers}
                  value={emailFilter}
                  placeholder="Search by Email"
                  onChange={(e) => {
                    setEmailFilter(e.target.value);
                    filterData(e.target.value, 'email');
                  }}
                />
              </th>
              <th>
                <input
                 className={styles.input_wrappers}
                  value={addressFilter}
                  placeholder="Search by Address"
                  onChange={(e) => {
                    setAddressFilter(e.target.value);
                    filterData(e.target.value, 'address');
                  }}
                />
              </th>
              <th>
                <input
                 className={styles.input_wrappers}
                  value={cityFilter}
                  placeholder="Search by City"
                  onChange={(e) => {
                    setCityFilter(e.target.value);
                    filterData(e.target.value, 'city');
                  }}
                />
              </th>
              <th>
                <input
                 className={styles.input_wrappers}
                  value={zipCodeFilter}
                  placeholder="Search by Zip Code"
                  onChange={(e) => {
                    setZipCodeFilter(e.target.value);
                    filterData(e.target.value, 'zipCode');
                  }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Map over contacts array to render each contact */}
            {contactList.map((contact) => (
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
