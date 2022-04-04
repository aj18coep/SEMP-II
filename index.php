<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Web Application</title>
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.error {color: #FF0000;}
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

</style>
</head>

<body>
<div class="topnav">
  <a href="index.php">Register</a>
  <a href="login.html">Login</a>
</div>
    <div class="container-fluid h-100 bg-grey">
        <div class="row">
            <div class="title text-white text-center my-3">
                <h3 style="color:DodgerBlue">Fill Registration form(for new users)</h1>
</div>
        </div>
        <form name="regform" method="post" action="registerdata.php">  
&nbsp;&nbsp;<b>Name:</b><br>&nbsp; <input type="text" name="name" style="width:30%;"><br><br>
&nbsp;&nbsp;<b>Email:</b><br>&nbsp; <input type="text" name="email" style="width:30%;"><br><br>
&nbsp;&nbsp;<b>Username:</b><br>&nbsp; <input type="text" name="username" style="width:30%;"><br><br>
&nbsp;&nbsp;<b>Password:</b><br>&nbsp; <input type="text" name="pswrd" style="width:30%;"><br><br>
&nbsp;&nbsp;<b>Phone Number:</b><br>&nbsp; <input type="text" name="phonenum" style="width:30%;"><br><br>
&nbsp;&nbsp;<b>About Yourself:</b><br>&nbsp; <input type="text" name="about" style="width:30%;"><br><br>
&nbsp;&nbsp;<b>Address:</b><br>&nbsp; <input type="text" name="address" style="width:30%;"><br><br>
&nbsp;&nbsp;<b>Highest Education:</b><br>&nbsp; <input type="text" name="education" style="width:30%;"><br><br>
&nbsp;&nbsp;<b>Skills:</b><br>&nbsp; <input type="text" name="skills" style="width:30%;"><br><br>
&nbsp;&nbsp;<b>Interests:</b><br>&nbsp; <input type="text" name="interests" style="width:30%;"><br><br>
<input type="submit" value="Register" style="background-color:DeepSkyBlue;font-size:20px;">
<input type="reset" value="Reset" style="background-color:DeepSkyBlue;font-size:20px;">
</form>

</body>

</html>

