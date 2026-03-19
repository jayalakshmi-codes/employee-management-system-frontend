import React, {useEffect, useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { createEmployee, getEmployee, updateEmployee } from '../services/employeeservice';


const EmployeeComponent = () => {

    const [name,setName]= useState("");
    const [qualification,setQualification]= useState("");
    const [mail,setMail]= useState("");
    const [phone,setPhone]= useState("");
    const [salary,setSalary]= useState("");

    const { id }=useParams();

    const [errors,setErrors]=useState({
        name:'',
        qualification:'',
        mail:'',
        phone:'',
        salary:''
    })

    const navigate = useNavigate();

    useEffect(()=> {

        if(id){
        getEmployee(id).then((response)=>{
            setName(response.data.name);
            setQualification(response.data.qualification);
            setMail(response.data.mail);
            setPhone(response.data.phone);
            setSalary(response.data.salary);
        }).catch(error => {
            console.error(error);
        })
     }
}, [id])

{/* we can write both way to define below function with same meaning*/}

    {/*instead of this type single line arrow function for below handleName as  const handlename=(e) => setName(e.target.value)  but
         this is same meaning directly  write in onchange event as onChange={(e) => setName(e.target.value)}   */}
    function handleName(e){
        setName(e.target.value);
    }
    const handleQualification=(e)=> setQualification(e.target.value);

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){
         const employee = {name,qualification,mail,phone,salary};
         console.log(employee);

         if(id){
            updateEmployee(id, employee).then((response)=>{
                console.log(response.data);
                navigate('/employees');
            }).catch(error =>{
                console.error(error);
            })
         }else{
            createEmployee(employee).then((response)=>{
               console.log(response.data);
               navigate('/employees')
            } ).catch(error =>{
                console.error(error);
            })
         }

        }

    }

   function validateForm(){
     let valid=true;

     const errorsCopy={...errors}

     if(name.trim()){
        errorsCopy.name='';
     }else{
        errorsCopy.name = 'Name is required';
        valid=false;
     }

     if(qualification.trim()){
        errorsCopy.qualification='';
     }else{
        errorsCopy.qualification='Qualification is required';
        valid=false;
     }

     if(mail.trim()){
        errorsCopy.mail='';
     }else{
        errorsCopy.mail='E-mail must be given';
        valid=false;
     }

     if(phone.trim()){
        errorsCopy.phone='';
     }else{
        errorsCopy.phone='phone number cannot be blank';
        valid=false;
     }

     if(salary.trim()){
        errorsCopy.salary='';
     }else{
        errorsCopy.salary='Please fix the Salary of Employee';
        valid=false;
     }

     setErrors(errorsCopy);
        return valid;

   }

   function pageTitle(){
    if(id) {
         return <h2 className='text-center'>Update Employee</h2>
   }
   else {
    return <h2 className='text-center'>Add Employee</h2>
   }
   }
  return (
    <div>
        <div className='container'>
            <br /> <br />
            <div className='row'>
              <div className='card col-md-6 offset-med-3 offset-md-3'>
                {
                    pageTitle()
                }
                 <div className='card-body'>
                <form>

                    <div className='form-group mb-2'>
                        <label className="form-label">Name:</label>
                        <input
                        type='text'
                        placeholder='Enter Employee Name'
                        name='name'
                        value={name}
                        className={`form-control ${errors.name? 'is-invalid': ''}`}
                        onChange={handleName}
                        >
                        </input>
                        {errors.name && <div className='invalid-feedback'> {errors.name} </div>}
                    </div>

                    <div className='form-group mb-2'>
                        <label className="form-label">Qualification:</label>
                        <input
                        type='text'
                        placeholder='Enter Employee Qualification'
                        name='qualification'
                        value={qualification}
                        className={`form-control ${errors.qualification? 'is-invalid' : ''}`}
                        onChange={handleQualification}
                        >
                        </input>
                        {errors.qualification && <div className='invalid-feedback'> {errors.qualification} </div>}
                    </div>

                    <div className='form-group mb-2'>
                        <label className="form-label">E-Mail:</label>
                        <input
                        type='email'
                        placeholder='Enter Employee Email'
                        name='mail'
                        value={mail}
                        className={`form-control ${errors.mail? 'is-invalid' : ''}`}
                        onChange={(e) =>setMail(e.target.value)}
                        >
                        </input>
                        {errors.mail && <div className='invalid-feedback'> {errors.mail} </div>}
                    </div>

                    <div className='form-group mb-2'>
                        <label className="form-label">Phone Number:</label>
                        <input
                        type='phone'
                        placeholder='Enter Employee Ph.no'
                        name='phone'
                        value={phone}
                        className={`form-control ${errors.phone? 'is-invalid' : ''}`}
                        onChange={(e) => setPhone(e.target.value)}
                        >
                        </input>
                        {errors.phone && <div className='invalid-feedback'> {errors.phone} </div>}
                    </div>

                    <div className='form-group mb-2'>
                        <label className="form-label">Salary:</label>
                        <input
                        type='text'
                        placeholder='Enter Employee salary'
                        name='salary'
                        value={salary}
                        className={`form-control ${errors.salary? 'is-invalid' : ''}`}
                        onChange={(e) => setSalary(e.target.value)}
                        >
                        </input>
                        {errors.salary && <div className='invalid-feedback'> {errors.salary} </div>}
                    </div>
         <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                </form>
                 </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent
