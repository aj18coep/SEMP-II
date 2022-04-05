import axios from "axios";
import { LOGOUT } from "../Users/userTypes";
import {
  ADD_PENDING_SESSION,
  DEL_PENDING_SESSION,
  SET_MEETING_URL,
  SET_PAST_SESSIONS,
  SET_PENDING_REQUESTS,
  SET_UPCOMING_SESSIONS,
} from "./sessionTypes";

//Fetch Home page session components
export const fetch_home = (id, is_mentor, dispatch) => {
  return (dispatch) => {
    var body = {
      is_mentor,
      id,
    };
    axios
      .post("http://localhost:5000/session/move_to_past", body)
      .then((res) => {
        console.log(res.data);
        if (is_mentor) {
          //Pending requests for mentor
          axios
            .get("http://localhost:5000/session/pending_requests_mentor", {
              params: {
                user_id: id,
              },
            })
            .then((response) => {
              var now = new Date();
              var res = response.data.filter(
                (pen) => new Date(pen.req_date) >= now
              );
              dispatch(set_pending(res));
            })
            .catch((err) => {
              alert(
                "Cannot fetch the session requeests. Please refresh the page"
              );
            });
          //Upcoming sessions for mentor
          axios
            .get("http://localhost:5000/session/upcoming_sessions_mentors", {
              params: {
                user_id: id,
              },
            })
            .then((response) => {
              dispatch(set_upcoming(response.data));
            })
            .catch((err) => {
              alert(
                "Cannot fetch the upcoming sessions. Please refresh the page"
              );
            });
          //Past sessions for mentor
          axios
            .get("http://localhost:5000/session/past_sessions_mentors", {
              params: {
                user_id: id,
              },
            })
            .then((response) => {
              dispatch(set_past(response.data));
            })
            .catch((err) => {
              alert("Cannot fetch the past sessions. Please refresh the page");
            });
        } else {
          //Pending confirmation requests for student
          axios
            .get("http://localhost:5000/session/pending_requests", {
              params: {
                user_id: id,
              },
            })
            .then((response) => {
              var now = new Date();
              var res = response.data.filter(
                (pen) => new Date(pen.req_date) >= now
              );
              dispatch(set_pending(res));
            })
            .catch((err) => {
              alert(
                "Cannot fetch the sessions confirmations. Please refresh the page"
              );
            });
          //Upcoming sessions for student
          axios
            .get("http://localhost:5000/session/upcoming_sessions_students", {
              params: {
                user_id: id,
              },
            })
            .then((response) => {
              dispatch(set_upcoming(response.data));
            })
            .catch((err) => {
              alert(
                "Cannot fetch the upcoming sessions. Please refresh the page"
              );
            });
          //Past sessions for student
          axios
            .get("http://localhost:5000/session/past_sessions_students", {
              params: {
                user_id: id,
              },
            })
            .then((response) => {
              dispatch(set_past(response.data));
            })
            .catch((err) => {
              alert("Cannot fetch the past sessions. Please refresh the page");
            });
        }
      })
      .catch((err) => {
        alert("Cannot fetch the sessions. Please refresh the page");
      });
  };
};

//Send session request
export const send_request = (data, dispatch) => {
  return (dispatch) => {
    var body = data;
    body.entry = [];
    axios
      .post("http://localhost:5000/session/request", body)
      .then((response) => {
        console.log(response.data);
        dispatch(add_pending(body));
        alert("Request sent successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//Set meeting url
export const set_meeting_url = (value) => {
  return {
    type: SET_MEETING_URL,
    payload: value,
  };
};

//Set upcoming sessions
export const set_upcoming = (value) => {
  return {
    type: SET_UPCOMING_SESSIONS,
    payload: value,
  };
};

//Set pending session requests
export const set_pending = (value) => {
  return {
    type: SET_PENDING_REQUESTS,
    payload: value,
  };
};

//Add pending session
export const add_pending = (value) => {
  return {
    type: ADD_PENDING_SESSION,
    payload: value,
  };
};

//Set past sessions
export const set_past = (value) => {
  return {
    type: SET_PAST_SESSIONS,
    payload: value,
  };
};

//Delete pending session
export const del_pend = (value) => {
  return {
    type: DEL_PENDING_SESSION,
    payload: value,
  };
};

//Session logout
export const sess_logout = (value) => {
  return {
    type: LOGOUT,
  };
};
