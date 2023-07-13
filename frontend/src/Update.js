import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Update.css"; // Import the external CSS file

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:4000/api/Update/${id}`);
        const data = response.data;
        setName(data.name);
        setAge(data.age);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const data = {
        name: name,
        age: age
      };

      const response = await axios.patch(`http://localhost:4000/api/Update/${id}`, data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    navigate('/');
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const ageHandler = (e) => {
    setAge(e.target.value);
  };

  return (
    <div className="update-container">
      <form className="update-form">
        <div className="update-form-group">
          <label htmlFor="update-name">Name</label>
          <input
            type="text"
            id="update-name"
            placeholder="Enter your name"
            value={name}
            onChange={nameHandler}
          />
        </div>
        <div className="update-form-group">
          <label htmlFor="update-age">Age</label>
          <input
            type="number"
            id="update-age"
            placeholder="Enter your age"
            value={age}
            onChange={ageHandler}
          />
        </div>
        <button type="submit" onClick={submitHandler}>Update</button>
      </form>
    </div>
  );
};

export default Update;
