import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchOneAttendance } from '../../api/studentRequest';
import './ViewAttendance.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const ViewAttendance = () => {
    const [student, setStudent] = useState([]);
    let user = useSelector((state) => state.authReducer.authData);

    // To get Attendance Data
    useEffect(() => {
        const fetchAttendance = async () => {
            const { data } = await fetchOneAttendance(user._id);
            setStudent(data);
        };
        fetchAttendance();
    }, []);

    return (<>
        <Navbar />
        <div className='studentInfo'>
            <div className="btns">
                <Link to='../home'>
                    <button className='button btn btn-back'>Back</button>
                </Link>
            </div>
            {student.map((attendance, id) => {
                return (
                    <>
                        <h2>Attendance For Date  - {attendance.date}</h2>
                        <div className="tableInfo">
                            <table>
                                <tr>
                                    <th>Sr.no.</th>
                                    <th>Name</th>
                                    <th>Roll No</th>
                                    <th>Class</th>
                                    <th>Address</th>
                                    <th>Course</th>
                                    <th>Status</th>
                                </tr>
                                <tr key={id}>
                                    <td>{id + 1}</td>
                                    <td>{attendance.student.firstname} {attendance.student.lastname}</td>
                                    <td>{attendance.student.rollNo}</td>
                                    <td>{attendance.student.class}</td>
                                    <td>{attendance.student.address}</td>
                                    <td>{attendance.student.course}</td>

                                    <td
                                        className={attendance.present === true
                                            ? 'present' : 'absent'}
                                    >
                                        {attendance.present === true ? "Present" : "Absent"}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </>
                )
            })}
        </div>
    </>
    )
}

export default ViewAttendance