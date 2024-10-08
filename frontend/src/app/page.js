'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [surname, setSurname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [updateId, setUpdateId] = useState(null); // Added state for updating users

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/users');
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    const response = await axios.post('http://localhost:5000/api/users', {
      surname,
      firstname,
      id,
      title,
      salary,
      department,
    });
    setUsers([...users, response.data]);
    resetForm();
  };

  const updateUser = async () => {
    const response = await axios.put(`http://localhost:5000/api/users/${updateId}`, {
      surname,
      firstname,
      id,
      title,
      salary,
      department,
    });
    setUsers(users.map(user => (user.id === updateId ? response.data : user)));
    resetForm();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    setUsers(users.filter(user => user.id !== id));
  };

  const resetForm = () => {
    setSurname('');
    setFirstname('');
    setId('');
    setTitle('');
    setSalary('');
    setDepartment('');
    setUpdateId(null);
  };

  const editUser = (user) => {
    setSurname(user.surname);
    setFirstname(user.firstname);
    setId(user.id);
    setTitle(user.title);
    setSalary(user.salary);
    setDepartment(user.department);
    setUpdateId(user.id);
  };

  return (
    <div>
      <h1>User Management</h1>
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Firstname"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <button onClick={updateId ? updateUser : createUser}>
        {updateId ? 'Update User' : 'Create User'}
      </button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.surname} {user.firstname} ({user.title}, {user.salary}, {user.department})
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
