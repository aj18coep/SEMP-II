const mailer = require("nodemailer");

const getEmailData = (to, dat, template) => {
  let data = null;

  switch (template) {
    //Session confirmation done by student
    case "mentor_session_confirm":
      data = {
        from: "Mentor-Connect <mentorconnect123@gmail.com>",
        to: to,
        subject: `Approval of request`,
        html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Approval
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Greetings Mentor!  </h1>
                            <h3>Your approval of the session on ${dat.topic} has been confirmed by student</h3>
                            <br>
                            <h4>Student Details</h4>
                            <p>Student: ${dat.first_name} ${dat.last_name}</p>
                            <p>Graduation: ${dat.grad_year}, ${dat.college_name}</p>
                            <p>Date: ${dat.req_date}</p>
                            <p>Time Slot: ${dat.time_slot}</p>
                            <p>Topic: ${dat.topic}</p>
                        </div>
                    </body>
                </html>`,
      };
      break;

    //Session request accepted by mentor
    case "student_session_confirm":
      data = {
        from: "Mentor-Connect <mentorconnect123@gmail.com>",
        to: to,
        subject: `Your request has been approved`,
        html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Approval
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Greetings Student!  </h1>
                            <h3>Your request for a session on ${
                              dat.topic
                            } has been approved</h3>
                            <br>
                            <h4>Details</h4>
                            <p>Mentor: ${dat.first_name} ${dat.last_name}</p>
                            <p>Qualification: ${dat.qualification}</p>
                            <p>Average Rating: ${(
                              dat.rating / dat.sessions_taken
                            ).toFixed(2)}</p>
                            <p>Sessions taken: ${dat.sessions_taken}</p>
                            <p>Date: ${dat.req_date}</p>
                            <p>Time Slot: ${dat.time_slot}</p>
                            <p>Topic: ${dat.topic}</p>
                        </div>
                    </body>
                </html>`,
      };
      break;
    //Mentorship session completed - mail to student
    case "finish_student":
      data = {
        from: "Mentor-Connect <mentorconnect123@gmail.com>",
        to: to,
        subject: `Thank you for taking the session`,
        html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Session
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Greetings Student!  </h1>
                            <h3>Thank you for completing the session on ${dat.topic}</h3>
                            <br>
                            <h4>Details</h4>
                            <p>Mentor: ${dat.first_name} ${dat.last_name}</p>
                            <p>Topic: ${dat.topic}</p>
                            <h5>Review given: ${dat.review}/5</h5>
                        </div>
                    </body>
                </html>`,
      };
      break;

    //Mentorship session completed - mail to mentor
    case "finish_mentor":
      data = {
        from: "Mentor-Connect <mentorconnect123@gmail.com>",
        to: to,
        subject: `Thank you for taking the session`,
        html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Session
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Greetings Mentor!  </h1>
                            <h3>You have successfully completed session on ${dat.topic}</h3>
                            <br>
                            <h4>Details</h4>
                            <p>Student: ${dat.first_name} ${dat.last_name}</p>
                            <p>Topic: ${dat.topic}</p>
                            <h5>Review given: ${dat.review}/5</h5>
                        </div>
                    </body>
                </html>`,
      };
      break;

    //Send meeting url and details to student
    case "student_send_url":
      data = {
        from: "Mentor-Connect <mentorconnect123@gmail.com>",
        to: to,
        subject: `Meeting Link`,
        html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Session
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Hi ${dat.first_name} ${dat.last_name}!  </h1>
                            <h3>Your mentor for a session on ${dat.topic} has sent meeting URL</h3>
                            <br>
                            <h4>Details</h4>
                            <p>Topic: ${dat.topic}</p>
                            <p>Time: ${dat.time}</p>
                            <p>Date: ${dat.date}</p>
                            <h5>Meeting URL: <a href="${dat.meeting_url}">${dat.meeting_url}</a></h5>
                            <br>
                            <h6>Enjoy the session :)</h6>
                        </div>
                    </body>
                </html>`,
      };
      break;

    //Send meeting url and details to Mentor
    case "mentor_send_url":
      data = {
        from: "Mentor-Connect <mentorconnect123@gmail.com>",
        to: to,
        subject: `Meeting Link`,
        html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Session
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Hi ${dat.first_name} ${dat.last_name}!  </h1>
                            <h3>You have created a meeting on the topic of ${dat.topic}</h3>
                            <br>
                            <h4>Details</h4>
                            <p>Topic: ${dat.topic}</p>
                            <p>Time: ${dat.time}</p>
                            <p>Date: ${dat.date}</p>
                            <h5>Meeting URL: <a href="${dat.meeting_url}">${dat.meeting_url}</a></h5>
                            <br>
                            <h6>Enjoy the session :)</h6>
                        </div>
                    </body>
                </html>`,
      };
      break;

    //Send account verified mail to Mentor
    case "send_verification":
      data = {
        from: "Mentor-Connect <mentorconnect123@gmail.com>",
        to: to,
        subject: `Verification of account`,
        html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Session
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Hi ${dat.first_name} ${dat.last_name}!  </h1>
                            <h3>Your account has been verified</h3>
                        </div>
                    </body>
                </html>`,
      };
      break;

    //Send account suspended mail to Mentor
    case "send_suspension":
      data = {
        from: "Mentor-Connect <mentorconnect123@gmail.com>",
        to: to,
        subject: `Meeting Link`,
        html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Session
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Hi ${dat.first_name} ${dat.last_name}!  </h1>
                            <h3>Your account has been suspended</h3> //todo: Add reason of suspension if possble
                        </div>
                    </body>
                </html>`,
      };
      break;
      //Send Otp to change password (for any user)
    case "otp":
      data = {
        from: "Mentor-Connect <mentorconnect123@gmail.com>",
        to: to,
        subject: `OTP for changing password`,
        html: `<!DOCTYPE html>
                <html>
                    <head>
                        <title>
                            Request for Password Change
                        </title>
                    </head>
                    <body>
                        <div>
                            <h1>Hi ${dat.first_name} ${dat.last_name}!  </h1>
                            <br>
                            <h4>OTP for changing your password is <b>${dat.otp}</b></h4>
                            <br>
                            <h5>Enter this otp in the space provided in the application</h5>
                        </div>
                    </body>
                </html>`,
      };
      break;

      //Student: Send feedback to or review the mentor regarding the session
    case "send_review":
      data = {
        from: "Mentor-Connect <mentorconnect123@gmail.com>",
        to: to,
        subject: `Approval of request`,
        html: `<!DOCTYPE html>
                    <html>
                        <head>
                            <title>
                                Approval
                            </title>
                        </head>
                        <body>
                            <div>
                                <h1>Greetings Student!  </h1>
                                <h3>You have completed the session on ${dat.topic} by ${dat.first_name} ${dat.last_name}</h3>
                                <br>
                                <h5>We would love to hear your feedback on the session! <br>You may also let us know about your concerns and problems with the session by filling out this google form - </h5>
                                <h5>https://forms.gle/8r99KvBRashiYq437/</h5>
                            </div>
                        </body>
                    </html>`,
      };
      break;
    default:
      data;
  }
  return data;
};

const sendEmail = (bod) => {
  const smtpTransport = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "mentorconnect123@gmail.com",
      pass: "*****",
    },
  });

  const mail = getEmailData(bod.receiver, bod, bod.type);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Email sent successfully");
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
