USE mentor_connect;

--  All Users Table
-- 0 for Student, 1 for Mentor
create table users 
( 
    user_id int PRIMARY KEY AUTO_INCREMENT, 
    username varchar(30) NOT NULL,
    user_type int, 
    password varchar(60) NOT NULL
);

-- Mentors Table
create table mentors
(
    user_id int,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    email_id varchar(40),
    image_link varchar(100),
    qualification varchar(50),
    rating int,
    sessions_taken int,
    verfied int,
    doc_link varchar(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Students Table
create table students
(
    user_id int,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    email_id varchar(40),
    image_link varchar(100),
    grad_year int,
    college_name varchar(30),
    session_taken int,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Skills Table
create table skills
(
    skill_id int PRIMARY KEY AUTO_INCREMENT,
    skill_name varchar(50)
);

-- Languages Table
create table languages
(
    language_id int PRIMARY KEY AUTO_INCREMENT,
    language_name varchar(30)
);

-- Requests
create table requests
(
    request_id int PRIMARY KEY AUTO_INCREMENT,
    sender_id int,
    skill_id int,
    topic varchar(60),
    time_slot varchar(60),
    req_date DATE,
    language_id int,
    approved int,
    mentor_specific int,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_specific) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id),
    FOREIGN KEY (language_id) REFERENCES languages(language_id)
);

-- Mentor languages
create table mentor_languages
(
    ml_id int PRIMARY KEY AUTO_INCREMENT,
    mentor_id int,
    language_id int,
    FOREIGN KEY (mentor_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(language_id) 
);

-- Mentor skills
create table mentor_skills
(
    ms_id int PRIMARY KEY AUTO_INCREMENT,
    mentor_id int,
    skill_id int,
    FOREIGN KEY (mentor_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

-- Student Skills
create table student_skills
(
    ss_id int PRIMARY KEY AUTO_INCREMENT,
    student_id int,
    skill_id int,
    FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

-- Session
create table sessions_taken
(
    session_id int PRIMARY KEY AUTO_INCREMENT,
    mentor_id int,
    student_id int,
    request_id int,
    completed int,
    review int,
    meeting_url varchar(150),
    FOREIGN KEY (mentor_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (request_id) REFERENCES requests(request_id) ON DELETE CASCADE
);

-- Requests Pending
create table request_pending
 ( 
    id int PRIMARY KEY AUTO_INCREMENT,
    request_id int,
    mentor_id int,
    approved int,
    FOREIGN KEY (request_id) REFERENCES requests(request_id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES mentors(user_id) ON DELETE CASCADE
 );