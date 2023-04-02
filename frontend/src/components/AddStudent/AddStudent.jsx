import React, { useState } from 'react'
import './AddStudent.css'
import { useDispatch } from 'react-redux'
import { addStudent } from '../../actions/studentAction'

const AddStudent = () => {
    const dispatch = useDispatch();
    const initialState = {
        firstname: "",
        lastname: "",
        rollNo: "",
        class: "",
        course: "",
        address: ""
    };
    const [student, setStudent] = useState(initialState);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addStudent(student));
    };

    return (
        <div className='addStudent'>
            <div>
                <h2>Add new student</h2>
            </div>
            <div>
                <form className="studentForm" onSubmit={handleSubmit}>
                    <div>
                        <input
                            className='infoInput'
                            type="text"
                            name='firstname'
                            placeholder='First Name'
                            value={student.firstname}
                            onChange={handleChange}
                        />
                        <input
                            className='infoInput'
                            type="text"
                            name='lastname'
                            placeholder='Last Name'
                            value={student.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            className='infoInput'
                            type="text"
                            name='class'
                            placeholder='Class'
                            value={student.class}
                            onChange={handleChange}
                        />
                        <input
                            className='infoInput'
                            type="text"
                            name='rollNo'
                            placeholder='Roll No'
                            value={student.rollNo}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            className='infoInput'
                            type="text"
                            name='address'
                            placeholder='Address'
                            value={student.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            className='infoInput'
                            type="text"
                            name='course'
                            placeholder='Course'
                            value={student.course}
                            onChange={handleChange}
                        />
                        <button type='submit' className='button addBtn'>Add Student</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddStudent