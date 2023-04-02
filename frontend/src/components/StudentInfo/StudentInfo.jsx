import React, { useEffect, useState } from 'react'
import './StudentInfo.css'
import { Link } from 'react-router-dom'
import { absentAttendance, presentAttendance } from '../../actions/studentAction'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudent } from '../../api/studentRequest'
import LeaveModal from '../LeaveModal/LeaveModal'

const StudentInfo = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [present, setPresent] = useState(false);
    const [isPresent, setIsPresent] = useState(false)
    const [absent, setabsent] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    let user = useSelector((state) => state.authReducer.authData);

    // to fetch student data
    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data } = await fetchStudent(user._id);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserData();
    }, []);

    // For Attendance as present
    const handlePresent = () => {
        const attendance = {
            date: Date().toString().substring(0, 15),
            studentId: user._id,
            present: true,
            student: user
        };
        dispatch(presentAttendance(user._id, attendance));
    };

    // For Attendance as absent
    const handleAbsent = () => {
        const attendance = {
            date: Date().toString().substring(0, 15),
            studentId: user._id,
            present: false,
            student: user
        };
        dispatch(absentAttendance(user._id, attendance))
    };

    return (
        <div className='studentInfo'>
            <h2>Attendance For Date  -  {Date().toString().substring(0, 15)}</h2>
            <div className="tableInfo">
                <table>
                    <tr>
                        <th>Sr.no.</th>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Class</th>
                        <th>Address</th>
                        <th>Course</th>
                        <th>{isPresent ? "Status" : "Attendance"}</th>
                        <th>Actions</th>
                    </tr>
                    <tr>
                        <td>{1}</td>
                        <td>{userData?.firstname} {userData?.lastname}</td>
                        <td>{userData?.rollNo}</td>
                        <td>{userData?.class}</td>
                        <td>{userData?.address}</td>
                        <td>{userData?.course}</td>
                        <td>
                            <button
                                disabled={isPresent}
                                onClick={() => {
                                    handlePresent();
                                    setPresent(true)
                                    setIsPresent(true)
                                }}
                                className={present ? 'p-btn presentBtn btn' : 'presentBtn btn'}
                                style={{ display: absent ? 'none' : 'inline' }}
                            >
                                {isPresent ? "Present" : "P"}
                            </button>

                            <button
                                disabled={isPresent}
                                onClick={() => {
                                    handleAbsent();
                                    setabsent(true)
                                    setIsPresent(true)
                                }}
                                className={absent ? 'a-btn absentBtn btn' : 'absentBtn btn'}
                                style={{ display: present ? 'none' : 'inline' }}

                            >
                                {isPresent ? "Absent" : "A"}
                            </button>
                        </td>
                        <td>
                            <Link to='../details'>
                                <button
                                    className='button btn'
                                >View</button>
                            </Link>
                            <button
                                className="button btn"
                                onClick={() => setModalOpened(true)}
                            >Leave</button>
                            <LeaveModal
                                modalOpened={modalOpened}
                                setModalOpened={setModalOpened}
                                data={user}
                            />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
};
export default StudentInfo