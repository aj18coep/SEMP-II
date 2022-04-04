import { SET_MENTORS, SET_STUDENTS, SET_VERIFIED } from "./adminTypes";

const admin_initialState = {
  mentors: [],
  students: [],
};

const adminReducer = (state = admin_initialState, action) => {
  switch (action.type) {
      //Set mentors
    case SET_MENTORS:
      return {
        ...state,
        mentors: action.payload,
      };
      //Set students
    case SET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
      //Verify mentor
    case SET_VERIFIED: {
      const index = state.mentors.findIndex(
        (mentor) => mentor.user_id === action.payload.user_id
      );
      const newArray = [...state.mentors];
      newArray[index].verfied = action.payload.verify;
      return {
        ...state,
        mentors: newArray,
      };
    }
    default:
      return state;
  }
};

export default adminReducer;
