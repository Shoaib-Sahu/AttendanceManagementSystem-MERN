import React, { useEffect, useState } from 'react'
import { absentAttendance, fetchAllStudents, presentAttendance } from '../../actions/studentAction'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudent } from '../../api/studentRequest'

const StudentInfo = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [Present, setPresent] = useState(false);
    const [isPresent, setIsPresent] = useState(false);
    const [absent, setabsent] = useState(false);
    let user = useSelector((state) => state.authReducer.authData);
    const { studentData } = useSelector((state) => state.studentReducer);

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

    // Get all students
    useEffect(() => {
        dispatch(fetchAllStudents());
    }, []);


    const handlePresent = () => {
        const attendance = {
            date: Date().toString().substring(0, 15),
            studentId: user._id,
            present: true,
            student: user
        };
        dispatch(presentAttendance(user._id, attendance));
    };

    const handleAbsent = () => {
        const attendance = {
            date: "Sat Apr 1 2023 ",
            studentId: user._id,
            present: false,
            student: user
        };
        dispatch(absentAttendance(user._id, attendance))
    };

    return (
        <div className='studentInfo'>
            <h2>All Student's Details</h2>
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
                    {studentData.map((student, id) => {
                        const { attendance: [present] } = student;
                        return (
                            <tr>
                                <>
                                    <td>{id + 1}</td>
                                    <td>{student.firstname} {student.lastname}</td>
                                    <td>{student.rollNo}</td>
                                    <td>{student.class}</td>
                                    <td>{student.address}</td>
                                    <td>{student.course}</td>
                                    <td>
                                        {present
                                            ? present.present === true ? "Present" : "Absent"
                                            : <>
                                                <button
                                                    disabled={isPresent}
                                                    onClick={() => {
                                                        handlePresent();
                                                        setPresent(true)
                                                        setIsPresent(true)
                                                    }}
                                                    className={Present ? 'p-btn presentBtn btn' : 'presentBtn btn'}
                                                    style={{ display: absent ? 'none' : 'inline' }}
                                                >{isPresent ? "Present" : "P"}
                                                </button>

                                                <button
                                                    disabled={isPresent}
                                                    onClick={() => {
                                                        handleAbsent();
                                                        setabsent(true)
                                                        setIsPresent(true)
                                                    }}
                                                    className={absent ? 'a-btn absentBtn btn' : 'absentBtn btn'}
                                                    style={{ display: Present ? 'none' : 'inline' }}
                                                >{isPresent ? "Absent" : "A"}
                                                </button>
                                            </>
                                        }
                                    </td>
                                </>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div >
    )
};
export default StudentInfo