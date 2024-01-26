import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { useEffect } from 'react';

function App() {

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', position: '', salary: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get('http://localhost:3001/api/employees');
    setEmployees(response.data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit= async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/api/employees', formData);
    fetchEmployees();
    setFormData({ name: '', position: '', salary: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/api/employees/${id}`);
    fetchEmployees();
  };

  return (
    <>
      <div className='flex justify-center'>
        <div className='p-10'>
          <h1 className='text-red-600 text-2xl'>
            CRUD Nodejs React Mysql
          </h1>
          <div className='bg-red-600 w-5 h-1 rounded-full'></div>
        </div>
      </div>
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit}>
          <div className='flex gap-5'>
            <input 
            type="text" 
            name="name" 
            placeholder='Name' 
            value={formData.name} 
            onChange={handleInputChange} 
            className='border border-red-600 rounded-md pl-2 text-zinc-600'
            required/>
            <input 
            type="text" 
            name="position" 
            placeholder='Position' 
            value={formData.position} 
            onChange={handleInputChange} 
            className='border border-red-600 rounded-md pl-2 text-zinc-600'
            required/>
            <input 
            type='number' 
            name='salary' 
            placeholder='Salary' 
            value={formData.salary} 
            onChange={handleInputChange} 
            className='border border-red-600 rounded-md pl-2 text-zinc-600'
            required/>
          </div>
          <div className='pt-5'>
          <button type='submit' className='bg-red-600 text-white px-5 rounded-full shadow-md'>Add Employee</button>
          </div>
        </form>
      </div>
      <div className='flex justify-center p-5'>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id} className='flex gap-2'>
              <span className='text-zinc-600'>
                <span className='text-red-600'>{employee.name}</span> - <span className='text-red-600'>{employee.position}</span> - <span className='text-red-600'>{employee.salary}</span>
              </span>
              <button onClick={() => handleDelete(employee.id)} className='bg-red-600 text-white px-5 rounded-full shadow-md'>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
