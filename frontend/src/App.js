import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './design.css'; // Import the external CSS file

const App = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = 'CRUD';
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4000/api/getAll');
        const data = response.data;
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  });

  const updateHandler = (_id) => {
    navigate(`/Update/${_id}`);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const requestData = {
        name: name,
        age: age,
      };

      const response = await axios.post('http://localhost:4000/api/post', requestData);
      console.log(response.data);
      setName('');
      setAge('');
    } catch (error) {
      console.log(error);
    }
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const ageHandler = (e) => {
    setAge(e.target.value);
  };

  const deleteHandler = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/delete/${_id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form>
        <h2>Please Fill The Details</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={nameHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            placeholder="Enter your age"
            value={age}
            onChange={ageHandler}
          />
        </div>
        <button type="submit" onClick={submitHandler}>
          Submit
        </button>
      </form>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const { _id, name, age } = item;
            const rowClass = index % 2 === 0 ? 'even' : 'odd'; // Add rowClass based on index

            return (
              <tr key={index} className={rowClass}>
                <td className="name">{name}</td>
                <td className="name">{age}</td>
                <td>
                  <button onClick={() => updateHandler(_id)}>Update</button>
                </td>
                <td>
                  <button onClick={() => deleteHandler(_id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
