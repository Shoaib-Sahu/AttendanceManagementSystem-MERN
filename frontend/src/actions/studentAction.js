import * as studentApi from '../api/studentRequest';

export const fetchAllStudents = () => async (dispatch) => {
    const { data } = await studentApi.fetchAllStudents();
    dispatch({ type: "FETCH_ALL_STUDENTS", data: data });
};

export const fetchStudent = (id) => async (dispatch) => {
    const { data } = await studentApi.fetchStudent(id);
    dispatch({ type: "FETCH_STUDENT", data: data });
};

export const addStudent = (formData) => async (dispatch) => {
    const { data } = await studentApi.addStudent(formData);
    dispatch({ type: "ADD_STUDENT", data: data });
};

export const presentAttendance = (id, user) => async (dispatch) => {
    const { data } = await studentApi.enterAttendance(id, user);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    console.log(data)
};

export const absentAttendance = (id, user) => async (dispatch) => {
    const { data } = await studentApi.enterAttendance(id, user);
    dispatch({ type: "AUTH_SUCCESS", data: data });
};