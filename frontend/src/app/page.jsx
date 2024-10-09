"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [studentsdb, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [englishgrades, setEnglishGrades] = useState("");
  const [mathsgrades, setMathsGrades] = useState("");
  const [teachercomments, setTeacherComments] = useState("");
  const [behaviour, setBehaviour] = useState("");
  const [averagegrade, setAverageGrade] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.API_URL;

  const getAverageGradeColor = (average) => {
    if (average >= 85) {
      return "text-green-500";
    } else if (average >= 70) {
      return "text-yellow-500";
    } else {
      return "text-red-500";
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/studentsdb`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Oops! There was a problem fetching the students. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchStudents();
  }, []);

  const createStudent = async () => {
    try {
        const average = ((parseFloat(englishgrades) + parseFloat(mathsgrades)) / 2).toFixed(2);
        const response = await axios.post(`${process.env.API_URL}/api/studentsdb`, {
            name,
            age,
            englishgrades,
            mathsgrades,
            teachercomments,
            behaviour,
            averagegrade: average,
        });
        setStudents([...studentsdb, response.data]);
        alert(`Welcome aboard! ${name} has been registered.`);
        resetForm();
    } catch (error) {
        console.error("Error creating student:", error);
        alert("Oops! There was a problem adding the student. Please try again later.");
    }
};

const updateStudent = async () => {
    try {
        const average = ((parseFloat(englishgrades) + parseFloat(mathsgrades)) / 2).toFixed(2);
        const response = await axios.put(`${process.env.API_URL}/api/studentsdb/${updateId}`, {
            name,
            age,
            englishgrades,
            mathsgrades,
            teachercomments,
            behaviour,
            averagegrade: average,
        });
        setStudents(studentsdb.map(student => (student.id === updateId ? response.data : student)));
        alert(`Changes saved for ${name}.`);
        resetForm();
    } catch (error) {
        console.error("Error updating student:", error);
        alert("Sorry, we could not update details. Please check your input and try again.");
    }
};

const deleteStudent = async (id) => {
    const studentToDelete = studentsdb.find(student => student.id === id);
    if (!studentToDelete) {
        alert("Student not found.");
        return;
    }
    try {
        await axios.delete(`${process.env.API_URL}/api/studentsdb/${id}`);
        setStudents(studentsdb.filter(student => student.id !== id));
        alert(`${studentToDelete.name} has been removed from the records`);
    } catch (error) {
        console.error("Error deleting student:", error);
        alert("We couldn't find the student you were trying to delete. Please refresh and try again.");
    }
};

  const resetForm = () => {
    setName("");
    setAge("");
    setEnglishGrades("");
    setMathsGrades("");
    setTeacherComments("");
    setBehaviour("");
    setAverageGrade("");
    setUpdateId(null);
    setFormSubmitted(false);
  };

  const editStudent = (student) => {
    setEdit(true);
    setName(student.name);
    setAge(student.age);
    setEnglishGrades(student.englishgrades);
    setMathsGrades(student.mathsgrades);
    setTeacherComments(student.teachercomments);
    setBehaviour(student.behaviour);
    setAverageGrade(student.averagegrade);
    setUpdateId(student.id);
  };

  const handleInvalid = (e) => {
    e.preventDefault();
    alert("Please enter only letters (A-Z, a-z) with a maximum of 15 characters.");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true); // Set form submitted state to true

    // Check if all fields are filled
    if (name && age && englishgrades && mathsgrades && teachercomments && behaviour) {
      updateId ? updateStudent() : createStudent(); // Call create or update function based on updateId
    }
  };

  return (
    <div className="bg-teal-700 text-center p-8 min-h-screen">
  <h1 className="text-4xl font-bold text-white mb-8">Asset Insights Student Management Center 👨‍🎓</h1>

  <div>
  {loading ? (
    <h1 className="text-4xl">Student data is loading. Please wait...</h1>
  ) : (
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
            <td className={`px-4 py-3 ${getAverageGradeColor(student.averagegrade)}`}>
              {student.averagegrade}
            </td>
            <td className="px-4 py-3">
              <button onClick={() => editStudent(student)} className="text-teal-600 hover:underline">
                Edit
              </button>
              <button onClick={() => deleteStudent(student.id)} className="text-red-600 hover:underline ml-2">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

  <h2 className="text-2xl text-gray-800 font-bold mt-10">
    {updateId ? `Edit a Student - ${studentsdb.find(student => student.id === updateId)?.name}` : "Add a Student"}
  </h2>

  <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-4 mt-4">

    <div className="relative">
      <input
        type="text"
        placeholder="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
        maxLength={15} 
        pattern="[A-Za-z]*"
        onInvalid={handleInvalid}
      />
      {formSubmitted && !name && (
        <p className="absolute left-0 mt-1 text-red-500 text-sm bg-white border border-red-500 p-1 rounded-md shadow-lg z-10">
          Please enter a name
        </p>
      )}
    </div>

    <div className="relative">
      <select
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="" disabled>Select age</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
      {formSubmitted && !age && (
        <p className="absolute left-0 mt-1 text-red-500 text-sm bg-white border border-red-500 p-1 rounded-md shadow-lg z-10">
          Please select an age
        </p>
      )}
    </div>

    <div className="relative">
      <input
        type="number"
        placeholder="English Grades"
        value={englishgrades}
        onChange={(e) => setEnglishGrades(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
      {formSubmitted && !englishgrades && (
        <p className="absolute left-0 mt-1 text-red-500 text-sm bg-white border border-red-500 p-1 rounded-md shadow-lg z-10">
          Please enter English grades
        </p>
      )}
    </div>

    <div className="relative">
      <input
        type="number"
        placeholder="Maths Grades"
        value={mathsgrades}
        onChange={(e) => setMathsGrades(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
      {formSubmitted && !mathsgrades && (
        <p className="absolute left-0 mt-1 text-red-500 text-sm bg-white border border-red-500 p-1 rounded-md shadow-lg z-10">
          Please enter Maths grades
        </p>
      )}
    </div>

    <div className="relative">
      <input
        type="text"
        placeholder="Teacher Comments"
        value={teachercomments}
        onChange={(e) => setTeacherComments(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
      {formSubmitted && !teachercomments && (
        <p className="absolute left-0 mt-1 text-red-500 text-sm bg-white border border-red-500 p-1 rounded-md shadow-lg z-10">
          Please enter comments
        </p>
      )}
    </div>

    <div className="relative">
      <select
        value={behaviour}
        onChange={(e) => setBehaviour(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="" disabled>Select Behaviour</option>
        <option value="Good">Good</option>
        <option value="Average">Average</option>
        <option value="Poor">Poor</option>
      </select>
      {formSubmitted && !behaviour && (
        <p className="absolute left-0 mt-1 text-red-500 text-sm bg-white border border-red-500 p-1 rounded-md shadow-lg z-10">
          Please select behaviour
        </p>
      )}
    </div>

    <button
      type="submit"
      className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
    >
      {updateId ? "Update Student" : "Add Student"}
    </button>
  </form>
</div>
  );
}
