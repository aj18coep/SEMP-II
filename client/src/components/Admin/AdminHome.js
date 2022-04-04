import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Col, Collapse, Container, Table } from "reactstrap";
import { fetchAllUsers, verifyMentor } from "../../redux/Admin/adminActions";
import "./styles.css";

//Admin Home - verify mentor
class AdminHome extends Component {
  constructor() {
    super();
    this.state = {
      mentor_toggle: true,
      student_toggle: false,
    };
  }

  //Fetch all users
  componentDidMount() {
    this.props.fetchAllusers();
  }

  //Toggle mentor state
  toggle_mentor = () => {
    this.setState({
      mentor_toggle: !this.state.mentor_toggle,
    });
  };

  //Toggle student state
  toggle_student = () => {
    this.setState({
      student_toggle: !this.state.student_toggle,
    });
  };

  verify = (id, email_id, first_name, last_name) => {
    // alert(`verified ${id}`)
    const data = {
      user_id: id,
    };
    //Verify and accept mentor profile
    axios
      .post("http://localhost:5000/users/verify", data)
      .then((response) => {
        alert("Mentor Profile Verified");
        const value = {
          user_id: id,
          verify: 1,
        };
        this.props.verifyUser(value);
        var bod = {
          type: "send_verification",
          receiver: email_id,
          first_name: first_name,
          last_name: last_name,
        };
        axios
          .post("http://localhost:5000/users/sendmail", bod)
          .then((re) => {
            console.log("Email sent successfully");
          })
          .catch((err) => {
            console.log("Error in sending mail");
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Suspend mentor profile
  suspend = (id, email_id, first_name, last_name) => {
    const data = {
      user_id: id,
    };
    axios
      .post("http://localhost:5000/users/suspend", data)
      .then((response) => {
        alert("Mentor Profile Suspended");
        const value = {
          user_id: id,
          verify: 2,
        };
        this.props.verifyUser(value);
        var bod = {
          type: "send_suspension",
          receiver: email_id,
          first_name: first_name,
          last_name: last_name,
        };
        axios
          .post("http://localhost:5000/users/sendmail", bod)
          .then((re) => {
            console.log("Email sent successfully");
          })
          .catch((err) => {
            console.log("Error in sending mail");
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Change verfied status
  changeVerified = (id) => {
    //console.log("mentor obj is ", mentor);
    //mentor.verfied = 2;
    const data = {
      user_id: id,
    };
    axios
      .post("http://localhost:5000/users/changeVerfied", data)
      .then((response) => {
        alert("Profile status reverted");
        const value = {
          user_id: id,
          verify: 0,
        };
        this.props.verifyUser(value);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    //Display mentor details in table
    var mentor_table = this.props.mentors.map((mentor) => (
      <tr key={mentor.user_id}>
        <td>
          {mentor.first_name} {mentor.last_name}
        </td>
        <td>{mentor.email_id}</td>
        <td>{mentor.qualification}</td>
        <td>
          <a href={mentor.doc_link} target="_blank">
            View
          </a>
        </td>
        <td>
          {mentor.verfied == 0 ? (
            <React.Fragment>
              <i
                className="bi bi-check-square-fill"
                onClick={() =>
                  this.verify(
                    mentor.user_id,
                    mentor.email_id,
                    mentor.first_name,
                    mentor.last_name
                  )
                }
              ></i>
              &nbsp;
              <i
                className="bi bi-x-square-fill"
                onClick={() =>
                  this.suspend(
                    mentor.user_id,
                    mentor.email_id,
                    mentor.first_name,
                    mentor.last_name
                  )
                }
              ></i>
            </React.Fragment>
          ) : mentor.verfied == 1 ? (
            <p style={{ color: "green" }}>Verified</p>
          ) : (
            <p style={{ color: "red" }}>Suspended</p>
          )}
        </td>
        <td>
          <Button onClick={() => this.changeVerfied(mentor.user_id)}>
            Change
          </Button>
        </td>
      </tr>
    ));
    
    //Display student details in table
    var student_table = this.props.students.map((student) => (
      <tr key={student.user_id}>
        <td>
          {student.first_name} {student.last_name}
        </td>
        <td>{student.email_id}</td>
        <td>{student.grad_year}</td>
        <td>{student.college_name}</td>
      </tr>
    ));

    return (
      <div>
        <Container className="font1">
          <Col style={{ textAlign: "center" }}>
            <br />
            <h2>Welcome, Admin!</h2>
            <br />
          </Col>
          <Col>
            {/* <Button
              className="btn btn-info btn-lg"
              href="Feedback responses google sheet/ excel sheet"
              target="_blank"
            >
              Check Session Feedback Responses
            </Button> */}
            <br />
            <br />
            <hr />
            <br />
          </Col>
        </Container>
        <Button color="warning">Mentors waiting for verification</Button>
        &nbsp;&nbsp;
        <Button color="danger" onClick={() => this.props.fetchAllusers()}>
          Refresh Tab
        </Button>
        <Collapse isOpen={this.state.mentor_toggle}>
          <Container
            style={{
              border: "1px solid black",
              height: "500px",
              overflow: "auto",
            }}
          >
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Qualification</th>
                  <th>Documents</th>
                  <th>Verify</th>
                </tr>
              </thead>
              <tbody>{mentor_table}</tbody>
            </Table>
          </Container>
        </Collapse>
        <br></br>
        <Button
          color="warning"
          onClick={this.toggle_student}
          style={{ marginBottom: "1rem", display: "none" }}
        >
          Students
        </Button>
        <Collapse isOpen={this.state.student_toggle}>
          <Container
            style={{
              border: "1px solid black",
              height: "500px",
              overflow: "auto",
            }}
          >
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Graduation Year</th>
                  <th>College</th>
                </tr>
              </thead>
              <tbody>{student_table}</tbody>
            </Table>
          </Container>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mentors: state.admin.mentors,
    students: state.admin.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllusers: () => dispatch(fetchAllUsers()),
    verifyUser: (value) => dispatch(verifyMentor(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
