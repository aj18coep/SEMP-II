import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import {
  checkUser,
  getLanguage,
  getSkill,
  removeLanguage,
  removeSkill,
} from "../../redux/Users/userActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_profile: false,
      first_name: props.first_name,
      last_name: props.last_name,
      email_id: props.email_id,
      grad_year: props.grad_year,
      college_name: props.college_name,
      qualification: props.qualification,
      add_language: false,
      add_skill: false,
      languages: [],
      skills: [],
      selected_skill: "",
      selected_skill_id: "",
      selected_language: "",
      selected_language_id: "",
      profile_photo: null,
    };
  }

  //Edit profile
  toggle_profile = () => {
    this.setState({
      edit_profile: !this.state.edit_profile,
    });
  };

  //Add language
  toggle_language = () => {
    this.setState({
      add_language: !this.state.add_language,
    });
  };

  //Add skill
  toggle_skill = () => {
    this.setState({
      add_skill: !this.state.add_skill,
    });
  };

  complete_edit = () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email_id)) {
      this.toggle_profile();
      const data = new FormData();
      data.append("file", this.state.profile_photo);
      data.append("user_id", this.props.user_id);
      data.append("first_name", this.state.first_name);
      data.append("last_name", this.state.last_name);
      data.append("email_id", this.state.email_id);
      data.append("grad_year", this.state.grad_year);
      data.append("college_name", this.state.college_name);
      if (this.props.is_mentor)
        data.append("qualification", this.state.qualification);
      data.append("oldurl", this.props.image_link);
      if (this.props.is_mentor) {
        axios
          .post("http://localhost:5000/users/editmentor", data)
          .then((response) => {
            this.props.checkUser();
            alert("Profile updated");
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        axios
          .post("http://localhost:5000/users/editstudent", data)
          .then((response) => {
            this.props.checkUser();
            alert("Profile updated");
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    } else {
      alert("Please enter a valid email address");
    }
  };

  componentDidMount() {
    this.setState({
      languages: this.props.all_languages,
      skills: this.props.all_skills,
    });
  }

  //Handle any value - map value to name
  handle = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handlecollege_name = (e) => {
    this.setState({
      type_selected: true,
      college_name: e.target[e.target.selectedIndex].value,
    });
  };

  handle_file = (e) => {
    this.setState({
      profile_photo: e.target.files[0],
    });
  };

  addSkill = (e) => {
    if (
      this.props.skills.some(
        (skill) => skill.skill_name === this.state.selected_skill
      )
    ) {
      alert(`${this.state.selected_skill} already exists in your Interests`);
    } else if (this.state.selected_skill_id != "") {
      this.props.getSkill(this.props.user_id, this.props.is_mentor, {
        id: parseInt(this.state.selected_skill_id),
        skill: this.state.selected_skill,
      });
      this.setState({
        selected_skill_id: "",
        selected_skill: "",
      });
      this.toggle_skill();
    } else {
      alert("Please select a skill");
    }
  };

  addLanguage = (e) => {
    if (
      this.props.languages.some(
        (lang) => lang.language_name === this.state.selected_language
      )
    ) {
      alert(`${this.state.selected_language} already exists in your Interests`);
    } else if (this.state.selected_language_id) {
      this.props.getLanguage(this.props.user_id, {
        id: parseInt(this.state.selected_language_id),
        lang: this.state.selected_language,
      });
      this.setState({
        selected_language_id: "",
        selected_language: "",
      });
      this.toggle_language();
    } else {
      alert("Please select a language");
    }
  };

  deleteSkill = (id, skill) => {
    this.props.removeSkill(this.props.user_id, this.props.is_mentor, id);
  };

  deleteLanguage = (id, lang) => {
    this.props.removeLanguage(this.props.user_id, id);
  };

  render() {
    const {
      username,
      first_name,
      last_name,
      email_id,
      session_taken,
      image_link,
      grad_year,
      college_name,
      qualification,
      rating_points,
      is_mentor,
    } = this.props;

    var skills = this.props.skills ? (
      this.props.skills.map((skill, index) => (
        <React.Fragment key={skill.skill_id}>
          <Row>
            <Col sm={1}></Col>
            <Col sm={8}>
              <div id="pref-list-item">{skill.skill_name}</div>
            </Col>
            <Col sm={2}>
              <i
                className="bi bi-x-square-fill"
                onClick={() =>
                  this.deleteSkill(skill.skill_id, skill.skill_name)
                }
              ></i>
            </Col>
            <Col sm={1}></Col>
          </Row>
        </React.Fragment>
      ))
    ) : (
      <React.Fragment></React.Fragment>
    );

    var languages =
      this.props.languages !== undefined ? (
        this.props.languages.map((language, index) => (
          // <div key={language.language_id}>{index + 1} {language.language_name}</div>
          <React.Fragment key={language.language_id}>
            <Row>
              <Col sm={1}></Col>
              <Col sm={8}>
                <div id="pref-list-item">{language.language_name}</div>
              </Col>
              <Col sm={2}>
                <i
                  className="bi bi-x-square-fill"
                  onClick={() =>
                    this.deleteLanguage(
                      language.language_id,
                      language.language_name
                    )
                  }
                ></i>
              </Col>
              <Col sm={1}></Col>
            </Row>
          </React.Fragment>
        ))
      ) : (
        <React.Fragment></React.Fragment>
      );

    var all_skills = this.state.skills.map((skill) => (
      <option key={skill.skill_id} value={skill.skill_name} id={skill.skill_id}>
        {skill.skill_name}
      </option>
    ));

    var all_languages = this.state.languages.map((language) => (
      <option
        key={language.language_id}
        value={language.language_name}
        id={language.language_id}
      >
        {language.language_name}
      </option>
    ));

    return (
      <Container className="toplookout">
        <div className="profile-wrapper">
          <Row className="justify-content-center">
            <Col sm={9}>
              <div className="profile-section">
                <Row>
                  <Col>
                    {/* <p>Image Link: {image_link}</p> */}
                    <img
                      src={this.props.image_link}
                      className="profilepic"
                    ></img>
                  </Col>
                  <Col>
                    {!this.state.edit_profile && (
                      <React.Fragment>
                        <p>
                          Username: <b>{username}</b>
                        </p>
                        <p>
                          Name:{" "}
                          <b>
                            {first_name} {last_name}
                          </b>
                        </p>
                        <p>
                          Email: <b>{email_id}</b>
                        </p>
                        {is_mentor && (
                          <React.Fragment>
                            <p>
                              Qualification: <b>{qualification}</b>
                            </p>
                            <p>
                              Average Rating Points:{" "}
                              <b>
                                {(rating_points / session_taken).toFixed(2)}
                              </b>
                            </p>
                          </React.Fragment>
                        )}
                        {!is_mentor && (
                          <React.Fragment>
                            <p>
                              Graduation Year: <b>{grad_year}</b>
                            </p>
                            <p>
                              College Name: <b>{college_name}</b>
                            </p>
                          </React.Fragment>
                        )}
                        <p>
                          Sessions Taken: <b>{session_taken}</b>
                        </p>
                        <Button
                          className="btn btn-info"
                          onClick={this.toggle_profile}
                        >
                          <i className="bi bi-pencil-fill"></i> Edit Profile
                        </Button>
                      </React.Fragment>
                    )}
                    {this.state.edit_profile && (
                      <React.Fragment>
                        <Form>
                          <FormGroup row>
                            <Label for="first_name">First Name:</Label>
                            <Col sm={12}>
                              <Input
                                type="text"
                                name="first_name"
                                id="first_name"
                                placeholder="Enter your name"
                                value={this.state.first_name}
                                onChange={this.handle}
                              ></Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="last_name">Last Name:</Label>
                            <Col sm={12}>
                              <Input
                                type="text"
                                name="last_name"
                                id="last_name"
                                placeholder="Enter your last name"
                                value={this.state.last_name}
                                onChange={this.handle}
                              ></Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="email">Email Id:</Label>
                            <Col sm={12}>
                              <Input
                                type="text"
                                name="email_id"
                                id="email_id"
                                placeholder="Enter your email id"
                                value={this.state.email_id}
                                onChange={this.handle}
                              ></Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="file">Profile Photo:</Label>
                            <Col sm={12}>
                              <Input
                                type="file"
                                name="file"
                                id="file"
                                placeholder="Upload a profile photo"
                                onChange={this.handle_file}
                              ></Input>
                            </Col>
                          </FormGroup>
                          {this.props.is_mentor && (
                            <FormGroup row>
                              <Label for="qualification">Qualification:</Label>
                              <Col sm={12}>
                                <Input
                                  type="text"
                                  name="qualification"
                                  id="qualification"
                                  placeholder="Enter your Qualification"
                                  value={this.state.qualification}
                                  onChange={this.handle}
                                ></Input>
                              </Col>
                            </FormGroup>
                          )}
                          {!this.props.is_mentor && (
                            <React.Fragment>
                              <FormGroup row>
                                <Label for="grad_year">Graduation Year:</Label>
                                <Col sm={12}>
                                  <Input
                                    type="number"
                                    name="grad_year"
                                    id="grad_year"
                                    placeholder="Enter your Graduation Year"
                                    value={this.state.grad_year}
                                    onChange={this.handle}
                                  ></Input>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label for="college_name">College Name:</Label>
                                <Col sm={12}>
                                  <Input
                                    type="text"
                                    name="college_name"
                                    id="college_name"
                                    placeholder="Enter your college_name"
                                    value={this.state.college_name}
                                    onChange={this.handlecollege_name}
                                  >
                                  </Input>
                                </Col>
                              </FormGroup>
                            </React.Fragment>
                          )}
                        </Form>
                        <Button
                          className="row-btns"
                          color="success"
                          onClick={this.complete_edit}
                        >
                          Save
                        </Button>
                        <Button
                          className="row-btns"
                          onClick={this.toggle_profile} //Save edited profile
                        >
                          Cancel
                        </Button>
                      </React.Fragment>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <Row className="justify-content-center">
            <Col sm={6}>
              <div className="profile-section">
                <h5>What skills are you interested in?</h5>
                <br />
                {skills}
                {this.state.add_skill && (
                  <React.Fragment>
                    <Row>
                      <Col sm={10}>
                        <Input
                          type="select"
                          onChange={(e) =>
                            this.setState({
                              selected_skill_id:
                                e.target[e.target.selectedIndex].id,
                              selected_skill:
                                e.target[e.target.selectedIndex].value,
                            })
                          }
                        >
                          <option value="" disabled selected>
                            Select skill
                          </option>
                          {all_skills}
                        </Input>
                      </Col>
                      <Col sm={2}>
                        <i
                          class="bi bi-check-square-fill"
                          onClick={this.addSkill}
                        ></i>
                      </Col>
                    </Row>
                  </React.Fragment>
                )}
                <br />
                <button className="btn btn-info" onClick={this.toggle_skill}>
                  Add Skill
                </button>
              </div>
            </Col>
            {this.props.is_mentor && (
              <Col sm={6}>
                <div className="profile-section">
                  <h5>What languages are you comfortable with?</h5>
                  <br />
                  {languages}
                  {this.state.add_language && (
                    <React.Fragment>
                      <Row>
                        <Col sm={10}>
                          <Input
                            type="select"
                            onChange={(e) =>
                              this.setState({
                                selected_language_id:
                                  e.target[e.target.selectedIndex].id,
                                selected_language:
                                  e.target[e.target.selectedIndex].value,
                              })
                            }
                          >
                            <option value="" disabled selected>
                              Select language
                            </option>
                            {all_languages}
                          </Input>
                        </Col>
                        <Col sm={2}>
                          <i
                            class="bi bi-check-square-fill"
                            onClick={this.addLanguage}
                          ></i>
                        </Col>
                      </Row>
                    </React.Fragment>
                  )}
                  <br />
                  <button
                    className="btn btn-info"
                    onClick={this.toggle_language}
                  >
                    Add Language
                  </button>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.users.user_id,
    username: state.users.username,
    first_name: state.users.first_name,
    last_name: state.users.last_name,
    email_id: state.users.email_id,
    session_taken: state.users.session_taken,
    image_link: state.users.image_link,
    grad_year: state.users.grad_year,
    college_name: state.users.college_name,
    qualification: state.users.qualification,
    rating_points: state.users.rating_points,
    is_mentor: state.users.is_mentor,
    languages: state.users.languages,
    skills: state.users.skills,
    all_skills: state.users.all_skills,
    all_languages: state.users.all_languages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkUser: () => dispatch(checkUser()),
    getSkill: (id, type, skill) => dispatch(getSkill(id, type, skill)),
    getLanguage: (id, lang) => dispatch(getLanguage(id, lang)),
    removeSkill: (id, type, skill) => dispatch(removeSkill(id, type, skill)),
    removeLanguage: (id, lang) => dispatch(removeLanguage(id, lang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
