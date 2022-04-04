import axios from "axios";
import { SET_MENTORS, SET_STUDENTS, SET_VERIFIED } from "./adminTypes";

//Fetch all users
export const fetchAllUsers = (dispatch) => {
  return (dispatch) => {
    //Fetch all mentors
    axios
      .get("http://localhost:5000/users/get_all_mentors")
      .then((response) => {
        dispatch(setMentors(response.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
    //Fetch all students
    axios
      .get("http://localhost:5000/users/get_all_students")
      .then((response) => {
        dispatch(setStudents(response.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

//Set mentors
export const setMentors = (value) => {
  return {
    type: SET_MENTORS,
    payload: value,
  };
};

//Set students
export const setStudents = (value) => {
  return {
    type: SET_STUDENTS,
    payload: value,
  };
};

//Verify Mentor
export const verifyMentor = (value) => {
  return {
    type: SET_VERIFIED,
    payload: value,
  };
};
