const {
  LOGIN,
  LOGOUT,
  ERROR,
  SET_LOGIN,
  GET_MENTOR,
  GET_STUDENT,
  GET_LANGUAGE,
  GET_SKILL,
  ADD_LANGUAGE,
  ADD_SKILL,
  DELETE_SKILL,
  DELETE_LANGUAGE,
  SET_ALL_LANGUAGES,
  SET_ALL_SKILLS,
  GET_ADMIN,
} = require("./userTypes");

const userInitialState = {
  loggedIn: false,
  username: "",
  password: "",
  user_id: -1,
  first_name: "",
  last_name: "",
  is_teacher: "",
  image_link: "",
  email_id: "",
  session_taken: 0,
  grad_year: 0,
  college_name: "",
  qualification: "",
  rating: 0,
  error: "",
  skills: [],
  languages: [],
  all_skills: [],
  all_languages: [],
  is_admin: false,
  verfied: 0,
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        password: action.payload.password,
        error: "",
      };
    case LOGOUT:
      return {
        loggedIn: false,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_LOGIN:
      return {
        loggedIn: true,
      };
    case GET_MENTOR:
      return {
        ...state,
        user_id: action.payload.user_id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email_id: action.payload.email_id,
        image_link: action.payload.image_link,
        qualification: action.payload.qualification,
        rating: action.payload.rating,
        session_taken: action.payload.sessions_taken,
        is_teacher: true,
        verfied: action.payload.verfied,
        is_admin: false,
      };
    case GET_STUDENT:
      return {
        ...state,
        user_id: action.payload.user_id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email_id: action.payload.email_id,
        image_link: action.payload.image_link,
        grad_year: action.payload.grad_year,
        college_name: action.payload.college_name,
        session_taken: action.payload.session_taken,
        is_teacher: false,
        is_admin: false,
      };
    case GET_ADMIN:
      return {
        ...state,
        is_admin: true,
      };
    case GET_LANGUAGE:
      return {
        ...state,
        languages: action.payload,
      };
    case GET_SKILL:
      return {
        ...state,
        skills: action.payload,
      };
    case ADD_LANGUAGE:
      return {
        ...state,
        languages: [...state.languages, action.payload],
      };
    case ADD_SKILL:
      return {
        ...state,
        skills: [...state.skills, action.payload],
      };
    case DELETE_SKILL:
      return {
        ...state,
        skills: state.skills.filter(
          (skill) => skill.skill_id !== action.payload.skill_id
        ),
      };
    case DELETE_LANGUAGE:
      return {
        ...state,
        languages: state.languages.filter(
          (lang) => lang.language_id !== action.payload.language_id
        ),
      };
    case SET_ALL_LANGUAGES:
      return {
        ...state,
        all_languages: action.payload,
      };
    case SET_ALL_SKILLS:
      return {
        ...state,
        all_skills: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
