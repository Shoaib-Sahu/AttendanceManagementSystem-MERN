const studentReducer = (
    state = {
        studentData: [],
        loading: false
    },
    action
) => {
    switch (action.type) {
        case "FETCH_ALL_STUDENTS":
            return { ...state, studentData: action.data, loading: false };
        case "FETCH_STUDENT":
            return { ...state, studentData: action.data, loading: false }
        case "ADD_STUDENT":
            return { ...state, studentData: [...state.studentData, action.data], loading: false }
        default:
            return state;
    }
};

export default studentReducer;