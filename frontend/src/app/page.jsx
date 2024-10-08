'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [studentsdb, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [englishgrades, setEnglishGrades] = useState('');
  const [mathsgrades, setMathsGrades] = useState('');
  const [teachercomments, setTeacherComments] = useState('');
  const [behaviour, setBehaviour] = useState('');
  const [averagegrade, setAverageGrade] = useState('');
  const [updateId, setUpdateId] = useState(null);

  const [edit, setEdit] = useState(false);

  const fetchStudents = async () => {
    const response = await axios.get('http://localhost:5000/api/studentsdb');
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const createStudent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/studentsdb', {
        name,
        age,
        englishgrades,
        mathsgrades,
        teachercomments,
        behaviour,
        averagegrade,
      });
      setStudents([...studentsdb, response.data]);
      resetForm();
    } catch (error) {
      console.error('Error creating student:', error);
      alert('Error creating student. Please contact the site administrator.');
    }
  };

  const updateStudent = async () => {
    const response = await axios.put(`http://localhost:5000/api/studentsdb/${updateId}`, {
      name,
      age,
      englishgrades,
      mathsgrades,
      teachercomments,
      behaviour,
      averagegrade,
    });
    setStudents(studentsdb.map(student => (student.id === updateId ? response.data : student)));
    resetForm();
  };

  const deleteStudent = async (id) => {
    const studentToDelete = studentsdb.find(student => student.id === id); 
    if (!studentToDelete) {
      alert('Student not found.');
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/studentsdb/${id}`);
      setStudents(studentsdb.filter(student => student.id !== id));
      alert(`${studentToDelete.name} deleted successfully`);
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Error deleting student. Please contact the site administrator.');
    }
  };
  
  const resetForm = () => {
    setName('');
    setAge('');
    setEnglishGrades('');
    setMathsGrades('');
    setTeacherComments('');
    setBehaviour('');
    setAverageGrade('');
    setUpdateId(null);
  };

  const editStudent = (student) => {
    try {
      setEdit(true);
      setName(student.name);
      setAge(student.age);
      setEnglishGrades(student.englishgrades);
      setMathsGrades(student.mathsgrades);
      setTeacherComments(student.teachercomments);
      setBehaviour(student.behaviour);
      setAverageGrade(student.averagegrade);
      setUpdateId(student.id);
    } catch (error) {
      console.error('Error editing student:', error);
      alert('An error occurred while editing the student. Please try again.');
    } finally {
      setEdit(false);
    }
  };
  

  return (
    <div className="bg-teal-700 text-center p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Asset Insight's Student Management Center 👨‍🎓</h1>
      
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-teal-400 text-white">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Age</th>
            <th className="px-4 py-3">English Grades</th>
            <th className="px-4 py-3">Maths Grades</th>
            <th className="px-4 py-3">Teacher Comments</th>
            <th className="px-4 py-3">Behaviour</th>
            <th className="px-4 py-3">Average Grade</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentsdb.map(student => (
            <tr key={student.id} className="border-b hover:bg-gray-100 transition duration-200">
              <td className="px-4 py-3 font-bold">{student.name}</td>
              <td className="px-4 py-3">{student.age}</td>
              <td className="px-4 py-3">{student.englishgrades}</td>
              <td className="px-4 py-3">{student.mathsgrades}</td>
              <td className="px-4 py-3">{student.teachercomments}</td>
              <td className="px-4 py-3">{student.behaviour}</td>
              <td className="px-4 py-3">{student.averagegrade}</td>
              <td className="px-4 py-3">
                <button onClick={() => editStudent(student)} className="text-teal-600 hover:underline">Edit</button>
                <button onClick={() => deleteStudent(student.id)} className="text-red-600 hover:underline ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-2xl text-gray-800 font-bold mt-10">
        {updateId ? `Edit a Student - ${studentsdb.find(student => student.id === updateId)?.name}` : 'Add a Student'}
      </h2>

    <div className="flex flex-wrap justify-center gap-4 mt-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
      <select
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="" disabled>Select age</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>

      <input
        type="number"
        placeholder="English Grades"
        value={englishgrades}
        onChange={(e) => setEnglishGrades(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        placeholder="Maths Grades"
        value={mathsgrades}
        onChange={(e) => setMathsGrades(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="Teacher Comments"
        value={teachercomments}
        onChange={(e) => setTeacherComments(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
      <select
  value={behaviour}
  onChange={(e) => setBehaviour(e.target.value)}
  className="p-2 border border-gray-300 rounded-md"
>
  <option value="" disabled>Attitude to learning</option>
  <option value="Good">Good</option>
  <option value="Average">Average</option>
  <option value="Bad">Bad</option>
</select>
      <input
        type="number"
        placeholder="Average Grade"
        value={averagegrade}
        onChange={(e) => setAverageGrade(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
      <button 
        onClick={updateId ? updateStudent : createStudent}
        className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200"
      >
        {updateId ? 'Update Student' : 'Create Student'}
      </button>
    </div>
  </div>
);
}