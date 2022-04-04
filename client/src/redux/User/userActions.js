import {
  ADD_LANGUAGE,
  ADD_SKILL,
  DELETE_LANGUAGE,
  DELETE_SKILL,
  ERROR,
  GET_LANGUAGE,
  GET_STUDENT,
  GET_SKILL,
  GET_TEACHER,
  SET_ALL_LANG,
  SET_ALL_SKILLS,
  LOGIN,
  LOGOUT,
  SET_LOGIN,
  GET_ADMIN,
} from "./userTypes";
import axios from "axios";

export const checkUser = (dispatch) => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/users/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
          dispatch(login(response.data.user[0]));
          //Student user
          if (response.data.user[0].user_type == 0) {
            axios
              .get("http://localhost:5000/users/student", {
                params: {
                  id: response.data.user[0].user_id,
                },
              })
              .then((resp) => {
                dispatch(get_student(resp.data[0]));
              })
              .catch((err) => {
                console.log(err);
              });
            axios
              .get("http://localhost:5000/users/student_skills", {
                params: {
                  id: response.data.user[0].user_id,
                },
              })
              .then((resp) => {
                dispatch(get_skill(resp.data));
              })
              .catch((err) => {
                console.log(err);
              });
          }
          //Admin User
          else if (response.data.user[0].user_type == 2) {
            dispatch(get_admin());
          }
          //Mentor User
          else {
            axios
              .get("http://localhost:5000/users/mentor", {
                params: {
                  id: response.data.user[0].user_id,
                },
              })
              .then((resp) => {
                dispatch(get_mentor(resp.data[0]));
              })
              .catch((err) => {
                console.log(err);
              });
            axios
              .get("http://localhost:5000/users/mentor_skills", {
                params: {
                  id: response.data.user[0].user_id,
                },
              })
              .then((resp) => {
                dispatch(get_skill(resp.data));
              })
              .catch((err) => {
                console.log(err);
              });
            axios
              .get("http://localhost:5000/users/languages", {
                params: {
                  id: response.data.user[0].user_id,
                },
              })
              .then((resp) => {
                dispatch(get_language(resp.data));
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else {
          dispatch(logout);
        }
      })
      .catch((error) => {
        dispatch(err(error));
      });
    axios
      .get("http://localhost:5000/users/all_skills")
      .then((response) => {
        // set_subs(response.data)
        dispatch(set_all_skills(response.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
    axios
      .get("http://localhost:5000/users/all_languages")
      .then((response) => {
        dispatch(set_all_languages(response.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const getSkill = (user_id, user_type, skill, dispatch) => {
  return (dispatch) => {
    var body = {
      user_id: user_id,
      skill_id: skill.id,
    };

    if (user_type == 1) {
      axios
        .post("http://localhost:5000/users/add_mentor_skill", body)
        .then((res) => {
          console.log(res);
          dispatch(add_skill({ skill_id: skill.id, skill_name: skill.skill }));
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      axios
        .post("http://localhost:5000/users/add_student_skill", body)
        .then((res) => {
          console.log(res);
          dispatch(add_skill({ skill_id: skill.id, skill_name: skill.skill }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};

export const getLanguage = (user_id, language, dispatch) => {
  return (dispatch) => {
    var body = {
      user_id: user_id,
      language_id: language.id,
    };
    axios
      .post("http://localhost:5000/users/add_language", body)
      .then((res) => {
        console.log(res);
        dispatch(
          add_language({
            language_id: language.id,
            language_name: language.language,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeSkill = (user_id, user_type, skill, dispatch) => {
  return (dispatch) => {
    var body = {
      user_id: user_id,
      skill_id: skill,
    };

    if (user_type) {
      axios
        .post("http://localhost:5000/users/del_mentor_skill", body)
        .then((res) => {
          console.log(res);
          dispatch(delete_skill({ skill_id: skill }));
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      axios
        .post("http://localhost:5000/users/del_student_skill", body)
        .then((res) => {
          console.log(res);
          dispatch(delete_skill({ skill_id: skill }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};

export const removeLanguage = (user_id, language, dispatch) => {
  return (dispatch) => {
    var body = {
      user_id: user_id,
      language_id: language,
    };
    axios
      .post("http://localhost:5000/users/del_language", body)
      .then((res) => {
        console.log(res);
        dispatch(delete_language({ language_id: language }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const set_all_languages = (value) => {
  return {
    type: SET_ALL_LANG,
    payload: value,
  };
};

export const set_all_skills = (value) => {
  return {
    type: SET_ALL_SKILLS,
    payload: value,
  };
};

export const login = (value) => {
  return {
    type: LOGIN,
    payload: value,
  };
};

export const get_student = (value) => {
  return {
    type: GET_STUDENT,
    payload: value,
  };
};

export const get_mentor = (value) => {
  return {
    type: GET_TEACHER,
    payload: value,
  };
};

export const get_admin = () => {
  return {
    type: GET_ADMIN,
  };
};

export const get_skill = (value) => {
  return {
    type: GET_SKILL,
    payload: value,
  };
};

export const get_language = (value) => {
  return {
    type: GET_LANGUAGE,
    payload: value,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const err = (error) => {
  return {
    type: ERROR,
    payload: error.message,
  };
};

export const set_login = () => {
  return {
    type: SET_LOGIN,
  };
};

export const add_skill = (value) => {
  return {
    type: ADD_SKILL,
    payload: value,
  };
};

export const add_language = (value) => {
  return {
    type: ADD_LANGUAGE,
    payload: value,
  };
};

export const delete_skill = (value) => {
  return {
    type: DELETE_SKILL,
    payload: value,
  };
};

export const delete_language = (value) => {
  return {
    type: DELETE_LANGUAGE,
    payload: value,
  };
};
