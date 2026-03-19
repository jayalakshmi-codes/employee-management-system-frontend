import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteEmployee, listEmployees } from '../services/employeeservice'




const ListEmployeeComponent = () => {

    const [employees, setEmployees]= useState([])

    const navigate= useNavigate();

    useEffect(() => {
       getAllEmployees();
    }, [])

    function getAllEmployees(){
     listEmployees().then((response) => {
        setEmployees (response.data);
       }).catch(error => {
          console.error(error);
       })
    }

    function addNewEmployee(){
        navigate("/add-employee");
    }

    function updateEmployee(id){
        navigate(`/update-employee/${id}`)
    }
    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then((response)=>{
           getAllEmployees();
        }).catch(error=>{
            console.error(error);
        })
    }

  return (
    <div className='container'>
        <h2>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee Name</th>
                    <th>Employee Qualification</th>
                    <th>Employee Mail</th>
                    <th>Employee Phone</th>
                    <th>Employee Salary</th>
                    <th>Action</th>
                </tr>
            </thead>

          <tbody>
            {
                employees.map(employee=>
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.qualification}</td>
                        <td>{employee.mail}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.salary}</td>
                        <td>
                            <button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}>Update</button>
                            <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)}
                            style={{marginLeft :'20px'}}
                            >Delete</button>
                        </td>
                    </tr>
                )
            }
          </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent




