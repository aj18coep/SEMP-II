const mysql = require("mysql");
const config = require("../config");
const router = require("express").Router();

const db = mysql.createPool(config.mysql);

router.get("/upcoming_sessions_mentors", (req, res) => {
  const query = `select * from students join (select requests.request_id, requests.skill_id, requests.topic, requests.time_slot, requests.req_date, requests.language_id, sessions_taken.session_id, sessions_taken.student_id, sessions_taken.mentor_id, sessions_taken.completed, sessions_taken.review, sessions_taken.meeting_url from requests join sessions_taken on requests.request_id = sessions_taken.request_id where sessions_taken.mentor_id = ${req.query.user_id} and completed = 0) sess on sess.student_id = students.user_id;`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(400).send("Unable to fetch upcoming sessions");
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/upcoming_sessions_students", (req, res) => {
  const query = `select * from mentors join (select requests.request_id, requests.skill_id, requests.topic, requests.time_slot, requests.req_date, requests.language_id, sessions_taken.session_id, sessions_taken.student_id, sessions_taken.mentor_id, sessions_taken.completed, sessions_taken.review, sessions_taken.meeting_url from requests join sessions_taken on requests.request_id = sessions_taken.request_id where sessions_taken.student_id = ${req.query.user_id} and completed = 0) sess on sess.mentor_id = mentors.user_id;`;

  db.query(query, (err, result) => {
    if (err) {
      res.status(400).send("Unable to fetch upcoming sessions");
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/past_sessions_mentors", (req, res) => {
  const query = `select * from students join (select requests.request_id, requests.skill_id, requests.topic, requests.time_slot, requests.req_date, requests.language_id, sessions_taken.session_id, sessions_taken.student_id, sessions_taken.mentor_id, sessions_taken.completed, sessions_taken.review from requests join sessions_taken on requests.request_id = sessions_taken.request_id where sessions_taken.mentor_id = ${req.query.user_id} and completed = 1) sess on sess.student_id = students.user_id;`;

  db.query(query, (err, result) => {
    if (err) {
      res.status(400).send("Unable to fetch past sessions");
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/past_sessions_students", (req, res) => {
  const query = `select * from mentors join (select requests.request_id, requests.skill_id, requests.topic, requests.time_slot, requests.req_date, requests.language_id, sessions_taken.session_id, sessions_taken.student_id, sessions_taken.mentor_id, sessions_taken.completed, sessions_taken.review from requests join sessions_taken on requests.request_id = sessions_taken.request_id where sessions_taken.student_id = ${req.query.user_id} and completed = 1) sess on sess.mentor_id = mentors.user_id;`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(400).send("Unable to fetch past sessions");
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/pending_requests_mentor", async (req, res) => {
  try {
    var resul = await new Promise((resolve, reject) => {
      var query = `select requests.request_id as request_id, request_pending.mentor_id as mentor_id, requests.sender_id as sender_id, requests.skill_id as skill_id, requests.topic as topic, requests.time_slot as time_slot, requests.req_date as req_date, requests.approved as approved, request_pending.approved as final, requests.language_id as language_id from request_pending join requests on requests.request_id = request_pending.request_id where request_pending.mentor_id = ${req.query.user_id} and request_pending.approved = 0;`;
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    var now = new Date();
    var resul = await resul.filter((pen) => new Date(pen.req_date) >= now);
    //console.log(resul.length)
    resul = await Promise.all(
      resul.map(async (item) => {
        var user = await new Promise((resolve, reject) => {
          const { sender_id } = item;
          var query = `SELECT * from students where user_id = ${sender_id}`;
          db.query(query, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
        return {
          ...item,
          user: user[0],
        };
      })
    );
    res.status(200).send(resul);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/pending_requests", async (req, res) => {
  try {
    var resul = await new Promise((resolve, reject) => {
      var query = `select * from requests where sender_id = ${req.query.user_id} and approved = 0;`;
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    resul = await Promise.all(
      resul.map(async (item) => {
        var entry = await new Promise((resolve, reject) => {
          const { request_id } = item;
          var query = `select request_pending.request_id as request_id, users.user_id as mentor_id, users.username as username, request_pending.approved as approved from request_pending join users on request_pending.mentor_id = users.user_id where request_id=${request_id};`;
          db.query(query, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
        return {
          ...item,
          entry,
        };
      })
    );
    res.status(200).send(resul);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/request", (req, res) => {
  var query = `insert into requests(sender_id, skill_id, topic, time_slot, req_date, language_id, approved, mentor_specific) values (${req.body.sender_id}, ${req.body.skill_id}, "${req.body.topic}", "${req.body.time_slot}", "${req.body.req_date}", ${req.body.language_id}, ${req.body.approved}, ${req.body.mentor_specific});`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(400).send("Unable to post request");
      console.log(err.message);
    } else {
      console.log("success");
      res.status(200).send(result);
    }
  });
});

router.post("/set_approval", (req, res) => {
  var query = `update request_pending set approved = 1 where request_id = ${req.body.request_id} and mentor_id = ${req.body.mentor_id};`;
  console.log(query);
  db.query(query, (err, result) => {
    if (err) {
      res.status(400).send("Unable to post request");
      console.log(err.message);
    } else {
      console.log("success");
      res.status(200).send(result);
    }
  });
});

router.get("/request", async (req, res) => {
  try {
    var resul = await new Promise((resolve, reject) => {
      var query = `select * from students join (select requests.request_id as request_id, requests.sender_id as sender_id, requests.skill_id as skill_id, requests.topic as topic, requests.time_slot as time_slot, requests.req_date as req_date, requests.approved as approved, requests.language_id as language_id, requests.mentor_specific as mentor_specific, comb.mentor_id as mentor_id from requests join (select mentor_languages.mentor_id as mentor_id, mentor_languages.language_id as language_id, mentor_skills.skill_id as skill_id from mentor_languages join mentor_skills on mentor_languages.mentor_id = mentor_skills.mentor_id)comb on requests.skill_id = comb.skill_id and requests.language_id = comb.language_id where comb.mentor_id = ${req.query.user_id} and requests.approved = 0 and (mentor_specific = -1 or mentor_specific = ${req.query.user_id})) req on req.sender_id = students.user_id;`;
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    resul = await Promise.all(
      resul.map(async (item) => {
        var entry = await new Promise((resolve, reject) => {
          const { request_id, mentor_id } = item;
          var query = `select * from request_pending where request_id = ${request_id} and mentor_id = ${mentor_id};`;
          db.query(query, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
        return {
          ...item,
          count: entry.length,
        };
      })
    );

    res.status(200).send(resul);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/session", (req, res) => {
  var query = `insert into sessions_taken(mentor_id, student_id, request_id, completed, review) values (${req.body.mentor_id}, ${req.body.student_id}, ${req.body.request_id}, ${req.body.completed}, ${req.body.review});`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(400).send("Unable to post session");
    } else {
      res.status(200).send(result);
    }
  });
});

router.post("/approve_post_spec", (req, res) => {
  var query = `update requests set approved = 1 where request_id = ${req.body.request_id} and approved = 0;`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(400).send("Unable to process");
    } else {
      res.status(200).send(result);
    }
  });
});

router.post("/approve_post", async (req, res) => {
  try {
    var resul = await new Promise((resolve, reject) => {
      var query = `update requests set approved = 1 where request_id = ${req.body.request_id} and approved = 0;`;
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    var resul1 = await new Promise((resolve, reject) => {
      var query = `select * from requests where request_id = ${req.body.request_id};`;
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    res.status(200).send(resul1);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/session_completed", (req, res) => {
  var query = `update sessions_taken set completed = 1, review = ${req.body.rate} where session_id = ${req.body.session_id};`;

  db.query(query, (err, result) => {
    if (err) {
      res.status(400).send("Unable to review");
    } else {
      res.status(200).send(result);
    }
  });
});

router.post("/send_meeting_url", (req, res) => {
  var query = `update sessions_taken set meeting_url = "${req.body.meeting_url}" where session_id = ${req.body.session_id};`;

  db.query(query, (err, result) => {
    if (err) {
      res.status(400).send("Meeting Url not set");
    } else {
      res.status(200).send("Meeting set successfully");
    }
  });
});

router.post("/delete_pending", (req, res) => {
  var query = `delete from request_pending where request_id = ${req.body.request_id} and mentor_id = ${req.body.mentor_id};`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(400).send("Unable to delete");
    } else {
      res.status(200).send("Deleted successfully");
    }
  });
});

router.post("/approve_req", async (req, res) => {
  try {
    var resul = await new Promise((resolve, reject) => {
      var query = `select approved from requests where request_id = ${req.body.request_id};`;
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (resul[0].approved === 0) {
      resul = await new Promise((resolve, reject) => {
        var query = `insert into request_pending(request_id, mentor_id, approved) values (${req.body.request_id}, ${req.body.mentor_id}, 0);`;
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      res.status(200).send(resul);
    } else {
      res.status(200).send("request approved");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/move_to_past", (req, res) => {
  var curr = new Date();
  var set = new Date(curr.getTime() + 86400000);
  var date =
    set.getFullYear().toString() +
    "-" +
    (set.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    set.getDate().toString().padStart(2, "0");
  var query = "";
  if (req.body.is_mentor) {
    query = `update requests r join sessions_taken s on r.request_id = s.request_id set completed = 1 where r.req_date < "${date}" and s.mentor_id = ${req.body.id};`;
  } else {
    query = `update requests r join sessions_taken s on r.request_id = s.request_id set completed = 1 where r.req_date < "${date}" and s.student_id = ${req.body.id};`;
  }
  console.log(query);
  db.query(query, (err, result) => {
    if (err) {
      res.status(400).send("Unable to update");
    } else {
      res.status(200).send("Successfully updated");
    }
  });
});

module.exports = router;
